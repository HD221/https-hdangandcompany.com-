// Vercel serverless function: receives the enquiry and subscribe forms and emails them
// through Google Workspace SMTP.
//
// Environment variables (Vercel → Project → Settings → Environment Variables):
//   SMTP_USER  Google Workspace mailbox that sends the email, e.g. info@hdangandcompany.com
//   SMTP_PASS  16-character Google App Password for that mailbox (never commit it)
//   FORM_TO    Where enquiries are delivered (defaults to info@hdangandcompany.com)
import nodemailer from 'nodemailer'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function field(body, name, max = 200) {
  const v = typeof body?.[name] === 'string' ? body[name].trim() : ''
  const clean = max > 300 ? v.replace(/\r/g, '') : v.replace(/[\r\n]+/g, ' ')
  return clean.slice(0, max)
}

function parseBody(req) {
  if (req.body && typeof req.body === 'object') return req.body
  if (typeof req.body === 'string') return Object.fromEntries(new URLSearchParams(req.body))
  return {}
}

export function buildMessage(body) {
  if (field(body, 'company-website')) return { spam: true }
  const form = field(body, 'form-name', 40)
  const email = field(body, 'email')
  if (!EMAIL_RE.test(email)) return { error: [422, 'Please enter a valid email address.'] }

  if (form === 'subscribe') {
    return {
      subject: 'New website subscriber',
      text: `A visitor subscribed to updates on hdangandcompany.com.\n\nEmail: ${email}\n`,
      replyTo: email,
    }
  }
  if (form === 'chat') {
    const name = field(body, 'name', 120)
    const message = field(body, 'message', 3000)
    if (!name || !message) return { error: [422, 'Please add your name and a message.'] }
    const page = field(body, 'page', 200) || '/'
    return {
      subject: `Website chat: ${name}`,
      text:
        `New chat message from hdangandcompany.com\n\n` +
        `Name: ${name}\nEmail: ${email}\nSent from page: ${page}\n\n` +
        `Message:\n${message}\n\n` +
        `Reply to this email to answer the visitor.\n`,
      replyTo: `${name} <${email}>`,
    }
  }
  if (form === 'enquiry') {
    const name = field(body, 'name', 120)
    const message = field(body, 'message', 5000)
    if (!name || !message) return { error: [422, 'Please add your name and a message.'] }
    const business = field(body, 'business', 160) || '-'
    const country = field(body, 'country', 80) || '-'
    const service = field(body, 'service', 120) || 'General'
    return {
      subject: `Website enquiry: ${service} – ${name}`,
      text:
        `New enquiry from hdangandcompany.com\n\n` +
        `Name: ${name}\nBusiness: ${business}\nEmail: ${email}\nCountry: ${country}\nService required: ${service}\n\n` +
        `Message:\n${message}\n`,
      replyTo: `${name} <${email}>`,
    }
  }
  return { error: [400, 'Unknown form.'] }
}

export default async function handler(req, res) {
  res.setHeader('Content-Type', 'application/json; charset=utf-8')
  if (req.method !== 'POST') {
    res.status(405).json({ ok: false, message: 'Use POST.' })
    return
  }
  const msg = buildMessage(parseBody(req))
  if (msg.spam) return res.status(200).json({ ok: true, message: 'Thank you.' })
  if (msg.error) return res.status(msg.error[0]).json({ ok: false, message: msg.error[1] })

  const user = process.env.SMTP_USER
  const pass = process.env.SMTP_PASS
  if (!user || !pass) {
    console.error('SMTP_USER or SMTP_PASS is not set')
    return res.status(500).json({ ok: false, message: 'Email is not configured yet.' })
  }

  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: { user, pass: pass.replace(/\s+/g, '') },
  })

  try {
    await transporter.sendMail({
      from: `"H Dang and Company Website" <${user}>`,
      to: process.env.FORM_TO || 'info@hdangandcompany.com',
      replyTo: msg.replyTo,
      subject: msg.subject,
      text: msg.text,
    })
    res.status(200).json({ ok: true, message: 'Thank you.' })
  } catch (err) {
    console.error('sendMail failed:', err?.code || '', err?.response || err?.message)
    res.status(502).json({ ok: false, message: 'The message could not be sent.' })
  }
}

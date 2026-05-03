import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { sendMessage } from '@/store/contact/contact-slice';
import {toast} from 'sonner';

export default function ContactForm({ onClose }) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const dispatch = useDispatch()

  function handleSubmit(e) {
    e.preventDefault()
    const formData = { name, email, message };
    dispatch(sendMessage(formData)).then((data) => {
        if (data?.payload?.success) {
            toast.success('Message sent successfully', {
                description: (
                    <div className="text-sm text-green-700">
                        We'll get back to you soon.
                    </div>
                ),
                action: {
                    label: 'Dismiss',
                    onClick: () => console.log('Dialog Closed...')
                },
                variant: ''
            })
              setSubmitted(true)
              setTimeout(() => {
                if (onClose) onClose()
              }, 900)
        } else {
            toast.error('Failed to send message', {
                description: (
                    <div className="text-sm text-red-700">
                        Please try again later.
                    </div>
                ),
                action: {
                    label: 'Dismiss',
                    onClick: () => console.log('Dialog Closed...')
                },
                variant: ''
            })
        }

    });

    // TODO: wire to API

  }

  return (
    <div>
      {!submitted ? (
        <form onSubmit={handleSubmit} className="space-y-4">
          <p className="text-sm">
            Send us a message and we'll respond within 1 business day. Include
            any booking reference if applicable.
          </p>
          <div>
            <label className="block text-sm font-medium">Name</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 w-full rounded border px-3 py-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Email</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              className="mt-1 w-full rounded border px-3 py-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Message</label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={6}
              className="mt-1 w-full rounded border px-3 py-2"
            />
          </div>
          <div className="flex gap-3">
            <button
              type="submit"
              className="px-4 py-2 bg-indigo-600 text-white rounded"
            >
              Send
            </button>
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border rounded"
            >
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <div className="py-8 text-center">
          <p className="text-lg font-semibold">
            Thanks — your message was sent.
          </p>
          <p className="text-sm text-slate-600">We'll get back to you soon.</p>
        </div>
      )}
    </div>
  )
}

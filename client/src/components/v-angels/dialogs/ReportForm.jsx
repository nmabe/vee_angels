import React, { useState } from 'react'

export default function ReportForm({ onClose }) {
  const [title, setTitle] = useState('')
  const [details, setDetails] = useState('')
  const [submitted, setSubmitted] = useState(false)

  function handleSubmit(e) {
    e.preventDefault()
    console.log('report submit', { title, details })
    // TODO: wire to API
    setSubmitted(true)
    setTimeout(() => {
      if (onClose) onClose()
    }, 900)
  }

  return (
    <div>
      {!submitted ? (
        <form onSubmit={handleSubmit} className="space-y-4">
          <p className="text-sm">
            Use this form to report safety or policy issues. Provide as much
            detail as possible and include relevant booking references.
          </p>
          <div>
            <label className="block text-sm font-medium">Issue Title</label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="mt-1 w-full rounded border px-3 py-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Details</label>
            <textarea
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              rows={8}
              className="mt-1 w-full rounded border px-3 py-2"
            />
          </div>
          <div className="flex gap-3">
            <button
              type="submit"
              className="px-4 py-2 bg-red-600 text-white rounded"
            >
              Report
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
            Thanks — your report was submitted.
          </p>
          <p className="text-sm text-slate-600">
            If the report requires immediate attention, we will follow up by
            email.
          </p>
        </div>
      )}
    </div>
  )
}

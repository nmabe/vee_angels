import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addReport } from '@/store/contact/contact-reports-slice'
import { toast } from 'sonner'
import { authCheck } from '@/store/auth-slice'
import { LoadingSkeleton } from '@/components/common/loading'

export default function ReportForm({ onClose }) {
  const [title, setTitle] = useState('')
  const [details, setDetails] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const dispatch = useDispatch();
  
  const { isAuthenticated, user, isLoading } = useSelector(
      (state) => state.auth
  )

  function handleSubmit(e) {
    e.preventDefault()
    if (!isAuthenticated) {
      toast.error('You must be logged in to submit a report', {
        description: (
          <div className="text-sm text-red-700">
            Please log in or create an account to submit your report.
          </div>
        ),
        action: {
          label: 'Dismiss',
          onClick: () => {}
        },
        variant: ''
      })
      return
    }
    if (!title || !details) {
      toast.error('Please fill in all fields', {
        description: (
          <div className="text-sm text-red-700">All fields are required.</div>
        ),
        action: {
          label: 'Dismiss',
          onClick: () => {}
        },
        variant: ''
      })
      return
    } else {
      // Replace 'targetId' with the correct user ID (e.g., targetUserId if reporting another user)
      // Example: const formData = { targetId: targetUserId, reporterId: user?._id, title, details }
      const formData = { targetId: user?.id, title, details }
      dispatch(addReport(formData)).then((data) => {
        if (data?.payload?.success) {
          toast.success('Report submitted successfully', {
            description: (
              <div className="text-sm text-green-700">
                We'll review your report and take appropriate action.
              </div>
            ),
            action: {
              label: 'Dismiss',
              onClick: () => {}
            },
            variant: ''
          })
          // TODO: wire to API
          setSubmitted(true)
          setTimeout(() => {
            if (onClose) onClose()
          }, 900)
        } else {
          toast.error('Failed to submit report', {
            description: (
              <div className="text-sm text-red-700">
                Please try again later.
              </div>
            ),
            action: {
              label: 'Dismiss',
              onClick: () => {}
            },
            variant: ''
          })
        }
      })
    }
  }


  if (process.env.NODE_ENV === 'development') {
    console.log('ReportForm rendered with user:', user, 'isAuthenticated:', isAuthenticated);
  }

  if (isLoading) {
    return <LoadingSkeleton />;
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
  );
}


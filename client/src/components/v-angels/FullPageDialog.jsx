import react from 'react'

export default function FullPageDialog({ isOpen, onClose, title, children }) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center">
      <div className="fixed inset-0 bg-black/50" onClick={onClose} />

      <div
        className="relative z-60 w-full h-full"
        aria-modal="true"
        role="dialog"
      >
        <div className="absolute top-[20vh] bottom-[20vh] left-[10vw] right-[10vw] bg-white dark:bg-slate-900 text-black dark:text-white rounded-lg shadow-lg flex flex-col overflow-hidden">
          <div className="flex items-center justify-between p-4 border-b border-slate-200 dark:border-slate-700">
            <h3 className="text-lg font-semibold">{title}</h3>
            <button
              onClick={onClose}
              aria-label="Close dialog"
              className="text-slate-600 hover:text-slate-800 dark:text-slate-300"
            >
              ✕
            </button>
          </div>

          <div className="p-6 overflow-auto">{children}</div>
        </div>
      </div>
    </div>
  )
}

import React from 'react'

export default function HelpContent() {
  return (
    <div className="prose max-w-none text-slate-800 dark:text-slate-100">
      <p className="text-lg font-medium mb-4">
        Welcome to Vee Angels Help. Below are quick answers to the most common
        questions — use the <strong>Contact</strong> dialog if you need personal
        assistance.
      </p>

      <h3 className='text-lg font-semibold text-slate-800 dark:text-slate-100'>How do I find and book an Angel?</h3>
      <p className='text-base mb-4'>
        Start on the Browse page to see available Angels. Click an Angel's
        profile to view details, availability, and reviews. To book, click the
        "Book" button on the profile and follow the checkout prompts.
      </p>

      <h3 className='text-lg font-semibold text-slate-800 dark:text-slate-100'>What payment methods do you accept?</h3>
      <p className='text-base mb-4'>
        We accept major credit and debit cards. All payments are processed
        securely; you will receive a receipt by email and in your account's
        booking history.
      </p>

      <h3 className='text-lg font-semibold text-slate-800 dark:text-slate-100'>Can I cancel or reschedule a booking?</h3>
      <p className='text-base mb-4'>
        Cancellation and rescheduling policies are shown on the booking
        confirmation. If you need help, contact the Angel through the booking
        page or use the <strong>Contact</strong> dialog and include your booking
        reference.
      </p>

      <h3 className='text-lg font-semibold text-slate-800 dark:text-slate-100'>How does safety work?</h3>
      <p className='text-base mb-4'>
        We verify Angels during onboarding and encourage families to read
        reviews and profile details. If you notice any suspicious behavior,
        report it immediately using the <strong>Report</strong> dialog.
      </p>

      <h3 className='text-lg font-semibold text-slate-800 dark:text-slate-100'>Still have questions?</h3>
      <p className='text-base mb-4'>
        Use the <strong>Contact</strong> dialog to send us a message — include
        your name, email, and a brief description so we can respond quickly.
      </p>
    </div>
  )
}

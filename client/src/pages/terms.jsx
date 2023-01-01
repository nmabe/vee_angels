import React, { useEffect } from 'react'
import Terms from '../components/v-angels/dialogs/Terms'

export default function TermsPage() {
  useEffect(() => {
    const prevTitle = document.title
    const prevMeta = document.querySelector('meta[name="description"]')
    const prevDesc = prevMeta ? prevMeta.getAttribute('content') : null

    let meta = prevMeta
    if (!meta) {
      meta = document.createElement('meta')
      meta.name = 'description'
      document.head.appendChild(meta)
    }
    meta.content =
      'Vee Angels Terms & Conditions — governing use of the platform, payments, and user responsibilities.'

    let link = document.querySelector('link[rel="canonical"]')
    const createdLink = !link
    if (!link) {
      link = document.createElement('link')
      link.rel = 'canonical'
      document.head.appendChild(link)
    }
    link.href = window.location.origin + '/terms'

    document.title = 'Terms & Conditions — Vee Angels'

    return () => {
      document.title = prevTitle
      if (prevDesc === null) meta.remove()
      else meta.content = prevDesc
      if (createdLink && link) link.remove()
    }
  }, [])
  return (
    <main className="min-h-screen py-16 bg-background">
      <div className="container mx-auto px-4 max-w-4xl">
        <Terms />
      </div>
    </main>
  )
}

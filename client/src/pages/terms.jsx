import React from 'react'
import Terms from '../components/v-angels/dialogs/Terms'
import { useHead } from '@unhead/react'

export default function TermsPage() {

  useHead({
        title: 'Vee Angels - Terms & Conditions',
        meta: [
          { name: 'description', content: 'Vee Angels Terms & Conditions — governing use of the platform, payments, and user responsibilities.' },
          { property: 'og:title', content: 'Vee Angels - Terms & Conditions' },
          { property: 'og:image', content: 'https://www.veeangels.co.za/images/og-image.png' },
          { property: 'og:type', content: 'website' },
        ],
        link: [
          { rel: 'canonical', href: 'https://www.veeangels.co.za/terms' }
        ],
        // Structured Data (JSON-LD) support without dangerouslySetInnerHTML
        script: [
          {
            type: 'application/ld+json',
            innerHTML: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebSite',
              name: 'Vee Angels',
              url: 'https://www.veeangels.co.za/terms',
            }),
          },
        ],
      });

  return (
    <main className="min-h-screen py-16 bg-background">
     
      <div className="container mx-auto px-4 max-w-4xl">
        <Terms />
      </div>
    </main>
  )
}

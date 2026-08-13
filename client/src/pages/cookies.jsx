import React from 'react'
import CookiePolicy from '../components/v-angels/dialogs/CookiePolicy'
import { useHead } from '@unhead/react'

export default function CookiesPage() {
  useHead({
        title: 'Vee Angels - Cookie Policy',
        meta: [
          { name: 'description', content: 'Vee Angels cookie policy: how we use cookies and how you can manage preferences.' },
          { property: 'og:title', content: 'Vee Angels - Cookie Policy' },
          { property: 'og:image', content: 'https://veeangels.co.za/images/og-image.png' },
          { property: 'og:type', content: 'website' },
        ],
        link: [
          { rel: 'canonical', href: 'https://veeangels.co.za/cookies' }
        ],
        // Structured Data (JSON-LD) support without dangerouslySetInnerHTML
        script: [
          {
            type: 'application/ld+json',
            innerHTML: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebSite',
              name: 'Vee Angels',
              url: 'https://veeangels.co.za/cookies',
            }),
          },
        ],
      });

  return (
    <main className="min-h-screen py-16 bg-background">
      <div className="container mx-auto px-4 max-w-4xl">
        <CookiePolicy />
      </div>
    </main>
  )
}

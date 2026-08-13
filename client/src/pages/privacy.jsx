import React from 'react'
import PrivacyPolicy from '../components/v-angels/dialogs/PrivacyPolicy'
import { useHead } from '@unhead/react'

export default function PrivacyPage() {

  useHead({
        title: 'Vee Angels - Privacy Policy',
        meta: [
          { name: 'description', content: 'Vee Angels privacy practices: what we collect, how we use data, and how you can control your information.' },
          { property: 'og:title', content: 'Vee Angels - Privacy Policy' },
          { property: 'og:image', content: 'https://veeangels.co.za/images/og-image.png' },
          { property: 'og:type', content: 'website' },
        ],
        link: [
          { rel: 'canonical', href: 'https://veeangels.co.za/privacy' }
        ],
        // Structured Data (JSON-LD) support without dangerouslySetInnerHTML
        script: [
          {
            type: 'application/ld+json',
            innerHTML: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebSite',
              name: 'Vee Angels',
              url: 'https://veeangels.co.za/privacy',
            }),
          },
        ],
      });

  return (
    <main className="min-h-screen py-16 bg-background">
      
      <div className="container mx-auto px-4 max-w-4xl">
        <PrivacyPolicy />
      </div>
    </main>
  )
}

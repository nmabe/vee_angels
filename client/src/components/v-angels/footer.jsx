import react, { useState } from 'react'
import { Link } from 'react-router-dom'
import FullPageDialog from './FullPageDialog'
import HelpContent from './dialogs/HelpContent'
import ContactForm from './dialogs/ContactForm'
import ReportForm from './dialogs/ReportForm'
import PrivacyPolicy from './dialogs/PrivacyPolicy'
import Terms from './dialogs/Terms'
import CookiePolicy from './dialogs/CookiePolicy'
import { motion } from 'framer-motion'
import { useSelector } from 'react-redux'

export default function AngelsFooter() {
  const { user, isAuthenticated } = useSelector((state) => state.auth)
  const [openDialog, setOpenDialog] = useState(null)

  const dialogMap = {
    help: { title: 'Help Center', content: <HelpContent /> },
    contact: {
      title: 'Contact Us',
      content: <ContactForm onClose={() => setOpenDialog(null)} />
    },
    report: {
      title: 'Report Issue',
      content: <ReportForm onClose={() => setOpenDialog(null)} />
    },
    privacy: { title: 'Privacy Policy', content: <PrivacyPolicy /> },
    terms: { title: 'Terms & Conditions', content: <Terms /> },
    cookies: { title: 'Cookie Policy', content: <CookiePolicy /> }
  }

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  }

  const fadeIn = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  }

  return (
    <footer className="bg-gradient-to-br from-[#892f82] to-[#6b1f5c] text-white py-16">
      <div className="container mx-auto px-4 md:px-6 max-w-7xl">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
        >
          {/* Brand */}
          <motion.div variants={fadeIn}>
            <h3 className="text-2xl font-black mb-4">Vee Angels</h3>
            <p className="text-white/80 leading-relaxed">
              Connecting caring professionals with families in need of trusted
              support.
            </p>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={fadeIn}>
            <h4 className="font-bold mb-4 text-lg">Quick Links</h4>
            <ul className="space-y-2">
              {[
                { label: 'Browse Angels', link: '/angels/angels' },
                { label: 'Become an Angel', link: '/angels/applications' },
                {
                  label: 'My Favorites',
                  link: `${user && isAuthenticated ? '/angels/faves' : '/auth/sign-in'}`
                }
              ].map((item, i) => (
                <li key={i}>
                  <Link
                    to={item.link}
                    className="text-white/80 hover:text-white transition"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Support */}
          <motion.div variants={fadeIn}>
            <h4 className="font-bold mb-4 text-lg">Support</h4>
            <ul className="space-y-2">
              {[
                { id: 'help', label: 'Help Center' },
                { id: 'contact', label: 'Contact Us' },
                { id: 'report', label: 'Report Issue' }
              ].map((item, i) => (
                <li key={i}>
                  <button
                    onClick={() => setOpenDialog(item.id)}
                    className="text-white/80 hover:text-white transition text-left"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Legal */}
          <motion.div variants={fadeIn}>
            <h4 className="font-bold mb-4 text-lg">Legal</h4>
            <ul className="space-y-2">
              {[
                { id: 'privacy', label: 'Privacy Policy' },
                { id: 'terms', label: 'Terms & Conditions' },
                { id: 'cookies', label: 'Cookie Policy' }
              ].map((item, i) => (
                <li key={i}>
                  <button
                    onClick={() => setOpenDialog(item.id)}
                    className="text-white/80 hover:text-white transition text-left"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>
        </motion.div>

        {/* Bottom Bar */}
        <motion.div
          variants={fadeIn}
          className="border-t border-white/20 pt-8 flex flex-col md:flex-row justify-between items-center text-center md:text-left text-white/80"
        >
          <p>&copy; 2025 Vee Angels. All rights reserved.</p>
          <div className="flex gap-6 mt-6 md:mt-0">
            <a href="#" className="hover:text-white transition">
              Twitter
            </a>
            <a href="#" className="hover:text-white transition">
              Facebook
            </a>
            <a href="#" className="hover:text-white transition">
              Instagram
            </a>
          </div>
        </motion.div>
        {/* Full page dialog renderer */}
        <FullPageDialog
          isOpen={!!openDialog}
          onClose={() => setOpenDialog(null)}
          title={openDialog ? dialogMap[openDialog]?.title : ''}
        >
          {openDialog ? dialogMap[openDialog]?.content : null}
        </FullPageDialog>
      </div>
    </footer>
  )
}

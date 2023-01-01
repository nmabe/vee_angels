import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { AlertCircle, Check, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useNavigate } from 'react-router-dom'

export default function AgeVerificationPage() {
  const [verified, setVerified] = useState(false)
  const [denied, setDenied] = useState(false)
  const [userConfirmed, setUserConfirmed] = useState(false)
  const navigate = useNavigate()

  const handleConfirmAge = () => {
    setUserConfirmed(true)
    localStorage.setItem('ageVerified', 'true')
    setTimeout(() => {
      navigate('/angels/home')
    }, 1000)
  }

  const handleDeny = () => {
    setDenied(true)
    setUserConfirmed(false)
    localStorage.removeItem('ageVerified')
  }

  const fadeIn = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  }

  const slideUp = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } }
  }

  const scaleIn = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.6, delay: 0.2 } }
  }

  return (
    <div className="min-h-screen w-full bg-white text-gray-900 flex items-center justify-center overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-br from-[#892f82]/20 to-transparent rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gradient-to-tl from-[#892f82]/15 to-transparent rounded-full blur-3xl animate-pulse delay-700" />
      </div>

      {/* Main Content */}
      <motion.div
        className="relative z-10 w-full max-w-2xl mx-auto px-4 md:px-6"
        initial="hidden"
        animate="visible"
        variants={fadeIn}
      >
        <div className="text-center">
          {/* Logo/Branding */}
          <motion.div variants={slideUp} className="mb-8 md:mb-12">
            <h1 className="text-5xl md:text-6xl font-black bg-gradient-to-r from-[#892f82] to-purple-600 bg-clip-text text-transparent mb-2">
              Vee Angels
            </h1>
            <p className="text-gray-500 text-lg">Experience the Extraordinary</p>
          </motion.div>

          {/* Success State */}
          {userConfirmed && (
            <motion.div
              variants={scaleIn}
              className="mb-8 p-6 bg-green-50 border border-green-200 rounded-lg flex flex-col items-center justify-center"
            >
              <Check className="w-12 h-12 text-green-600 mb-3" />
              <h3 className="text-xl font-semibold text-green-900">Age Verified!</h3>
              <p className="text-green-700 mt-2">Welcome to Vee Angels. Redirecting...</p>
            </motion.div>
          )}

          {/* Denied State */}
          {denied && (
            <motion.div
              variants={scaleIn}
              className="mb-8 p-6 bg-red-50 border border-red-200 rounded-lg flex flex-col items-center justify-center"
            >
              <X className="w-12 h-12 text-red-600 mb-3" />
              <h3 className="text-xl font-semibold text-red-900">Age Verification Required</h3>
              <p className="text-red-700 mt-2">You must be 18 years or older to access this site.</p>
            </motion.div>
          )}

          {/* Main Card */}
          {!userConfirmed && !denied && (
            <motion.div
              variants={slideUp}
              className="bg-white border border-gray-200 rounded-xl shadow-lg p-8 md:p-12 mb-8"
            >
              {/* Alert Box */}
              <div className="mb-8 p-4 bg-amber-50 border border-amber-200 rounded-lg flex items-start gap-4">
                <AlertCircle className="w-6 h-6 text-amber-600 flex-shrink-0 mt-0.5" />
                <div className="text-left">
                  <p className="font-semibold text-amber-900">Age Restricted Content</p>
                  <p className="text-amber-800 text-sm mt-1">
                    This website contains content intended for adults 18 years of age or older.
                  </p>
                </div>
              </div>

              {/* Main Content */}
              <div className="text-left space-y-6 mb-8">
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">
                    Welcome to Vee Angels
                  </h2>
                  <p className="text-gray-600 text-lg leading-relaxed">
                    To continue, you must confirm that you are at least 18 years old. By clicking "I Confirm," you certify that you are of legal age in your jurisdiction and agree to our terms of service.
                  </p>
                </div>

                {/* Requirements */}
                <div className="space-y-3">
                  <h3 className="font-semibold text-gray-900">By proceeding, you confirm:</h3>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-3 text-gray-700">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#892f82]" />
                      You are at least 18 years of age
                    </li>
                    <li className="flex items-center gap-3 text-gray-700">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#892f82]" />
                      You agree to our Terms of Service
                    </li>
                    <li className="flex items-center gap-3 text-gray-700">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#892f82]" />
                      You understand this site contains age-restricted content
                    </li>
                  </ul>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  onClick={handleConfirmAge}
                  className="flex-1 bg-gradient-to-r from-[#892f82] to-purple-600 hover:from-[#7a2670] hover:to-purple-700 text-white font-semibold py-6 text-lg rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  I Confirm, I'm 18+
                </Button>
                <Button
                  onClick={handleDeny}
                  variant="outline"
                  className="flex-1 border-2 border-gray-300 text-gray-900 hover:bg-gray-50 font-semibold py-6 text-lg rounded-lg transition-all duration-300"
                >
                  I'm Under 18
                </Button>
              </div>
            </motion.div>
          )}

          {/* Footer Text */}
          {!userConfirmed && (
            <motion.p variants={fadeIn} className="text-sm text-gray-500 mt-8">
              This verification is required by law. Your confirmation is recorded.
            </motion.p>
          )}
        </div>
      </motion.div>
    </div>
  )
}
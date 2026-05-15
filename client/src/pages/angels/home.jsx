import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { AngelCard } from '@/components/v-angels/angelCard'
import { fetchFilteredAngels } from '@/store/angels/angels-slice'
import { motion } from 'framer-motion'
import { Star, Heart, Shield, Users, Zap, ArrowRight } from 'lucide-react'

export default function AngelsHomePage() {
  const dispatch = useDispatch()
  const angelsList = useSelector(
    (state) => state.filteredAngel.angelsList.angels
  )
  const [sort, setSort] = useState(null)
  const [filter, setFilter] = useState({})
  const user = useSelector((state) => state.auth.user)

  useEffect(() => {
    dispatch(fetchFilteredAngels({ filter, sort }))
  }, [dispatch, filter, sort])

  const fadeIn = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  }

  const slideIn = {
    hidden: { opacity: 0, x: -30 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6 } }
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

  return (
    <div className="min-h-screen font-inter text-gray-900 bg-white">
      {/* Hero Section */}
      <motion.section
        className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 md:pt-0"
        initial="hidden"
        animate="visible"
        variants={fadeIn}
      >
        {/* Animated background elements */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-br from-[#892f82]/20 to-transparent rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gradient-to-tl from-[#892f82]/15 to-transparent rounded-full blur-3xl animate-pulse delay-700" />
        </div>

        <div className="relative z-10 container mx-auto px-4 md:px-6 max-w-7xl">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <motion.div variants={slideIn} className="text-center md:text-left">
              <motion.div
                variants={fadeIn}
                className="inline-block mb-4 md:mb-6"
              >
                <span className="bg-gradient-to-r from-[#892f82] to-purple-600 bg-clip-text text-transparent text-sm font-semibold">
                  ✨ Welcome to Vee Angels
                </span>
              </motion.div>

              <motion.h1
                variants={fadeIn}
                className="text-4xl md:text-6xl font-black mb-6 leading-tight text-gray-900"
              >
                Meet Your Perfect{' '}
                <span className="bg-gradient-to-r from-[#892f82] to-purple-600 bg-clip-text text-transparent">
                  Angel
                </span>
              </motion.h1>

              <motion.p
                variants={fadeIn}
                className="text-lg md:text-xl text-gray-600 mb-8 leading-relaxed"
              >
                Connect with trusted, caring professionals dedicated to
                providing exceptional service. Find the perfect angel for your
                needs today.
              </motion.p>

              <motion.div
                variants={fadeIn}
                className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start"
              >
                <Link
                  to="/angels/angels"
                  className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-[#892f82] to-purple-600 text-white py-4 px-8 rounded-full font-semibold hover:shadow-lg hover:-translate-y-1 transition transform group"
                >
                  Explore Angels
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition" />
                </Link>
                {!user && (
                  <Link
                    to="/angels/applications"
                    className="inline-flex items-center justify-center gap-2 bg-gray-100 text-[#892f82] py-4 px-8 rounded-full font-semibold hover:bg-gray-200 transition border-2 border-gray-200"
                  >
                    Become an Angel
                  </Link>
                )}
              </motion.div>

              {/* Stats */}
              <motion.div
                variants={staggerContainer}
                className="flex gap-8 mt-12 justify-center md:justify-start"
              >
                {[
                  { label: 'Active Angels', value: '500+' },
                  { label: 'Happy Users', value: '2k+' },
                  { label: 'Success Rate', value: '98%' }
                ].map((stat, i) => (
                  <motion.div
                    key={i}
                    variants={fadeIn}
                    className="text-center md:text-left"
                  >
                    <p className="text-2xl md:text-3xl font-bold text-[#892f82]">
                      {stat.value}
                    </p>
                    <p className="text-gray-600 text-sm">{stat.label}</p>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>

            {/* Right Side - Visual Element */}
            <motion.div
              variants={fadeIn}
              className="hidden md:flex items-center justify-center"
            >
              <div className="relative w-full aspect-square">
                {/* Decorative card */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#892f82]/10 to-purple-100 rounded-3xl transform rotate-6" />
                <div className="absolute inset-0 bg-gradient-to-tl from-purple-100 to-[#892f82]/5 rounded-3xl transform -rotate-3" />
                <div className="absolute inset-4 bg-white rounded-2xl shadow-2xl flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-24 h-24 bg-gradient-to-br from-[#892f82] to-purple-600 rounded-full mx-auto mb-6" />
                    <p className="text-gray-800 font-semibold mb-2">
                      Join Our Community
                    </p>
                    <p className="text-gray-600 text-sm">
                      Find trusted companions
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Featured Angels Section */}
      <motion.section
        className="py-20 md:py-32 px-4 md:px-6 bg-gradient-to-b from-white via-gray-50 to-white"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        variants={staggerContainer}
      >
        <div className="container mx-auto max-w-7xl">
          <motion.div variants={fadeIn} className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black mb-4 text-gray-900">
              Featured Angels
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Discover exceptional caregivers and professionals verified and
              trusted by our community
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6"
          >
            {angelsList?.length > 0 ? (
              [...angelsList]
                .sort(() => Math.random() - 0.5)
                .slice(0, 15)
                .map((angel, index) => (
                  <motion.div key={index} variants={fadeIn} className="group">
                    <div className="h-full hover:shadow-2xl transition duration-300 transform hover:-translate-y-2">
                      <AngelCard angel={angel} likes={[]} />
                    </div>
                  </motion.div>
                ))
            ) : (
              <motion.p
                variants={fadeIn}
                className="text-center text-gray-600 col-span-full py-12"
              >
                No Angels Found
              </motion.p>
            )}
          </motion.div>

          <motion.div variants={fadeIn} className="text-center mt-12">
            <Link
              to="/angels/angels"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-[#892f82] to-purple-600 text-white py-3 px-8 rounded-full font-semibold hover:shadow-lg transition"
            >
              View All Angels <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </motion.section>

      {/* Testimonials Section */}
      <motion.section
        className="py-20 md:py-32 px-4 md:px-6 bg-white"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        variants={staggerContainer}
      >
        <div className="container mx-auto max-w-7xl">
          <motion.div variants={fadeIn} className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black mb-4 text-gray-900">
              What People Are Saying
            </h2>
            <p className="text-lg text-gray-600">
              Real stories from real users who found their perfect angel
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10"
          >
            {[
              {
                quote:
                  'Vee Angels has been a game-changer for me. The angels are professional and reliable!',
                name: 'Thulani FKP',
                role: 'Verified Customer',
                rating: 5
              },
              {
                quote:
                  'I found the perfect angel for my needs. Highly recommend this platform!',
                name: 'Shadrack Shaddy',
                role: 'Verified Customer',
                rating: 5
              },
              {
                quote: 'The process was smooth and easy. I love my new angel!',
                name: 'Kabza',
                role: 'Verified Customer',
                rating: 5
              },
              {
                quote: 'Vee Angels has made my life so much easier. Thank you!',
                name: 'Nsizwa Sizwe',
                role: 'Verified Customer',
                rating: 5
              }
            ].map((t, i) => (
              <motion.div
                key={i}
                variants={fadeIn}
                className="bg-gradient-to-br from-white to-gray-50 border-2 border-gray-100 p-8 rounded-2xl hover:border-[#892f82] hover:shadow-xl transition duration-300"
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(t.rating)].map((_, j) => (
                    <Star
                      key={j}
                      className="w-5 h-5 fill-[#892f82] text-[#892f82]"
                    />
                  ))}
                </div>
                <p className="text-gray-700 text-lg leading-relaxed mb-6">
                  "{t.quote}"
                </p>
                <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                  <div>
                    <p className="font-bold text-gray-900">{t.name}</p>
                    <p className="text-sm text-gray-600">{t.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* How It Works Section */}
      <motion.section
        className="py-20 md:py-32 px-4 md:px-6 bg-gradient-to-b from-gray-50 to-white"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        variants={staggerContainer}
      >
        <div className="container mx-auto max-w-7xl">
          <motion.div variants={fadeIn} className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black mb-4 text-gray-900">
              How It Works
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              A simple, transparent process to find your perfect angel
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10"
          >
            {[
              {
                step: '01',
                title: 'Browse Angels',
                desc: 'Explore our verified profiles and find the perfect angel that matches your needs and preferences.',
                icon: Users
              },
              {
                step: '02',
                title: 'Connect',
                desc: 'Contact your chosen angel directly through our secure platform and discuss arrangements.',
                icon: Heart
              },
              {
                step: '03',
                title: 'Experience',
                desc: 'Enjoy reliable, caring service from our trusted angels with complete peace of mind.',
                icon: Shield
              }
            ].map((s, i) => {
              const IconComponent = s.icon
              return (
                <motion.div
                  key={i}
                  variants={fadeIn}
                  className="relative group"
                >
                  <div className="absolute -inset-1 bg-gradient-to-r from-[#892f82]/20 to-purple-600/20 rounded-2xl blur-xl group-hover:blur-2xl transition opacity-0 group-hover:opacity-100" />
                  <div className="relative bg-white border-2 border-gray-100 p-8 rounded-2xl hover:border-[#892f82] transition duration-300 h-full flex flex-col">
                    {/* Step Number and Icon */}
                    <div className="flex items-center justify-between mb-6">
                      <span className="text-4xl font-black bg-gradient-to-r from-[#892f82] to-purple-600 bg-clip-text text-transparent">
                        {s.step}
                      </span>
                      <div className="w-16 h-16 bg-gradient-to-br from-[#892f82] to-purple-600 rounded-2xl flex items-center justify-center">
                        <IconComponent className="w-8 h-8 text-white" />
                      </div>
                    </div>

                    <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3">
                      {s.title}
                    </h3>
                    <p className="text-gray-600 flex-grow leading-relaxed">
                      {s.desc}
                    </p>

                    {/* Connecting line for desktop */}
                    {i < 2 && (
                      <div className="hidden md:block absolute top-1/2 -right-5 w-10 h-1 bg-gradient-to-r from-[#892f82]/50 to-transparent" />
                    )}
                  </div>
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </motion.section>

      {/* Call to Action Section */}
      {!user && (
        <motion.section
          className="py-20 md:py-32 px-4 md:px-6 bg-gradient-to-br from-[#892f82] via-purple-600 to-[#6b1f5c] relative overflow-hidden"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={fadeIn}
        >
          {/* Animated background elements */}
          <div className="absolute inset-0 -z-10">
            <div className="absolute top-10 left-10 w-72 h-72 bg-white/10 rounded-full blur-3xl" />
            <div className="absolute bottom-10 right-10 w-72 h-72 bg-white/5 rounded-full blur-3xl" />
          </div>

          <div className="container mx-auto max-w-4xl text-center relative z-10">
            <motion.div variants={fadeIn} className="mb-6">
              <span className="inline-block bg-white/20 text-white px-4 py-2 rounded-full text-sm font-semibold mb-6">
                ⭐ Join 500+ Angels Making a Difference
              </span>
            </motion.div>

            <motion.h2
              variants={fadeIn}
              className="text-4xl md:text-5xl font-black text-white mb-6"
            >
              Become an Angel
            </motion.h2>

            <motion.p
              variants={fadeIn}
              className="text-lg md:text-xl text-white/90 mb-10 max-w-2xl mx-auto leading-relaxed"
            >
              Join our community of trusted professionals and make a meaningful
              impact. Connect with clients who need your care and support.
            </motion.p>

            <motion.div
              variants={fadeIn}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Link
                to="/angels/applications"
                className="inline-flex items-center justify-center gap-2 bg-white text-[#892f82] py-4 px-8 rounded-full font-bold hover:bg-gray-100 hover:shadow-2xl transition transform hover:-translate-y-1"
              >
                Get Started Now
                <Zap className="w-5 h-5" />
              </Link>
              <Link
                to="/angels/angels"
                className="inline-flex items-center justify-center gap-2 bg-white/20 text-white border-2 border-white py-4 px-8 rounded-full font-bold hover:bg-white/30 transition"
              >
                Learn More
              </Link>
            </motion.div>
          </div>
        </motion.section>
      )}

      {/* Our Mission Section */}
      <motion.section
        className="py-20 md:py-32 px-4 md:px-6 bg-white"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        variants={staggerContainer}
      >
        <div className="container mx-auto max-w-4xl">
          <motion.div
            variants={fadeIn}
            className="grid md:grid-cols-2 gap-12 items-center"
          >
            {/* Left Content */}
            <motion.div variants={slideIn}>
              <h2 className="text-4xl md:text-5xl font-black mb-6 text-gray-900">
                Our Mission
              </h2>
              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                At Vee Angels, our mission is to connect caring, trustworthy
                individuals with clients and people in need of support.
              </p>
              <p className="text-lg text-gray-700 mb-8 leading-relaxed">
                We believe everyone deserves a helping hand and a compassionate
                companion. Our platform is dedicated to making these connections
                easy, safe, and reliable for all.
              </p>

              <div className="space-y-4">
                {[
                  { icon: Shield, text: 'Safe & Secure Platform' },
                  { icon: Users, text: 'Verified Angels Only' },
                  { icon: Heart, text: 'Compassionate Support' }
                ].map((item, i) => {
                  const IconComponent = item.icon
                  return (
                    <motion.div
                      key={i}
                      variants={fadeIn}
                      className="flex items-center gap-3"
                    >
                      <div className="w-8 h-8 bg-gradient-to-br from-[#892f82] to-purple-600 rounded-lg flex items-center justify-center">
                        <IconComponent className="w-5 h-5 text-white" />
                      </div>
                      <span className="text-gray-700 font-semibold">
                        {item.text}
                      </span>
                    </motion.div>
                  )
                })}
              </div>
            </motion.div>

            {/* Right Visual */}
            <motion.div
              variants={fadeIn}
              className="hidden md:flex items-center justify-center"
            >
              <div className="relative w-full aspect-square">
                <div className="absolute inset-0 bg-gradient-to-br from-[#892f82]/10 to-purple-100 rounded-3xl transform rotate-3" />
                <div className="absolute inset-4 bg-gradient-to-tl from-purple-100 to-white rounded-2xl flex flex-col items-center justify-center p-8 shadow-xl">
                  <div className="text-5xl mb-4">🤝</div>
                  <p className="text-gray-900 font-bold text-center">
                    Building Trust Together
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* FAQ Section */}
      <motion.section
        className="py-20 md:py-32 px-4 md:px-6 bg-gradient-to-b from-gray-50 to-white"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        variants={staggerContainer}
      >
        <div className="container mx-auto max-w-4xl">
          <motion.div variants={fadeIn} className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black mb-4 text-gray-900">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-gray-600">
              Everything you need to know about Vee Angels
            </p>
          </motion.div>

          <motion.div variants={staggerContainer} className="space-y-4">
            {[
              {
                q: 'How do I become an angel?',
                a: "Simply click 'Become an Angel' and complete your profile. Our team will review your application and get in touch within 48 hours to verify your details."
              },
              {
                q: 'Is my information safe?',
                a: 'Yes, we take privacy and security seriously. All data is encrypted using industry-standard SSL technology and never shared without your explicit consent. We comply with all data protection regulations.'
              },
              {
                q: 'Can I contact angels before booking?',
                a: 'Absolutely! You can browse profiles and send messages to angels through our secure messaging system before making any commitments.'
              },
              {
                q: 'What are the payment options?',
                a: 'We support multiple payment methods including credit cards, debit cards, and mobile money transfers for your convenience.'
              },
              {
                q: 'How are angels verified?',
                a: 'All angels go through a thorough verification process including background checks and profile validation to ensure quality and safety.'
              }
            ].map((faq, i) => (
              <motion.div key={i} variants={fadeIn} className="group">
                <div className="bg-white border-2 border-gray-100 rounded-2xl p-6 hover:border-[#892f82] hover:shadow-lg transition duration-300">
                  <h4 className="text-lg font-bold text-gray-900 mb-3 flex items-start gap-3">
                    <span className="text-[#892f82] text-xl">→</span>
                    {faq.q}
                  </h4>
                  <motion.p
                    className="text-gray-700 leading-relaxed pl-8"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                  >
                    {faq.a}
                  </motion.p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

    </div>
  )
}

import CommonForm from '@/components/common/form'
import { signInFormControl } from '@/config'
import { toast } from 'sonner'
import { signInUser } from '@/store/auth-slice'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { useHead } from '@unhead/react'

const initialState = {
  email: '',
  password: ''
}
const AuthSignIn = () => {
  const [formData, setFormData] = useState(initialState)
  const dispatch = useDispatch()

  const onSubmit = (e) => {
    e.preventDefault()
    dispatch(signInUser(formData)).then((data) => {
      if (data?.payload?.user) {
        toast.success('Login success', {
          description: data.payload.message,
          action: {
            label: 'Dismiss',
            onClick: () => {}
          }
        })
        if (data.payload.user.role === 'admin') {
          window.location.href = '/admin/dashboard'
        } else {
          window.location.href = '/angels/faves'
        }
      } else {
        toast.warning('There was a problem with your request.', {
          description: data.payload?.message,
          action: {
            label: 'Dismiss',
            onClick: () => {}
          },
          variant: 'destructive'
        })
      }
    })
  }

  useHead({
        title: 'Sign In - Vee Angels',
        meta: [
          { name: 'description', content: 'Sign in to your Vee Angels account to access your personalized dashboard and manage your angel investments.' },
          { property: 'og:title', content: 'Sign In - Vee Angels' },
          { property: 'og:image', content: 'https://veeangels.co.za/images/og-image.png' },
          { property: 'og:type', content: 'website' },
        ],
        link: [
          { rel: 'canonical', href: 'https://veeangels.co.za/auth/signIn' }
        ],
        // Structured Data (JSON-LD) support without dangerouslySetInnerHTML
        script: [
          {
            type: 'application/ld+json',
            innerHTML: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebSite',
              name: 'Vee Angels',
              url: 'https://veeangels.co.za/auth/signIn',
            }),
          },
        ],
      });
  return (
    <>
      <div className=" font-inter text-gray-900 bg-white"></div>
      <div className="min-h-screen font-inter text-gray-900 bg-white">
        <div className="container mx-auto px-4 py-20 max-w-3xl">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-black mb-2 leading-tight">
              Sign in to your account
            </h1>
            <p className="text-base md:text-lg leading-normal text-gray-600">
              Welcome back — please sign in to continue
            </p>
            <div className="mt-6 flex justify-center">
              <Link
                to="/angels/angels"
                className="bg-gradient-to-r from-[#892f82] to-purple-600 text-white py-2.5 px-6 rounded-full font-semibold text-sm shadow-md hover:shadow-lg transition"
              >
                Explore Angels
              </Link>
            </div>
          </div>
          <div className="mx-auto w-full max-w-md space-y-6 bg-white rounded-2xl shadow-lg p-6">
            <CommonForm
              formControl={signInFormControl}
              formData={formData}
              setFormData={setFormData}
              onSubmit={onSubmit}
              buttonText="Sign In"
              buttonClassName="bg-gradient-to-r from-[#892f82] to-purple-600 text-white py-2.5 px-6 rounded-full font-semibold text-sm shadow-md"
              labelClassName="mb-1 text-gray-700"
            />
            <p className="text-center text-sm text-gray-600">
              Don&rsquo;t have an account?{' '}
              <Link
                to="/auth/signUp"
                className="font-medium text-[#892f82] ml-2 hover:underline"
              >
                Sign Up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  )
}

export default AuthSignIn

import CommonForm from '@/components/common/form'
import { signUpFormControl } from '@/config'
import { signUpUser } from '@/store/auth-slice'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'sonner'

const initialState = {
  username: '',
  email: '',
  password: ''
}
const AuthSignUp = () => {
  const [formData, setFormData] = useState(initialState)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const onSubmit = (e) => {
    e.preventDefault()
    dispatch(signUpUser(formData)).then((data) => {
      if (data?.payload?.success) {
        toast.success(data.payload.message, {
          variant: 'success',
          description: `welcome to vee's angels`,
          action: {
            label: 'Dismiss',
            onClick: () => {}
          }
        })
        navigate('/auth/signIn')
      } else {
        toast.warning('There was a problem with your request.', {
          description: data.payload.message,
          action: {
            label: 'Dismiss',
            onClick: () => {}
          },
          variant: 'destructive'
        })
      }
    })
  }

  return (
    <div className="min-h-screen font-inter text-gray-900 bg-white">
      <div className="container mx-auto px-4 py-20 max-w-3xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-black mb-2 leading-tight">
            Create an Account with{' '}
            <span className="bg-gradient-to-r from-[#892f82] to-purple-600 bg-clip-text text-transparent">
              Vee Angels
            </span>
          </h1>
          <p className="text-base md:text-lg leading-normal text-gray-600">
            Join the community of trusted angels — sign up to get started
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
            formControl={signUpFormControl}
            formData={formData}
            setFormData={setFormData}
            onSubmit={onSubmit}
            buttonText="Sign Up"
            buttonClassName="bg-gradient-to-r from-[#892f82] to-purple-600 text-white py-2.5 px-6 rounded-full font-semibold text-sm shadow-md"
            labelClassName="mb-1 text-gray-700"
          />
          <p className="text-center text-sm text-gray-600">
            Already have an account?{' '}
            <Link
              to="/auth/signIn"
              className="font-medium text-[#892f82] ml-2 hover:underline"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default AuthSignUp

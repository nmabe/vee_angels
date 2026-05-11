import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { addApplication } from '@/store/applications/applications-slice'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetClose,
  SheetFooter
} from '@/components/ui/sheet'
import CommonForm from '@/components/common/form'
import { addAngelFormControl } from '@/config'
import UploadImage from '@/components/admin/uploadImage'
import { calculateAge, initialFormData } from '../admin/vAngelsAdmin'
import { toast } from 'sonner'
import { Users, Heart, Shield } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'


export default function AngelApplications() {
  const dispatch = useDispatch()
  const [formData, setFormData] = useState(initialFormData)
  const [imageFiles, setImageFiles] = useState([])
  const [uploadedImage, setUploadedImage] = useState(null)
  const [imageLoadingState, setImageLoadingState] = useState(false)
  const [openSheet, setOpenSheet] = useState(false)
  const navigate = useNavigate()

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

  

  const onSubmit = (e) => {
    e.preventDefault()
    if (calculateAge(formData.dateOfBirth) < 18) {
      toast.warning('No young angels allowed.', {
        description: 'angel must be 18 years or older',
        action: {
          label: 'Dismiss',
          onClick: {}
        },
        variant: 'destructive'
      })
    } else {
      dispatch(addApplication(formData)).then((data) => {
        if (data?.payload?.success) {
          setUploadedImage(null)
          setImageFiles([])
          setFormData(initialFormData)
          toast.success(
            `Your account has been sent for review, be on the lookot for our email`,
            {
              description: (
                <h2>
                  {' '}
                  {data?.payload?.angel?.username}'s successfully created an
                  account{' '}
                </h2>
              ),
              action: {
                label: 'Proceed',
                onClick: () => {
                  navigate('/angels/home')
                }
              }
            }
          )
          setOpenSheet(false)
        } else {
          if (typeof data.payload.message === 'object') {
            Object.keys(data.payload.message).forEach(function (key, index) {
              toast.warning(
                String(`${key}`).charAt(0).toUpperCase() +
                  String(`${key}`).slice(1),
                {
                  description:
                    String(`${data.payload.message[key]}`)
                      .charAt(0)
                      .toUpperCase() +
                    String(`${data.payload.message[key]}`).slice(1),
                  action: {
                    label: 'Dismiss',
                    onClick: () => {
                      
                    }
                  }
                }
              )
            })
          } else {
            toast.error('There was a problem with your request.', {
              description: data.payload?.message || 'Something Went Wrong!!!',
              action: {
                label: 'Dismiss',
                onClick: () => {}
              },
              variant: 'destructive'
            })
          }
        }
      })
    }
  }

  useEffect(() => {
    if (uploadedImage) {
      setFormData({
        ...formData,
        profPicUrl: uploadedImage
      })
    }
    // eslint-disable-next-line
  }, [uploadedImage, dispatch])

  return (
    <div className="min-h-screen font-inter text-gray-900 bg-white">
      {/* Section 1 — Hero */}
      <section className="relative overflow-hidden py-40 bg-gradient-to-b from-white to-[#fdf6fb]">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <h1 className="text-4xl md:text-5xl font-black mb-4 leading-tight text-gray-900">
            Apply to be an Angel
          </h1>
          <p className="text-lg md:text-xl text-gray-600 mb-6">
            Join our trusted community of caregivers — grow professionally, earn
            competitively, and make a real difference in people's lives.
          </p>
          <div className="flex justify-center gap-4">
            <Button
              onClick={() => setOpenSheet(true)}
              className="bg-gradient-to-r from-[#892f82] to-purple-600 text-white py-3 px-8 rounded-full font-semibold text-sm shadow-md hover:shadow-lg"
            >
              Apply Now
            </Button>
            <button
              onClick={() =>
                document
                  .getElementById('app-features')
                  ?.scrollIntoView({ behavior: 'smooth' })
              }
              className="inline-flex items-center justify-center gap-2 border border-gray-200 text-[#892f82] py-3 px-6 rounded-full font-semibold text-sm"
            >
              Learn more
            </button>
          </div>
        </div>
      </section>

      {/* Section 2 — Features & CTA */}
      <section id="app-features" className="py-20">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
            <div className="bg-white p-4 rounded-2xl shadow-md">
              <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-r from-[#892f82] to-purple-600 text-white rounded-xl mx-auto mb-3">
                <Users className="w-5 h-5" />
              </div>
              <h3 className="font-bold">Trusted Community</h3>
              <p className="text-sm text-gray-600 mt-1">
                Vetted clients and support to help you thrive.
              </p>
            </div>

            <div className="bg-white p-4 rounded-2xl shadow-md">
              <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-r from-[#892f82] to-purple-600 text-white rounded-xl mx-auto mb-3">
                <Heart className="w-5 h-5" />
              </div>
              <h3 className="font-bold">Meaningful Work</h3>
              <p className="text-sm text-gray-600 mt-1">
                Connect with families who value compassion and reliability.
              </p>
            </div>

            <div className="bg-white p-4 rounded-2xl shadow-md">
              <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-r from-[#892f82] to-purple-600 text-white rounded-xl mx-auto mb-3">
                <Shield className="w-5 h-5" />
              </div>
              <h3 className="font-bold">Support & Safety</h3>
              <p className="text-sm text-gray-600 mt-1">
                Access resources, secure payments and responsive support.
              </p>
            </div>
          </div>

          <div className="flex justify-center gap-3">
            <Button
              onClick={() => setOpenSheet(true)}
              className="bg-gradient-to-r from-[#892f82] to-purple-600 text-white py-2.5 px-6 rounded-full font-semibold text-sm shadow-md hover:shadow-lg"
            >
              Apply Now
            </Button>
            <Link
              to="/angels/angels"
              className="inline-flex items-center justify-center gap-2 border border-gray-200 text-[#892f82] py-2.5 px-5 rounded-full font-semibold"
            >
              Explore Angels
            </Link>
          </div>
        </div>
      </section>
      <Sheet
        open={openSheet}
        onOpenChange={(open) => {
          setOpenSheet(open)
          if (!open) {
            setFormData(initialFormData)
            setImageFiles([])
            setUploadedImage(null)
            setImageLoadingState(false)
          }
        }}
      >
        <SheetContent className="overflow-auto w-[400px] sm:w-[540px] bg-white rounded-2xl border border-gray-100 shadow-lg">
          <SheetHeader className="mb-8">
            <SheetTitle className="p-4 font-extrabold text-xl border-b border-gray-100 text-gray-900">
              Apply to be an angel
            </SheetTitle>
          </SheetHeader>
          <UploadImage
            imageFiles={imageFiles}
            setImageFiles={setImageFiles}
            uploadedImage={uploadedImage}
            setUploadedImage={setUploadedImage}
            setImageLoadingState={setImageLoadingState}
            imageLoadingState={imageLoadingState}
          />
          <CommonForm
            formControl={addAngelFormControl}
            formData={formData}
            setFormData={setFormData}
            onSubmit={onSubmit}
            buttonText={`Apply ${formData.username || ''}`}
          />
          <SheetFooter>
            <SheetClose asChild>
              <Button
                className="bg-gradient-to-r from-[#9a2f8f] to-[#7a2be6] text-gray-800 py-2 px-4 rounded-md transition my-2 w-full hover:bg-[#7a2be6] hover:text-white"
                variant="outline"
              >
                Cancel
              </Button>
            </SheetClose>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  )
}

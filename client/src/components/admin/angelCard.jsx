import { Card, CardContent } from '../ui/card'
import { Button } from '../ui/Button'
import { User, Check, Heart, Pen } from 'lucide-react'
import { calculateAge } from '@/pages/admin/vAngelsAdmin'
import AngelModal from './angelModal'
import { useDispatch } from 'react-redux'
import { getAngels, removeAngel } from '@/store/admin/angel-slice'
import { toast } from 'sonner'
import { useEffect } from 'react'
import { Badge } from '../ui/badge'

export default function AngelCard({ angel }) {
  const {
    _id,
    username,
    firstname,
    gender,
    lastname,
    address,
    profPicUrl,
    rating,
    dateOfBirth
  } = angel
  const dispatch = useDispatch()
  const profPicUrl1 = [
    'https://www.lifestylesports.com/dw/image/v2/BCDN_PRD/on/demandware.static/-/Sites-LSS_eCommerce_Master/default/dw9b011cbc/images/21729001xlarge.jpg?sw=360',
    'https://www.lifestylesports.com/dw/image/v2/BCDN_PRD/on/demandware.static/-/Sites-LSS_eCommerce_Master/default/dwd67620ae/images/10004110xlarge.jpeg?sw=530',
    'https://www.lifestylesports.com/dw/image/v2/BCDN_PRD/on/demandware.static/-/Sites-LSS_eCommerce_Master/default/dw7d282450/images/12010320xlarge.jpg?sw=360',
    'https://www.lifestylesports.com/dw/image/v2/BCDN_PRD/on/demandware.static/-/Sites-LSS_eCommerce_Master/default/dw7d282450/images/12010320xlarge.jpg?sw=530',
    'https://www.lifestylesports.com/dw/image/v2/BCDN_PRD/on/demandware.static/-/Sites-LSS_eCommerce_Master/default/dwb1fbc281/images/10031322xlarge.jpg?sw=360',
    'https://www.lifestylesports.com/dw/image/v2/BCDN_PRD/on/demandware.static/-/Sites-LSS_eCommerce_Master/default/dwbebbbf51/images/10035101xlarge.jpg?sw=360'
  ]

  const deleteFromCloudinary = (profPicUrl) => {
    // Implement the function to delete the image from Cloudinary
  }

  const handleDelete = () => {
    dispatch(removeAngel({_id, profPicUrl})).then((data) => {
      if (data?.payload?.success) {
        dispatch(getAngels())
        toast.success(`An Angel was successfully added to the Vee Database`, {
          description: <h2>{`${angel?.username} Angel has been Deleted`}</h2>,
          action: {
            label: 'Dismiss',
            onClick: () => {
            }
          }
        })
      } else {
        toast.warning('There was a problem with your request.', {
          description: 'Something Went Wrong!!!',
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
    <div>
      <div className={`rounded-2xl shadow-lg overflow-hidden font-sans relative hover:scale-[1.02] transition-transform duration-300 angel-card-responsive w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl mx-auto ${(angel.status === 'Active') ? 'bg-white' : 'bg-red-900' }`}>
        {/* Image Container */}
        <img
          src={
            profPicUrl[0] ||
            profPicUrl1[Math.floor(Math.random() * profPicUrl1.length)]
          }
          alt={username || 'Angel Profile'}
          className="w-full h-48 sm:h-56 md:h-64 lg:h-72 object-fill"
        />

        {/* Content Overlay */}
        <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-end pointer-events-none z-100">
          <div className={`p-2 pb-6 pt-16 space-y-4 relative bg-gradient-to-t from-white/90 via-white/60 to-transparent pointer-events-auto` }>
            {/* Name and Verified Badge */}
            <div className="flex items-center mb-2">
              <h3 className="text-2xl font-semibold text-black mr-2">
                {username}
              </h3>
              <Check className="w-4 h-4 text-green-500" />
            </div>

            {/* Bio */}
            <p className="text-base text-gray-600 leading-relaxed mb-2">
              {address?.city}
            </p>

            {/* Stats and Button Row */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="text-center">
                  <div className="text-l font-semibold text-black">312</div>
                  <div className="text-xs text-gray-500">Likes</div>
                  <Heart className="w-3 h-3 text-gray-400 mx-auto mt-1" />
                </div>
                <div className="text-center">
                  <div className="text-l font-semibold text-black">48</div>
                  <div className="text-xs text-gray-500">Views</div>
                  <User className="w-3 h-3 text-gray-400 mx-auto mt-1" />
                </div>
              </div>
              <AngelModal
                angel={angel}
                className="bg-black text-white rounded-full px-1 py-2 text-sm font-medium hover:bg-gray-800 transition-colors w-1/2"
              >
                <Pen className="w-3 h-3 text-white mx-auto mt-1" />
              </AngelModal>
            </div>
          </div>
        </div>
      </div>
      <style jsx>{`
        .angel-card-responsive {
          width: 100%;
          max-width: 320px;
          min-width: 180px;
          height: 300px;
        }
        @media (max-width: 640px) {
          .angel-card-responsive {
            max-width: 95vw;
            min-width: 0;
            height: auto;
          }
          .angel-card-responsive img {
            height: 120px;
          }
        }
        @media (min-width: 641px) and (max-width: 1024px) {
          .angel-card-responsive {
            max-width: 90vw;
            height: 300px;
          }
          .angel-card-responsive img {
            height: 180px;
          }
        }
        @media (min-width: 1025px) {
          .angel-card-responsive {
            max-width: 320px;
            height: 300p;
          }
          .angel-card-responsive img {
            height: 220px;
          }
        }
      `}</style>
    </div>
  )
}

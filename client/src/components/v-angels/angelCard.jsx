import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardFooter } from '../ui/card'
import { Badge } from '../ui/badge'
import {
  Info,
  Heart,
  HeartOff,
  Caravan,
  CalendarArrowUp,
  CircleDollarSign,
  MapPinned,
  PhoneCall
} from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import {
  addComment,
  getComments,
  likeAngel,
  unlikeAngel,
  getLikes
} from '@/store/angels/angels-slice'
import { toast } from 'sonner'
import { Dialog, DialogTrigger } from '@/components/ui/dialog'
import ImageCarousel from './imageCarousel'
import AngelPopUpCard from './angelPopUpCard'
import { calculateAge } from '@/pages/admin/vAngelsAdmin'
import Socials from './socials';

export const AngelCard = ({ userId = 0, angel, likes }) => {
  const {
    _id,
    username,
    address,
    profPicUrl,
    travel,
    dateOfBirth,
    price,
    bio,
    phoneNumber
  } = angel
  const [liked, setLiked] = useState(false)
  const dispatch = useDispatch()

  const isLiked = () => {
    if (likes && likes.length > 0) {
      likes.map((like) => {
        if (like.angelId === _id && like.userId === userId) {
          setLiked(true)
        }
      })
    }
  }

  const handleLike = (e) => {
    if (!userId) {
      toast.info('Please login to like this angel', {
        description: (
          <div className="text-sm text-red-700">
            You need to be logged in to like an angel.
          </div>
        ),
        action: {
          label: 'Dismiss',
          onClick: () => {}
        },
        variant: ''
      })
      return
    }
    if (liked) {
      const result = likes.filter(
        (word) => word.angelId == _id && word.userId === userId
      )

      dispatch(unlikeAngel(angel._id)).then((data) => {
        if (data?.payload) {
          toast.info(`You don't like ${angel.username} anymore`, {
            variant: 'success',
            description: (
              <div className="text-sm text-blue-700">
                {data.payload.message}
              </div>
            ),
            action: {
              label: 'Dismiss',
              onClick: () => {}
            }
          })
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
    } else {
      dispatch(likeAngel({ userId, angelId: _id })).then((data) => {
        if (data?.payload) {
          toast.info(`You like ${angel.username}`, {
            variant: 'success',
            description: (
              <div className="text-smm text-green-700">
                {data.payload.message}
              </div>
            ),
            action: {
              label: 'Dismiss',
              onClick: () => {}
            }
          })
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
    setLiked(!liked)
  }

  useEffect(() => {
    isLiked()
    dispatch(getLikes(_id))
  }, [likes, dispatch, _id])

//  const randomNumber = Math.floor(Math.random() * profPicUrl.length)

  return (
    <div className="xs:h-[390px] max-w-sm h-[340px] bg-white relative my-auto overflow-hidden rounded-xl shadow-xl shadow-purple-300/10 hover:shadow-2xl hover:shadow-purple-400/40 transition-all duration-500 hover:-translate-y-2 scale-[0.98] hover:scale-[1.02]">
      <div className="w-[100%] h-[100%]">
        <Dialog className="">
          <DialogTrigger asChild>
            <div
              style={{ '--image-url': `url(${profPicUrl[0]})` }}
              className=" w-full h-[85%] rounded-[1px] bg-[image:var(--image-url)] bg-size-[100%] object-cover bg-no-repeat bg-cover bg-opacity-30"
            ></div>
          </DialogTrigger>
          <AngelPopUpCard
            angel={angel}
            isLiked={liked}
            handleLike={handleLike}
            likes={likes}
          />
        </Dialog>
        <div
          className={`w-[200%] h-[20%] ${liked ? 'translate-x-[-50%]' : ''}`}
        >
          <div className="h-full w-[50%] float-left bg-gradient-to-r from-purple-50 to-pink-50 border-r border-purple-200 relative shadow-lg shadow-purple-100">
            <div className="float-left w-[80%] p-2 ">
              <h1 className="p-0 m-0 font-bold text-gray-900">{username}</h1>
              <h4 className="p-0 m-0 text-xs text-gray-600">
                {address?.suburb}
              </h4>
            </div>
            <div
              className="float-right h-full w-[20%] bg-gradient-to-r from-purple-100 to-pink-100 border-l border-purple-200 hover:from-purple-200 hover:to-pink-200 flex justify-center items-center cursor-pointer transition-all duration-300 hover:shadow-lg hover:shadow-purple-300/50"
              onClick={() => handleLike()}
            >
              <Heart className="w-[23px] h-[23px] pb-1 hover:text-red-500 fill-red-400 text-red-400 transition-all drop-shadow-md" />
            </div>
          </div>
          <div className="float-right h-[200%] overflow-hidden bg-gradient-to-br from-[#892f82] to-[#c2185b] w-[50%] text-white shadow-lg shadow-purple-600/50">
            <div
              className="float-left w-[20%] border-l border-pink-300 bg-gradient-to-r from-purple-300 to-pink-200 h-[50%] transition-all duration-300 hover:from-purple-400 hover:to-pink-300 flex justify-center items-center cursor-pointer hover:shadow-lg hover:shadow-purple-300/60"
              onClick={() => handleLike()}
            >
              <HeartOff className="w-[30px] h-[20px] hover:text-purple-700 text-purple-700 fill-red-500 transition-all drop-shadow-md" />
            </div>
            <div className="p-2 w-[80%] float-right">
              <h1 className="p-0 m-0 font-bold text-white">{username}</h1>
              <h4 className="p-0 m-0 text-xs text-purple-100">
                {address?.suburb}
              </h4>
            </div>
          </div>
        </div>

        <div className="z-10 w-[140px] h-[140px] absolute top-[-80px] right-[-80px] bg-gradient-to-br from-[#892f82] to-[#c2185b] rounded-bl-[80px] overflow-hidden shadow-lg shadow-purple-900/70 transition-all delay-300 duration-500 ease-in-out transition-[top] transition-[border] hover:w-full hover:h-[85%] hover:rounded-none hover:top-0 hover:right-0 hover:shadow-2xl hover:shadow-purple-600/80 group">
          <Info className="absolute top-[85px] right-[85px] text-white opacity-100 group-hover:opacity-[0] transition-all delay-300 duration-500 ease-in-out transition-[opacity]" />
          <div className="w-full h-full p-4 opacity-[0] group-hover:opacity-100 text-white text-sm transition-all transition-[opacity] delay-500 duration-500 overflow-y-auto bg-gradient-to-br from-gray-900 to-gray-800">
            <ul className="list-none p-0 m-0 mb-2 space-y-4">
              <li className="mb-0 P-2 BG-[#f1f1f1] rounded-lg overflow-hidden">
                <span className="font-bold">
                  <Info className="inline w-[15px] h-[15px] mr-1" />
                  Bio:{' '}
                </span>
                {bio}
              </li>
              <li>
                <span className="font-bold">
                  <CalendarArrowUp className="inline w-[15px] h-[15px] mr-1" />
                  Age:{' '}
                </span>
                {calculateAge(dateOfBirth)}
              </li>
              <li>
                <span className="font-bold">
                  <CircleDollarSign className="inline w-[15px] h-[15px] mr-1" />
                  Price:{' '}
                </span>
                R{price}
              </li>
              <li>
                <span className="font-bold">
                  <MapPinned className="inline w-[15px] h-[15px] mr-1" />
                  Location:{' '}
                </span>
                {address?.suburb}
              </li>
              <li>
                <span className="font-bold">
                  <Caravan className="inline w-[15px] h-[15px] mr-1" />
                  Visit:{' '}
                </span>
                {travel}
              </li>
              <li>
                <span className="font-bold">
                  <PhoneCall className="inline w-[15px] h-[15px] mr-1" />
                  Contact:{' '}
                </span>
                0{phoneNumber}
              </li>

              <Socials angel={angel} />
              
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

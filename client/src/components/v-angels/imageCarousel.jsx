import React, { useEffect } from 'react'
import { useInView } from 'react-intersection-observer'
import useEmblaCarousel from 'embla-carousel-react'
import Fade from 'embla-carousel-fade'
import { NextButton, PrevButton, usePrevNextButtons } from '../ui/arrow'
import { DotButton, useDotButton } from '../ui/dots'
import { Eye, Heart } from 'lucide-react'
import {
  addComment,
  getComments,
  likeAngel,
  unlikeAngel,
  getAllLikes
} from '@/store/angels/angels-slice'
import { useDispatch, useSelector } from 'react-redux'
import { LoadingSkeleton } from '../common/loading'
import axios from 'axios'
import { calculateAge } from '@/pages/admin/vAngelsAdmin'

const getDeviceId = () => {
  let deviceId = localStorage.getItem('deviceId')
  if (!deviceId) {
    deviceId =
      crypto.randomUUID?.() ||
      `device-${Date.now()}-${Math.random().toString(36)}`
    localStorage.setItem('deviceId', deviceId)
  }
  return deviceId
}

export default function ImageCarousel({ angel, handleLike, isLiked }) {
  const options = React.useMemo(() => ({ loop: true, duration: 30 }), [])
  const [hideDetails, setHideDetails] = React.useState(false)
  const [controlButtons, setControlButtons] = React.useState('')
  const [likes, setLikes] = React.useState([])
  const { _id, username, address, profPicUrl } = angel
  const user = useSelector((state) => state.auth.user)
  const [controlsOpacityClass, setControlsOpacityClass] = React.useState('')

  const dispatch = useDispatch()
  //console.log('Is Liked: ', isLiked);
  const [emblaRef, emblaApi] = useEmblaCarousel(options, [Fade()])
  const { selectedIndex, scrollSnaps, onDotButtonClick } =
    useDotButton(emblaApi)
  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick
  } = usePrevNextButtons(emblaApi)

  const [viewRef, inView] = useInView({
    threshold: 0.4,
    triggerOnce: true
  })

  const toggleDetails = () => {
    setHideDetails(!hideDetails)
    console.log(hideDetails);
    setControlsOpacityClass('opacity-100')
    setTimeout(() => {
      setControlsOpacityClass('')
    }, 10000)
    // Match the duration of the CSS transition//
  }

  // Helper to update view count on the server
  const updateViewCount = async (angelId, deviceId) => {
    const formData = new FormData()
    formData.append('deviceId', deviceId)
    try {
      const res = await axios.post(
        `http://localhost:5000/api/angels/angels/setView/${angelId}/`,
        formData
      )
      // Optionally handle success, e.g., show a notification
      if (res.data?.success) {
        console.log('View count updated successfully for angel:', username);
        // View count updated successfully
      }
    } catch (error) {
      // Optionally handle error, e.g., show an error notification
    }
  }

  // Helper to handle localStorage and trigger view count update
  const handleAngelView = (angelId) => {
    const device_Id = getDeviceId()
    const viewedKey = `AngelViewed_${angelId}__${device_Id}`
    const angelsViewed = localStorage.getItem(viewedKey);
    console.log('Checking view for:', angelsViewed, 'Angel views:', viewedKey)
    if (!angelsViewed) {
      localStorage.setItem(viewedKey, 'true');
      updateViewCount(angelId, device_Id)
    }
  }
  
  useEffect(() => {
    if (inView && _id) {
      handleAngelView(_id)
    }
  }, [inView, _id])

  useEffect(() => {
    const fetchLikes = async () => {
      const result = await dispatch(getAllLikes())
      if (result && result.payload) {
        setLikes(result.payload.likes)
      }
    }
    fetchLikes()
  }, [dispatch])

  const angelLikes =
    likes && likes.length > 0
      ? likes.filter((like) => like.angelId === _id).length
      : 0

  return (
    <div className="embla w-full relative" ref={viewRef}>
      <div ref={emblaRef} className="embla__viewport h-full w-full">
        <div className="embla_container p-0 text-white h-full ">
          {(Array.isArray(profPicUrl) ? profPicUrl : []).map((pic, index) => (
            <div
              key={index}
              style={{ '--angelImage': `url(${pic})` }}
              className="embla_slide bg-[image:var(--angelImage)]  bg-no-repeat w-full h-full bg-cover object-cover"
              onDoubleClick={toggleDetails}
            ></div>
          ))}
        </div>
      </div>

      {!hideDetails ? (
        <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-end pointer-events-none z-100">
          <div
            className={`p-2 pb-6 pt-16 space-y-2 relative bg-gradient-to-t from-white/90 via-white/60 to-transparent pointer-events-auto`}
          >
            {/* Name and Verified Badge */}
            <div className="flex items-center mb-0">
              <h1 className="text-3xl/4 font-semibold text-black mr-2">
                {username}
              </h1>
              {/*     <Check className="w-4 h-4 text-green-500" />
               */}{' '}
            </div>

            {/* Bio */}
            <h2 className="text-2xl text-purple-900 font-semibold mb-0">
              {user?.role === 'admin'
                ? `${calculateAge(angel?.dateOfBirth)} years`
                : angel.address?.city}
            </h2>

            {/* Stats and Button Row */}
            <div className="flex items-center justify-between">
              {user?.role === 'admin' ? (
                <div className="p-2 bg-gray-200 rounded-lg text-sm text-gray-800">
                  <span className="font-bold">New Angel Profile: </span>
                  <span className="font-bold"> Address: </span>
                  <ul>
                    {Object.values(angel?.address).map((addr, index) => (
                      <li key={index}>{addr}</li>
                    ))}
                  </ul>
                  <span className="font-bold"> Bio: </span>

                  <p className="text-sm text-gray-600 mt-1">{angel?.bio}</p>
                  <span className="font-bold"> Price: </span>
                  <h4>R{angel?.price}</h4>
                  <span className="font-bold"> Phone Number: </span>
                  <h4>0{angel?.phoneNumber}</h4>
                </div>
              ) : (
                <div className="flex items-center gap-4">
                  <div className="text-center">
                    <div className="text-l leading-none font-semibold text-red-600">
                      {angelLikes}
                    </div>
                    <div className="text-sm leading-none font-semibold text-pink-700">
                      Like{angelLikes !== 1 ? 's' : ''}
                    </div>
                    {isLiked ? (
                      <Heart
                        className="w-5 h-5 text-red-400 mx-auto mt-1 cursor-pointer drop-shadow-lg animate-pulse"
                        onClick={(e) => {
                          e.preventDefault()
                          handleLike()
                        }}
                      />
                    ) : (
                      <Heart
                        className="w-5 h-5 text-pink-300 mx-auto mt-1 cursor-pointer transition-all hover:scale-125 hover:drop-shadow-lg"
                        onClick={(e) => {
                          e.preventDefault()
                          handleLike()
                        }}
                      />
                    )}
                  </div>
                  <div className="text-center">
                    <div className="text-l leading-none font-semibold text-red-600">
                      {angel?.views || 0}
                    </div>
                    <div className="text-sm leading-none font-semibold text-pink-700">
                      Views
                    </div>
                    <Eye className="w-5 h-5 text-[#892f82cc] mx-auto mt-1 transition-all drop-shadow-lg" />
                  </div>
                </div>
              )}

              <div className=" ">
                <div className="embla_controls ">
                  <div className="embla_buttons ">
                    <PrevButton
                      className="embla_button"
                      onClick={onPrevButtonClick}
                      disabled={prevBtnDisabled}
                    />
                    <NextButton
                      className="embla_button"
                      onClick={onNextButtonClick}
                      disabled={nextBtnDisabled}
                    />
                  </div>

                  <div className="embla_dots text-red">
                    {scrollSnaps.map((_, index) => (
                      <DotButton
                        key={index}
                        onClick={() => onDotButtonClick(index)}
                        className={'embla_dot '.concat(
                          index === selectedIndex ? ' embla_dot_selected' : ''
                        )}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div
          className={`${controlsOpacityClass} absolute top-[45%] border-blue-600 left-[1%] w-full h-[3rem] flex flex-col justify-end  space-y-2 z-100 hover:opacity-100 opacity-0 transition-opacity duration-300`}
        >
          <div className="embla_controlsa">
            <div className="embla_buttons2">
              <PrevButton
                className="embla_button w-[2.1rem] h-[2.1rem] text-white font-semibold"
                onClick={onPrevButtonClick}
                disabled={prevBtnDisabled}
              />
              <NextButton
                className="embla_button w-[2.1rem] h-[2.1rem] text-white font-semibold"
                onClick={onNextButtonClick}
                disabled={nextBtnDisabled}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

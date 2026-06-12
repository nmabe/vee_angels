import React, { useEffect } from 'react'
import { useInView } from 'react-intersection-observer'
import useEmblaCarousel from 'embla-carousel-react'
import Fade from 'embla-carousel-fade'
import { NextButton, PrevButton, usePrevNextButtons } from '../ui/arrow'
import { DotButton, useDotButton } from '../ui/dots'
import { Eye, Heart } from 'lucide-react'
import { getAllLikes } from '@/store/angels/angels-slice'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { calculateAge } from '@/pages/admin/vAngelsAdmin'
import { getAngels } from '@/store/admin/angel-slice'

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
  const [controlsOpacityClass, setControlsOpacityClass] = React.useState('')
  const [likes, setLikes] = React.useState([])
  const { _id, username, address, profPicUrl } = angel
  const user = useSelector((state) => state.auth.user)

  const dispatch = useDispatch()
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
    setControlsOpacityClass('opacity-100')
    setTimeout(() => {
      setControlsOpacityClass('')
    }, 10000)
  }

  const updateViewCount = async (angelId, deviceId) => {
    const formData = new FormData()
    formData.append('deviceId', deviceId)
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/angels/angels/setView/${angelId}/`,
        formData
      )
      if (res.data?.success) {
        getAngels()
      }
    } catch (error) {
      // Error handling
    }
  }

  const handleAngelView = (angelId) => {
    const device_Id = getDeviceId()
    const viewedKey = `AngelViewed_${angelId}__${device_Id}`
    const angelsViewed = localStorage.getItem(viewedKey)
    if (!angelsViewed) {
      localStorage.setItem(viewedKey, 'true')
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

  const images = Array.isArray(profPicUrl) ? profPicUrl : []

  return (
    <div className="embla w-full h-full relative flex flex-col" ref={viewRef}>
      {/* Image Carousel Container */}
      <div
        ref={emblaRef}
        className="embla__viewport flex-1 w-full overflow-hidden"
      >
        <div className="embla__container h-full w-full relative">
          {images.map((pic, index) => (
            <div
              key={index}
              className="embla__slide relative w-full h-full flex items-center justify-center bg-gray-800 flex-shrink-0"
              onDoubleClick={toggleDetails}
            >
              {/* Responsive Image Wrapper */}
              <div className="absolute inset-0 w-full h-full flex items-center justify-center bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900">
                <img
                  src={pic}
                  alt={`${username}-${index}`}
                  className="w-full h-full object-cover object-center"
                  loading="lazy"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Content Overlay */}
      {!hideDetails ? (
        <div className="absolute bottom-0 left-0 w-full flex flex-col justify-end pointer-events-none z-50">
          {/* Info Panel */}
          <div className="p-3 pb-6 pt-16 space-y-3 bg-gradient-to-t from-white/95 via-white/70 to-transparent pointer-events-auto">
            {/* Name Section */}
            <div className="flex items-center gap-2">
              <h1 className="text-2xl sm:text-3xl font-semibold text-black">
                {username}
              </h1>
            </div>

            {/* Location/Age Section */}
            <h2 className="text-xl sm:text-2xl text-purple-900 font-semibold">
              {user?.role === 'admin'
                ? `${calculateAge(angel?.dateOfBirth)} years`
                : angel.address?.city}
            </h2>

            {/* Stats and Controls Row */}
            <div className="flex items-center justify-between gap-3">
              {/* Stats Section */}
              {user?.role === 'admin' ? (
                <div className="p-2 bg-gray-200 rounded-lg text-xs sm:text-sm text-gray-800 flex-1 max-h-32 overflow-y-auto">
                  <span className="font-bold">New Angel Profile</span>
                  <div className="mt-1 space-y-1">
                    <div>
                      <span className="font-bold">Address: </span>
                      <div className="text-xs">
                        {Object.values(angel?.address || {}).map(
                          (addr, idx) => (
                            <div key={idx}>{addr}</div>
                          )
                        )}
                      </div>
                    </div>
                    <div>
                      <span className="font-bold">Bio: </span>
                      <p className="text-xs text-gray-600 line-clamp-2">
                        {angel?.bio}
                      </p>
                    </div>
                    <div>
                      <span className="font-bold">Price: </span>
                      <span className="text-xs">R{angel?.price}</span>
                    </div>
                    <div>
                      <span className="font-bold">Phone: </span>
                      <span className="text-xs">0{angel?.phoneNumber}</span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex items-center gap-3 sm:gap-4">
                  {/* Likes */}
                  <div className="text-center">
                    <div className="text-sm sm:text-base leading-none font-semibold text-red-600">
                      {angelLikes}
                    </div>
                    <div className="text-xs sm:text-sm leading-none font-semibold text-pink-700">
                      Like{angelLikes !== 1 ? 's' : ''}
                    </div>
                    {isLiked ? (
                      <Heart
                        className="w-4 h-4 sm:w-5 sm:h-5 text-red-400 mx-auto mt-1 cursor-pointer drop-shadow-lg animate-pulse"
                        onClick={(e) => {
                          e.preventDefault()
                          handleLike()
                        }}
                      />
                    ) : (
                      <Heart
                        className="w-4 h-4 sm:w-5 sm:h-5 text-pink-300 mx-auto mt-1 cursor-pointer transition-all hover:scale-125 hover:drop-shadow-lg"
                        onClick={(e) => {
                          e.preventDefault()
                          handleLike()
                        }}
                      />
                    )}
                  </div>

                  {/* Views */}
                  <div className="text-center">
                    <div className="text-sm sm:text-base leading-none font-semibold text-red-600">
                      {angel?.views || 0}
                    </div>
                    <div className="text-xs sm:text-sm leading-none font-semibold text-pink-700">
                      Views
                    </div>
                    <Eye className="w-4 h-4 sm:w-5 sm:h-5 text-[#892f82cc] mx-auto mt-1 transition-all drop-shadow-lg" />
                  </div>
                </div>
              )}

              {/* Controls */}
              <div className="embla__controls">
                <div className="embla__buttons flex gap-2">
                  <PrevButton
                    className="embla__button"
                    onClick={onPrevButtonClick}
                    disabled={prevBtnDisabled}
                  />
                  <NextButton
                    className="embla__button"
                    onClick={onNextButtonClick}
                    disabled={nextBtnDisabled}
                  />
                </div>

                <div className="embla__dots">
                  {scrollSnaps.map((_, index) => (
                    <DotButton
                      key={index}
                      onClick={() => onDotButtonClick(index)}
                      className={'embla__dot'.concat(
                        index === selectedIndex ? ' embla__dot--selected' : ''
                      )}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* Minimalist Controls When Details Hidden */
        <div
          className={`${controlsOpacityClass} absolute top-1/2 -translate-y-1/2 left-0 right-0 w-full h-12 flex items-center justify-between px-2 z-50 opacity-0 hover:opacity-100 transition-opacity duration-300`}
        >
          <div className="embla__controls--minimal my-2">
            <PrevButton
              className="embla__button--minimal"
              onClick={onPrevButtonClick}
              disabled={prevBtnDisabled}
            />
            <NextButton
              className="embla__button--minimal absolute right-2"
              onClick={onNextButtonClick}
              disabled={nextBtnDisabled}
            />
          </div>
        </div>
      )}
    </div>
  )
}

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
import axios from 'axios'; 


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
        formData,
      )
      // Optionally handle success, e.g., show a notification
      if (res.data?.success) {
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
    if (!localStorage.getItem(viewedKey)) {
      localStorage.setItem(viewedKey, '1')
      const current = Number(localStorage.getItem(`AngelViews_${angelId}`) || '0')
      localStorage.setItem(`AngelViews_${angelId}`, (current + 1).toString())
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
              onTouchStart={toggleDetails}
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
              {address?.city}
            </h2>

            {/* Stats and Button Row */}
            <div className="flex items-center justify-between">
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
          className={`${controlsOpacityClass} absolute top-0 left-[1%] w-full h-full flex flex-col justify-end  space-y-2 z-100 hover:opacity-100 opacity-0 transition-opacity duration-300`}
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

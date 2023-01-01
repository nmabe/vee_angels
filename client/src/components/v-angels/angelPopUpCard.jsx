import React from 'react'
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from '../ui/dialog'
import ImageCarousel from './imageCarousel'

export default function AngelPopUpCard({ angel, handleLike, isLiked }) {
  return (
    <div>
      <DialogContent className="bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 border-0 shadow-2xl shadow-purple-900/50 transition ease-in-out duration-1000 overflow-hidden h-[640px] p-0">
        <ImageCarousel
          angel={angel}
          handleLike={handleLike}
          isLiked={isLiked}
        />
      </DialogContent>
    </div>
  )
}

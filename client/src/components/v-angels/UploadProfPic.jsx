import { useEffect, useRef, useState } from 'react'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { FileImageIcon, UploadCloudIcon, XIcon } from 'lucide-react'
import { Button } from '../ui/button'
import axios from 'axios'
import { Skeleton } from '../ui/skeleton'
import { toast } from 'sonner'
import { set } from 'date-fns'
import { useDispatch } from 'react-redux'
import { authCheck } from '@/store/auth-slice'


export default function UploadProfPic({ user, loadingState, setLoadingState, uploadedImage, setUploadedImage }) {
  const inputRef = useRef(null);
  const [fileUrl, setFileUrl ] = useState('');
  const dispatch = useDispatch();
  const handleUploadImageChange = (e) => {
    e.preventDefault()
    const file = e.target?.files[0]
    if (file) {
      setUploadedImage(file)
      setFileUrl(URL.createObjectURL(file));
    }
  }

  const handleDragOver = (e) => {
    e.preventDefault()
  }

  const handleImageUpload = (e) => {
    e.preventDefault()
    if (!uploadedImage) {
      toast.info('Please select an image to upload.', {
        description:
          'You can drag and drop an image or select one from your device.',
        action: {
          label: 'Dismiss',
          onClick: () => console.log('Closed')
        },
        variant: 'destructive'
      })
      return
    }
    uploadToClodinary()
  }

  const handleDrop = (e) => {
    e.preventDefault()
    const droppedImage = e.dataTransfer?.files[0]
    if (droppedImage) setUploadedImage(droppedImage)
  }

  const uploadToClodinary = async () => {
    setLoadingState(true)
    const formData = new FormData()
    
    try {
      formData.append('user_avatar', uploadedImage); // Append files under 'images' key
      
      const res = await axios.post(
        `http://localhost:5000/api/user/uploadProfilePic/${user.id}/`,
        formData,
        {
          withCredentials: true,
          headers: { 'Content-Type': 'multipart/form-data' }
        }
      );
      // server may return res.data.user.profPic
      if (res.data?.success) {
      
        dispatch(authCheck());  
        console.log('New profile picture URL:', res.data); 
          toast.success('Profile picture updated successfully!', {
          description: 'Your new profile picture has been uploaded.',
          action: {
            label: 'OK',
            onClick: () => {
              console.log('Closed')
            }
          }
        });
      }
    } catch (error) {

      console.log(error, 'Upload failed')
      toast.error('Upload failed', {
        description: error.response?.data?.message || 'Something went wrong',
        action: {
          label: 'Dismiss',
          onClick: () => console.log('Closed')
        },
        variant: 'destructive'
      })
    } finally {
      setLoadingState(false)
    }
  }
  
  useEffect(() => {
    return () => {
      if (fileUrl) {
        URL.revokeObjectURL(fileUrl);
      }
    }
  }, [fileUrl])


  return (
    <div className="mb-8 flex flex-col items-center">
      <div className="relative w-36 h-36 rounded-full bg-gradient-to-br from-[#892f82]/20 to-[#f9f6fb] shadow-inner border-4 border-[#f9f6fb] overflow-hidden mb-3 flex items-center justify-center">
        {(user.profPic || uploadedImage) ? (
          <img
            src={uploadedImage ? fileUrl : user.profPic}
            alt="Profile"
            className="object-cover w-full h-full"
          />
        ) : (
          <span className="text-gray-400 text-4xl">👤</span>
        )}
        <label className="absolute bottom-2 right-2 bg-[#892f82] text-white rounded-full p-2 shadow cursor-pointer hover:bg-[#6d2568] transition">
          <Input
            ref={inputRef}
            type="file"
            accept="image/*"
            onChange={handleUploadImageChange}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            className="hidden"
          />
          < UploadCloudIcon />
        </label>
      </div>

      <button
        onClick={handleImageUpload}
        className="bg-[#892f82] text-white px-5 py-2 rounded-lg font-semibold hover:bg-[#6d2568] transition mt-2 shadow"
        disabled={loadingState}
      >
        {loadingState ? 'Uploading...' : 'Upload Image'}
      </button>
    </div>
  )
}

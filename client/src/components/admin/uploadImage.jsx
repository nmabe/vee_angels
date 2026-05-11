import { useEffect, useRef } from 'react';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { FileImageIcon, UploadCloudIcon, XIcon } from 'lucide-react';
import { Button } from '../ui/button';
import axios from 'axios';
import { Skeleton } from '../ui/skeleton';
import { toast } from 'sonner';

export default function UploadImage({imageFiles, setImageFiles, UploadedImage, setUploadedImage, setImageLoadingState, imageLoadingState, multiple = true}) {
    
    const inputRef = useRef(null);
    
    const isEmpty = (object) => { 
        for(var i in object) { 
            return false; 
        } return true; 
    }

    const handleUploadImageChange = (e) => {
        e.preventDefault();
        const files = Array.from(e.target?.files);
        if (files.length) setImageFiles(files);
    }

    const handleDragOver = (e) => {
        e.preventDefault();
    }

    const handleDrop = (e) => {
        e.preventDefault();
        const droppedImages = Array.from(e.dataTransfer?.files);
        if (droppedImages) setImageFiles(droppedImage);
    }

    const handleRemoveUpload = () => {
        setImageFile({});
        if (inputRef.current) inputRef.current.value = '';
    }

    const uploadToCloudinary = async () => {
        setImageLoadingState(true);
        const formData = new FormData();
        try {
            imageFiles.forEach((file) => {
              formData.append('avatars', file); // Append files under 'images' key
            });
            const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/admin/angels/uploadImage`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            if (response.data?.success){
                const urls = response.data.ret.map(obj => obj.url);
                
                setUploadedImage(urls);
                setImageLoadingState(false);
            }
        } catch (error) {
            toast.warning('Upload failed', {
                description: error.response?.data?.message,
                action: {
                    label: 'Dismiss',
                    onClick: () => {
                }}
            })
        }
    }

    useEffect(() => {
        if (!isEmpty(imageFiles)) uploadToCloudinary(imageFiles);
    }, [imageFiles])

    return (
    <div className="w-full max-w-md mx-auto mb-2">
        <Label className="text-sm text-white font-semibold block mb-2">Upload Image</Label>
        <div onDrop={handleDrop}  onDragOver={handleDragOver} className="border-2 border-gray-300 rounded-md border-dashed p-6 hover:bg-slate-100 cursor-pointer">
            <input id='upload-image' name='profPicUrl' type='file' multiple={multiple} className='hidden' ref={inputRef} onChange={handleUploadImageChange} />
            {
                isEmpty(imageFiles) ? (<Label htmlFor='upload-image' className="flex flex-col items-center ">
                <UploadCloudIcon className='w-10 h-10 text-muted-foreground mb-2 '  /> <span>Drag & drop or Click to upload an Image</span>
                </Label>) : (
                    imageLoadingState ? <Skeleton className='bg-gray-100 h-10'/> :
                    <div className="flex items-center justify-between">
                    <div className="flex items-center">
                        <FileImageIcon className='w-8 h-8 mr-2 text-primary'/>
                    </div>
                    <p className="text-sm font-medium mr-2">{(imageFiles ? imageFiles.length : '0')} image(s)</p>
                    <Button variant='ghost' size='icon' className="text-muted-foreground hover:text-foreground " onClick={handleRemoveUpload}>
                        <XIcon className='w-4 h-4' />
                        <span className="sr-only">Remove Image</span>
                    </Button>
                
                </div>)
            }
        </div>
    </div>
  )
}

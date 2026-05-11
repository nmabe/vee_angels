import React, { useState } from 'react';
import { UploadCloudIcon } from 'lucide-react';
import axios from 'axios';
import { toast } from 'sonner';


const AddImages = ({ angelId, onImagesAdded,multiple = true }) => {
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState('');
    const inputRef = React.useRef(null);

    const isEmpty = (object) => { 
        for(var i in object) { 
            return false; 
        } return true; 
    }

    const handleFileChange = (e) => {
        e.preventDefault();
        const files = e.target?.files;
        if (files)
            setSelectedFiles(Array.from(e.target.files));
        setError('');
    };

    const handleDragOver = (e) => {
        e.preventDefault();
    }

    const handleDrop = (e) => {
        e.preventDefault();
        const droppedFiles = Array.from(e.dataTransfer.files);
        setSelectedFiles(droppedFiles);
        setError('');
    }

    const cancelImage = () => {
        setSelectedFiles([]);
        if (inputRef.current) inputRef.current.value = '';
    }

    const handleUpload = async () => {
        setUploading(true);
        setError('');
        try {
            const formData = new FormData();
            for (const file of selectedFiles) {
                formData.append('avatars', file);
            }
            
            const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/admin/angels/uploadImage`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            
            if (res.data?.success) {
                const uploadedImages = res.data.ret.map(obj => obj.url);
                onImagesAdded(uploadedImages);
                
            }
            setSelectedFiles([]);
        } catch (err) {
            toast.error('Failed to upload images.', {
                description: err.message,
                action: {
                label: 'Dismiss',
                onClick: () => {
                }}
            })
            setError('Failed to upload images.');
        }
        setUploading(false);
    };

    return (
        <div
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            className="w-[120px] h-[180px] bg-white border-2 border-dashed border-gray-300 rounded-md flex flex-col items-center justify-center p-2 cursor-pointer hover:bg-slate-100 relative"
        >
            {!isEmpty(selectedFiles) && (
                <div
                    className="w-4 h-4 right-1 bg-red-400 rounded-[50px] text-xs font-extrabold text-white flex items-center justify-center hover:cursor-pointer hover:bg-black px-1 z-10 absolute top-1 right-1"
                    onClick={cancelImage}
                >
                    X
                </div>
            )}
            <input
                type="file"
                multiple={multiple}
                className="hidden"
                id="profPicUpload"
                onChange={handleFileChange}
                ref={inputRef}
            />
            {isEmpty(selectedFiles) ? (
                <label htmlFor="profPicUpload" className="flex flex-col items-center ">
                    <UploadCloudIcon className="w-16 h-16 text-muted-background text-gray-400 " />
                    <span className="text-xs text-gray-600 mt-1">Click or Drag & Drop</span>
                </label>
            ) : (
                <div className="text-center">
                    <p className="text-xs text-gray-700 mb-2">{selectedFiles.length} file(s) selected</p>
                    <button
                        onClick={handleUpload}
                        disabled={uploading}
                        className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 disabled:opacity-50"
                    >
                        {uploading ? 'Uploading...' : 'Upload'}
                    </button>
                </div>
            )}
            
        </div>
    );
};

export default AddImages;
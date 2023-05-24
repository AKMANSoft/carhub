import React from 'react'
import { useDropzone } from 'react-dropzone'

export default function ImageDragDropInput({
    className = "",
    onImagesChanged = (images) => { },
    withPreview = false
}) {
    const [images, setImages] = React.useState([]);
    const onDrop = React.useCallback(acceptedFiles => {
        console.log(acceptedFiles)
        setImages(acceptedFiles)
        onImagesChanged(acceptedFiles);
    }, [])
    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop: onDrop,
        accept: {
            'image/*': ['.jpeg', '.jpg', '.png']
        },
        multiple: true
    })
    return (
        <>
            <div {...getRootProps()} className={"w-full flex justify-center py-20 px-10 transition bg-white border-2 border-gray-300 border-dashed rounded-md appearance-none cursor-pointer hover:border-gray-400 outline-none " + className}>
                <input {...getInputProps()} accept='image/*' />
                {
                    isDragActive ?
                        <span>
                            Drop files
                        </span>
                        :
                        <span className="flex items-center space-x-2">
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-gray-600" fill="none" viewBox="0 0 24 24"
                                stroke="currentColor" strokeWidth="2">
                                <path strokeLinecap="round" strokeLinejoin="round"
                                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                            </svg>
                            <span className="font-medium text-gray-600">
                                Drop files to Attach, or
                                <span className="text-blue-600 underline ml-2">browse</span>
                            </span>
                        </span>
                }
            </div>
            {
                withPreview &&
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7 gap-5">
                    {
                        images.map((img) => (
                            <img src={window.URL.createObjectURL(img)} width={300} height={300} className="w-80 h-auto aspect-square object-cover object-center rounded overflow-hidden border-2 border-gray-100 transition-all hover:border-primary hover:scale-105" alt="" />
                        ))
                    }
                </div>
            }
        </>
    )
}
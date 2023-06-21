import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react'
import { useDropzone } from 'react-dropzone'
import { handleTranslation } from '../lib/i18n';

export default function ImageDragDropInput({
    className = "",
    images = [],
    onImagesChange = (images) => { },
    withPreview = false,
}) {
    const { trans } = handleTranslation()
    // const onDrop = React.useCallback(acceptedFiles => {
    //     onImagesChange([
    //         ...images,
    //         ...(acceptedFiles.map((img) => {
    //             return {
    //                 src: window.URL.createObjectURL(img),
    //                 blob: img,
    //                 id: (new Date().getTime() * Math.random())
    //             }
    //         }))
    //     ]);
    // }, [])
    const { getRootProps, getInputProps, isDragActive, acceptedFiles } = useDropzone({
        // onDrop: onDrop,
        accept: {
            'image/jpg': ['.jpeg'],
            'image/jpeg': ['.jpeg'],
            'image/png': ['.png'],
        },
        multiple: true
    })


    React.useEffect(() => {
        onImagesChange([
            ...images,
            ...(acceptedFiles.map((img) => {
                return {
                    src: window.URL.createObjectURL(img),
                    blob: img,
                    id: (new Date().getTime() * Math.random())
                }
            }))
        ]);
    }, [acceptedFiles])


    const removeImage = (id) => {
        onImagesChange(images.filter((img) => img.id !== id));
    }

    return (
        <>
            <div {...getRootProps()} className={"w-full flex justify-center py-20 px-10 transition bg-white border-2 border-gray-300 border-dashed rounded-md appearance-none cursor-pointer hover:border-gray-400 outline-none " + className}>
                <input {...getInputProps()} accept='image/png,image/jpg,image/jpeg' />
                {
                    isDragActive ?
                        <span>
                            {trans("drop_files")}
                        </span>
                        :
                        <span className="flex items-center space-x-2">
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-gray-600" fill="none" viewBox="0 0 24 24"
                                stroke="currentColor" strokeWidth="2">
                                <path strokeLinecap="round" strokeLinejoin="round"
                                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                            </svg>
                            <span className="font-medium text-gray-600">
                                {trans("drop_files_to_attach")}
                                <span className="text-blue-600 underline ml-2">{trans("browse")}</span>
                            </span>
                        </span>
                }
            </div>
            {
                withPreview &&
                <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7 gap-3 md:gap-5">
                    {
                        images.map((img) => (
                            <span key={img.id} className='relative group rounded overflow-hidden'>
                                <img src={img.src} width={300} height={300} className="w-80 h-auto aspect-square object-cover object-center rounded overflow-hidden border-2 border-gray-100 transition-all hover:border-primary hover:scale-105" alt="" />
                                <span className='scale-0 group-hover:scale-100 w-full h-full bg-gray-500/70 absolute top-0 left-0 z-[1] flex items-center justify-center'>
                                    <button type='button' onClick={() => removeImage(img.id)} className='cursor-pointer text-3xl text-white'>
                                        <FontAwesomeIcon icon={faXmark} />
                                    </button>
                                </span>
                            </span>
                        ))
                    }
                </div>

            }
        </>
    )
}
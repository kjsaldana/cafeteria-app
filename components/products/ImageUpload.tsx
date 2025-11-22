"use client"
import { CldUploadWidget } from "next-cloudinary"
import Image from "next/image"
import { useState } from "react"
import { TbPhotoPlus } from "react-icons/tb"

export default function ImageUpload() {
    const [imageUrl, setImageUrl] = useState('')
    return (
        <CldUploadWidget
            uploadPreset="ugt667zx"
            options={{ maxFiles: 1 }}
            onSuccess={(result, { widget }) => {
                if (result.event === "success") {
                    widget.close()
                    // @ts-ignore
                    setImageUrl(result.info.secure_url)
                }
            }}
        >
            {({ open }) => (
                <>
                    <div
                        className={`flex gap-3 items-center justify-center mt-10 relative cursor-pointer hover:opacity-80 transition p-2 border-2 border-slate-200 text-neutral-600 ${imageUrl && 'h-44 border-none hover:opacity-100'}`}
                        onClick={() => open()}
                    >
                        <div>
                            <TbPhotoPlus size={25} />
                        </div>
                        <p className="text-lg font-semibold" hidden={!!imageUrl}>Agregar imagen</p>
                        {imageUrl && (
                            <div className="absolute inset-0 w-full h-full">
                                <Image fill style={{ objectFit: 'contain' }} src={imageUrl} alt="Imagen subida" />
                            </div>
                        )}
                    </div>
                </>
            )}
        </CldUploadWidget>
    )
}

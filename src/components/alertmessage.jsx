import { faXmark } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useState } from "react"
import { cn } from "../lib/utils"


export default function AlertMessage({ visible = false, success = false, text = "", onDissmissAlert, className }) {
    return (
        visible &&
        <div className={cn(
            "mt-8 py-2 px-4 rounded",
            "flex items-center justify-between gap-5",
            success ? "bg-green-600" : "bg-red-600",
            className
        )}>
            <p className='text-red-200 text-sm font-normal text-start'>
                {text}
            </p>
            <button onClick={onDissmissAlert} type='button' className='text-white text-lg rounded-full px-3 aspect-square bg-transparent'>
                <FontAwesomeIcon icon={faXmark} />
            </button>
        </div>
    )
}
import { faXmark } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { cn } from "../lib/utils"
import { handleTranslation } from "../lib/i18n"


export default function AlertMessage({ visible = false, success = false, text = "", onDissmissAlert, className }) {
    const { trans } = handleTranslation()
    return (
        visible &&
        <div className={cn(
            "mt-8 py-2 px-4 rounded",
            "flex items-center justify-between gap-5",
            success ? "bg-green-600 text-white" : "bg-red-600 text-red-200",
            className
        )}>
            <p className='text-sm font-normal text-start'>
                {trans(text)}
            </p>
            <button onClick={onDissmissAlert} type='button' className='text-white text-lg rounded-full px-3 aspect-square bg-transparent'>
                <FontAwesomeIcon icon={faXmark} />
            </button>
        </div>
    )
}
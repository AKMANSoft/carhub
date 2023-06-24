import { cn } from "../../lib/utils"
import {
    Toast,
    ToastClose,
    ToastDescription,
    ToastProvider,
    ToastTitle,
    ToastViewport,
} from "./toast"
import { useToast } from "./use-toast"

export function Toaster() {
    const { toasts } = useToast()

    return (
        <ToastProvider>
            {toasts.map(function ({ id, title, description, action, variant, ...props }) {
                return (
                    <Toast key={id} className={cn(
                        "z-[30]",
                        variant === "destructive" ? "bg-red-500 text-white" : "bg-green-500 text-white"
                    )} {...props}>
                        <div className="grid gap-1">
                            {title && <ToastTitle className="text-xl">{title}</ToastTitle>}
                            {description && (
                                <ToastDescription className="text-base font-medium">{description}</ToastDescription>
                            )}
                        </div>
                        {action}
                        <ToastClose />
                    </Toast>
                )
            })}
            <ToastViewport />
        </ToastProvider>
    )
}
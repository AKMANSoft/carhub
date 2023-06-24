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
            {toasts.map(function ({ id, title, description, action, ...props }) {
                return (
                    <Toast key={id} className="z-[30] bg-gray-100" {...props}>
                        <div className="grid gap-1">
                            {title && <ToastTitle className="text-lg">{title}</ToastTitle>}
                            {description && (
                                <ToastDescription className="text-base">{description}</ToastDescription>
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
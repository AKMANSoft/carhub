import { cn } from "../lib/utils";


export default function LoaderEl({ className, containerClassName, dark = true }) {
    return (
        <div className={cn(
            "flex items-center justify-center w-full h-96",
            containerClassName
        )}>
            <div className={cn(
                "animate-spin inline-block w-20 h-20 border-[3px] !border-t-transparent text-yellow-1000 rounded-full",
                dark ? "border-gray-800" : "border-white",
                className
            )} role="status" aria-label="loading">
                <span className="sr-only">Loading...</span>
            </div>
        </div>
    );
}
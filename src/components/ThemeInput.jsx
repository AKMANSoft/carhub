



export default function ThemeInput(props) {
    return (
        <input type={props.type}
            className={"rounded-full bg-transparent border text-white placeholder:text-gray-300 border-white/50 w-full py-4 px-5 outline-none focus:border-white transition-all " + props.className}
            placeholder={props.placeholder}
            required={props.required}
            disabled={props.disabled}
            readOnly={props.readOnly} />
    )
}

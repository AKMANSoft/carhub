



export default function ThemeTextArea(props) {
    return (
        <textarea
            className={"rounded-[40px] bg-transparent border text-white placeholder:text-gray-300 border-white/50 w-full py-4 px-5 outline-none focus:border-white transition-all " + props.className}
            placeholder={props.placeholder}
            required={props.required}
            disabled={props.disabled}
            rows={props.rows}
            cols={props.cols}
            value={props.value}
            onChange={(e) => props.onChange(e.target.value)}
            readOnly={props.readOnly}></textarea>
    )
}

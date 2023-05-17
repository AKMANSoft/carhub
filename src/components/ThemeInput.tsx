
import { InputHTMLAttributes } from 'react'

type Props = InputHTMLAttributes<HTMLInputElement> & {}


export default function ThemeInput(props: Props) {
    return (
        <input type={props.type}
            className={"rounded-full bg-transparent border border-white/50 w-full py-4 px-5 outline-none focus:border-white transition-all " + props.className}
            placeholder={props.placeholder}
            required={props.required}
            disabled={props.disabled}
            readOnly={props.readOnly} />
    )
}

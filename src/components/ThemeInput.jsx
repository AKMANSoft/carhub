import { countriesList } from '../data/countryCodes';



export default function ThemeInput({
    required, disabled, readOnly, type, placeholder,
    value, onChange, className,
}) {

    return (
        <input type={type}
            className={"rounded-full bg-transparent backdrop-blur border text-white placeholder:text-gray-300 border-white/50 w-full py-4 px-5 outline-none focus:border-white transition-all " + className}
            placeholder={placeholder}
            required={required}
            disabled={disabled}
            readOnly={readOnly}
            value={value}
            onChange={(e) => onChange(e.target.value)} />
    )
}


export function CountryCodeDropdown({ className, value, onChange }) {

    const cValue = countriesList.filter((cntry) => cntry.dial_code === value)

    return (
        <select name="country_code" value={value} onChange={(e) => onChange(e.target.value)} className={"rounded-full max-w-[130px] backdrop-blur appearance-none bg-transparent border text-white border-white/50 w-full py-4 px-5 outline-none focus:border-white transition-all " + className}>
            {
                countriesList.map((opt) => (

                    <option value={opt.dial_code} className='text-black checked:bg-primary checked:text-white'>{`${opt.code} (${opt.dial_code})`}</option>
                ))
            }
        </select>
    )
}

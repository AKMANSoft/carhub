import { useMemo } from 'react'
import countryList from 'react-select-country-list'; import { countriesList } from '../data/countryCodes';
'react-select-country-list'



export default function ThemeInput({
    required, disabled, readOnly, type, placeholder,
    value, onChange, className,
}) {

    return (
        <input type={type}
            className={"rounded-full bg-transparent border text-white placeholder:text-gray-300 border-white/50 w-full py-4 px-5 outline-none focus:border-white transition-all " + className}
            placeholder={placeholder}
            required={required}
            disabled={disabled}
            readOnly={readOnly}
            value={value}
            onChange={(e) => onChange(e.target.value)} />
    )
}


export function CountryCodeDropdown({ className }) {
    const options = useMemo(() => countryList().getData(), []);
    return (
        <select name="" id="" className={"rounded-full max-w-[130px] appearance-none bg-transparent border text-white border-white/50 w-full py-4 px-5 outline-none focus:border-white transition-all " + className}>
            {
                countriesList.map((opt) => (

                    <option value={opt.code} className='text-black checked:bg-primary checked:text-white'>{`${opt.code} (${opt.dial_code})`}</option>
                ))
            }
        </select>
    )
}

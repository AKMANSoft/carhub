import React, { useEffect, useRef, useState } from 'react';
import { countriesList } from '../data/countryCodes';





const ThemeInput = React.forwardRef(({
    required, disabled, readOnly, type, placeholder,
    value, onChange, className
}, ref) => (
    <input type={type}
        ref={ref}
        className={"rounded-full bg-transparent backdrop-blur border text-white placeholder:text-gray-300 border-white/50 w-full py-4 px-5 outline-none focus:border-white transition-all " + className}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
        readOnly={readOnly}
        value={value}
        onChange={(e) => onChange(e.target.value)} />
))

export default ThemeInput





export const AddressInputTypes = {
    DEFAULT: 'default',
    CITY: 'locality',
}


export function AddressInput({
    addressType = AddressInputTypes.DEFAULT,
    value, onChange, className, placeholder
}) {
    const autoCompleteRef = useRef();
    const inputRef = useRef();
    // const [text, setText] = useState(value);
    const options = {
        // componentRestrictions: { country: "ng" },
        fields: ["address_components", "geometry", "name"],
        types: addressType === AddressInputTypes.DEFAULT ? [] : [addressType]
        // types: ["establishment"]
    };
    useEffect(() => {
        autoCompleteRef.current = new window.google.maps.places.Autocomplete(
            inputRef.current,
            options
        );
        autoCompleteRef.current.addListener("place_changed", async function () {
            const place = await autoCompleteRef.current?.getPlace();

            let cityName = '';
            let stateName = '';
            for (let component of place.address_components) {
                if (cityName === '' && component.types.includes('locality')) {
                    cityName = component.long_name;
                }
                if (component.types.includes('administrative_area_level_1')) {
                    stateName = component.long_name;
                }
            }

            onChange({
                city: cityName,
                state: stateName,
                latitude: place.geometry.location.lat(),
                longitude: place.geometry.location.lng()
            })
        });
    }, []);
    return (
        <ThemeInput
            ref={inputRef} type="text"
            className={className}
            placeholder={placeholder}
            value={null}
            onChange={null} />
    );
}


export function CountryCodeDropdown({ className, value, onChange }) {

    const cValues = countriesList.filter((cntry) => cntry.dial_code === value);
    if (cValues.length <= 0) {
        onChange(countriesList[0].dial_code)
    }

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

import { useEffect, useState } from "react";



export default function useCurrentLocation() {
    const [location, setLocation] = useState(null);
    const geocoder = new google.maps.Geocoder();


    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                const latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
                geocoder.geocode({ 'location': latLng }, (results, status) => {
                    if (status === google.maps.GeocoderStatus.OK) {
                        if (results.length > 0) {
                            const addressComponents = results[0].address_components;
                            let city, country;
                            for (let component of addressComponents) {
                                if (component.types.includes('locality')) {
                                    city = component.long_name;
                                }
                                if (component.types.includes('country')) {
                                    country = component.long_name;
                                }
                            }
                            setLocation({
                                city: city,
                                country: country
                            })
                        }
                    }
                });
            })
        }
    });

    return location;
}

export function useLocationByLatLng(latitude, longitude) {
    const [location, setLocation] = useState(null);
    const geocoder = new google.maps.Geocoder();


    useEffect(() => {
        const latLng = new google.maps.LatLng(latitude, longitude);
        geocoder.geocode({ 'location': latLng }, (results, status) => {
            if (status === google.maps.GeocoderStatus.OK) {
                if (results.length > 0) {
                    const addressComponents = results[0].address_components;
                    let city, country;
                    for (let component of addressComponents) {
                        if (component.types.includes('locality')) {
                            city = component.long_name;
                        }
                        if (component.types.includes('country')) {
                            country = component.long_name;
                        }
                    }
                    setLocation({
                        city: city,
                        country: country
                    })
                }
            }
        });

    }, [latitude, longitude]);

    return location;
}
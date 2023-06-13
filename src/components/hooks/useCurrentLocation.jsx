import { useEffect, useState } from "react";



export default function useCurrentLocation() {
    const [location, setLocation] = useState(null);
    const geocoder = new google.maps.Geocoder();


    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                console.log(position);
                const latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
                geocoder.geocode({ 'location': latLng }, (results, status) => {
                    console.log(results);
                    if (status === google.maps.GeocoderStatus.OK) {
                        if (results.length > 0) {
                            const result = results[0];
                            const addressComponents = result.address_components;
                            let city, country, stateName;
                            for (let component of addressComponents) {
                                if (component.types.includes('locality')) {
                                    city = component.long_name;
                                }
                                if (component.types.includes('country')) {
                                    country = component.long_name;
                                }
                                if (component.types.includes('administrative_area_level_1')) {
                                    stateName = component.long_name;
                                }
                            }
                            setLocation({
                                city: city,
                                country: country,
                                address: result.formatted_address,
                                state: stateName
                            })
                        }
                    }
                });
            })
        }
    }, []);

    return location;
}


export function getCurrentLatLng(callback) {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
            callback({
                lat: position.coords.latitude,
                lng: position.coords.longitude
            })
        })
    }
}


export function getLocationByLatLng(latitude, longitude, callback) {
    const geocoder = new google.maps.Geocoder();
    const latLng = new google.maps.LatLng(latitude, longitude);
    geocoder.geocode({ 'location': latLng }, (results, status) => {
        if (status === google.maps.GeocoderStatus.OK) {
            if (results.length > 0) {
                const addressComponents = results[0].address_components;
                let city, country, stateName;
                for (let component of addressComponents) {
                    if (component.types.includes('locality')) {
                        city = component.long_name;
                    }
                    if (component.types.includes('country')) {
                        country = component.long_name;
                    }
                    if (component.types.includes('administrative_area_level_1')) {
                        stateName = component.long_name;
                    }
                }
                callback({
                    city: city,
                    country: country,
                    state: stateName,
                    latitude: latitude,
                    longitude: longitude
                })
            }
        }
    });
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
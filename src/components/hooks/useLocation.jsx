import { useContext } from 'react';
import { LocationContext } from '../../App';




export default function useUserLocation() {
    const { location, setLocation } = useContext(LocationContext);
    return { location, setLocation };
}



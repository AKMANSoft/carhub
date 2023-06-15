import { useContext } from 'react';
import { LocationContext } from '../../App';




export default function useFilterLocation() {
    const { location, setLocation, filterDistance, setFilterDistance } = useContext(LocationContext);
    return {
        ...location,
        setLocation,
        filterDistance,
        setFilterDistance
    };
}



import { useContext } from 'react';
import { AuthUserContext } from '../../App';




export default function useAuthUser() {
    const authUser = useContext(AuthUserContext);
    return authUser;
}



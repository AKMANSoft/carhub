import AddEditCarComponent from "../components/AddEditCarComponent";
import useAuthUser from "../components/hooks/useAuthUser";




export default function PostCarPage() {
    const authUser = useAuthUser();
    return (
        <AddEditCarComponent editMode={false} authUser={authUser} />
    )
}

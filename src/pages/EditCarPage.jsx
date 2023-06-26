import { Navigate, useNavigate, useParams } from "react-router-dom";
import AddEditCarComponent from "../components/AddEditCarComponent";
import useCarDetails from "../components/hooks/carDetailsFetcher";
import useAuthUser from "../components/hooks/useAuthUser";
import React from 'react';
import LoaderEl from "../components/loader";
import doUpdateCar from "../api/update-car";
import { useToast } from "../components/shadcn/use-toast";
import axios from "axios";
import { apiConfig } from "../config/api";
import { handleTranslation } from "../lib/i18n";




export default function EditCarPage() {
    const { trans } = handleTranslation();
    const navigate = useNavigate();
    const authUser = useAuthUser();
    const { carId } = useParams();
    const [carDetails, setCarDetails] = React.useState(null);
    const [isLoading, setIsLoading] = React.useState(false);
    const [processing, setProcessing] = React.useState(false);
    const { toast } = useToast();


    const fetchCarDetails = async () => {
        setIsLoading(true);
        try {
            const response = await axios.post(
                apiConfig.basePath + apiConfig.endpoints.getCarDetails,
                {
                    car_id: carId
                },
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        "Authorization": "Bearer " + authUser.accessToken,
                    }
                }
            )
            if (response.data.success) {
                setCarDetails(response.data.data);
            }
        } catch (error) {
            setCarDetails(null)
        }
        setIsLoading(false);
    }

    React.useEffect(() => {
        fetchCarDetails()
    }, [])


    const updateCarDetails = async (details) => {
        setProcessing(true);
        const response = await doUpdateCar(details, carDetails.id, authUser.accessToken);
        let toastMessage = ""
        let success = false;
        if (response !== null) {
            toastMessage = response.success ? "Car updated successfully. Refresh page to see changes." : response.message
            success = response.success;
        } else {
            toastMessage = trans("got_some_error");
            success = false;
        }
        toast({
            description: toastMessage,
            ...(!success && { variant: "destructive" })
        })
        // await fetchCarDetails()
        setProcessing(false);
    }



    return (
        isLoading ?
            <div className="w-full h-screen flex items-center justify-center">
                <LoaderEl />
            </div>
            :
            carDetails &&
                carDetails.user_id !== authUser.userProfile?.id ?
                <Navigate to={"/"} />
                :
                < AddEditCarComponent
                    editMode={true}
                    authUser={authUser}
                    editCarDetails={carDetails}
                    updateCarDetails={updateCarDetails}
                    showLoadingBtn={processing} />

    )
}

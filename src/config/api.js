

export const apiConfig = {
    basePath: "https://pro.gocarhub.app/api",
    endpoints: {
        //Auth and User Endpoints
        signup: "/signup",
        signin: "/login",
        socialSignin: "/social-login",
        forgotPassword: "/forgot-password",
        changePassword: "/change-password",
        sellerInfo: "",
        updateProfile: "/update-profile",
        getProfile: "/profile-detail",
        logout: "",
        reportUser: "",
        blockUnblockUser: "",
        blockedUsersList: "",
        blockedUsersList: "",
        //Cars Related Endpoints
        getCategories: "/car-category",
        getYears: "/car-year",
        getCarMakes: "/car-make",
        getCarModels: "/car-model",
        getCarTrims: "/car-trim",
        getCarFeatures: "/car-featureslist",
        getAllCars: "/get-car-old",
        postCar: "/add-car",
        getCarDetails: "/car-details",
        //Other Endpoints
        appBasicDetail: "",
        getNotifications: "/get-notification",
        addOrUpdateReview: "",
        getReview: "",
        userCount: "",
        carSave: "",
        chatList: "",
        seenAll: "",
    }
}

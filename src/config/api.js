

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
        getCarTrim: "/car-trim",
        getCarFeatures: "/car-featureslist",
        getAllCars: "/get-car-old",
        appBasicDetail: "",
        getNotification: "",
        addOrUpdateReview: "",
        getReview: "",
        userCount: "",
        carSave: "",
        chatList: "",
        seenAll: "",
    }
}

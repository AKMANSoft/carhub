

export const apiConfig = {
    basePath: "https://pro.gocarhub.app/api",
    // socketPath: "ws://3.130.87.79:3000",
    socketPath: "https://pro.gocarhub.app:3000",
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
        getChatsList: "/chat-list",
        getChatMessages: "/chat-detail",
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
        getCarSearchUsers: "/get-car-search-users",
        //Other Endpoints
        appBasicDetail: "",
        getNotifications: "/get-notification",
        addOrUpdateReview: "",
        getReview: "",
        userCount: "",
        carSave: "",
        chatList: "",
        seenAllMessages: "/seen-all-message",
    }
}

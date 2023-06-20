import { initializeApp } from "firebase/app";
import { getMessaging, getToken } from 'firebase/messaging'

const firebaseConfig = {
    apiKey: "AIzaSyDBQqculjZW5hiDVLL8cLL5iKNufERGrpk",
    authDomain: "carhub-mi6.firebaseapp.com",
    projectId: "carhub-mi6",
    storageBucket: "carhub-mi6.appspot.com",
    messagingSenderId: "116385551444",
    appId: "1:116385551444:web:8ebc7799c34a0ddecfc9c1",
};

const FCM_VAPID_KEY = "BCnXIvgo3DEQfhXjjV5DGRKzF7VSy38v4Rzy9URUADU_Wrr2SqXXp5YMjvo9Hs8eJdvC_6a-_nCNtEYOmrCJIUM"

const app = initializeApp(firebaseConfig);
const fcm = getMessaging(app);

export async function initFirebaseMessaging() {
    let token = "";
    try {
        const notificationPermission = await Notification.requestPermission();
        if (notificationPermission !== "granted") return;
        if ("serviceWorker" in navigator) {
            const registration = await navigator.serviceWorker.register('/firebase-messaging-sw.js', { type: 'classic' })
            if (registration) {
                token = await getToken(fcm, {
                    vapidKey: FCM_VAPID_KEY,
                    serviceWorkerRegistration: registration
                })
                console.log("Token with registeration " + token)
            }
        } else {
            token = await getToken(fcm, { vapidKey: FCM_VAPID_KEY })
            console.log("Token without registeration " + token)
        }
    } catch (error) {
        console.log(error)
    }
}


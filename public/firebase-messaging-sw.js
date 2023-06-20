importScripts('https://www.gstatic.com/firebasejs/8.6.8/firebase-app.js')
importScripts('https://www.gstatic.com/firebasejs/8.6.8/firebase-messaging.js')



const firebaseConfig = {
  apiKey: "AIzaSyDBQqculjZW5hiDVLL8cLL5iKNufERGrpk",
  authDomain: "carhub-mi6.firebaseapp.com",
  projectId: "carhub-mi6",
  storageBucket: "carhub-mi6.appspot.com",
  messagingSenderId: "116385551444",
  appId: "1:116385551444:web:8ebc7799c34a0ddecfc9c1",
};  


firebase.initializeApp(firebaseConfig)

const messaging = firebase.messaging()

messaging.onBackgroundMessage((payload) => {
  console.log('[firebase-messaging-sw.js] Received background message ', payload)
  // const notificationTitle = payload.notification.title
  // const notificationOptions = {
  //   body: payload.notification.body,
  //   icon: payload.notification.icon || payload.notification.image,
  // }

  // self.registration.showNotification(notificationTitle, notificationOptions)
})



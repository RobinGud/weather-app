const dotenv = require('dotenv').config()

const firebaseConfig = {
    apiKey: process.env.API_KEY,
    authDomain: process.env.AUTH_DOMAIN,
    projectId: process.env.PROJECT_ID,
    storageBucket: process.env.STORSGE_BUCKET,
    messagingSenderId: process.env.MESSAAGEING_SENDER_ID,
    appId: process.env.APP_ID,
    measurementId: process.env.MEASUREMENT_ID
  }

  const firebase = require('firebase')
  const db = firebase.initializeApp(firebaseConfig);
  const firestore = db.firestore()


  module.exports = firestore

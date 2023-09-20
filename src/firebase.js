import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

// const firebaseConfig = {
//   apiKey: "AIzaSyA4c_hvr1KRmrb6GxDrqo2f2UH5d4oVRnw",
//   authDomain: "rahman-trading.firebaseapp.com",
//   projectId: "rahman-trading",
//   storageBucket: "rahman-trading.appspot.com",
//   messagingSenderId: "895530336210",
//   appId: "1:895530336210:web:eaae2768a58f7671b6d20b"
// };

const firebaseConfig = {
  apiKey: "AIzaSyA4c_hvr1KRmrb6GxDrqo2f2UH5d4oVRnw",
  authDomain: "rahman-trading.firebaseapp.com",
  databaseURL: "https://rahman-trading-default-rtdb.firebaseio.com",
  projectId: "rahman-trading",
  storageBucket: "rahman-trading.appspot.com",
  messagingSenderId: "895530336210",
  appId: "1:895530336210:web:eaae2768a58f7671b6d20b"
};

export const app = initializeApp(firebaseConfig);
export const db=getDatabase(app);

import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { DataSnapshot, getDatabase, orderByChild, setValue, onValue} from 'firebase/database'
import {where, query, collection} from 'firebase/firestore'
import {ref, push, set} from 'firebase/database'
import {
getAuth,
connectAuthEmulator,
signInWithEmailAndPassword} from 'firebase/auth'


const firebaseConfig = {
  apiKey: "AIzaSyAZDR0JIKMOxO5XMMrBk4Zh7Il8z3CBcNs",
  authDomain: "final-f9da3.firebaseapp.com",
  projectId: "final-f9da3",
  storageBucket: "final-f9da3.appspot.com",
  messagingSenderId: "380134219305",
  appId: "1:380134219305:web:6c8cc305eff826a5748638",
  measurementId: "G-SY49R865LC"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app)

function turnEmailToReadable(email){
  let newEmail = email.replace('@', 'at')
  newEmail = newEmail.replace('.', 'dot')
  return newEmail

}


export function createUser(firstName, lastName, email, id){
  const database = getDatabase(app);

  const postListRef = ref(database, `/users/${id}`)


  set(postListRef, {
    firstName: firstName,
    lastName: lastName,
    email, email
  })
}

export function receiveData(email){
  const database = getDatabase(app);
  let readable = turnEmailToReadable(email)
  let value = 'none'

  const userRef = ref(database, `users/${readable}`)

  onValue(userRef, (snapshot) => {
    if (snapshot.val()['email'] === email){
      value = snapshot.val()

    }
  })
  return value

}
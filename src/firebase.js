
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { DataSnapshot, getDatabase, setValue, onValue, forEach} from 'firebase/database';
import {where, query, updateDoc, doc, setDoc, collection, getFirestore} from 'firebase/firestore';
import {ref, set, get, child, once, orderByChild, push, } from 'firebase/database';
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


export function turnEmailToReadable(email){
  let newEmail = email.replace('@', 'at')
  newEmail = newEmail.replace('.', 'dot')
  return newEmail

}
export function getKey(callback, originalEmail){
  const database = getDatabase(app);

  const dbRef = ref(database)
  get(child(dbRef, '/users/')).then((snapshot) => {
    snapshot.forEach(function(child){
      let key = child.key
      let info = child.val()
      if (info['email'] == originalEmail){
        callback(key)

      }
    })
  })

}
export async function  updateData(firstName, lastName, originalEmail){

  const database = getDatabase(app);

  const dbRef = ref(database)
  get(child(dbRef, '/users/')).then((snapshot) => {
    snapshot.forEach(function(child){
      let key = child.key
      let info = child.val()
      if (info['email'] == originalEmail){
        console.log('hi')
        set(ref(database, `users/` + key), {
          accountInfo: info['accountInfo'],
          email: originalEmail,
          firstName: firstName,
          lastName: lastName,
        }).then(()=>{

        }).catch((error)=>{
          console.log(error)
        })
      }
    })
  })

}


export function createUser(firstName, lastName, email, accountInfo){
  const database = getDatabase(app);

  const postListRef = ref(database, `/users/`)


  push(postListRef, {
    firstName: firstName,
    lastName: lastName,
    email, email,
    accountInfo: accountInfo,
  })
}

export function receiveData(email, callback){
  const database = getDatabase(app);

  const dbRef = ref(database)
  get(child(dbRef, '/users/')).then((snapshot) => {
    snapshot.forEach(function(child){
      let info = child.val()
      if (info['email'] == email){
        console.log(child.val()['email'])
        callback(info)
      }
    })
  })

}
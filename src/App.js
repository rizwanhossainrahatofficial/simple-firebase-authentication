
import {getAuth,signInWithPopup,GoogleAuthProvider,GithubAuthProvider,signOut,FacebookAuthProvider   } from 'firebase/auth'
import './App.css';
import initializeAuthentication from './firebase.initialize';
import { initializeApp } from "firebase/app";
import { useState } from 'react';

// Import the functions you need from the SDKs you need

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyASm65NL3gQmjpRbYnXcTPiO7Mim0UdOx8",
  authDomain: "simple-firebase-authenti-a7d7a.firebaseapp.com",
  projectId: "simple-firebase-authenti-a7d7a",
  storageBucket: "simple-firebase-authenti-a7d7a.appspot.com",
  messagingSenderId: "428897677424",
  appId: "1:428897677424:web:782d8980bcc66c246a84b5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);



// initializeAuthentication()

const provider=new GoogleAuthProvider()
const gitHubprovider = new GithubAuthProvider();
const facebookprovider = new FacebookAuthProvider();


function App() {
const [user,setUser]=useState({})

  const handleGoogleSignIn=()=>{
    const auth=getAuth();
    signInWithPopup(auth,provider)
    .then(result=>{
      // const logginUser=result.user;
      // console.log(result.user)
      const {displayName,email}=result.user;
      const loggedUser={
        name:displayName,
        email:email
      }
    setUser(loggedUser)
    })
    .catch(error=>{
      console.log(error.message)
    })
    
    }

    const handlegitHubsignIn=()=>{
      const auth = getAuth();
      signInWithPopup(auth, gitHubprovider)
      .then(result=>{
        // const loginUser=result.user
        console.log(result.user)
        const {displayName,email}=result.user;
        const loggedInUser={
          name:displayName,
          email:email,
          
        }
        setUser(loggedInUser)
      })
     
    }

    const handlefacebookSignIn=()=>{
      const auth = getAuth();
      signInWithPopup(auth,facebookprovider)
      .then(result=>{
        const {displayName,email,photoURL}=result.user;
        console.log(result.user)
        const loggedInUser={
          name:displayName,
          email:email,
          photo:photoURL
        }
        setUser(loggedInUser)
      })

    }

    const handleSignOut=()=>{
      const auth = getAuth();
      signOut(auth)
      .then(result=>{
        setUser({})
      })
    }
  return (
    <div className="App">
     {!user.name ?
      <div> <button onClick={handleGoogleSignIn}>google sign in</button>
     
     <button onClick={handlegitHubsignIn}>github sign in</button>
     <button onClick={handlefacebookSignIn}>facebook sign in</button>
     </div>:
      <button onClick={handleSignOut}>sign out</button>
}
     {
       user.name && <div>
         <h2>welcome {user.name}</h2>
         <p>your email :{user.email}</p>
        <img src={user.photo} alt="" />
       </div>
     }
    </div>
  );
}

export default App;

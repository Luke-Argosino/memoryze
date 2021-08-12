import './App.css';
import Decks from './pages/Decks';
import Home from './pages/Home';
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Button } from '@material-ui/core';

//hi

firebase.initializeApp({
  apiKey: "AIzaSyAHXtjVi5seL3M7LyFM0nHvREh2RW9lLJQ",
  authDomain: "memoryze-2e0ae.firebaseapp.com",
  projectId: "memoryze-2e0ae",
  storageBucket: "memoryze-2e0ae.appspot.com",
  messagingSenderId: "928044609248",
  appId: "1:928044609248:web:f02b22960c62e9293caa85"
})

const auth = firebase.auth();
const firestore = firebase.firestore();

const App = () => {
  const [user] = useAuthState(auth);

  return (
    <div className="App">
      <div className="Header">
        <Header user={user} />
      </div>
      <div>
        {user ? <Decks />  : <SignIn auth={auth}/>}
      </div>
    </div>
  );
}

const Header = (props) => {
  return (
    <h1>
      memoryze
      {props.user? <SignOut /> : <SignIn />}
    </h1>
  )
}

const SignIn = (props) => {
  const signInWithGoogle = () => {
      const provider = new firebase.auth.GoogleAuthProvider();
      auth.signInWithPopup(provider);
  }
  return (
      <div>
        <Button 
          onClick={signInWithGoogle}
          variant="contained"
          color="white"
          >
          Sign in with Google
        </Button>
      </div>
  )
}

const SignOut = () => {
  return auth.currentUser && (
    <Button 
      onClick={() => auth.signOut()}
      variant="contained"
      color="white"
      >
      Sign Out
    </Button>
  )
}

export default App;

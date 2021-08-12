import './App.css';
import Decks from './pages/Decks';
import SignInPage from './pages/SignInPage';
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Button } from '@material-ui/core';


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
        <Header />
      </div>
      <div>
        {user ? <Decks />  : <SignInPage auth={auth}/>}
      </div>
    </div>
  );
}

const Header = () => {
  return (
    <h1>
      memoryze
    </h1>
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

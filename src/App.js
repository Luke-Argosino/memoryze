import './App.css';
import Decks from './pages/Decks';
import Home from './pages/Home';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { useHistory } from "react-router-dom";
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
    <Router>
      <div className="App">
        <div className="Header">
          <Header user={user} />
        </div>
        <div className="Content">
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/decks">
              <Decks user={user} />
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
}

const Header = (props) => {
  const history = useHistory();
  const onDeckClick = () => {
    history.push('/decks');
  }

  return (
    <h1>
      memoryze
      {props.user ? <SignOut /> : <SignIn user={props.user} />}
      <Button
        onClick={onDeckClick}
      >
        Decks
      </Button>
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

const SignOut = (props) => {
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

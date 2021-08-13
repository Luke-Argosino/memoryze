import '../App.css';
import Decks from '../pages/Decks';
import Home from '../pages/Home';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { useHistory } from "react-router-dom";
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Button } from '@material-ui/core';

const Header = (props) => {
    const history = useHistory();
    const onDeckClick = () => {
      history.push('/decks');
    }
  
    return (
      <h1>
        memoryze
        {props.user ? <SignOut auth={props.auth}/> : <SignIn user={props.user} auth={props.auth}/>}
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
      props.auth.signInWithPopup(provider);
    }
    return (
        <div>
          <Button 
            onClick={signInWithGoogle}
            >
            Sign in with Google
          </Button>
        </div>
    )
  }
  
  const SignOut = (props) => {
    return props.auth.currentUser && (
      <Button 
        onClick={() => props.auth.signOut()}
        >
        Sign Out
      </Button>
    )
  }
export default Header;
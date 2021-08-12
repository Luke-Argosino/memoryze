import './SignInPage.css';
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Button } from '@material-ui/core';

const SignInPage = (props) => {
    const signInWithGoogle = () => {
        const provider = new firebase.auth.GoogleAuthProvider();
        props.auth.signInWithPopup(provider);
    }
  
    return (
        <div>
            <div className="Description">
                <p>
                    A spaced repitition flash card web app.
                </p>
                <p>
                    Sign in to start!
                </p>
            </div>
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



export default SignInPage;
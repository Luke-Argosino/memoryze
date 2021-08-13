import '../App.css';
import './Header.css';
import Decks from '../pages/Decks';
import Home from '../pages/Home';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { useHistory } from "react-router-dom";
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Button } from '@material-ui/core';
import { createMuiTheme, makeStyles, ThemeProvider } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    },
    title: {
      flexGrow: 1,
    },
}))

const customTheme = createMuiTheme({
  typography: {
    "fontFamily": ['"Montserrat"','Open Sans'].join(',')
  },
  palette: {
    secondary: {
      main: "#f7f0dc",
      contrastText: "#5f6d4f"
    }
  }
});

const Header = (props) => {
    const history = useHistory();
    const onDeckClick = () => {
      history.push('/decks');
    }

    const classes = (useStyles);
  
    return (
      <div className={classes.Root}>
        <ThemeProvider theme={customTheme}>
        <AppBar position="static" color={"secondary"}>
          <Toolbar>
            <Typography variant ="h4" className={classes.title} color="#5f6d4f">
              Memoryze
            </Typography>
            <div className="DecksButton">
            <Button
                onClick={onDeckClick}
              >
                Decks
              </Button>
              </div>
              {props.user ? <SignOut auth={props.auth}/> : <SignIn user={props.user} auth={props.auth}/>}
          </Toolbar> 
        </AppBar>
        </ThemeProvider>
      </div>
    )
  }
  
  const SignIn = (props) => {
    const signInWithGoogle = () => {
      const provider = new firebase.auth.GoogleAuthProvider();
      props.auth.signInWithPopup(provider);
    }
    return (
        <div className="SignButton">
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
      <div className="SignButton">
        <Button 
          onClick={() => props.auth.signOut()}
          >
          Sign Out
        </Button>
      </div>
    )
  }
export default Header;
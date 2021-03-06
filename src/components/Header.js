import "../App.css";
import { useHistory } from "react-router-dom";
import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import { Button } from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import {
  createTheme,
  makeStyles,
  ThemeProvider,
} from "@material-ui/core/styles";


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
  },
  
  
}));

const customTheme = createTheme({
  palette: {
    primary: {
      main: "#ffffff",
    },
    secondary: {
      main: "#7738c9"
    }
  },
});

const Header = (props) => {
  const history = useHistory();
  const onDeckClick = () => {
    if (props.user) {
      history.push("/decks");
    } else {
      alert("Error: You are not signed in!");
    }
  };

  const classes = useStyles;

  return (
    <div className={classes.Root}>
      <div className="Header">
        <ThemeProvider theme={customTheme}>
          <AppBar position="static" color={"primary"} style={{boxShadow:"none",}}>
            <Toolbar>
              <Typography variant="h4" className={classes.title} color={"secondary"}>
                Memoryze
              </Typography>
              <div className="DecksButton">
                <Button onClick={onDeckClick} style={{color: '#7738c9', fontWeight: 700}}>Decks</Button>
              </div>
              {props.user ? (
                <SignOut auth={props.auth} />
              ) : (
                <SignIn user={props.user} auth={props.auth} />
              )}
            </Toolbar>
          </AppBar>
        </ThemeProvider>
      </div>
    </div>
  );
};

const SignIn = (props) => {
  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    props.auth.signInWithPopup(provider);
  };
  return (
    <div className="SignButton">
      <Button onClick={signInWithGoogle} style={{color: '#7738c9', fontWeight: 700}}>Sign in with Google</Button>
    </div>
  );
};

const SignOut = (props) => {
  return (
    props.auth.currentUser && (
      <div className="SignButton">
        <Button onClick={() => props.auth.signOut()} style={{color: '#7738c9', fontWeight: 700}}>Sign Out</Button>
      </div>
    )
  );
};
export default Header;

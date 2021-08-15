import './App.css';
import AddDeck from './pages/AddDeck';
import Decks from './pages/Decks';
import Home from './pages/Home';
import Header from './components/Header';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';

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
          <Header user={user} auth={auth}/>
        </div>
        <div className="Content">
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route exact path="/decks">
              <Decks user={user} firebase={firebase} />
            </Route>
            <Route path="/decks/new_deck">
              <AddDeck user={user} firebase={firebase} />
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;

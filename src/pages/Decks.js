import '../App.css'
import Deck from '../components/Deck'
import { Button, Tooltip } from "@material-ui/core";
import { BiAddToQueue } from "react-icons/bi";
import { useHistory } from "react-router-dom";
import { useState, useRef, useEffect } from 'react';

const Decks = (props) => {
    const history = useHistory();
    const [isDoneLoading, setDoneLoading] = useState(false);
    const deckNames = useRef([]);
    const decks = useRef([]);
    useEffect(() => {
        if (!props.user) {
            history.push('/');
        } else {
            props.firebase.database().ref('users/' + props.user.uid + "/").get().then((objSnapshot) => {
                let value = objSnapshot.val();
                deckNames.current = Object.keys(value);
                console.log(deckNames.current);
                objSnapshot.forEach(function (childSnapshot) {
                    decks.current.push(childSnapshot.val());
                });
                console.log(decks.current[0][0].backCard);
                setDoneLoading(true);
            }).catch((error) => {
                console.log(error);
            });
        }
    }, []);


    return (
        <div>
            My Decks
            {isDoneLoading && <Deck deckName={deckNames.current[0]}/>}
            <AddDeckButton />
        </div>
    )
}

const AddDeckButton = () => {
    const history = useHistory();
    const onClick = () => {
        history.push('/decks/new_deck')
    }
    return (
        <div className="AddDeckButton">
            <Tooltip title="New Deck">
                <Button
                    onClick={onClick}
                >
                    <BiAddToQueue
                        color='white'
                        size={65}
                    />
                </Button>
            </Tooltip>
        </div>
    )
}

export default Decks;
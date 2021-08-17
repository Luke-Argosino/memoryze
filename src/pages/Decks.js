import '../App.css'
import { Button, Tooltip } from "@material-ui/core";
import { BiAddToQueue } from "react-icons/bi";
import { useHistory } from "react-router-dom";
import { useEffect, useState } from 'react';

const Decks = (props) => {
    const history = useHistory();
    let deckNames = new Array();
    let decks = new Array();
    useEffect(() => {
        if (!props.user) {
            history.push('/');
        } else {
            props.firebase.database().ref('users/' + props.user.uid + "/").get().then((objSnapshot) => {
                let value = objSnapshot.val();
                deckNames = Object.keys(value);
                console.log(deckNames);
                objSnapshot.forEach(function (childSnapshot) {
                    decks.push(childSnapshot.val());
                });
                // console.log(decks[0][0].backCard);
            }).catch((error) => {
                console.log(error);
            });
        }
    }, []);   


    return (
        <div>
            My Decks
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
import "../App.css";
import Deck from "../components/Deck";
import { Button, Tooltip } from "@material-ui/core";
import { BiAddToQueue } from "react-icons/bi";
import { useHistory } from "react-router-dom";
import { useState, useRef, useEffect } from "react";

const Decks = (props) => {
  const history = useHistory();
  const [isDoneLoading, setDoneLoading] = useState(false);
  let deckNames = useRef([]);
  const decks = useRef([]);
  useEffect(() => {
    if (!props.user) {
      history.push("/");
    } else {
      props.firebase
        .database()
        .ref("users/" + props.user.uid + "/")
        .get()
        .then((objSnapshot) => {
          let value = objSnapshot.val();
          deckNames.current = Object.keys(value);
          objSnapshot.forEach((element) => {
            const deck = {
              deckName: deckNames.current[0],
              cards: element.val(),
            };
            deckNames.current.shift();
            decks.current.push(deck);
          });
          console.log("Gathered Data");
          setDoneLoading(true);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, []);

  return (
    <div>
      My Decks
      {isDoneLoading &&
        decks.current.map((deck) => (
          <Deck deckName={deck.deckName} cards={deck.cards} />
        ))}
      <AddDeckButton />
    </div>
  );
};

const AddDeckButton = () => {
  const history = useHistory();
  const onClick = () => {
    history.push("/decks/new_deck");
  };
  return (
    <div className="AddDeckButton">
      <Tooltip title="New Deck">
        <Button onClick={onClick}>
          <BiAddToQueue color="white" size={65} />
        </Button>
      </Tooltip>
    </div>
  );
};

export default Decks;

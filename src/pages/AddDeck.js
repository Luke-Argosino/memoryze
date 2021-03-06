import "../App.css";
import { Box, Button, Tooltip, TextField } from "@material-ui/core";
import { BiAddToQueue } from "react-icons/bi";
import { VscDiffRemoved } from "react-icons/vsc";
import { useHistory } from "react-router-dom";
import { useState } from "react";
import React from "react";

const AddDeck = (props) => {
  const currentDate = new Date();
  const history = useHistory();
  const [newCardsPerday, setNewCardsPerday] = useState(10);
  const [deckName, setDeckName] = useState("");
  const [cardCount, setCardCount] = useState(0);
  const [cards, setCards] = useState([
    {
      cardNum: cardCount,
      frontCard: "",
      backCard: "",
      dueDate: currentDate.toDateString(),
      timesReviewed: 0,
    },
  ]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (deckName === "") {
      alert("Error: Deck name cannot be empty");
    } else {
      //console.log("Card", cards);
      cards.forEach((card) => {
        if ((card.cardNum + 1) / newCardsPerday > 1) {
          currentDate.setDate(
            currentDate.getDate() + Math.floor(card.cardNum / newCardsPerday)
          );
          const dateString = currentDate.toDateString();
          card.dueDate = dateString;
        }
      });
      props.firebase
        .database()
        .ref("users/" + props.user.uid + "/" + deckName)
        .set(cards);
      history.push("/decks");
    }
  };

  const handleChangeInput = (cardNum, e) => {
    const newCard = cards.map((i) => {
      if (cardNum === i.cardNum) {
        i[e.target.name] = e.target.value;
      }
      return i;
    });
    setCards(newCard);
  };

  const onAddClick = () => {
    if (cardCount === 0) {
      setCardCount(cardCount + 1);
    } else {
      setCardCount(cardCount + 1);
      setCards((cards) => [
        ...cards,
        {
          cardNum: cardCount,
          frontCard: "",
          backCard: "",
          dueDate: currentDate.toDateString(),
          timesReviewed: 0,
        },
      ]);
    }
  };

  const onRemoveClick = () => {
    if (cards.length > 1) {
      setCards((cards) => cards.splice(0, cards.length - 1));
    } else {
      alert("Error: Cannot have 0 cards in deck");
    }
  };

  return (
    <div className="AddDeck">
      <form
        className="FlashCardEntry"
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit}
      >
        <TextField
          label="Deck Name"
          margin="normal"
          onChange={(e) => setDeckName(e.target.value)}
          inputProps={{ maxLength: 40 }}
        />
        <TextField
          label="New Cards per Day"
          margin="normal"
          type="number"
          onChange={(e) => setNewCardsPerday(e.target.value)}
          inputProps={{ maxLength: 3 }}
        />
        {cards.map((card) => (
          <div key={card.cardNum}>
            <Box
              display="flex"
              justifyContent="center"
              bgcolor="#ece3c5"
              marginLeft={43}
              marginRight={43}
              borderRadius={10}
              marginBottom={2}
              border={4}
              borderColor="#d5d5d5"
            >
              <div className="LeftCard">
                <TextField
                  name="frontCard"
                  label="Front Text"
                  multiline
                  rows={6}
                  variant="outlined"
                  value={card.frontCard}
                  onChange={(e) => handleChangeInput(card.cardNum, e)}
                  inputProps={{ maxLength: 160 }}
                  style={{ width: 400 }}
                />
              </div>
              <div className="RightCard">
                <TextField
                  id="Test"
                  name="backCard"
                  label="Back Text"
                  multiline
                  rows={6}
                  variant="outlined"
                  value={card.backCard}
                  onChange={(e) => handleChangeInput(card.cardNum, e)}
                  inputProps={{ maxLength: 160 }}
                  style={{ width: 400 }}
                />
              </div>
            </Box>
          </div>
        ))}
        <Button id="CreateDeck" type="submit">
          Create Deck
        </Button>
      </form>
      <div className="AddDeckButton">
        <Tooltip title="Add Card">
          <Button onClick={onAddClick}>
            <BiAddToQueue color="white" size={50} />
          </Button>
        </Tooltip>
        <Tooltip title="Remove Card">
          <Button onClick={onRemoveClick}>
            <VscDiffRemoved color="white" size={50} />
          </Button>
        </Tooltip>
      </div>
    </div>
  );
};

export default AddDeck;

import '../App.css'
import { Box, Button, Tooltip, TextField } from "@material-ui/core";
import { BiAddToQueue } from "react-icons/bi";
import { VscDiffRemoved } from "react-icons/vsc";
import { useState } from "react";
import React from 'react';
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';

const AddDeck = () => {
    const [deckName, setDeckName] = useState("");
    const [cardCount, setCardCount] = useState(0);
    const [cards, setCards] = useState([
        {cardNum: cardCount, frontCard: '', backCard: ''},
    ]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (deckName === "") {
            alert("Error: Deck name cannot be empty")
        } else {
            console.log("Card", cards);
        }
    }

    const handleChangeInput = (cardNum, e) => {
        const newCard = cards.map(i => {
            if(cardNum === i.cardNum) {
                i[e.target.name] = e.target.value;
            }
            return i;
        })
        setCards(newCard);
    }

    const onAddClick = () => {
        if (cardCount === 0) {
            setCardCount(cardCount + 1);
        } else {
            setCardCount(cardCount + 1);
            setCards(cards => [...cards, {cardNum: cardCount, frontCard: '', backCard: ''}]);
        }
    }

    const onRemoveClick = () => {
        if (cards.length > 1) {
            setCards(cards => cards.splice(0, cards.length-1));
        } else {
            alert("Error: Cannot have 0 cards in deck");
        }
    }

    return (
        <div className="AddDeck">
            <form className="FlashCardEntry" noValidate autoComplete="off" onSubmit={handleSubmit}>
                <TextField 
                    label="Deck Name"
                    margin="normal"
                    onChange={e => setDeckName(e.target.value)}
                />
                {cards.map(card => (
                    <div key={card.cardNum}>
                        <Box display="flex" 
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
                                    onChange={e => handleChangeInput(card.cardNum, e)}
                                    inputProps={{ maxLength: 160 }}
                                    style= {{ width: 400 }}
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
                                    onChange={e => handleChangeInput(card.cardNum, e)}
                                    inputProps={{ maxLength: 160 }}
                                    style= {{ width: 400 }}
                                />
                            </div>
                        </Box>            
                    </div>
                ))}
                <Button id="CreateDeck"
                    type="submit"
                >
                    Create Deck
                </Button>
            </form>
            <div className="AddDeckButton">
                <Tooltip title="Add Card">
                    <Button
                        onClick={onAddClick}
                    >
                        <BiAddToQueue
                            color='white'
                            size={50}
                        />
                    </Button>
                </Tooltip>
                <Tooltip title="Remove Card">
                    <Button
                        onClick={onRemoveClick}
                    >
                        <VscDiffRemoved
                            color='white'
                            size={50}
                        />
                    </Button>
                </Tooltip>
            </div>
        </div>
    )
}

export default AddDeck;
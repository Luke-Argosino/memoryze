import '../App.css'
import { Box, Button, Tooltip, TextField } from "@material-ui/core";
import { BiAddToQueue } from "react-icons/bi";
import { VscDiffRemoved } from "react-icons/vsc";
import { useState } from "react";
import React from 'react';

const AddDeck = () => {
    const[cardCount, setCardCount] = useState(0);
    const [cards, setCards] = useState([
        {cardNum: cardCount, frontCard: '', backCard: ''},
    ]);


    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Card", cards);
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
        if (cardCount == 0) {
            setCardCount(cardCount + 1);
        } else {
            setCardCount(cardCount + 1);
            setCards(cards => [...cards, {cardNum: cardCount, frontCard: '', backCard: ''}])
        }
    }

    const onRemoveClick = () => {
        setCards(cards => cards.splice(0, cards.length-1));
    }

    return (
        <div className="AddDeck">
            <form className="FlashCardEntry" noValidate autoComplete="off" onSubmit={handleSubmit}>
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
                                    inputProps={{ maxLength: 240 }}
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
                                    inputProps={{ maxLength: 240 }}
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
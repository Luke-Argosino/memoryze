import '../App.css'
import { Box, Button, Tooltip, TextField } from "@material-ui/core";
import { BiAddToQueue } from "react-icons/bi";
import { VscDiffRemoved } from "react-icons/vsc";
import { useState } from "react";
import React from 'react';

const AddDeck = () => {
    const [cards, setCards] = useState([]);

    const handleSubmit = (e) => {
        e.preventDefault();
    }

    const onAddClick = () => {
        setCards(cards => [...cards, <FlashCardEntry/>])
    }

    const onRemoveClick = () => {
        setCards(cards => cards.splice(0, cards.length-1));
    }

    return (
        <div className="AddDeck">
            <form className="FlashCardEntry" noValidate autoComplete="off" onSubmit={handleSubmit}>
                <FlashCardEntry />
                {cards.map((item,i) => (
                    <div key={i}>{item}</div>
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

const FlashCardEntry = () => {
    return (
        <div>
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
                        label="Front Text"
                        multiline
                        rows={6}
                        variant="outlined"
                        inputProps={{ maxLength: 240 }}
                        style= {{ width: 400 }}
                    />
                </div>
                <div className="RightCard">
                    <TextField
                        id="Test"
                        label="Back Text"
                        multiline
                        rows={6}
                        variant="outlined"
                        inputProps={{ maxLength: 240 }}
                        style= {{ width: 400 }}
                    />
                </div>
            </Box>
        </div>
    )
}

export default AddDeck;
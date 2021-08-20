import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  Typography,
  makeStyles,
  Dialog,
  DialogTitle,
  DialogContent,
  Badge,
} from "@material-ui/core";
import { useEffect, useState } from "react";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
    minHeight: 150,
    margin: 40,
  },
  cardContent: {
    textAlign: 'center',
  },
  buttons: {
    marginTop: "auto",
  },
}));

/*
    Example Accessing Data
    ------------------------------------------------------
    Access card 0 backCard:     props.cards[0].backCard
    Access card 0 frontCard:    props.cards[0].frontCard
    Access card 0 cardNum:      props.cards[0].cardNum
    Access deck name:           props.deckName
    ------------------------------------------------------
*/
const Deck = (props) => {
  const classes = useStyles();
  const cards = props.cards;
  const currentDate = new Date();
  const [dueCards, setDueCards] = useState([]);
  const [openReviewDialog, setOpenReviewDialog] = useState(false);
  const [openCramDialog, setOpenCramDialog] = useState(false);
  const [currentCardNum, setCurrentCardNum] = useState(1);
  const [currentReviewFrontCard, setCurrentReviewFrontCard] = useState();
  const [currentReviewBackCard, setCurrentReviewBackCard] = useState();
  const [currentCramFrontCard, setCurrentCramFrontCard] = useState(cards[0].frontCard);
  const [currentCramBackCard, setCurrentCramBackCard] = useState(cards[0].backCard);
  const [backRevealed, setBackRevealed] = useState(false);

  useEffect(() => {
    cards.forEach(card => {
      const dueDate = new Date(card.dueDate);
      if (dueDate <= currentDate) {
        setDueCards(oldArray => [...oldArray, card]);
      }
    });
  }, []);

  const handleReviewClick = () => {
    setCurrentCardNum(1);
    setBackRevealed(false);
    setCurrentReviewFrontCard(dueCards[0].frontCard);
    setCurrentReviewBackCard(dueCards[0].backCard);
    setOpenReviewDialog(true);
  };

  const handleReviewClose = () => setOpenReviewDialog(false);

  const handleCramClick = () => {
    setCurrentCardNum(1);
    setBackRevealed(false);
    setOpenCramDialog(true);
  };

  const handleCramClose = () => setOpenCramDialog(false);

  const handleCorrectNextCard = () => {
    setDueCards(dueCards.slice(1));
    if (dueCards.length === 0) {
      setCurrentReviewFrontCard("You finished todays reviews! Congrats!");
      console.log("End of review session");
    }  else {
      setCurrentReviewFrontCard(dueCards[0].frontCard);
      setCurrentReviewBackCard(dueCards[0].backCard);
    }
    setBackRevealed(false);
  }

  const handleIncorrectNextCard = () => {
    setDueCards(oldArray => [...oldArray, dueCards[0]]);
    setDueCards(dueCards.slice(1));
    setCurrentReviewFrontCard(dueCards[0].frontCard);
    setCurrentReviewBackCard(dueCards[0].backCard);
    setBackRevealed(false);
  }

  const handleCramNextClick = () => {
    if (currentCardNum === cards.length - 1) {
      setCurrentCardNum(0);
    } else {
      setCurrentCardNum(currentCardNum + 1);
    }
    setCurrentCramFrontCard(cards[currentCardNum].frontCard);
    setCurrentCramBackCard(cards[currentCardNum].backCard);
    setBackRevealed(false);
  }

  const handleRevealClick = () => setBackRevealed(true);

  /* Test if data is valid
  useEffect(() => {
    console.log(props.deckName);
    console.log(props.cards[0].backCard);
    console.log(props.cards[0].frontCard);
    console.log(props.cards[0].cardNum);
    console.log(props.cards.length);
  });
  */

  return (
    <div className={classes.root}>
      <Badge color="primary" badgeContent={dueCards.length} showZero >
        <Card>
          <CardContent>
            <Typography variant="h5" component="h2">
              {props.deckName}
            </Typography>
          </CardContent>
          <CardActionArea>
            <CardActions className={classes.buttons}>
              <Button size="medium" color="primary" onClick={handleReviewClick}>
                Review
              </Button>
              <Button size="medium" color="primary" onClick={handleCramClick}>
                Cram
              </Button>



              <Dialog onClose={handleReviewClose} open={openReviewDialog}>
              <DialogTitle className={classes.cardContent} >{currentReviewFrontCard}</DialogTitle>
                <DialogContent className={classes.cardContent}>{backRevealed ? currentReviewBackCard : "<Hidden>"}</DialogContent>
                { backRevealed ? 
                <div>
                  <Button onClick={handleCorrectNextCard}>
                    I got it right!
                  </Button>
                  <Button onClick={handleIncorrectNextCard}>
                    I Didn't get it!
                  </Button>
                </div>
                : 
                  <Button autoFocus onClick={handleRevealClick}>
                    Reveal
                  </Button>
                }
              </Dialog>



              <Dialog onClose={handleCramClose} open={openCramDialog}>
                <DialogTitle className={classes.cardContent}>{currentCramFrontCard}</DialogTitle>
                <DialogContent className={classes.cardContent}>{backRevealed ? currentCramBackCard : "<Hidden>"}</DialogContent>
                <Button autoFocus onClick={handleRevealClick}>
                  Reveal
                </Button>
                <Button autoFocus onClick={handleCramNextClick}>
                  Next Card
                </Button>
              </Dialog>


            </CardActions>
          </CardActionArea>
        </Card>
      </Badge>
    </div>
  );
};

export default Deck;

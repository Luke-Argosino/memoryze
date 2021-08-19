import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  Typography,
  makeStyles,
} from "@material-ui/core";
import { useEffect } from "react";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
    minHeight: 150,
    margin: 40,
  },
  buttons: {
    marginTop: "auto",
  },
}));

/*
    Example Accessing Data
    ------------------------------------------------------
    Access card 0 backCard:     props.cards[0].backCard
    Access card 1 frontCard:    props.cards[1].frontCard
    Access card 0 cardNum:      props.cards[0].cardNum
    Access deck name:           props.deckName
    ------------------------------------------------------
*/
const Deck = (props) => {
  const classes = useStyles();

  /* Test if data is valid
  useEffect(() => {
    console.log(props.deckName);
    console.log(props.cards[0].backCard);
    console.log(props.cards[0].frontCard);
    console.log(props.cards[0].cardNum);
  }, []);
  */

  return (
    <div>
      <Card className={classes.root}>
        <CardContent>
          <Typography variant="h5" component="h2">
            {props.deckName}
          </Typography>
        </CardContent>
        <CardActionArea>
          <CardActions className={classes.buttons}>
            <Button size="medium" color="primary">
              Review
            </Button>
            <Button size="medium" color="primary">
              Cram
            </Button>
          </CardActions>
        </CardActionArea>
      </Card>
    </div>
  );
};

export default Deck;

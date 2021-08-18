import { Button, Card, CardActionArea, CardActions, CardContent, Typography, makeStyles } from "@material-ui/core"

const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: 345,
        minHeight: 150,
        margin: 40,
    },
    buttons: {
        marginTop: 'auto',
    },
}));

const Deck = (props) => {
    const classes = useStyles();

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
    )
}

export default Deck;
import { CardContent, CardHeader, Typography } from "@material-ui/core";
import { makeStyles, Box } from "@material-ui/core";
import CardMedia from '@material-ui/core/CardMedia';
import { Card } from "@material-ui/core";
import ReactPlayer from "react-player";
import App from "../App";
import "../App.css";
import { minWidth } from "@material-ui/system";

const useStyles = makeStyles((theme) => ({
  hero: {
    backgroundImage: `url(https://i.imgur.com/niJzVIw.png)`,
    height: "75vh",
    position: "relative",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: "#ffffff",
    fontSize: "4rem",
    fontWeight: 600,
    fontStyle: "italic"
  },
  about: {
    backgroundColor: "#ffffff",
    height: "60vh",
    position: "relative",
    display: "block",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: "4%",
    color: "#7738c9",
    fontSize: "3.5rem",
    fontWeight: 600,
  },
  howTo: {
    backgroundColor: "#7738c9",
    height: "700px",
    position: "relative",
    display: "block",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: "4%",
    color: "#ffffff",
    fontSize: "3.5rem",
    fontWeight: 600,
  },
  cards: {
    display: "flex",
    justifyContent: "center",
    marginTop: "2%"
  },
  card: {
    marginRight: "2%",
    minWidth: 400,
    maxWidth: 400,
    minHeight: 500,
    boxShadow: "none"
  },
  title: {
    fontSize: 30,
    fontWeight: 600,
    fontStyle: "italic",
    color: "#7e5cab"
  },
  cardText: {
    fontSize: 20,
    color: "#7e5cab"
  }
}));


const Home = (props) => {
  const classes = useStyles();

  return (
    <div className="Home">
      <Box className={classes.hero}>
        <Box>A cloud-based SRS flash card web app</Box>
      </Box>
      <Box className={classes.about}> 
        What is Spaced Repitition?
        <ReactPlayer url="https://www.youtube.com/watch?v=cVf38y07cfk" style={{marginLeft:"auto", marginRight: "auto", paddingTop: "3%"}}></ReactPlayer>
      </Box>
      <Box className={classes.howTo}>
        How To Use Memoryze
        <Box className={classes.cards}>
        <Card className={classes.card}>
          <CardContent>
            <Typography className={classes.title} gutterBottom>
              Step 1
            </Typography>
            <Typography className={classes.cardText} component="p">
              Create your deck.
            </Typography>
          </CardContent>
        </Card>
        <Card className={classes.card}>
          <CardContent>
            <Typography className={classes.title} gutterBottom>
              Step 2
            </Typography>
            <Typography className={classes.cardText} component="p">
              Review cards each day according to your limit.
            </Typography>
          </CardContent>
        </Card>
        <Card className={classes.card}>
          <CardContent>
            <Typography className={classes.title} gutterBottom>
              Step 3
            </Typography>
            <Typography className={classes.cardText} component="p">
              Check back daily for reviews
            </Typography>
          </CardContent>
        </Card>
        </Box>
      </Box>
    </div>
  );
};

export default Home;

import '../App.css'
import { Button, Tooltip } from "@material-ui/core";
import { BiAddToQueue } from "react-icons/bi";
import { useHistory } from "react-router-dom";

const Decks = (props) => {
    const history = useHistory();
    if (!props.user) {
        alert("Error: You are not signed in!");
        history.push('/');
    }

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
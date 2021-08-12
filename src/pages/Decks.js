import { useHistory } from "react-router-dom";

const Decks = (props) => {
    const history = useHistory();
    if (!props.user) {
        history.push('/');
    }

    return (
        <div>
            Hello
        </div>
    )
}

export default Decks;
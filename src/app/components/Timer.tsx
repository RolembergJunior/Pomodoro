
import secondsToTime from "../utils/secondsToTime";

interface Props {
    seconds: number
}

export default function Timer(props:Props){
    return (
        <p className="timer">{secondsToTime(props.seconds)}</p>
    )
}
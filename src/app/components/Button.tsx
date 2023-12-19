

interface Props {
    text: string;
    onclick?: () => void;
    classname?: string;
}

export default function Button(props:Props){
    return (
        <button className={props.classname} onClick={props.onclick} >{props.text}</button>
    )
}
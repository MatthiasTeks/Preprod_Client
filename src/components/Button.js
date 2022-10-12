import './Button.css';

const Button = (props) => {
    return (
        <button
            className={`
            button flex row justifyCenter center
            ${props.isWhite ? "button-white" : props.isBlack ? "button-black" : ""}
            ${props.size}
            `}
            name={props.name}
            type={props.type}
            onClick={props.onClick}
        >
            <p className="is5">{props.text}</p>
        </button>
    )
}

export default Button
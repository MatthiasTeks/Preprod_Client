import './ServiceCardInclude.css';

const ServiceCardInclude = (props) => {
    return (
        <div className="service-card-include flex column">
            <div className="include-bloc-icon flex column">
                {props.icon}
            </div>
            <div className="include-resume flex column">
                <h4>{props.title}</h4>
                <p className="is6">{props.text}</p>
            </div>
        </div>
    )
}

export default ServiceCardInclude
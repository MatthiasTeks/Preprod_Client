import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import ServiceCardInclude from "./ServiceCardInclude";
import './ServicesInclude.css';

const ServiceInclude = (props) => {
    return (
        <div className="service-include flex column">
            <div id="include-list" className="flex row">
                { props.service1 === true ?
                    <ServiceCardInclude
                        icon={<AttachMoneyIcon />}
                        title="Paiement en deux fois sans frais"
                        text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit."
                    /> : ""
                }
                { props.service2 === true ?
                    <ServiceCardInclude
                        icon={<AttachMoneyIcon />}
                        title="Paiement en deux fois sans frais"
                        text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit."
                    /> : ""
                }
                { props.service3 === true ?
                    <ServiceCardInclude
                        icon={<AttachMoneyIcon />}
                        title="Paiement en deux fois sans frais"
                        text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit."
                    /> : ""
                }
                { props.service4 === true ?
                    <ServiceCardInclude
                        icon={<AttachMoneyIcon />}
                        title="Paiement en deux fois sans frais"
                        text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit."
                    /> : ""
                }
            </div>
        </div>
    )
}

export default ServiceInclude
import "./style.scss";
import { INationInfo } from "../../../types";
import useImage from "../../../utils/useImage";
import closeButton from "../../../assets/close-button.svg";

interface IModalProps {
    nationInfo: INationInfo;
}

const Modal = ({ nationInfo }: IModalProps): JSX.Element => {
    console.log("../" + nationInfo.flag);
    const { loading, image, error } = useImage("qatar-stadium.png");
    console.log(loading, error);
    return (
        <div className="modal">
            <img src={closeButton} alt="alt text here" className="modal-close-button" />
            <div className="img-nation">
                <img src={image ? image : "sldkajfh"} alt="alt text here" />
                <p>{nationInfo.nation}</p>
            </div>
        </div>
    );
};

export default Modal;

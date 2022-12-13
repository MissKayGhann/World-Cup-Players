import "./style.scss";
import { INationInfo } from "../../../types";
import useImage from "../../../utils/useImage";

interface IModalProps {
    classes: string;
}

interface IThing extends IModalProps {
    nationInfo: INationInfo;
}

const Modal = ({ classes, nationInfo }: IThing): JSX.Element => {
    console.log("../" + nationInfo.flag);
    const { loading, image, error } = useImage("qatar-stadium.png");
    console.log(loading, error);
    return (
        <div className={classes}>
            <div className="img-nation">
                <img src={image ? image : "sldkajfh"} alt="asdf" />
                <p>{nationInfo.nation}</p>
            </div>
        </div>
    );
};

export default Modal;

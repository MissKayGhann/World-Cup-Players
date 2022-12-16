import Player from "./Player";
import "./style.scss";
import { INationInfo, IPlayerProps } from "../../../types";
import useImage from "../../../utils/useImage";
import closeButton from "../../../assets/close-button.svg";

interface IModalProps {
    setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
    nationInfo: INationInfo;
}

const playerProps: IPlayerProps = {
    props: {
        team: "England",
        name: "Harry Kane",
        dob: "01/01/0000",
        photo: "qatar-stadium.png",
        shirtNumber: 9,
        position: "ST",
        goalsScored: 1,
        assists: 2,
        yellowCards: 2,
        redCards: 12,
        manOfMatchCount: -2,
        capsForNation: 4,
        goalsForNation: 1,
        club: "Tottenham Hotspur",
    },
};

// const playerProps2: IPlayerProps = {
//     props: {
//         team: "England",
//         name: "Harry Kane",
//         dob: "01/01/0000",
//         photo: "qatar-stadium.png",
//         shirtNumber: 9,
//         position: "ST",
//         goalsScored: 1,
//         assists: 2,
//         yellowCards: 2,
//         redCards: 12,
//         manOfMatchCount: -2,
//         capsForNation: 4,
//         goalsForNation: 1,
//         club: "Tottenham Hotspur",
//     },
// };

const Modal = ({ setOpenModal, nationInfo }: IModalProps): JSX.Element => {
    console.log("../" + nationInfo.flag);
    const { loading, image, error } = useImage("qatar-stadium.png");
    console.log(loading, error); // THIS NEEDS TO BE REMOVED
    return (
        <div className="modal">
            <img
                src={closeButton}
                alt="alt text here"
                className="modal-close-button"
                onClick={() => setOpenModal(false)}
            />
            <div className="img-nation">
                <img src={image ? image : "#"} alt="alt text here" className="nation-img" />
                <h3>{nationInfo.nation}</h3>
                <Player props={playerProps.props} />
                <Player props={playerProps.props} />
                <Player props={playerProps.props} />
                <Player props={playerProps.props} />
                <Player props={playerProps.props} />
                <Player props={playerProps.props} />
            </div>
        </div>
    );
};

export default Modal;

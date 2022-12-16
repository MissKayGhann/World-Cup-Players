import Player from "./Player";
import { useState, useEffect } from "react";
import "./style.scss";
import { NationInfo, IPlayerProps, PlayerInfo } from "../../../types";
import useImage from "../../../utils/useImage";
import closeButton from "../../../assets/close-button.svg";
import getPlayersFromNation from "../../../utils/getPlayers";

interface IModalProps {
    setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
    nationInfo: NationInfo;
}

// defining position priority for sort fn in useEffect()
const positionsOrder = {
    GK: 1,
    DF: 2,
    MF: 3,
    FW: 4,
};

const Modal = ({ setOpenModal, nationInfo }: IModalProps): JSX.Element => {
    const [players, setPlayers] = useState<PlayerInfo[]>([]);

    useEffect(() => {
        getPlayersFromNation(nationInfo.nation).then(e => {
            e.sort(
                (a, b) =>
                    positionsOrder[a.position as keyof object] -
                    positionsOrder[b.position as keyof object]
            );
            setPlayers(e);
        });
    }, []);

    const { loading, image, error } = useImage("qatar-stadium.png");

    return (
        <div className="modal">
            <img
                src={closeButton}
                alt="alt text here"
                className="modal-close-button"
                onClick={() => setOpenModal(false)}
            />
            <div className="img-nation">
                <img
                    src={error || loading ? "#" : image ? image : "#"} // if error or loading, use #. else if image, use image. else use #.
                    alt="alt text here"
                    className="nation-img"
                />
                <h3>{nationInfo.nation}</h3>
                {players.map((player, index) => {
                    // creating an object called props that is in the required format for props (see interface IPlayerProps)
                    const prop: IPlayerProps = { props: player };
                    return <Player props={prop.props} key={index} />;
                })}
            </div>
        </div>
    );
};

export default Modal;

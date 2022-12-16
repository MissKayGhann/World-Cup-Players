import Player from "./Player";
import { useState, useEffect } from "react";
import "./style.scss";
import { INationInfo, IPlayerProps, PlayerInfo } from "../../../types";
import useImage from "../../../utils/useImage";
import closeButton from "../../../assets/close-button.svg";
import getPlayersFromNation from "../../../utils/getPlayers";

interface IModalProps {
    setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
    nationInfo: INationInfo;
}

const Modal = ({ setOpenModal, nationInfo }: IModalProps): JSX.Element => {
    const [players, setPlayers] = useState<PlayerInfo[]>([]);

    useEffect(() => {
        getPlayersFromNation(nationInfo.nation).then(e => {
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

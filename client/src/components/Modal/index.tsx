import Player from "../Player";
import { useState, useEffect } from "react";
import "./style.scss";
import { NationInfo, IPlayerProps, PlayerInfo } from "../../types";
import closeButton from "../../assets/close-button.svg";
import getPlayersFromNation from "../../utils/getPlayers";
import StatsSummary from "../StatsSummary";

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
                    src={`https://github.com/gosquared/flags/blob/master/flags/flags/flat/64/${nationInfo.flag}?raw=true`}
                    alt="alt text here"
                    className="nation-img"
                />
                <h3>{nationInfo.nation}</h3>

                <div className="nation-stats">
                    <StatsSummary stat="Fifa Code" value={nationInfo.fifaCode} />
                    <StatsSummary stat="Points" value={nationInfo.points} />
                    <StatsSummary stat="Wins" value={nationInfo.wins} />
                    <StatsSummary stat="Losses" value={nationInfo.losses} />
                    <StatsSummary stat="Draws" value={nationInfo.draws} />
                    <StatsSummary stat="Goals" value={nationInfo.totalGoalsScored} />
                    <StatsSummary stat="Goals Conceived" value={nationInfo.totalGoalsConceived} />
                    <StatsSummary stat="Red Cards" value={nationInfo.totalRedCards} />
                    <StatsSummary stat="Yellow Cards" value={nationInfo.totalYellowCards} />
                    {/* <StatsSummary stat="Clean Sheets" value={nationInfo.} />
                    <StatsSummary stat="Clean Sheets" value={nationInfo.} /> */}
                </div>

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

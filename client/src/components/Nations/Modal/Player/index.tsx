import dropdownArrow from "../../../../assets/dropdown-arrow.svg";
import useImage from "../../../../utils/useImage";
import { IPlayerProps } from "../../../../types";
import "./style.scss";
import { FC } from "react";

const Player: FC<IPlayerProps> = ({ props }): JSX.Element => {
    const { loading, image, error } = useImage("qatar-stadium.png");
    console.log(loading, error); // THIS NEEDS TO BE REMOVED

    return (
        <>
            <div className="player-overview">
                <p className="player-name">
                    {props.name}{" "}
                    <span id="nation-and-position">
                        {props.team} // {props.position}
                    </span>
                </p>
                <img
                    src={dropdownArrow}
                    alt="A dropdown arrow. Press to view more details about this player"
                    className="dropdown-img"
                />
            </div>

            <section className="player-content">
                <img src={image ? image : "#"} alt={props.name} className="player-img" />
                <div className="player-stats">
                    <p>
                        {props.name}'s statistics for {props.team} in 2022:
                    </p>
                    <ul>
                        <li>Goals scored: {props.goalsScored}</li>
                        <li>Assists: {props.assists}</li>
                        <li>Yellow cards: {props.yellowCards}</li>
                        <li>Red cards: {props.redCards}</li>
                        <li>Man of the match count: {props.manOfMatchCount}</li>
                        <li>
                            Appearances for {props.team}: {props.capsForNation}
                        </li>
                        <li>
                            Goals for {props.team}: {props.goalsForNation}
                        </li>
                        <li>Club: {props.club}</li>
                    </ul>
                </div>
            </section>
        </>
    );
};

export default Player;

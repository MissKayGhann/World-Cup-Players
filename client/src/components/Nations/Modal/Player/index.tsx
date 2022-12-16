import dropdownArrow from "../../../../assets/dropdown-arrow.svg";
import useImage from "../../../../utils/useImage";
import { IPlayerProps } from "../../../../types";
import "./style.scss";
import { FC, useState } from "react";

const Player: FC<IPlayerProps> = ({ props }): JSX.Element => {
    const { loading, image, error } = useImage("qatar-stadium.png");

    const [classList, setClassList] = useState("hidden player-content");
    const [dropDownClasses, setDropDownClasses] = useState("dropdown-img");

    const handleDropDownClick = () => {
        if (classList === "hidden player-content") {
            setClassList("player-content");
            setDropDownClasses("rotate dropdown-img");

            // need to rotate the dropdown image
            // add a rotate animation in scss
            // have a rotate class in scss, which is then added along with 'player-content'
        } else {
            setClassList("hidden player-content");
            setDropDownClasses("dropdown-img");
        }
    };

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
                    className={dropDownClasses}
                    onClick={handleDropDownClick}
                />
            </div>

            <section className={classList}>
                <img
                    src={error || loading ? "#" : image ? image : "#"} // if error or loading, use #. else if image, use image. else, use #.
                    alt={props.name}
                    className="player-img"
                />
                <div className="player-stats">
                    <p>
                        {props.name}'s statistics for {props.team} in 2022:
                    </p>
                    <ul>
                        <li>Goals scored: {props.goalsForNation}</li>
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

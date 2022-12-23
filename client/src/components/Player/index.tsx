import dropdownArrow from "../../assets/dropdown-arrow.svg";
import useImage from "../../utils/useImage";
import StatsSummary from "../StatsSummary";
import { IPlayerProps } from "../../types";
import "./style.scss";
import { FC, useState } from "react";

const Player: FC<IPlayerProps> = ({ props }): JSX.Element => {
    const { loading, image, error } = useImage("qatar-stadium.png");

    const [classList, setClassList] = useState("hidden player-content");
    const [dropDownClasses, setDropDownClasses] = useState("dropdown-img");

    props.position = props.position ? props.position : "GK";
    props.shirtNumber = props.shirtNumber ? props.shirtNumber : 1;
    props.capsForNation = props.capsForNation ? props.capsForNation : 0;
    props.manOfMatchCount = props.manOfMatchCount ? props.manOfMatchCount : 0;
    props.goalsForNation = props.goalsForNation ? props.goalsForNation : 0;

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
            <div className="player-overview" onClick={handleDropDownClick}>
                <p className="player-name">
                    <span id="player-name">{props.name}</span>{" "}
                    <span id="nation-and-position">
                        {props.team} // {props.position ? props.position : ""}
                    </span>
                </p>
                <img
                    src={dropdownArrow}
                    alt="A dropdown arrow. Press to view more details about this player"
                    className={dropDownClasses}
                />
            </div>
            <section className={classList}>
                <div className="player-personal-info">
                    <img
                        src={props.photo ? props.photo : image && !loading && !error ? image : "#"} // if error or loading, use #. else if image, use image. else, use #.
                        alt={props.name}
                        className={`player-img ${props.height && props.weight ? "" : "large-img"}`}
                    />
                </div>
                <div className="player-stats players-grid">
                    {/* 9 stats to show:
                        position, shirtNumber, goals, assists, yellows, reds, manOfMatch, caps, nationGoals
                    */}

                    <StatsSummary stat={"Position"} value={props.position} />
                    <StatsSummary stat={"Shirt Number"} value={props.shirtNumber} />
                    <StatsSummary stat={"Caps"} value={props.capsForNation} />
                    <StatsSummary stat={"Goals Scored"} value={props.goals} />
                    <StatsSummary stat={"Assists"} value={props.assists} />
                    <StatsSummary stat={"Man of Match"} value={props.manOfMatchCount} />
                    <StatsSummary stat={"Yellow Cards"} value={props.yellowCards} />
                    <StatsSummary stat={"Red Cards"} value={props.redCards} />
                    <StatsSummary stat={`Goals for ${props.team}`} value={props.goalsForNation} />
                </div>
            </section>
        </>
    );
};

export default Player;

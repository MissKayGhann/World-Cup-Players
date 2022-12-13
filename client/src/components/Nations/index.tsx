import Modal from "./Modal";
import useImage from "../../utils/useImage";
import { useState } from "react";
import { INationInfo } from "../../types";
import "./style.scss";

interface INationProps {
    nation: string;
    imgFileName: string;
}

const Nations = ({ nation, imgFileName }: INationProps): JSX.Element => {
    const { loading, image, error } = useImage(imgFileName);

    const [classes, setClasses] = useState("hidden modal");

    const handleOnClick = () => {
        classes === "hidden modal" ? setClasses("modal") : setClasses("hidden modal");
    };

    let nationInfo: INationInfo = {
        nation: "Qatar",
        points: 12,
        flag: "../../assets/qatar-stadium.png",
    }; // dummy data for now – todo: grab nation-specific info from db (stats)

    return (
        <div className="">
            <div
                className="nation-box"
                onClick={handleOnClick}
                style={
                    // conditionally rendering the background using ternary operator
                    error || loading
                        ? { backgroundColor: "grey" }
                        : {
                              backgroundImage: `url("${image}")`,
                              backgroundSize: `160%`,
                              backgroundPosition: `center`,
                              backgroundRepeat: `no-repeat`,
                          }
                }
            >
                <div className="nation-horizontal-text">
                    <p>{nation}</p>
                </div>
            </div>
            <Modal classes={classes} nationInfo={nationInfo} />
        </div>
    );
};

export default Nations;

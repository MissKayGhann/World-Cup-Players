import Modal from "./Modal";
import useImage from "../../utils/useImage";
import { FC, useState } from "react";
import { INationProps } from "../../types";
import "./style.scss";

const Nations: FC<INationProps> = ({ props }: INationProps): JSX.Element => {
    const { loading, image, error } = useImage(props.flag);

    const [openModal, setOpenModal] = useState(false);

    // let nationInfo: NationInfo = {
    //     nation: "Qatar",
    //     fifaCode: "QAT",
    //     draws: 0,
    //     totalGoalsScored: 2,
    //     losses: 10,
    //     flag: "../../assets/qatar-stadium.png",
    //     cleanSheets: 0,
    //     points: -12,
    //     totalGoalsConceived: 9001,
    //     totalRedCards: 2,
    //     totalYellowCards: 4,
    //     wins: 0,
    // }; // dummy data for now – todo: grab nation-specific info from db (stats)

    return (
        <>
            <div
                className="nation-box"
                onClick={() => setOpenModal(true)}
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
                    <p>{props.nation}</p>
                </div>
            </div>

            {openModal && (
                <div className="modal-container">
                    <Modal setOpenModal={setOpenModal} nationInfo={props} />
                </div>
            )}
        </>
    );
};

export default Nations;

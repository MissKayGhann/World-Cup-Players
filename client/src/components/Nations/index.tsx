import Modal from "./Modal";
import useImage from "../../utils/useImage";
import { FC, useState } from "react";
import { INationProps } from "../../types";
import "./style.scss";

const Nations: FC<INationProps> = ({ props }: INationProps): JSX.Element => {
    const { loading, image, error } = useImage(props.flag);

    const [openModal, setOpenModal] = useState(false);

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

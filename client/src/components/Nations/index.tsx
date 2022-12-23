import Modal from "../Modal";
// import useImage from "../../utils/useImage";
import { FC, useState } from "react";
import { INationProps } from "../../types";
import "./style.scss";

const Nations: FC<INationProps> = ({ props }: INationProps): JSX.Element => {
    // const { loading, image, error } = useImage(props.flag);

    const [openModal, setOpenModal] = useState(false);

    return (
        <>
            <div
                className="nation-box"
                onClick={() => setOpenModal(true)}
                // style={{
                //     backgroundImage: `url(${
                //         "https://github.com/gosquared/flags/blob/master/flags/flags/flat/64/" +
                //         props.flag +
                //         "?raw=true"
                //     })`,
                //     backgroundSize: `100%`,
                //     backgroundPosition: `center`,
                //     backgroundRepeat: `no-repeat`,
                // }}
            >
                <div className="nation-horizontal-text">
                    <p>{props.nation}</p>
                </div>
                <img
                    src={`https://github.com/gosquared/flags/blob/master/flags/flags/flat/64/${props.flag}?raw=true`}
                    alt={`${props.nation}'s flag`}
                    className="nation-flag"
                />
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

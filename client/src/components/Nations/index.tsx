import "./style.scss";
import useImage from "../../utils/useImage";

interface INationProps {
    nation: string;
    imgFileName: string;
}
// client / src / assets / qatar - stadium.png;
const Nations = ({ nation, imgFileName }: INationProps): JSX.Element => {
    const { loading, image, error } = useImage(imgFileName);

    return (
        <div
            className="nation-box"
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
    );
};

export default Nations;

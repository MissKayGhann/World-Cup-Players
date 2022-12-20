import { FC } from "react";
import SearchBar from "../../components/SearchBar";
import "./style.scss";

interface IErrorPageProps {
    setRoute: React.Dispatch<React.SetStateAction<string>>;
}

const ErrorPage404: FC<IErrorPageProps> = ({ setRoute }) => {
    return (
        <div className="error-page-container">
            <SearchBar setRoute={setRoute} />
            <h1>404 ERROR: GO BACK NOW – BEFORE IT'S TOO LATE</h1>
        </div>
    );
};

export default ErrorPage404;

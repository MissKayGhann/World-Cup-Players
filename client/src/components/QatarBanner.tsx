import "../styles/QatarBanner.css";
import SearchBar from "./SearchBar";
import { FC } from "react";
import { IPageProps } from "../types";

interface IQatarBannerProps extends IPageProps {
    // setRoute: React.Dispatch<React.SetStateAction<string>>;
    // setQuery: React.Dispatch<React.SetStateAction<string>>;
}

const QatarBanner: FC<IQatarBannerProps> = ({ props }): JSX.Element => {
    return (
        <>
            <section className="qatar-banner-container">
                <SearchBar props={props} />
                <div className="banner-box">
                    <h1 className="fifa">FIFA WORLD CUP</h1>
                    <h1 className="qatar">QATAR 2022</h1>
                </div>
            </section>
        </>
    );
};

export default QatarBanner;

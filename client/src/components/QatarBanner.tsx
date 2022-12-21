import "../styles/QatarBanner.css";
import SearchBar from "./SearchBar";
import { FC } from "react";
import { PageProps, PlayerInfo } from "../types";

interface IQatarBannerProps {
    players: PlayerInfo[];
}

const QatarBanner: FC<PageProps<IQatarBannerProps>> = ({ props }): JSX.Element => {
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

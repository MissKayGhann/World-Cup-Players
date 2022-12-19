import "../styles/QatarBanner.css";
import SearchBar from "./SearchBar";

const QatarBanner = (): JSX.Element => {
    return (
        <>
            <section className="qatar-banner-container">
                <SearchBar />
                <div className="banner-box">
                    <h1 className="fifa">FIFA WORLD CUP</h1>
                    <h1 className="qatar">QATAR 2022</h1>
                </div>
            </section>
        </>
    );
};

export default QatarBanner;

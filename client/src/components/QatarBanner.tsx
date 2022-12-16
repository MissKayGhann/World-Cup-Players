import "../styles/QatarBanner.css";
import SearchBar from "./SearchBar";

const QatarBanner = (): JSX.Element => {
    return (
        <>
            <section>
                <div className="banner-box">
                    <SearchBar />
                    <h1 className="fifa">FIFA WORLD CUP</h1>
                    <h1 className="qatar">QATAR 2022</h1>
                </div>
            </section>
        </>
    );
};

export default QatarBanner;

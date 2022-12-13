import Logo from "../../components/Logo";
import QatarBanner from "../../components/QatarBanner";
import Nations from "../../components/Nations";
import "./index.css";

const Home = () => {
    return (
        <div className="main-wrapper">
            <header>
                <Logo />
                <QatarBanner />
            </header>
            <br />
            <main className="main">
                <Nations nation="England" imgFileName="qatar-stadium.png" />
            </main>
        </div>
    );
};
export default Home;

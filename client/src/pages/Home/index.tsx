import { useState, useEffect } from "react";
import QatarBanner from "../../components/QatarBanner";
import Nations from "../../components/Nations";
import { INationProps, NationInfo } from "../../types";
import getNations from "../../utils/getNations";
import "./style.scss";

const Home = () => {
    const [nations, setNations] = useState<NationInfo[]>([]);

    useEffect(() => {
        getNations()
            .then(e => e.sort((a, b) => (a.nation > b.nation ? 1 : -1)))
            .then(e => setNations(e));
    }, []);

    return (
        <div className="main-wrapper">
            <header>
                <QatarBanner />
            </header>
            <br />
            <main className="main">
                <div className="nations-container">
                    {nations.map((nation, index) => {
                        const prop: INationProps = { props: nation };
                        return <Nations props={prop.props} key={index} />;
                    })}
                </div>
            </main>
        </div>
    );
};
export default Home;

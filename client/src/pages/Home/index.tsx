import { FC } from "react";
import QatarBanner from "../../components/QatarBanner";
import Nations from "../../components/Nations";
import { DisplayInfo, INationProps } from "../../types";
import "./style.scss";

type HomeProps = DisplayInfo & {};

const Home: FC<HomeProps> = ({ props }) => {
    return (
        <div className="main-wrapper">
            <header>
                <QatarBanner props={props} />
            </header>
            <br />
            <main className="main">
                <div className="nations-container">
                    {props.nations.map((nation, index) => {
                        const prop: INationProps = { props: nation };
                        return <Nations props={prop.props} key={index} />;
                    })}
                </div>
            </main>
        </div>
    );
};
export default Home;

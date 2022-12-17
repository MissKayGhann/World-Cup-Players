import { FC } from "react";
import { IStatsSummaryProps } from "../../types/";
import "./style.scss";

const StatsSummary: FC<IStatsSummaryProps> = ({ stat, value }): JSX.Element => {
    return (
        <div className="stats-summary-container">
            <p className="player-stat">{stat}</p>
            <p className="player-stat-value">{value}</p>
        </div>
    );
};

export default StatsSummary;

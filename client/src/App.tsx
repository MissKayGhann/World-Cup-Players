import "./App.scss";
import Background from "./components/Background";
import Home from "./pages/Home";
import Results from "./pages/Results";
import ErrorPage404 from "./pages/ErrorPage404";
import { useEffect, useState } from "react";
import { IPageProps, ResultsProps, NationInfo, DisplayInfo, Query, PlayerInfo } from "./types";
import getNations from "./utils/getNations";
import getPlayersFromNation from "./utils/getPlayers";

function App(): JSX.Element {
    const [nations, setNations] = useState<NationInfo[]>([]);
    const [players, setPlayers] = useState<PlayerInfo[]>([]);
    const [route, setRoute] = useState<string>("home");
    const [query, setQuery] = useState<Query>({ query: "" });

    const routeStates = { setRoute: setRoute, setQuery: setQuery };
    const routeProps: IPageProps = { props: { ...routeStates } };
    const displayPageProps: ResultsProps & DisplayInfo = {
        props: { ...routeStates, query: query, nations: nations, players: players },
    };

    const handleRoute = () => {
        if (route === "home") {
            return <Home props={displayPageProps.props} />;
        } else if (route === "results") {
            return <Results props={displayPageProps.props} />;
        } else {
            return <ErrorPage404 props={routeProps.props} />;
        }
    };

    useEffect(() => {
        getNations()
            .then(e => e.sort((a, b) => (a.nation > b.nation ? 1 : -1)))
            .then(e => setNations(e));

        getPlayersFromNation().then(e => setPlayers(e));
    }, []);

    useEffect(() => {
        handleRoute();
    }, []);

    return (
        <div className="App">
            <Background />
            {handleRoute()}
        </div>
    );
}

export default App;

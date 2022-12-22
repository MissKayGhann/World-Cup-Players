import "./App.scss";
import Background from "./components/Background";
import Home from "./pages/Home";
import Results from "./pages/Results";
import ErrorPage404 from "./pages/ErrorPage404";
import { useEffect, useState } from "react";
import { PageProps, IResultsProps, NationInfo, Query, PlayerInfo, DisplayInfo } from "./types";
import getNations from "./utils/getNations";
import getPlayersFromNation from "./utils/getPlayers";

function App(): JSX.Element {
    const [nations, setNations] = useState<NationInfo[]>([]);
    const [players, setPlayers] = useState<PlayerInfo[]>([]);
    const [route, setRoute] = useState<string>("home");
    const [query, setQuery] = useState<Query>({ query: "", filterBy: "", min: 0, max: 0 });

    const routeStates = { route: route, setRoute: setRoute, setQuery: setQuery };

    // use PageProps generic type for page components
    const pageProps: PageProps<IResultsProps & DisplayInfo> = {
        props: {
            ...routeStates,
            nations: nations,
            players: players,
            query: query,
        },
    };

    const handleRoute = () => {
        if (route === "home") {
            return <Home props={pageProps.props} />;
        } else if (route === "results") {
            return <Results props={pageProps.props} />;
        } else {
            return <ErrorPage404 props={pageProps.props} />;
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
        console.log(route);
    }, [route]);

    return (
        <div className="App">
            <Background />
            {handleRoute()}
        </div>
    );
}

export default App;

import "./App.scss";
import Background from "./components/Background";
import Home from "./pages/Home";
import Results from "./pages/Results";
import ErrorPage404 from "./pages/ErrorPage404";
import { useEffect, useState } from "react";

function App(): JSX.Element {
    const [route, setRoute] = useState<string>("dasf");

    useEffect(() => {
        handleRoute();
    }, [route]);

    const routeProps = { props: { setRoute: setRoute } };

    const handleRoute = () => {
        if (route === "home") {
            return <Home props={routeProps.props} />;
        } else if (route === "results") {
            return <Results props={routeProps.props} />;
        } else {
            return <ErrorPage404 setRoute={setRoute} />;
        }
    };

    return (
        <div className="App">
            <Background />

            {/*
                using ternary operator – if route === "home", return Home component.
                else return Results component
            */}
            {handleRoute()}
        </div>
    );
}

export default App;

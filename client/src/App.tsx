import "./App.scss";
import Background from "./components/Background";
import Home from "./pages/Home";
import Results from "./pages/Results";
import { useEffect, useState } from "react";

function App(): JSX.Element {
    const [route, setRoute] = useState<string>("home");

    useEffect(() => {}, [route]);

    const routeProps = { props: { setRoute: setRoute } };
    return (
        <div className="App">
            <Background />

            {/*
                using ternary operator – if route === "home", return Home component.
                else return Results component
            */}
            {route === "home" ? (
                <Home props={routeProps.props} />
            ) : (
                <Results props={routeProps.props} />
            )}
        </div>
    );
}

export default App;

import "./App.scss";
import Background from "./components/Background";
// import Home from "./pages/Home";
import Results from "./pages/Results";

function App(): JSX.Element {
    return (
        <div className="App">
            <Background />
            <Results />
        </div>
    );
}

export default App;

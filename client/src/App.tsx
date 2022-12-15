import "./App.scss";
import Background from "./components/Background";
import Home from "./pages/Home";

function App(): JSX.Element {
    return (
        <div className="App">
            <Background />
            <Home />
        </div>
    );
}

export default App;

import Logo from "./components/Logo"
import Qatar_Banner from "./components/Qatar-Banner";
import Nations from './components/Nations';
import './index.css';

const Home = () => {
    return (
        <>
        <header>
            <Logo />
            <Qatar_Banner />
        </header>
        <br />
        <main>
            <Nations nation="England" imgSrc="#"/>
        </main>
        </>
    )
}
export default Home
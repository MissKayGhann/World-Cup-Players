import Logo from "../../components/Logo";
import QatarBanner from "../../components/QatarBanner";
import Nations from "../../components/Nations";
import "./index.css";

const Home = () => {
	return (
		<>
			<header>
				<Logo />
				<QatarBanner />
			</header>
			<br />
			<main>
				<Nations nation="England" imgFileName="qatar-stadium.png" />
			</main>
		</>
	);
};
export default Home;

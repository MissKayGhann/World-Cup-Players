import "../styles/Nations.css";

interface INationProps {
	nation: string;
	imgSrc: string;
	alt?: string;
}

const Nations = ({ nation, imgSrc, alt }: INationProps): JSX.Element => {
	return (
		<div className="nation-box">
			<p>{nation}</p>
			<img
				src="https://m.media-amazon.com/images/I/41Z2Sdr+uLL._AC_SX466_.jpg"
				alt={alt ? alt : "alt text here"}
			/>
		</div>
	);
};

export default Nations;

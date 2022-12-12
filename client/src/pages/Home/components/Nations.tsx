import '../components-styles/Nations.css';

interface INationProps {
  nation: string;
  imgSrc: string;
}

const Nations = ({nation, imgSrc}: INationProps) => {
    return (
        <div className="nation-box">
          <p>{nation}</p>
          <img src="https://m.media-amazon.com/images/I/41Z2Sdr+uLL._AC_SX466_.jpg" />
        </div>
    )
}

export default Nations
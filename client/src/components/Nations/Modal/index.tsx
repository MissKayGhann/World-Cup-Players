import "./style.scss";
import { INationInfo } from "../../../types";
import useImage from "../../../utils/useImage";
import closeButton from "../../../assets/close-button.svg";

interface IModalProps {
    setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
    nationInfo: INationInfo;
}

const Modal = ({ setOpenModal, nationInfo }: IModalProps): JSX.Element => {
    console.log("../" + nationInfo.flag);
    const { loading, image, error } = useImage("qatar-stadium.png");
    console.log(loading, error);
    return (
        <div className="modal">
            <img
                src={closeButton}
                alt="alt text here"
                className="modal-close-button"
                onClick={() => setOpenModal(false)}
            />
            <div className="img-nation">
                <img src={image ? image : "sldkajfh"} alt="alt text here" />
                <h3>{nationInfo.nation}</h3>
                <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet culpa voluptas
                    dolor quisquam! Vitae, iure ea! Ullam optio cupiditate beatae veritatis
                    laudantium? Possimus voluptatem fuga molestias iste voluptatum officiis
                    exercitatione Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo
                    consequatur amet corrupti voluptate reiciendis voluptatem nulla, dolores
                    veritatis ut quo. At quibusdam, in eius unde vel molestiae quam neque iure?
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit, expedita dolore
                    cupiditate quisquam, labore eveniet, eum odit aperiam sapiente eaque ipsa autem
                    officia sunt iste? Quasi totam numquam assumenda hic! Lorem ipsum dolor sit amet
                    consectetur adipisicing elit. Facilis, consequuntur neque sequi ducimus, minus a
                    voluptas saepe aspernatur, quis consectetur perferendis modi. Perferendis
                    accusamus magni eligendi omnis error eaque aliquid? Lorem ipsum dolor, sit amet
                    consectetur adipisicing elit. Molestiae, ea magni? Nulla voluptate vero sit quam
                    atque ab repellat culpa nesciunt enim. Temporibus non ad libero veniam quia
                    consequatur placeat. Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                    Sunt asperiores id possimus! Voluptas sint iure nemo ex reprehenderit,
                    necessitatibus ullam, totam tenetur iste voluptate blanditiis hic recusandae
                    quaerat expedita. Et. Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                    Animi, rem qui? Unde maiores ullam modi ipsam, quod aut, repellendus praesentium
                    esse reprehenderit facere odio magnam! Rerum nesciunt veniam ipsam placeat?
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo, accusantium
                    molestiae molestias harum perspiciatis numquam fugiat quos cupiditate soluta,
                    dicta sit quia dolorem recusandae enim adipisci est nostrum ducimus voluptas?
                    lorem Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit, expedita
                    dolore cupiditate quisquam, labore eveniet, eum odit aperiam sapiente eaque ipsa
                    autem officia sunt iste? Quasi totam numquam assumenda hic! Lorem ipsum dolor
                    sit amet consectetur adipisicing elit. Facilis, consequuntur neque sequi
                    ducimus, minus a voluptas saepe aspernatur, quis consectetur perferendis modi.
                    Perferendis accusamus magni eligendi omnis error eaque aliquid? Lorem ipsum
                    dolor, sit amet consectetur adipisicing elit. Molestiae, ea magni? Nulla
                    voluptate vero sit quam atque ab repellat culpa nesciunt enim. Temporibus non ad
                    libero veniam quia consequatur placeat. Lorem ipsum dolor sit, amet consectetur
                    adipisicing elit. Sunt asperiores id possimus! Voluptas sint iure nemo ex
                    reprehenderit, necessitatibus ullam, totam tenetur iste voluptate blanditiis hic
                    recusandae quaerat expedita. Et. Lorem, ipsum dolor sit amet consectetur
                    adipisicing elit. Animi, rem qui? Unde maiores ullam modi ipsam, quod aut,
                    repellendus praesentium esse reprehenderit facere odio magnam! Rerum nesciunt
                    veniam ipsam placeat? Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Nemo, accusantium molestiae molestias harum perspiciatis numquam fugiat quos
                    cupiditate soluta, dicta sit quia dolorem recusandae enim adipisci est nostrum
                    ducimus voluptas? lorem
                </p>
            </div>
        </div>
    );
};

export default Modal;

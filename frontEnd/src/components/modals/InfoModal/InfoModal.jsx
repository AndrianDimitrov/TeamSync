import { createPortal } from "react-dom";
import style from "./InfoModal.module.css";
import CloseIcon from "@mui/icons-material/Close";

const InfoModal = ({ showModal, onClose, description }) => {
  return createPortal(
    showModal ? (
      <div className={style.modal}>
        <div className={style.container}>
          <div className={style.remove} onClick={onClose}>
            <CloseIcon></CloseIcon>
          </div>
          <div className="content">{description}</div>
        </div>
      </div>
    ) : (
      <></>
    ),
    document.getElementById("modals")
  );
};

export default InfoModal;

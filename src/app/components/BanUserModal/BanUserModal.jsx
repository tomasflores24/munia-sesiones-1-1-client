import CloseIcon from "@mui/icons-material/Close";
import PropTypes from "prop-types";

import "./BanUserModalStyle.scss";
import { useEffect, useRef, useState } from "react";

const BanUserModal = ({ handleModal, onDelete, isLoading, title }) => {
  const [message, setMessage] = useState("");
  const modalRef = useRef(null);

  const onConfirm = () => {
    onDelete(message);
  };

  useEffect(() => {
    if (modalRef) {
      modalRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  return (
    <div className="modal__overlay" ref={modalRef}>
      <div className="modal__root">
        <CloseIcon className="closeIcon" onClick={() => handleModal(false)} />
        <h2 className="title">{title}</h2>
        <div className="modal__container">
          <section className="modal__body">
            <p className="subtitle">
              Esta accion es irreversibley eliminara al {title.toLowerCase()} de
              nuestra base de datos cancelando todas sus citas agendadas
            </p>

            <p className="label">Breve descripcion de la baja</p>

            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="message"
              cols="20"
              rows="6"
              title="message"
            />
          </section>

          <button
            onClick={onConfirm}
            className="modal__btn"
            disabled={isLoading}
          >
            {isLoading ? "Eliminando ..." : "Confirmar"}
          </button>
        </div>
      </div>
    </div>
  );
};

BanUserModal.propTypes = {
  handleModal: PropTypes.func,
  onDelete: PropTypes.func,
  isLoading: PropTypes.bool,
  title: PropTypes.string.isRequired,
};

export default BanUserModal;

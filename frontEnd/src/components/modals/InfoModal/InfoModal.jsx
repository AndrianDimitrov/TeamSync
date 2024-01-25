import { createPortal } from 'react-dom';
import classes from './InfoModal.module.css';

const InfoModal = ({ showModal, onClose }) => {
  return createPortal(
    showModal ? (
      <div className={classes['modal']}>
        <div className={classes['backdrop']}></div>
        <div className={classes['container']}>
          <div className={classes['remove']} onClick={onClose}>
            X
          </div>
        </div>
      </div>
    ) : (
      <></>
    ),
    document.getElementById('modals')
  );
};

export default InfoModal;

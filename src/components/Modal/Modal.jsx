import { createPortal } from 'react-dom';
import { Component } from 'react';
import css from './Modal.module.css';
const modalRoot = document.querySelector('#modal-root');

export default class Modal extends Component {


  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = e => {
    if (e.code === 'Escape') {
      this.props.onClose();
    }
  };

  handleModalClick = e => {
    const backdrop = document.querySelector('#backdrop');
    if (e.target === backdrop) {
      this.props.onClose();
    }
  };


  render() {
    const {
      pictureLink,
      pictureAlt
    } = this.props.modalData;
    return createPortal(
      <div
        id="backdrop"
        className={css.overlay}
        onClick={this.handleModalClick}
      >
        <div id="modal" className={css.modal}>
          {pictureLink && (
            <img src={pictureLink} alt={pictureAlt} />
          )}
        </div>
      </div>,
      modalRoot
    );
  }
}

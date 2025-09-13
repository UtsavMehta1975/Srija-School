import React from 'react';
import { Modal as BootstrapModal } from 'react-bootstrap';

const Modal = ({ show, onHide, title, children, size = 'md', centered = true }) => {
  return (
    <BootstrapModal
      show={show}
      onHide={onHide}
      size={size}
      centered={centered}
      backdrop="static"
      keyboard={false}
    >
      {title && (
        <BootstrapModal.Header closeButton>
          <BootstrapModal.Title>{title}</BootstrapModal.Title>
        </BootstrapModal.Header>
      )}
      <BootstrapModal.Body>
        {children}
      </BootstrapModal.Body>
    </BootstrapModal>
  );
};

export default Modal;


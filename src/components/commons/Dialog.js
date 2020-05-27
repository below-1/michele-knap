import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './Dialog.css'

export default function Dialog ({ children, onClose }) {
  return (
    <div className="dialog">
      <button
        className="appearance-none p-2"
        style={{
          position: 'relative',
          top: '10',
          left: '10'
        }}
        onClick={onClose}
      >
        <FontAwesomeIcon 
          size="2x"
          icon="window-close"
        ></FontAwesomeIcon>
      </button>
      {children}
    </div>
  );
}
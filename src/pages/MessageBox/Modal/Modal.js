import React, { useEffect } from 'react'
import './Modal.css'
import { useThemeContext } from '../../../hooks/useThemeContext'
import CloseIcon from '../../../icons/close.svg'

export default function Modal({ setOpenModal, modalText, modalHeader }) {
  const { mode } = useThemeContext()

  useEffect(() => {
    const close = (e) => {
      if (e.keyCode === 27){
        setOpenModal(false)
      }
    }
    window.addEventListener('keydown', close)
    return () => window.removeEventListener('keydown', close)
  }, [])

  return (
    <div className='overlay' onClick={() => setOpenModal(false)}>
      <div className={`msg-modal ${mode}`} onClick={(e) => e.stopPropagation()}>
        <div className='modal-header'>
          <p className={`modal-header-title ${mode}`}>{modalHeader}</p>
          <img 
            className={`close-icon ${mode}`} 
            src={CloseIcon} 
            onClick={() => setOpenModal(false)}
            alt="close-icon" 
          />
        </div>
        <hr className={`custom-hr ${mode}`} />
        <div className={`modal-body ${mode}`}>
          <p className={`modal-text ${mode}`}>{modalText}</p>
        </div>
      </div>
    </div>
  )
}

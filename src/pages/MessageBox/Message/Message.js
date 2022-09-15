import React from 'react'
import { useParams } from 'react-router-dom'
import './Message.css'
import deleteIcon from '../../../icons/trash.svg'
import { useThemeContext } from '../../../hooks/useThemeContext'
import { db } from '../../../firebase/config'
import { deleteDoc, doc } from 'firebase/firestore'
import formatDistanceToNow from 'date-fns/formatDistanceToNow'

export default function Message({ msg, setOpenModal, setModalText, setModalHeader }) {
  const { mode } = useThemeContext()
  const { userId, boxId } = useParams()
  const month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

  const handleModal = () => {
    setOpenModal(true)
    setModalHeader(
      formatDistanceToNow(msg.createdAt.toDate(), { addSuffix: true })
    )
    setModalText(msg.message)
  }

  const handleDelete = async () => {
    await deleteDoc(doc(db, 'users', userId, 'msg-box', boxId, 'messages', msg.id))
  }

  return (
    <div className={`msg ${mode}`} onClick={handleModal}>
      <p>{msg.message}</p>
      <div className='msg-footer'>
        <i>
          {formatDistanceToNow(msg.createdAt.toDate(), { addSuffix: true })}
        </i>
        <div 
          className={`delete-icon-btn ${mode}`} 
          onClick={(e) => {
            e.preventDefault()
            e.stopPropagation()
            window.confirm("Are you sure, you want to delete this Message?") && handleDelete()
          }}
        >
          <img src={deleteIcon} alt='delete-icon' />
        </div>
      </div>
    </div>
  )
}

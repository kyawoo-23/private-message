import React from 'react'
import { Link, useParams } from 'react-router-dom'
import './Box.css'
import deleteIcon from '../../../icons/trash.svg'
import { useThemeContext } from '../../../hooks/useThemeContext'
import { useAuthContext } from '../../../hooks/useAuthContext'
import { db } from '../../../firebase/config'
import { deleteDoc, doc } from 'firebase/firestore'

export default function Box({ data }) {
  const { mode } = useThemeContext()
  const { user } = useAuthContext()
  const month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

  const handleDelete = async () => {
    await deleteDoc(doc(db, 'users', user.uid, 'msg-box', data.id))
  }

  return (
    <Link to={`/${user.uid}/${data.id}`} className={`box ${mode}`}>
      <p className='box-title'>{data.title}</p>
      <div className='box-footer'>
        <i>
          {data.createdAt.toDate().getDate()}- 
          {month[data.createdAt.toDate().getMonth()]}-
          {data.createdAt.toDate().getFullYear()}
        </i>
        <div 
          className={`delete-icon-btn ${mode}`}
          onClick={(e) => {
            e.preventDefault()
            window.confirm("Are you sure, you want to delete this Message Box?") && handleDelete()
          }}
        >
          <img src={deleteIcon} alt='delete-icon' />
        </div>
      </div>
    </Link>
  )
}

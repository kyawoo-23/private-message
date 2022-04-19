import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './Create.css'
import { useThemeContext } from '../../hooks/useThemeContext'
import { useAuthContext } from '../../hooks/useAuthContext'
import { db, fbTimestamp } from '../../firebase/config'
import { addDoc, collection, doc } from 'firebase/firestore'

export default function Create() {
  const { mode } = useThemeContext()
  const { user } = useAuthContext()
  const [title, setTitle] = useState('')
  const [isPending, setIsPending] = useState(false)
  const navigate = useNavigate()

  const handleCreate = async (e) => {
    e.preventDefault()
    setIsPending(true)
    if (title.trim().length < 2) {
      alert('Title cannot be shorter than 2 characters')
      return
    }
    if (title.trim().length > 30) {
      alert('Title cannot be longer than 30 characters')
      return
    }
    const docRef = doc(db, 'users', user.uid)
    const colRef = collection(docRef, 'msg-box')
    const data = await addDoc(colRef, { 
      title: title.trim(), 
      createdAt: fbTimestamp
    })
    setIsPending(false)
    navigate(`/${user.uid}/${data.id}`)
  }

  return (
    <div className={`create ${mode}`}>
      <h1>Create a new Message Box</h1>
      <form onSubmit={handleCreate} className='create-form'>
        <label>Title of your new Message Box</label>
        <input
          type='text'
          className={`create-input ${mode}`}
          placeholder='Enter your Message Box Title'
          onChange={e => setTitle(e.target.value)}
          value={title}
          required
        />
        <button 
          type='submit'
          className={`create-btn ${mode}`}
          disabled={isPending}
        >
          {!isPending && 'Create'}
          {isPending && 'Creating'}
        </button>
      </form>
    </div>
  )
}

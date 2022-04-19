import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useThemeContext } from '../../../hooks/useThemeContext'
import './SendMessage.css'
import { db, fbTimestamp } from '../../../firebase/config'
import { collection, doc, addDoc, getDoc } from 'firebase/firestore'

export default function SendMessage() {
  const { mode } = useThemeContext()
  const { userId, boxId } = useParams()
  const [message, setMessage] = useState('')
  const [isPending, setIsPending] = useState(false)
  const [receiver, setReceiver] = useState(null)
  const navigate = useNavigate()

  const handleSend = async (e) => {
    e.preventDefault()
    setIsPending(true)
    const docRef = doc(db, 'users', userId, 'msg-box', boxId)
    const exist = await getDoc(docRef)
    if (exist.exists()) {
      const colRef = collection(docRef, 'messages')
      await addDoc(colRef, { 
        message, 
        createdAt: fbTimestamp
      })
      setIsPending(false)
      setMessage('') 
      alert('Message sent!')
    } else {
      setIsPending(false)
      setMessage('')
      if (!alert('Message box already deleted by its Owner :(')) {
        navigate('/')
      }
    }
  }

  useEffect(() => {
    getDoc(doc(db, 'users', userId))
      .then(data => {
        setReceiver(data.data().userName)
      })
  }, [])

  return (
    <form onSubmit={handleSend} className='send-form'>
      <p className={`send-title ${mode}`}>Send a private message to {receiver}</p>
      <textarea 
        className={`send-textarea ${mode}`}
        placeholder='Enter your private message'
        onChange={e => setMessage(e.target.value)}
        value={message}
        required
      />
      <button type='submit' className={`send-btn ${mode}`} disabled={isPending}>
        {!isPending && 'Send Message'}
        {isPending && 'Sending'}
      </button>
    </form>
  )
}

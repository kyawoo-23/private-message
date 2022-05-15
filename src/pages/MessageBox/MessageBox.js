import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import './MessageBox.css'
import Message from './Message/Message'
import SendMessage from './SendMessage/SendMessage'
import Modal from './Modal/Modal'
import NotFound from '../../components/NotFound/NotFound'
import { useThemeContext } from '../../hooks/useThemeContext'
import { useAuthContext } from '../../hooks/useAuthContext'
import { db } from '../../firebase/config'
import { doc, getDoc, query, orderBy, onSnapshot, collection } from 'firebase/firestore'
import copyIcon from '../../icons/copy.svg'
import copy from 'copy-to-clipboard'
import SortBtn from '../../components/SortBtn/SortBtn'

export default function MessageBox() {
  const { mode } = useThemeContext()
  const { user } = useAuthContext()
  const { userId, boxId } = useParams()
  const [exist, setExist] = useState(false)
  const [documents, setDocuments] = useState(null)
  const [isPending, setIsPending] = useState(false)
  const [error, setError] = useState(null)
  const [orderDesc, setOrderDesc] = useState(true)
  const [openModal, setOpenModal] = useState(false)
  const [modalHeader, setModalHeader] = useState(null)
  const [modalText, setModalText] = useState(null)

  useEffect(() => {
    setIsPending(true)
    getDoc(doc(db, 'users', userId, 'msg-box', boxId))
      .then(data => {
        setExist(data.exists())
      })
    let colRef = collection(db, 'users', userId, 'msg-box', boxId, 'messages')
    const q = query(colRef, orderBy('createdAt', orderDesc ? 'desc' : 'asc'))
    const unsub = onSnapshot(q, snapshot => {
      let results = []
      snapshot.docs.forEach(doc => {
        results.push({ ...doc.data(), id: doc.id })
      })
      setDocuments(results)
      setIsPending(false)
    })
    return () => unsub()
  }, [user, orderDesc])

  const handleCopy = (url) => {
    copy(url)
    alert('Link copied to clipboard')
  }

  return (
    <>
      {openModal && (
        <Modal 
          setOpenModal={setOpenModal} 
          modalHeader={modalHeader}
          modalText={modalText} 
        />
      )}
      {exist && user && (
        <div className='msg-box-header'>
          <div 
            className={`copy-url ${mode}`} 
            onClick={() => handleCopy(window.location.href)}
          >
            <span>{window.location.href}</span>
            <img className={`copy-icon ${mode}`} src={copyIcon} />
          </div>
          <SortBtn orderDesc={orderDesc} setOrderDesc={setOrderDesc} />
        </div>
      )}
      <div className={`msg-box ${mode}`}>
        {isPending && <p className={`msg-box-status ${mode}`}>Loading...</p>}
        {!isPending && exist && (
          user ? (
            user.uid === userId ? (
              documents.length !== 0 ? (
                documents.map((doc, idx) => (
                  <Message 
                    key={idx} 
                    msg={doc} 
                    setOpenModal={setOpenModal} 
                    setModalHeader={setModalHeader}
                    setModalText={setModalText} 
                  /> 
                ))
              ) : (
                <p className={`msg-box-status ${mode}`}>No Messages yet.</p>
              )
            ) : <SendMessage />
          ) : (
            <SendMessage />
          )
        )}
        {!isPending && !exist && (
          <NotFound />
        )}
      </div>
      {!isPending && exist && !user && (
        <p className={`create-account-link ${mode}`}>
          <span>Want to receive Private Messages?  Create an account right now! </span>
          <Link to='/login'>Sign up!</Link>
        </p>
      )}
    </>
  )
}

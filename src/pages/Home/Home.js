import React, { useEffect, useState } from 'react'
import './Home.css'
import { Link } from 'react-router-dom'
import { useThemeContext } from '../../hooks/useThemeContext'
import { useAuthContext } from '../../hooks/useAuthContext'
import Box from './Box/Box'
import { db } from '../../firebase/config'
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore'
import createIcon from '../../icons/new.svg'
import SortBtn from '../../components/SortBtn/SortBtn'

export default function Home() {
  const { mode } = useThemeContext()
  const { user } = useAuthContext()
  const [documents, setDocuments] = useState(null)
  const [isPending, setIsPending] = useState(false)
  const [orderDesc, setOrderDesc] = useState(true)

  useEffect(() => {
    setIsPending(true)
    let colRef = collection(db, 'users', user.uid, 'msg-box')
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
  }, [orderDesc])

  return (
    <>
      <div className={`home-header ${mode}`}>
        <h2>Please select a box to get Started!</h2>
        <SortBtn orderDesc={orderDesc} setOrderDesc={setOrderDesc} />
      </div>
      <div className='home'>
        <Link to='/create' className={`box ${mode}`}>
          <div className={`create-icon ${mode}`}>
            <img src={createIcon} alt='create-icon' />
            <p style={{textAlign: 'center'}} className='box-title'>Create new Message Box</p>
          </div>
        </Link>
        {!isPending && documents && (
          documents.map((doc, idx) => (
            <Box key={idx} data={doc} />
          ))
        )}
      </div>
    </>
  )
}

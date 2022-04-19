import { useState, useEffect } from 'react'
import { googleAuth, auth, db } from '../firebase/config'
import { signInWithPopup } from 'firebase/auth'
import { useAuthContext } from './useAuthContext'
import { doc, setDoc, getDoc, updateDoc } from 'firebase/firestore'

export const useSignInWithGoogle = () => {
  const [isCancelled, setIsCancelled] = useState(false)
  const [gError, setGError] = useState(null)
  const [isLoading, setisLoading] = useState(false)
  const { dispatch } = useAuthContext()

  const googleSignIn = async () => {
    setisLoading(true)
    try {
      const res = await signInWithPopup(auth, googleAuth)
      // console.log(res.user)
      if (!res) {
        throw new Error('Could not complete Google signin')
      }

      // create a user document
      const colRef = doc(db, 'users', res.user.uid)
      const data = await getDoc(colRef)
      if (data.exists()) {
        await updateDoc(colRef, {
          userName: res.user.displayName,
          photoURL: res.user.photoURL
        })
      } else {
        await setDoc(colRef, {
          userName: res.user.displayName,
          photoURL: res.user.photoURL
        })
      }
      // dispatch login action
      dispatch({ type: 'LOGIN', payload: res.user })
      // update state
      if (!isCancelled) {
        setGError(null)
        setisLoading(false)
      }
    } catch (err) {
      if (!isCancelled) {
        console.log(err.message)
        setGError(err.message)
        setisLoading(false)
      }
    }
    setisLoading(false)
  }

  useEffect(() => {
    return () => setIsCancelled(true)
  }, [])

  return { googleSignIn, gError, isLoading }
}
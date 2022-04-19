import React from 'react'
import { useNavigate } from 'react-router-dom'
import './NotFound.css'
import notFoundPng from '../../icons/not-found.png'
import { useThemeContext } from '../../hooks/useThemeContext'

export default function NotFound() {
  const { mode } = useThemeContext()
  const navigate = useNavigate()

  return (
    <div className={`not-found ${mode}`}>
      <img src={notFoundPng} alt="nothing found" />
      <p>Oops, looks like you are lost!</p>
      <div style={{display: 'flex', alignItems: 'center'}}>
        <p>Let's go back</p>
        <button 
          className={`goback-btn ${mode}`}
          onClick={() => navigate('/')}
        >
          Home
        </button>
      </div>
    </div>
  )
}

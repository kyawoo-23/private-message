import React from 'react'
import './Footer.css'
import { useThemeContext } from '../../hooks/useThemeContext'
import logoIcon from '../../icons/logo.webp'

export default function Footer() {
  const { mode } = useThemeContext()

  return (
    <footer className={mode}>
      <p style={{display: 'flex', alignItems: 'center'}}>
        <img src={logoIcon} alt='logo' className={`footer-logo ${mode}`}/>
        Secret Message . Website Project 
      </p>
      <p>
        Developed by 
        <a 
          href='https://kyawoo-23.github.io/' 
          target="_blank" 
          rel="noopener noreferrer"
        >
          <b> Kko</b>
        </a>
      </p>
    </footer>
  )
}

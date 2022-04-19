import React from 'react'
import { Link } from 'react-router-dom'
import './NavBar.css'
import darkIcon from '../../icons/dark_mode.svg'
import lightIcon from '../../icons/light_mode.svg'
import { useThemeContext } from '../../hooks/useThemeContext'
import { useAuthContext } from '../../hooks/useAuthContext'
import { useLogout } from '../../hooks/useLogout'

export default function NavBar() {
  const { mode, changeMode } = useThemeContext()
  const { user } = useAuthContext()
  const { logout, isPending, error } = useLogout()

  return (
    <div className='navbar'>
      <Link to='/' className={`navbar-text ${mode}`}>
        <h3>Private Message</h3>
      </Link>
      {user && (
        <div className={`navbar-btn navbar-text ${mode}`}>
          <div 
            className={`mode-icon ${mode}`} 
            onClick={() => changeMode(mode === 'dark' ? 'light' : 'dark')}
          >
            <img 
              src={mode === 'dark' ? lightIcon : darkIcon} 
              alt={`${mode}-mode icon`} 
            />
          </div>
          <p className='navbar-item'>{user.displayName}</p>
          <p 
            style={{cursor: 'pointer'}} 
            onClick={logout} 
            className='navbar-item'
          >
            {!isPending && 'Logout'}
            {isPending && 'Logging out'}
          </p>
        </div>
      )}
    </div>
  )
}

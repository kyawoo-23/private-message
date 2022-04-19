import React from 'react'
import './SortBtn.css'
import downArrowIcon from '../../icons/down-arrow.svg'
import upArrowIcon from '../../icons/up-arrow.svg'
import { useThemeContext } from '../../hooks/useThemeContext'

export default function SortBtn({ orderDesc, setOrderDesc }) {
  const { mode } = useThemeContext()

  return (
    <button className={`sort-btn ${mode}`} onClick={() => setOrderDesc(!orderDesc)}>
      <img
        src={orderDesc ? downArrowIcon : upArrowIcon} 
        alt={(orderDesc ? 'down' : 'up') + '-arrow'}
      />
      <span>Recent</span>
    </button>
  )
}

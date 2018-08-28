import React from 'react'
import './style.styl'

function Input({ value, onChange, ...otherProps }) {
  return (
    <input type="text" value={value || ''} onChange={onChange} {...otherProps} />
  )
}

export default Input
import React, { Component } from 'react'
import './style.styl'

class ItemWrapper extends Component {

  render() {
    const { label, children, ...otherProps } = this.props
    return (
      <div className='item-wrapper' {...otherProps}>
        <div className='label'>
          <span>{label}</span>
        </div>
        <div className='input-wrapper'>
          {children}
        </div>
      </div>
    )
  }
}

export default ItemWrapper
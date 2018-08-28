import React from 'react'
import Loadable from 'react-loadable'

const lazyload = loader => {
  return Loadable({
    loader,
    loading: ({ isLoading, error }) => {
      if (error) {
        return (
          <div style={{ minHeight: 300, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span>{error.message}</span>
          </div>
        )
      } else if (isLoading) {
        return (
          <div style={{ minHeight: 300, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            loading
          </div>
        )
      } else {
        return null
      }
    }
  })
};

export default lazyload
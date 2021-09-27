import React from 'react'

function BoxContainer({ children, style }) {
  return (
    <div style={{ backgroundColor:'#ffffff', borderRadius:25, padding:20, ...style }}>
      { children }
    </div>
  )
}

export default BoxContainer;

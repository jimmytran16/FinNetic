import React from 'react'

function BoxContainer({ children, title }) {
  return (
    <div style={{ backgroundColor:'#ffffff', borderRadius:25, padding:20 }}>
      <h4 style={{ padding:'8px 5px' }}>{title}</h4>
      { children }
    </div>
  )
}

export default BoxContainer;

import React from 'react'

function Button({ title, handleClick, id, idx,onDragOver,onDragEnter,onDrop,onDragLeave}) {
  
  return (
    <button
      className="dimension-buttons"
      id={id}
      onClick={handleClick}
      onDragOver={onDragOver}
      onDrop={onDrop}
      onDragEnter={onDragEnter}
      onDragLeave={onDragLeave}
    >
      {title}
    </button>
  )
}


export default Button;
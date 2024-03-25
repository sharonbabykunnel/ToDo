import React from 'react'


function Modal() {
  return (
    <div className='modalBackground'>
      <div className='modalContainer'>
        <h3>Edit content</h3>
        <div style={{display:'flex',justifyContent:'space-between'}}>
          <div>
          <label htmlFor="">Title</label>
          <input type="text" name="" id="" /> 
          </div>
          <div>
          <label htmlFor="">Description</label>
          <input type="text" name="" id="" />
          </div>
        </div>
        <div style={{display:'flex',justifyContent:'space-around',marginTop:'25px'}}>
          <button >Cancel</button>
          <button>Save</button>
        </div>
      </div>
    </div>
  )
}

export default Modal
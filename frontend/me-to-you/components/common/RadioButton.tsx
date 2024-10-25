import React from 'react'

function RadioButton() {
  return (
    <div className='flex space-x-6'>
      <div className='flex items-center space-x-2'>
        <input
          type="radio"
          value="남자"
          name="성별"
        />
        <label className='text-sm font-bold'>남자</label>
      </div>
      <div className='flex items-center space-x-2'>
        <input
          type="radio"
          value="여자"
          name="성별"
        />
        <label className='text-sm font-bold'>여자</label>
      </div>
    </div>
  )
}

export default RadioButton;

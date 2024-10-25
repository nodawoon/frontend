import React from 'react'

interface RadioProps {
  type?: string;
}

//베이스는 성별, "question_type" 입력시에는 문제 유형 선택

function RadioButton({ type = "gender" }: RadioProps) {

  return (
    <div>
      {type === "gender" ? (
        // 성별 선택 라디오 버튼
        <div className='flex space-x-6 justify-between items-center'>
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
      ) : type === "question_type" ? (
        // 문제 유형 선택 라디오 버튼
        <div className='flex space-x-6 justify-between items-center'>
          <div className='flex items-center space-x-2'>
            <input
              type="radio"
              value="multiple_choice"
              name="question_type"
            />
            <label className='text-sm font-bold'>객관식</label>
          </div>
          <div className='flex items-center space-x-2'>
            <input
              type="radio"
              value="short_answer"
              name="question_type"
            />
            <label className='text-sm font-bold'>단답형</label>
          </div>
          <div className='flex items-center space-x-2'>
            <input
              type="radio"
              value="long_answer"
              name="question_type"
            />
            <label className='text-sm font-bold'>서술형</label>
          </div>
        </div>
      ) : (
        <p>알 수 없는 양식</p>
      )}
    </div>
  );
}

export default RadioButton;

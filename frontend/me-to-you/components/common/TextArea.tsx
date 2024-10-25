import React, { useState, useRef, useEffect } from 'react';

interface textAreaProps {
  placeholder?: string;
  width: number;
  maxLength: number;
}

function TextArea({ placeholder = "500자 이내로 작성해주세요.", width, maxLength }: textAreaProps) {
  const [inputValue, setInputValue] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(e.target.value);
  };

  //줄 넘어갈 때마다 스크롤 자동으로 밑으로 보내는 함수
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.scrollTop = textareaRef.current.scrollHeight - textareaRef.current.clientHeight;
    }
  }, [inputValue]);

  return (
    <div className="relative" style={{ width: `${width}px` }}>
      <textarea
        ref={textareaRef} // ref로 textarea에 접근
        value={inputValue}
        onChange={handleInputChange}
        className='resize-none border-2 border-gray rounded-md p-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none scrollbar-thin scrollbar-thumb-gray scrollbar-track-soft-gray '
        placeholder={placeholder}
        style={{
          width: `${width}px`,
          height: `${width / 2}px`,
          paddingBottom: '30px',
        }}
        maxLength={maxLength}
      />
      <div className="absolute left-0.5 right-3 bottom-[8.5px] text-xs z-10 bg-white text-right px-2 py-1 rounded-sm">
        {inputValue.length} / {maxLength}
      </div>
    </div>
  );
}

export default TextArea;

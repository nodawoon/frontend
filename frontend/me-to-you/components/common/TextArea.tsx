import { useEffect, useRef } from "react";

interface textAreaProps {
  placeholder?: string;
  width: number;
  maxLength: number;
  disabled?: boolean;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void; // 이벤트 객체를 받도록 수정
}

function TextArea({
  width,
  maxLength,
  placeholder = `${maxLength}자 이내로 작성해주세요.`,
  disabled = false,
  value,
  onChange,
}: textAreaProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (onChange) {
      onChange(e);
    }
  };

  // 줄 넘어갈 때마다 스크롤 자동으로 밑으로 보내는 함수
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.scrollTop =
        textareaRef.current.scrollHeight - textareaRef.current.clientHeight;
    }
  }, [value]);

  return (
    <div className="relative" style={{ width: `${width}%` }}>
      <textarea
        ref={textareaRef}
        value={value} // 부모 컴포넌트의 상태 값 사용
        onChange={handleInputChange}
        className="resize-none border-2 border-gray rounded-md p-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none scrollbar-thin scrollbar-thumb-gray scrollbar-track-soft-gray mt-2"
        placeholder={placeholder}
        style={{
          width: "100%",
          paddingBottom: "30px",
        }}
        maxLength={maxLength}
        disabled={disabled}
      />
    </div>
  );
}

export default TextArea;

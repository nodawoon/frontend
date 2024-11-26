import React from "react";

interface QuestionGuideProps {
  handleClickQuestionItem: (questionText: string) => void;
}

const QuestionGuide: React.FC<QuestionGuideProps> = ({ handleClickQuestionItem }) => {
  const questionItems = [
    { label: "🥘 좋아하는 음식", question: "제일 좋아하는 음식이 뭐야?" },
    { label: "🥰 성격", question: "성격이 어떤 것 같아?" },
    { label: "🎁 받고 싶은 선물", question: "받고 싶은 선물 있어?" },
  ];

  return (
    <div className="w-full">
      <p className="font-medium text-sm">이런 것이 궁금하신가요?</p>
      <div className="flex gap-2 mt-2">
        {questionItems.map((item, index) => (
          <div
            key={index}
            className="bg-white rounded-lg cursor-pointer"
            onClick={() => handleClickQuestionItem(item.question)}
          >
            <p className="font-light text-sm p-2">{item.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuestionGuide;

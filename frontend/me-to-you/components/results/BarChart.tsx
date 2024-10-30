import React, { useRef, useState, useEffect } from "react";
import useScrollAnimation from "@/hooks/useScrollAnimation";

const values = [
  {
    id: 0,
    value: "친근하고 다정해 보였다",
    percent: "40",
  },
  {
    id: 1,
    value: "신중하고 조용한 느낌이었다",
    percent: "30",
  },
  {
    id: 2,
    value: "활발하고 외향적인 사람 같았다",
    percent: "15",
  },
  {
    id: 3,
    value: "독특하고 호기심을 끌었다",
    percent: "10",
  },
  {
    id: 4,
    value: "기타",
    percent: "5",
  },
];

const colors = ["bg-sub-sky", "bg-pink", "bg-green", "bg-yellow", "bg-soft-gray"];

const BarChart: React.FC = () => {
  const [counts, setCounts] = useState<number[]>(new Array(values.length).fill(0));

  const ref = useRef<HTMLDivElement | null>(null);
  const { isInViewport } = useScrollAnimation(ref);

  useEffect(() => {
    if (isInViewport) {
      values.forEach((item, index) => {
        const targetNumber = parseInt(item.percent);
        let currentNumber = 0;
        const duration = 1000;
        const steps = 60;
        const increment = targetNumber / steps;
        const interval = duration / steps;

        const timer = setInterval(() => {
          currentNumber += increment;
          if (currentNumber >= targetNumber) {
            currentNumber = targetNumber;
            clearInterval(timer);
          }
          setCounts(prev => {
            const newCounts = [...prev];
            newCounts[index] = Math.round(currentNumber);
            return newCounts;
          });
        }, interval);

        return () => clearInterval(timer);
      });
    }
  }, [isInViewport]);

  return (
    <div className="flex flex-col w-[90%] gap-8" ref={ref}>
      <div className="w-full h-8 flex mt-8">
        {values.map((obj, idx) => (
          <div
            key={obj.id}
            className={`h-8 origin-left ${isInViewport && "animate-slide-right"} ${colors[idx]} ${
              idx === 0 ? "rounded-l-lg" : ""
            } ${idx === values.length - 1 ? "rounded-r-lg" : ""}`}
            style={{
              width: `${obj.percent}%`,
              animationDelay: `${idx * 0.2}s`,
            }}
          ></div>
        ))}
      </div>
      <div>
        {values.map((obj, idx) => (
          <div key={obj.id} className="flex w-full justify-between my-1">
            <div className="flex gap-1 items-center">
              <div className={`${colors[idx]} w-4 h-4 rounded-full`}></div>
              <p className="text-light text-sm">{obj.value}</p>
            </div>
            <p className="text-light text-sm">{counts[idx]}%</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BarChart;

"use client";

import React, { useRef } from "react";
import useScrollAnimation from "@/hooks/useScrollAnimation";
import useAnimateCounts from "@/hooks/useCountAnimation";

const values = [
  { id: 0, value: "친근하고 다정해 보였다", percent: "40" },
  { id: 1, value: "신중하고 조용한 느낌이었다", percent: "30" },
  { id: 2, value: "활발하고 외향적인 사람 같았다", percent: "15" },
  { id: 3, value: "독특하고 호기심을 끌었다", percent: "10" },
  { id: 4, value: "기타", percent: "5" },
];

const colors = ["bg-sub-sky", "bg-pink", "bg-green", "bg-yellow", "bg-soft-gray"];

const BarChart: React.FC = () => {
  const ref = useRef<HTMLDivElement | null>(null);
  const { isInViewport } = useScrollAnimation(ref);
  const counts = useAnimateCounts(
    values.map(v => parseInt(v.percent)),
    isInViewport
  );

  return (
    <div className="flex flex-col w-[90%] gap-8" ref={ref}>
      <div className="w-full h-8 flex mt-8">
        {values.map((obj, idx) => (
          <div
            key={obj.id}
            className={`h-8 origin-left ${isInViewport ? "animate-slide-right" : ""} ${colors[idx]} ${
              idx === 0 ? "rounded-l-lg" : ""
            } ${idx === values.length - 1 ? "rounded-r-lg" : ""}`}
            style={{
              width: `${counts[idx]}%`,
              transition: "width 0.3s ease",
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

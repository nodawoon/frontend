import React, { useRef } from "react";
import useScrollAnimation from "@/hooks/useScrollAnimation";
import useAnimateCounts from "@/hooks/useCountAnimation";

interface PieSlice {
  value: string;
  percent: number;
}

const values: PieSlice[] = [
  { value: "1주일 이상도 쌉가능", percent: 40 },
  { value: "하루 종일 같이 있을 수 있다!", percent: 35 },
  { value: "3시간 이하면 괜찮을듯", percent: 22 },
  { value: "1분 1초도 함께 있고 싶지 않다", percent: 3 },
];

const colors = ["fill-sub-sky", "fill-pink", "fill-green", "fill-soft-gray"];
const bgColors = ["bg-sub-sky", "bg-pink", "bg-green", "bg-soft-gray"];

const PieChart: React.FC = () => {
  const ref = useRef<HTMLDivElement | null>(null);
  const { isInViewport } = useScrollAnimation(ref);

  const size = 160;
  const radius = size / 2;
  const center = size / 2;

  const circumference = 2 * Math.PI;

  const counts = useAnimateCounts(
    values.map(v => v.percent),
    isInViewport
  );

  const renderSlices = () => {
    let cumulativePercent = 0;

    return values.map((slice, index) => {
      const { percent } = slice;

      if (percent === 0) return null;

      const startAngle = cumulativePercent * circumference;
      const endAngle = (cumulativePercent + percent / 100) * circumference;

      const largeArcFlag = percent > 50 ? 1 : 0;

      const startX = center + radius * Math.cos(startAngle - Math.PI / 2);
      const startY = center + radius * Math.sin(startAngle - Math.PI / 2);

      const endX = center + radius * Math.cos(endAngle - Math.PI / 2);
      const endY = center + radius * Math.sin(endAngle - Math.PI / 2);

      const pathData = `
        M ${center} ${center}
        L ${startX} ${startY}
        A ${radius} ${radius} 0 ${largeArcFlag} 1 ${endX} ${endY}
        Z
      `;

      const midAngle = startAngle + (endAngle - startAngle) / 2;
      const textRadius = radius * 0.6;
      const textX = center + textRadius * Math.cos(midAngle - Math.PI / 2);
      const textY = center + textRadius * Math.sin(midAngle - Math.PI / 2);

      cumulativePercent += percent / 100;

      return (
        <g key={index}>
          <path
            d={pathData}
            className={`${colors[index]} ${isInViewport && "animate-fade-in"}`}
            stroke="#ffffff"
            strokeWidth="1"
          >
            <title>{`${percent}%`}</title>
          </path>
          {percent > 0 && (
            <text
              x={textX}
              y={textY}
              textAnchor="middle"
              dominantBaseline="middle"
              className={`text-sm text-white font-light ${
                isInViewport ? "animate-fade-in" : "opacity-0"
              }`}
            >
              {percent}%
            </text>
          )}
        </g>
      );
    });
  };

  return (
    <div className="w-[90%] mx-auto flex items-end justify-between mt-8" ref={ref}>
      <div>
        <svg width={size} height={size} className="block mx-auto">
          {renderSlices()}
        </svg>
      </div>
      <div>
        {values.map((obj, idx) => (
          <div key={idx} className="flex w-full justify-between my-1">
            <div className="flex gap-1 items-center mr-2">
              <div className={`${bgColors[idx]} w-2 h-2 rounded-full`}></div>
              <p className="text-light text-sm">{obj.value}</p>
            </div>
            <p className="text-light text-sm">{counts[idx]}%</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PieChart;

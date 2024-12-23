import React, { useEffect, useRef } from "react";
import useScrollAnimation from "@/hooks/useScrollAnimation";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { loadTimePercent } from "@/slice/statisticsSlice";

const colors = ["fill-sub-sky", "fill-pink", "fill-green", "fill-soft-gray"];
const bgColors = ["bg-sub-sky", "bg-pink", "bg-green", "bg-soft-gray"];

const PieChart: React.FC = () => {
  const ref = useRef<HTMLDivElement | null>(null);
  const { isInViewport } = useScrollAnimation(ref);

  const dispatch = useDispatch<AppDispatch>();
  const { timePercentList } = useSelector((state: RootState) => state.statistics);

  const size = 160;
  const radius = size / 2;
  const center = size / 2;

  const circumference = 2 * Math.PI;

  // TODO: 카운트 올라가는 애니메이션

  const renderSlices = () => {
    let cumulativePercent = 0;

    return timePercentList.map((slice, index) => {
      const { percent } = slice;

      if (percent === 0) return null;

      const startAngle = cumulativePercent * circumference;
      const endAngle = (cumulativePercent + percent / 100) * circumference;

      let pathData = "";
      let largeArcFlag = 0;

      if (percent < 100) {
        largeArcFlag = percent > 50 ? 1 : 0;

        const startX = center + radius * Math.cos(startAngle - Math.PI / 2);
        const startY = center + radius * Math.sin(startAngle - Math.PI / 2);

        const endX = center + radius * Math.cos(endAngle - Math.PI / 2);
        const endY = center + radius * Math.sin(endAngle - Math.PI / 2);

        pathData = `
        M ${center} ${center}
        L ${startX} ${startY}
        A ${radius} ${radius} 0 ${largeArcFlag} 1 ${endX} ${endY}
        Z
      `;

        cumulativePercent += percent / 100;
      } else if (percent === 100) {
        const startX = center;
        const startY = center - radius;

        const endX = center;
        const endY = center + radius;

        pathData = `
        M ${center} ${center}
        L ${startX} ${startY}
        A ${radius} ${radius} 0 1 1 ${endX} ${endY}
        A ${radius} ${radius} 0 1 1 ${startX} ${startY}
        Z
      `;
      }

      let textX = center;
      let textY = center;
      if (percent < 100) {
        const midAngle = startAngle + (endAngle - startAngle) / 2;
        const textRadius = radius * 0.6;
        textX = center + textRadius * Math.cos(midAngle - Math.PI / 2);
        textY = center + textRadius * Math.sin(midAngle - Math.PI / 2);
      } else {
        textX = center;
        textY = center;
      }

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
              className="text-sm text-white font-light"
            >
              {percent < 100 ? `${percent.toFixed(1)}%` : "100%"}
            </text>
          )}
        </g>
      );
    });
  };
  useEffect(() => {
    dispatch(loadTimePercent());
  }, [dispatch]);

  return timePercentList.length === 0 ? (
    <p className="flex h-full items-center" ref={ref}>
      아직 응답한 사람이 없어요😥
    </p>
  ) : (
    <div className="w-full flex items-center gap-2 justify-between">
      <div ref={ref}>
        <svg width={size} height={size} className="block">
          {renderSlices()}
        </svg>
      </div>
      <div>
        {timePercentList.map((obj, idx) => (
          <div key={idx} className="flex w-full justify-between my-1">
            <div className="flex gap-1 items-center mr-1">
              <div className={`${bgColors[idx]} w-2 h-2 rounded-full`}></div>
              <p
                className={`text-light text-sm xs-mobile:text-[9px] truncate max-w-[120px] xs-mobile:max-w-[60px] mobile:text-sm`}
              >
                {obj.response}
              </p>
            </div>
            <p className="text-light text-sm xs-mobile:text-[9px] ml-1">
              {obj.percent.toFixed(1)}%
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PieChart;

import React, { useRef } from "react";
import useScrollAnimation from "@/hooks/useScrollAnimation";
import useAnimateCounts from "@/hooks/useCountAnimation";

const values = [
  { ranking: 1, keyword: "친절한", count: 8 },
  { ranking: 2, keyword: "성실한", count: 5 },
  { ranking: 3, keyword: "공감능력", count: 3 },
];

const colors = ["bg-sub-sky", "bg-pink", "bg-green", "bg-yellow", "bg-soft-gray"];

const PodiumChart: React.FC = () => {
  const ref = useRef<HTMLDivElement | null>(null);
  const { isInViewport } = useScrollAnimation(ref);

  const sortedValues = [
    values.find(v => v.count === Math.min(...values.map(v => v.count)))!,
    values.find(v => v.count === Math.max(...values.map(v => v.count)))!,
    values.find(
      v =>
        v.count !== Math.max(...values.map(v => v.count)) &&
        v.count !== Math.min(...values.map(v => v.count))
    )!,
  ];
  const counts = useAnimateCounts(
    sortedValues.map(v => v.count),
    isInViewport
  );

  return (
    <div className="flex mx-auto gap-1" ref={ref}>
      {sortedValues.map((obj, idx) => (
        <div
          key={idx}
          className={`${isInViewport} flex flex-col items-center justify-end mt-8 ${isInViewport && "animate-slide-up"}`}
        >
          <p>{counts[idx]}표</p>
          <div
            className={`${colors[idx]} w-20 ${obj.ranking === 1 ? "h-[150px]" : obj.ranking === 2 ? "h-[100px]" : "h-[50px]"} rounded-tl-xl rounded-tr-xl`}
          ></div>
          <p className="mt-1 text-sm font-light">{obj.keyword}</p>
        </div>
      ))}
    </div>
  );
};

export default PodiumChart;

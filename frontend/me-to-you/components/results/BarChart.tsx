"use client";

import React, { useEffect, useRef } from "react";
import useScrollAnimation from "@/hooks/useScrollAnimation";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { loadFirstPercent } from "@/slice/statisticsSlice";

const colors = ["bg-sub-sky", "bg-pink", "bg-green", "bg-yellow", "bg-soft-gray"];

const BarChart: React.FC = () => {
  const ref = useRef<HTMLDivElement | null>(null);
  const { isInViewport } = useScrollAnimation(ref);

  const dispatch = useDispatch<AppDispatch>();
  const { firstPercentList } = useSelector((state: RootState) => state.statistics);

  // TODO: 카운트 올라가는 애니메이션

  useEffect(() => {
    dispatch(loadFirstPercent());
  }, [dispatch]);

  return firstPercentList.length === 0 ? (
    <p className="flex h-full items-center" ref={ref}>
      아직 응답한 사람이 없어요😥
    </p>
  ) : (
    <div className="flex flex-col w-[90%] gap-8" ref={ref}>
      <div className="w-full h-8 flex mt-8">
        {firstPercentList.map((obj, idx) => (
          <div
            key={idx}
            className={`h-8 origin-left ${isInViewport ? "animate-slide-right" : ""} ${colors[idx]} ${
              idx === 0 ? "rounded-l-lg" : ""
            } ${idx === firstPercentList.length - 1 ? "rounded-r-lg" : ""}`}
            style={{
              width: `${obj.percent}%`,
              transition: "width 0.3s ease",
            }}
          ></div>
        ))}
      </div>
      <div>
        {firstPercentList.map((obj, idx) => (
          <div key={idx} className="flex w-full justify-between my-1">
            <div className="flex gap-1 items-center">
              <div className={`${colors[idx]} w-4 h-4 rounded-full`}></div>
              <p className="text-light text-sm">{obj.response}</p>
            </div>
            <p className="text-light text-sm">{obj.percent.toFixed(1)}%</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BarChart;

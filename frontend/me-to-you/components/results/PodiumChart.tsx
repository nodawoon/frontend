import React, { useEffect, useRef } from "react";
import useScrollAnimation from "@/hooks/useScrollAnimation";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { loadKeywordCount } from "@/slice/statisticsSlice";

const colors = ["bg-green", "bg-sub-sky", "bg-pink"];

const PodiumChart: React.FC = () => {
  const ref = useRef<HTMLDivElement | null>(null);
  const { isInViewport } = useScrollAnimation(ref);

  const dispatch = useDispatch<AppDispatch>();
  const { keywordCountList } = useSelector((state: RootState) => state.statistics);

  const sortedValues = keywordCountList
    .slice(0, 3)
    .map((item, index) => ({
      ranking: index + 1,
      keyword: item.responseDetail,
      count: item.count,
    }))
    .sort((a, b) => {
      if (a.ranking === 3) return -1;
      if (b.ranking === 3) return 1;
      if (a.ranking === 1) return -1;
      if (b.ranking === 1) return 1;
      return 0;
    });

  // TODO: 카운트 올라가는 애니메이션

  useEffect(() => {
    dispatch(loadKeywordCount());
  }, [dispatch]);

  return (
    <div className="flex mx-auto gap-1" ref={ref}>
      {keywordCountList.length === 0 ? (
        <p className="-mt-32">아직 응답한 사람이 없어요😥</p>
      ) : (
        sortedValues.map((obj, idx) => (
          <div
            key={idx}
            className={`${isInViewport} flex flex-col items-center justify-end mt-8 ${isInViewport && "animate-slide-up"}`}
          >
            <p className="text-sm">{obj.count}표</p>
            <div
              className={`${colors[idx]} w-20 ${obj.ranking === 1 ? "h-[150px]" : obj.ranking === 2 ? "h-[100px]" : "h-[50px]"} rounded-tl-xl rounded-tr-xl`}
            ></div>
            <p className="mt-1 text-sm">{obj.keyword}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default PodiumChart;

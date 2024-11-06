import React from "react";
import BarChart from "@/components/results/BarChart";
import PieChart from "@/components/results/PieChart";
import PodiumChart from "@/components/results/PodiumChart";

interface StatisticsCardProps {
  type: "first" | "keyword" | "time";
}

const nickname = "김싸피";

const StatisticsCard: React.FC<StatisticsCardProps> = ({ type }) => {
  const title =
    type === "first"
      ? nickname + "님의 첫 인상은 어땠나요? 😄"
      : type === "keyword"
        ? nickname + "님과 잘 어울리는 키워드 순위 🥇"
        : nickname + "님과 함께 보낼 수 있는 시간 🥰";

  return (
    <div className="rounded-xl bg-light-gray w-[90%] h-80 m-auto flex flex-col justify-between p-8 items-center">
      <p className="text-black font-bold text-lg text-center">{title}</p>
      {type === "first" ? <BarChart /> : type === "keyword" ? <PodiumChart /> : <PieChart />}
    </div>
  );
};

export default StatisticsCard;

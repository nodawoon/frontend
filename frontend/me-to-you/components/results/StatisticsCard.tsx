import React, { useEffect } from "react";
import BarChart from "@/components/results/BarChart";
import PieChart from "@/components/results/PieChart";
import PodiumChart from "@/components/results/PodiumChart";
import { AppDispatch, RootState } from "@/store/store";
import { useDispatch, useSelector } from "react-redux";
import { loadUser } from "@/slice/userSlice";

interface StatisticsCardProps {
  type: "first" | "keyword" | "time";
}

const StatisticsCard: React.FC<StatisticsCardProps> = ({ type }) => {
  const dispatch: AppDispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.user);

  const title =
    type === "first"
      ? user.nickname + "님의 첫 인상은 어땠나요? 😄"
      : type === "keyword"
        ? user.nickname + "님과 잘 어울리는 키워드 순위 🥇"
        : user.nickname + "님과 함께 보낼 수 있는 시간 🥰";

  useEffect(() => {
    if (user.nickname === "") {
      dispatch(loadUser());
    }
  }, [dispatch, user.nickname]);

  return (
    <div className="rounded-xl bg-light-gray w-[90%] h-80 m-auto flex flex-col justify-between p-8 items-center">
      <p className="text-black font-bold text-lg text-center">{title}</p>
      {type === "first" ? <BarChart /> : type === "keyword" ? <PodiumChart /> : <PieChart />}
    </div>
  );
};

export default StatisticsCard;

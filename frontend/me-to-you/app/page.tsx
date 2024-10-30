import CardButton from "@/components/homePage/CardButton";

export default function Home() {
  return (
    <>
      <div className="flex flex-col mx-auto min-h-screen justify-center bg-light-gray">
        <p className="text-center my-6 text-[26px] font-bold">
          <span className="text-primary">남</span>이 보는 <span className="text-primary">내</span>{" "}
          모습을 알아보세요.
        </p>
        <div className="flex flex-col mx-auto w-[80%]">
          <CardButton
            page={1}
            className="my-1.5 min-w-full"
            title="설문 생성"
            text="설문을 생성해서 주변 사람들에게 공유해보세요."
          ></CardButton>
          <CardButton
            page={2}
            className="my-1.5 min-w-full"
            title="결과 확인"
            text="주변 사람들은 나를 어떻게 생각할까요?"
          ></CardButton>
          <CardButton
            page={3}
            className="my-1.5 min-w-full"
            title="챗봇 생성"
            text="챗봇에게 나에 대한 정보를 알려주세요."
          ></CardButton>
          <CardButton
            page={4}
            className="my-1.5 min-w-full"
            title="채팅 보기"
            text="어떤 사람이 나의 챗봇과 대화했는지 확인하세요."
          ></CardButton>
        </div>
      </div>
    </>
  );
}

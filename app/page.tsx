import CardButtonList from "@/components/home/CardButtonList";

export default function Home() {
  return (
    <>
      <div className="flex flex-col mx-auto min-h-[92vh] justify-start pt-[10%] bg-light-gray">
        <p className="text-center my-6 text-[26px] font-bold xs-mobile:text-2xl">
          <span className="text-primary">타인</span>이 보는 <span className="text-primary">내</span>{" "}
          모습을 알아보세요.
        </p>
        <div className="flex flex-col mx-auto w-[80%]">
          <CardButtonList
            titleList={["설문 생성", "결과 확인", "챗봇 학습", "챗봇 기록", "내가 참여한 채팅"]}
            textList={[
              "설문을 생성해서 주변 사람들에게 공유해보세요.",
              "주변 사람들은 나를 어떻게 생각할까요?",
              "챗봇에게 나에 대한 정보를 알려주세요.",
              "어떤 사람이 나의 챗봇과 대화했는지 확인하세요.",
              "친구들의 챗봇에게 궁금한 것을 물어보세요!",
            ]}
          />
          {/*<CardButton*/}
          {/*  page={1}*/}
          {/*  className="my-1.5 min-w-full"*/}
          {/*  title="설문 생성"*/}
          {/*  text="설문을 생성해서 주변 사람들에게 공유해보세요."*/}
          {/*></CardButton>*/}
          {/*<CardButton*/}
          {/*  page={2}*/}
          {/*  className="my-1.5 min-w-full"*/}
          {/*  title="결과 확인"*/}
          {/*  text="주변 사람들은 나를 어떻게 생각할까요?"*/}
          {/*></CardButton>*/}
          {/*<CardButton*/}
          {/*  page={3}*/}
          {/*  className="my-1.5 min-w-full"*/}
          {/*  title="챗봇 학습"*/}
          {/*  text="챗봇에게 나에 대한 정보를 알려주세요."*/}
          {/*></CardButton>*/}
          {/*<CardButton*/}
          {/*  page={4}*/}
          {/*  className="my-1.5 min-w-full"*/}
          {/*  title="챗봇 기록"*/}
          {/*  text="어떤 사람이 나의 챗봇과 대화했는지 확인하세요."*/}
          {/*></CardButton>*/}
          {/*<CardButton*/}
          {/*  page={5}*/}
          {/*  className="my-1.5 min-w-full"*/}
          {/*  title="내가 참여한 채팅"*/}
          {/*  text="친구들의 챗봇에게 궁금한 것을 물어보세요!"*/}
          {/*></CardButton>*/}
        </div>
      </div>
    </>
  );
}

"use client";

import Button from '@/components/common/Button';
import ProgressBar from '@/components/common/ProgressBar';
import RadioButton from '@/components/common/RadioButton';
import SelectButton from '@/components/common/SelectButton';
import TextArea from '@/components/common/TextArea';
import TextInput from '@/components/common/TextInput';
import { useState } from 'react';

export default function Home() {
  const [progress, setProgress] = useState(0);

  const click = () => {
    console.info("click");
  }

  const next = () => {
    if (progress < 100) {
      setProgress(prev => prev + 10);
    }
  }

  return <>
    <div className="font-bold underline">메인페이지</div>
    <div>공용 컴포넌트 - 버튼</div>
    <Button onClick={click} size='sm'>작은버튼</Button>
    <Button onClick={click} size='md'>중간버튼</Button>
    <Button onClick={click} size='lg'>큰버튼</Button>

    <div>
      선택 버튼
    </div>
    <SelectButton size='sm' />
    <SelectButton />
    <SelectButton size='lg' />

    <br />
    <br />
    <br />
    <SelectButton size='sm' type='multiple' amount={7} maximum={3} />

    <div className='text-center'>
      프로그레스 바
    </div>
    <ProgressBar progress={progress} width={45} />
    <br />
    <Button size='sm' onClick={next}>다음으로</Button>
    <br />

    <br />
    <br />
    <br />
    <TextInput width={40} />
    <br />
    <br />
    <br />
    <TextArea width={80} maxLength={200} />
    <br />
    <br />
    <br />
    <br />
    <br />
    <RadioButton />

  </>;
}

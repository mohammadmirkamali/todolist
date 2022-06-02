import { t } from 'i18next';
import React, { useEffect, useState } from 'react';
import { ExamInfoType, ExamType } from 'types/course.type';
import { faNumber } from 'utils/common.util';
import { message, Popconfirm, Radio } from 'antd';
import AntButton from 'components/Common/AntButton';
import styled from '@emotion/styled';
import request from 'services/request';
import { ExamResultUrl, LessonRoute } from 'services/routes';
import { useRouter } from 'next/router';
import useStopWatch from 'components/Common/StopWatch';
import Link from 'next/link';

const SGroup = styled(Radio.Group)<{ length: number }>`
  display: flex;
  flex-direction: ${({ length }): string => (length > 80 ? 'column' : 'row')};
`;

const ExamQuestions: React.FC<{ data: ExamType[]; info: ExamInfoType }> = ({
  data,
  info,
}) => {
  const router = useRouter();
  const { courseId, lessonId } = router.query;
  const [answers, setAnswers] = useState(new Array(data.length).fill(null));
  const [sendResult, setSendResult] = useState(false);
  const [loading, setLoading] = useState(false);
  const emptyQuestion = answers.filter((item) => item === null).length;
  const [startStopWatch, setStartStopWatch] = useState(false);
  const timer = useStopWatch(
    info.duration || info.number_of_questions * 90,
    startStopWatch,
  );
  const minutes = Math.floor(timer / 60);
  const seconds = timer - minutes * 60;

  useEffect(() => {
    setStartStopWatch(true);
  }, []);
  useEffect(() => {
    !timer && setStartStopWatch(false);
  }, [timer]);

  const handleSelect = (e, index): void => {
    const newAnswers = [...answers];
    newAnswers.splice(index, 1, e.target.value);
    setAnswers(newAnswers);
  };

  // need for option style
  const optionsLength = (item): number =>
    item.options.map((key) => key.option.length).reduce((a, b) => a + b, 0);

  const confirm = async (): Promise<void> => {
    setLoading(true);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const res: any = await request.post(ExamResultUrl(courseId, lessonId), {
      answers: JSON.stringify(answers).replace('[', '').replace(']', ''),
    });
    setSendResult(true);
    setLoading(false);
    res.data.passed
      ? message.success(t('exam.passed', { grad: faNumber(res.data.grade) }))
      : message.warn(t('exam.failed', { grad: faNumber(res.data.grade) }));
  };

  return (
    <div className="flex justify-center items-start min-h-[calc(100vh-70px)] bg-blue-7">
      <div className="w-[300px] relative md:w-[800px] mt-[60px] mb-[40px] md:mt-[40px] shadow-lg rounded-[8px] bg-white flex flex-col items-center p-[25px] md:p-[40px]">
        <div className="text-[20px] font-bold mb-[20px] md:mb-[30px]">
          {t('exam.questions')}
        </div>
        <div className="text-[14px] md:text-[16px] mb-[30px]">
          {data.map((item, index) => (
            <div key={item.question} className="mb-[24px]">
              <div className="mb-[8px]">
                {faNumber(index + 1)}. {item.question}
              </div>
              <SGroup
                onChange={(e): void => handleSelect(e, index)}
                length={optionsLength(item)}
                value={answers[index]}
              >
                {item.options.map((key) => (
                  <Radio key={key.id} value={key.id} disabled={!timer}>
                    {key.option}
                  </Radio>
                ))}
              </SGroup>
            </div>
          ))}
        </div>

        {sendResult ? (
          <Link href={LessonRoute(courseId, lessonId, 'exam')}>
            <a className="text-[18px]">{t('course.returnToLesson')}</a>
          </Link>
        ) : (
          <Popconfirm
            title={
              <div>
                {t('exam.confirm')}
                {!!emptyQuestion && (
                  <div className="text-red-0">
                    {t('exam.emptyQuestion', { count: emptyQuestion })}
                  </div>
                )}
              </div>
            }
            onConfirm={confirm}
            cancelText={t('global.no')}
            okText={t('global.yes')}
          >
            <AntButton width={250} fontSize={16} height={36} loading={loading}>
              {t('exam.submit')}
            </AntButton>
          </Popconfirm>
        )}

        <div
          className={`absolute top-[40px] left-[50px] ${
            !minutes && 'text-red-0'
          } w-[70px] h-[35px] bg-blue-11 center font-bold rounded-[4px] text-[16px]`}
        >
          {faNumber(seconds)} : {faNumber(minutes)}
        </div>
      </div>
    </div>
  );
};

export default ExamQuestions;

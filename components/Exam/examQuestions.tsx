import { t } from 'i18next';
import React, { useEffect, useState } from 'react';
import { ExamInfoType, ExamType } from 'types/course.type';
import { faNumber } from 'utils/common.util';
import { Popconfirm, Radio } from 'antd';
import AntButton from 'components/Common/AntButton';
import styled from '@emotion/styled';
import request from 'services/request';
import { ExamResultUrl, LessonRoute } from 'services/routes';
import { useRouter } from 'next/router';
import useStopWatch from 'components/Common/StopWatch';
import Link from 'next/link';
import LoadingBox from 'components/Common/LoadingBox';
import { useDispatch, useSelector } from 'react-redux';
import { getExamInfoAction } from 'store/course/course.action';

const SGroup = styled(Radio.Group)<{ length: number }>`
  display: flex;
  flex-direction: ${({ length }): string => (length > 80 ? 'column' : 'row')};
`;

type QuestionType = {
  data: ExamType[];
  info: ExamInfoType;
  error: boolean;
  reload: () => void;
};
const ExamQuestions: React.FC<QuestionType> = ({ data, info, error, reload }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { courseId, lessonId } = router.query;
  const [answers, setAnswers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [length, setLength] = useState(null);
  const emptyQuestion = answers.filter((item) => item === null).length;
  const [startStopWatch, setStartStopWatch] = useState(false);
  const timer = useStopWatch(length, startStopWatch);
  const minutes = Math.floor(timer / 60);
  const seconds = timer - minutes * 60;

  const examInfoError = useSelector((state) => state.course.examInfoError);

  const reloadData = (): void => {
    dispatch(getExamInfoAction(courseId, lessonId));
    reload();
  };

  useEffect(() => {
    info && setLength(info.duration || info.number_of_questions * 90);
    setTimeout(() => {
      data && info && setStartStopWatch(true);
    }, 10);
  }, [data, info]);
  useEffect(() => {
    (!timer || result) && setStartStopWatch(false);
  }, [timer]);
  useEffect(() => {
    data && setAnswers(new Array(data?.length).fill(null));
  }, [data]);

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
    setLoading(false);
    setResult(res.data);
  };

  return (
    <div className="flex justify-center items-start min-h-[calc(100vh-70px)] bg-blue-7">
      <div className="w-screen mx-[24px] relative md:w-[800px] mt-[60px] mb-[40px] md:mt-[40px] shadow-lg rounded-[8px] bg-white flex flex-col items-center p-[25px] md:p-[40px]">
        <div className="text-[16px] md:text-[20px] font-bold mb-[20px] md:mb-[30px]">
          {t('exam.questions')}
        </div>
        <LoadingBox
          data={data && info}
          error={error || examInfoError}
          reload={reloadData}
        >
          <div className="text-[14px] md:text-[16px] mb-[30px]">
            {data?.map((item, index) => (
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
                    <Radio key={key.id} value={key.id} disabled={!timer || result}>
                      <div
                        className={`${
                          result?.answers[index]?.correct_option === key.id
                            ? 'text-green-5'
                            : result?.answers[index]?.option_id === key.id
                            ? 'text-red-0'
                            : ''
                        }`}
                      >
                        {key.option}
                      </div>
                    </Radio>
                  ))}
                </SGroup>
              </div>
            ))}
          </div>

          {result ? (
            <div className="flex flex-col items-center">
              <div
                className={`text-[18px] ${result.passed ? 'text-green-5' : 'text-red-0'}`}
              >
                {t(`exam.${result.passed ? 'passed' : 'failed'}`, {
                  grade: faNumber(result.grade),
                })}
              </div>
              <div className="flex mb-[30px]">
                <div className="my-[8px]">{faNumber(t('exam.passGrad') as string)}</div>
                <div className="my-[8px] mr-[12px]">
                  {faNumber(info?.acceptance_percent)}
                </div>
              </div>
              <Link href={LessonRoute(courseId, lessonId, 'exam')}>
                <a className="text-[18px]">{t('course.returnToLesson')}</a>
              </Link>
            </div>
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
        </LoadingBox>

        <div
          className={`absolute md:top-[40px] md:left-[50px] top-[20px] left-[24px] ${
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

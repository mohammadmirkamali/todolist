import AntButton from 'components/Common/AntButton';
import LoadingBox from 'components/Common/LoadingBox';
import { t } from 'i18next';
import { useRouter } from 'next/router';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ExamRoute } from 'services/routes';
import { getExamInfoAction } from 'store/course/course.action';
import { ExamInfoType } from 'types/course.type';
import { faNumber } from 'utils/common.util';

const ExamInfo: React.FC<{ data: ExamInfoType }> = ({ data }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { courseId, lessonId } = router.query;
  const error = useSelector((state) => state.course.examInfoError);

  const reloadData = (): void => {
    dispatch(getExamInfoAction(courseId, lessonId));
  };

  return (
    <div className="center min-h-[calc(100vh-70px)] bg-blue-7">
      <div className="w-[300px] md:w-[400px] shadow-lg rounded-[8px] min-h-[400px] bg-white flex flex-col items-center p-[40px]">
        <LoadingBox data={data} error={error} reload={reloadData}>
          <div className="text-[18px] font-bold text-center">
            {data?.title.split('-').map((item) => (
              <div key={item}>{item}</div>
            ))}
          </div>
          <div className="mt-[50px] self-start text-[16px] flex">
            <div className="w-[150px]">
              <div className="my-[8px]">{faNumber(t('exam.passGrad') as string)}</div>
              <div className="my-[8px]">{t('exam.time')}</div>
              <div className="my-[8px]">{t('exam.questionNumbers')}</div>
              <div className="my-[8px]">{t('exam.type')}</div>
            </div>
            <div>
              <div className="my-[8px]">{faNumber(data?.acceptance_percent)}</div>
              <div className="my-[8px]">
                {faNumber(
                  !data?.duration
                    ? (data?.number_of_questions || 0) * 1.5
                    : data?.duration,
                )}
              </div>
              <div className="my-[8px]">{faNumber(data?.number_of_questions)}</div>
              <div className="my-[8px]">
                {t(`exam.${data?.qtype === 1 ? 'test' : 'descriptive'}`)}
              </div>
            </div>
          </div>
          <div className="mt-[0px] self-start text-[16px]">
            {!!data?.retry_exam && (
              <div className="my-[8px]">
                {t('exam.retryExam')} {faNumber(data?.retry_exam)}
              </div>
            )}
            {!!data?.needPay && (
              <div className="my-[8px]">
                {t('exam.payAmount')} {faNumber(data?.payAmount)}
              </div>
            )}
          </div>
          <AntButton
            width={250}
            height={36}
            fontSize={16}
            mt="50px"
            disabled={data?.needPay}
            href={ExamRoute(courseId, lessonId)}
          >
            {t('exam.start')}
          </AntButton>
        </LoadingBox>
      </div>
    </div>
  );
};

export default ExamInfo;

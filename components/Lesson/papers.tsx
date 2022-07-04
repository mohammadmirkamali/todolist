import { DownloadOutlined, UploadOutlined } from '@ant-design/icons';
import { Upload } from 'antd';
import AntButton from 'components/Common/AntButton';
import AntComment from 'components/Common/AntComment';
import AppForm from 'components/Common/appForm';
import FormField, { RadioForm, SubmitForm } from 'components/Common/formField';
import { t } from 'i18next';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import request from 'services/request';
import { SendTrainUrl } from 'services/routes';
import { LessonNotesType } from 'types/course.type';
import * as Yup from 'yup';

const Papers: React.FC<{ data: LessonNotesType }> = ({ data }) => {
  const router = useRouter();
  const { courseId, lessonId } = router.query;
  const [loading, setLoading] = useState(false);
  const [fileList, setFileList] = useState([]);
  const user = useSelector((state) => state.account.user);

  const validationSchema = Yup.object({
    title: Yup.string().required(t('account.emptyField')),
    type: Yup.number().required(t('account.emptyField')),
    description: Yup.string().required(t('account.emptyField')),
  });

  return (
    <div className="md:p-[30px] pt-[10px] text-[16px] pb-[20px]">
      {user && (
        <div className=" border border-gray-1 rounded-[6px] mx-[16px] p-[16px]">
          <div className="text-[16px] md:text-[20px] font-bold">
            {t('course.sendPaper')}
          </div>

          <AppForm
            initialValues={{ title: '', type: '', description: '' }}
            validationSchema={validationSchema}
            onSubmit={async (values, { resetForm }): Promise<void> => {
              setLoading(true);
              const formData = new FormData();
              formData.append('attachment', fileList[0]);
              const body = { ...values };
              const res = await request.post(SendTrainUrl(courseId, lessonId), body);
              setLoading(false);
              //   result && resetForm();
            }}
          >
            <div className="flex flex-col md:flex-row">
              <div className="flex-1 md:pl-[24px]">
                <div className="text-[11px] md:text-[14px] mr-[4px] mt-[16px]">
                  {t('global.title3')}
                </div>
                <FormField
                  autoFocus
                  name="title"
                  type="text"
                  placeholder={t('global.title3')}
                  className="w-full h-[40px] border rounded-[6px] pt-[3px] px-[15px] text-[14px] md:text-[16px]"
                />

                <div className="text-[11px] md:text-[14px] mr-[4px] mt-[16px]">
                  {t('course.paperType')}
                </div>
                <RadioForm
                  items={[
                    { title: t('course.exercise'), value: '1' },
                    { title: t('course.paper'), value: '2' },
                    { title: t('course.otherTypes'), value: '3' },
                  ]}
                  name="type"
                />

                <div className="w-full my-[16px]">
                  <Upload onChange={(item): void => setFileList(item.fileList)}>
                    <AntButton fontSize={16}>
                      {t('course.uploadFile')}{' '}
                      <span className="ml-[6px]">
                        <UploadOutlined />
                      </span>
                    </AntButton>
                  </Upload>
                </div>
              </div>
              <div className="flex-1 md:pl-[16px] mb-[12px]">
                <div className="text-[11px] md:text-[14px] mr-[4px] mt-[16px]">
                  {t('global.description')}
                </div>
                <FormField
                  autoFocus
                  name="description"
                  type="textarea"
                  placeholder={t('global.description')}
                  className="w-full h-[150px] border rounded-[6px] pt-[3px] px-[15px] text-[16px]"
                />
              </div>
            </div>
            <SubmitForm
              width={[160, 250]}
              fontSize={16}
              height={35}
              loading={loading}
              title={t('global.send')}
            />
          </AppForm>
        </div>
      )}
      {data.trainings.map((train) => (
        <div
          className="m-[16px] bg-blue-11 py-[16px] items-center flex md:p-[16px] rounded-[6px] pb-[20px]"
          key={train.description}
        >
          <AntComment
            text={train.description}
            avatar={train.user.avatar}
            name={train.user.nickname}
            title={train.title}
          />
          {train.attachment?.includes('pdf') && (
            <a className="mx-[12px] text-[24px] text-black" href={train.attachment}>
              <DownloadOutlined />
            </a>
          )}
        </div>
      ))}
    </div>
  );
};

export default Papers;

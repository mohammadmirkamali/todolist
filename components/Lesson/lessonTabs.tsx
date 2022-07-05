/* eslint-disable import/no-unresolved */
import React, { useEffect, useState } from 'react';
import { t } from 'i18next';
import { CourseType, LessonNotesType } from 'types/course.type';
import { calcTime } from 'utils/common.util';
import { Checkbox, message } from 'antd';
import AntButton from 'components/Common/AntButton';
import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import request from 'services/request';
import { DeleteNoteUrl, SendNoteUrl } from 'services/routes';
import Papers from './papers';
import LoadingBox from 'components/Common/LoadingBox';
import { CloseOutlined } from '@ant-design/icons';
import AntComment from 'components/Common/AntComment';
import UserComment from 'components/Course/comment';

const SCheckbox = styled(Checkbox)`
  font-size: 12px;

  ${({ theme }): string => theme.mediaQueries.sm} {
    font-size: 16px;
  }
`;

type LessonTabsType = {
  data: LessonNotesType;
  error: boolean;
  course: CourseType;
  player: any; // eslint-disable-line
  reload: () => void;
};
const LessonTabs: React.FC<LessonTabsType> = ({
  data,
  error,
  course,
  player,
  reload,
}) => {
  const router = useRouter();
  const { courseId, lessonId } = router.query;
  const [tabs, setTabs] = useState([]);
  const [slide, setSlide] = useState('');
  const [showPublic, setShowPublic] = useState(1);
  const [myNotes, setMyNotes] = useState([]);
  const [newNote, setNewNote] = useState('');
  const [loading, setLoading] = useState(false);
  const [time, setTime] = useState(0);

  useEffect(() => {
    if (data) {
      const tab = [];
      course?.registered && tab.push('myComments');
      !!data?.notes.length && tab.push('publicComments');
      (course?.registered || !!data.questions.length) && tab.push('questions');
      (course?.registered || !!data.trainings.length) && tab.push('papers');
      setTabs(tab);
      setSlide(tab[0] || null);
      setMyNotes(data.my_notes);
    }
  }, [data, course]);

  const sendNote = async (): Promise<void> => {
    const body = { public: showPublic, text: newNote, time };
    setLoading(true);
    const res: any = await request.post(SendNoteUrl(courseId, lessonId), body); // eslint-disable-line
    setLoading(false);
    if (res.ok) {
      message.success(res.data?.message);
      setMyNotes([{ showPublic, text: newNote, time }, ...myNotes]);
      setNewNote('');
    } else {
      message.error(res.data?.message);
    }
  };

  const handleDeleteNote = async (note): Promise<void> => {
    setMyNotes(myNotes.filter((item) => item.id !== note.id));
    const res = await request.delete(DeleteNoteUrl(course.id, note.lesson_id, note.id));
    res.ok && message.success((res as any).data.message); // eslint-disable-line
  };

  return (
    <div>
      <div className="text-[12px] md:text-[18px] m-[30px] mb-[10px]">
        {tabs.map((item, index) => (
          <span key={item} aria-hidden="true" onClick={(): void => setSlide(item)}>
            <span
              className={`mx-[10px] link ${slide === item && 'font-bold text-black'}`}
            >
              {t(`course.${item}`)}
            </span>
            {index !== tabs.length - 1 && '/'}
          </span>
        ))}
      </div>

      <LoadingBox data={data} error={error} reload={reload}>
        {slide === 'myComments' && (
          <div className="p-[30px] pt-[10px] min-h-[300px]">
            <textarea
              value={newNote}
              onFocus={(): void => setTime(Math.floor(player.current?.plyr.currentTime))}
              onChange={(e): void => setNewNote(e.target.value)}
              className="border border-gray-5 rounded-[8px] w-full h-[100px] my-[15px] toLeft text-[16px] p-[10px]"
            />
            <div className="flex justify-between text-[14px] md:text-[18px] items-center">
              <SCheckbox
                checked={showPublic === 1}
                onChange={(e): void => setShowPublic(e.target.checked ? 1 : 0)}
              >
                {t('course.showPublic')}
              </SCheckbox>
              <AntButton
                fontSize={[12, 18]}
                width={[100, 250]}
                height={[30, 40]}
                disabled={!newNote}
                onClick={sendNote}
                loading={loading}
              >
                {t('course.addComment')}
              </AntButton>
            </div>

            <div className="text-[16px] h-fit">
              {myNotes?.map((note) => (
                <div
                  className="my-[16px] bg-blue-11 relative p-[16px] pl-[32px] break-all rounded-[6px]"
                  key={note.text}
                >
                  <CloseOutlined
                    className="absolute left-7 cursor-pointer"
                    onClick={(): Promise<void> => handleDeleteNote(note)}
                  />
                  {note.text}
                  <div className="mt-[8px]">{calcTime(note.time)}</div>
                </div>
              ))}
            </div>
          </div>
        )}
        {slide === 'publicComments' && (
          <div className="p-[30px] pt-[10px] text-[16px]">
            {data?.notes.map((note) => (
              <div className="m-[16px] bg-blue-11 p-[16px] rounded-[6px]" key={note.text}>
                <AntComment
                  text={note.text}
                  avatar={note.user.avatar}
                  name={note.user.nickname}
                />
                <div className="mr-[32px]">{calcTime(note.time)}</div>
              </div>
            ))}
          </div>
        )}
        {slide === 'questions' && (
          <div className="p-[24px]">
            <UserComment
              type="workshops"
              data={data?.questions}
              id={course?.id}
              register={course?.registered}
            />
          </div>
        )}
        {slide === 'papers' && <Papers data={data} />}
      </LoadingBox>
    </div>
  );
};

export default LessonTabs;

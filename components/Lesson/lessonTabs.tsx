/* eslint-disable import/no-unresolved */
import React, { useEffect, useState } from 'react';
import { t } from 'i18next';
import { LessonNotesType } from 'types/course.type';
import { calcTime } from 'utils/common.util';
import { Checkbox, message, Skeleton } from 'antd';
import AntButton from 'components/Common/AntButton';
import styled from '@emotion/styled';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import request from 'services/request';
import { SendNoteUrl } from 'services/routes';
import Papers from './papers';

const SCheckbox = styled(Checkbox)`
  font-size: 18px;
`;

type LessonTabsType = { data: LessonNotesType; error: boolean; player: any }; // eslint-disable-line
const LessonTabs: React.FC<LessonTabsType> = ({ data, error, player }) => {
  const router = useRouter();
  const { courseId, lessonId } = router.query;
  const [tabs, setTabs] = useState([]);
  const [slide, setSlide] = useState('');
  const [showPublic, setShowPublic] = useState(1);
  const [myNotes, setMyNotes] = useState([]);
  const [newNote, setNewNote] = useState('');
  const [loading, setLoading] = useState(false);
  const user = useSelector((state) => state.account.user);

  useEffect(() => {
    if (data) {
      const tab = [];
      user && tab.push('myComments');
      !!data.notes.length && tab.push('publicComments');
      !!data.trainings.length && tab.push('papers');
      setTabs(tab);
      setSlide(tab[0] || null);
    }
  }, [data, user]);

  const sendNote = async (): Promise<void> => {
    const time = Math.floor(player.current?.plyr.currentTime);
    const body = { public: showPublic, text: newNote, time };
    setLoading(true);
    const res: any = await request.post(SendNoteUrl(courseId, lessonId), body); // eslint-disable-line
    setLoading(false);
    if (res.ok) {
      message.success(res.data.message);
      setMyNotes([{ showPublic, text: newNote, time }, ...myNotes]);
      setNewNote('');
    } else {
      message.error(res.data.message);
    }
  };

  return (
    <div>
      <div className="text-[14px] md:text-[18px] m-[30px] mb-[10px]">
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

      {data ? (
        <div>
          {slide === 'myComments' && (
            <div className="p-[30px] pt-[10px] min-h-[300px]">
              <textarea
                value={newNote}
                onChange={(e): void => setNewNote(e.target.value)}
                className="border border-gray-5 rounded-[8px] w-full h-[100px] my-[15px] toLeft text-[16px] p-[10px]"
              />
              <div className="flex justify-between text-[18px] items-center">
                <SCheckbox
                  checked={showPublic === 1}
                  onChange={(e): void => setShowPublic(e.target.checked ? 1 : 0)}
                >
                  {t('course.showPublic')}
                </SCheckbox>
                <AntButton
                  fontSize={20}
                  width={250}
                  height={40}
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
                    className="my-[16px] bg-blue-11 p-[16px] rounded-[6px]"
                    key={note.text}
                  >
                    {note.text}
                    <div className="mt-[8px]">{calcTime(note.time)}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
          {slide === 'publicComments' && (
            <div className="p-[30px] pt-[10px] text-[16px]">
              {data.notes.map((note) => (
                <div
                  className="m-[16px] bg-blue-11 p-[16px] rounded-[6px]"
                  key={note.text}
                >
                  {note.text}
                  <div className="mt-[8px]">{calcTime(note.time)}</div>
                </div>
              ))}
            </div>
          )}
          {slide === 'papers' && <Papers data={data} />}
        </div>
      ) : error ? (
        <div>error</div>
      ) : (
        <Skeleton className="p-[40px]" active />
      )}
    </div>
  );
};

export default LessonTabs;

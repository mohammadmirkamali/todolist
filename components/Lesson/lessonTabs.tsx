/* eslint-disable import/no-unresolved */
import React, { useEffect, useState } from 'react';
import { SwiperSlide, Swiper } from 'swiper/react';
import 'swiper/css';
import { t } from 'i18next';
import { LessonNotesType } from 'types/course.type';
import { calcTime } from 'utils/common.util';
import { Checkbox, Skeleton } from 'antd';
import AntComment from 'components/Common/AntComment';
import AntButton from 'components/Common/AntButton';
import styled from '@emotion/styled';

const SCheckbox = styled(Checkbox)`
  font-size: 18px;
`;

type LessonTabsType = { data: LessonNotesType; error: boolean; player: any }; // eslint-disable-line
const LessonTabs: React.FC<LessonTabsType> = ({ data, error, player }) => {
  const [swiper, setSwiper] = useState({} as any); // eslint-disable-line
  const [tabs, setTabs] = useState(['myComments', 'publicComments', 'papers']);
  const [slideId, setSlideId] = useState(0);
  const [showPublic, setShowPublic] = useState(true);
  const [myNotes, setMyNotes] = useState([]);
  const [newNote, setNewNote] = useState('');

  useEffect(() => {
    if (data) {
      const tab = ['myComments', 'publicComments', 'papers'];
      data.notes.length && tab.filter((k) => k !== 'publicComments');
      data.trainings.length && tab.filter((k) => k !== 'papers');
      setTabs(tab);
    }
  }, [data]);

  const onSlide = (item): void => {
    const index = item.activeIndex;
    const { length } = tabs;
    // handle changing last and first slide. it a swiper bug
    setSlideId(index === length + 1 ? 0 : !index ? length - 1 : index - 1);
  };
  return (
    <div>
      <div className="text-[14px] md:text-[18px] m-[30px] mb-[10px]">
        {tabs.map((item, index) => (
          <span
            key={item}
            aria-hidden="true"
            onClick={(): void => (setSlideId(index), swiper.slideTo(index + 1))}
          >
            <span
              className={`mx-[10px] link ${slideId === index && 'font-bold text-black'}`}
            >
              {t(`course.${item}`)}
            </span>
            {index !== tabs.length - 1 && '/'}
          </span>
        ))}
      </div>

      {data ? (
        <Swiper
          loop={tabs.length > 1}
          autoHeight
          initialSlide={0}
          onInit={(item): void => setSwiper(item)}
          className="h-full"
          onSlideChange={onSlide}
        >
          <SwiperSlide className="">
            <div className="px-[30px] min-h-[400px] mb-[40px] overflow-auto">
              <textarea
                value={newNote}
                onChange={(e): void => setNewNote(e.target.value)}
                className="border border-gray-5 rounded-[8px] w-full h-[100px] my-[15px] toLeft text-[16px] p-[10px]"
              />
              <div className="flex justify-between text-[18px] items-center">
                <SCheckbox
                  checked={showPublic}
                  onChange={(e): void => setShowPublic(e.target.checked)}
                >
                  {t('course.showPublic')}
                </SCheckbox>
                <AntButton
                  fontSize={20}
                  width={250}
                  height={40}
                  disabled={!newNote}
                  onClick={(): void => {
                    setMyNotes([
                      {
                        showPublic,
                        text: newNote,
                        time: Math.floor(player.current?.plyr.currentTime),
                      },
                      ...myNotes,
                    ]);
                    setNewNote('');
                  }}
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
          </SwiperSlide>
          {tabs.includes('publicComments') && (
            <SwiperSlide>
              <div className="px-[30px] text-[16px] h-fit">
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
            </SwiperSlide>
          )}
          {tabs.includes('papers') && (
            <SwiperSlide>
              <div className="px-[30px] text-[16px] ">
                {data.trainings.map((train) => (
                  <div
                    className="m-[16px] bg-blue-11 p-[16px] rounded-[6px]"
                    key={train.description}
                  >
                    <AntComment
                      text={train.description}
                      avatar={train.user.avatar}
                      name={train.user.nickname}
                      title={train.title}
                    />
                    {train.attachment?.includes('pdf') && (
                      <a className="mr-[30px]" href={train.attachment}>
                        {t('global.download')}
                      </a>
                    )}
                  </div>
                ))}
              </div>
            </SwiperSlide>
          )}
        </Swiper>
      ) : error ? (
        <div>error</div>
      ) : (
        <Skeleton />
      )}
    </div>
  );
};

export default LessonTabs;

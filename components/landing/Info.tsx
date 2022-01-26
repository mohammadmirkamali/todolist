import { t } from 'i18next';
import CountUp from 'react-countup';
import VisibilitySensor from 'react-visibility-sensor';
import Image from 'next/image';
import React, { ReactElement } from 'react';

type ItemsType = { title: string; count: number; text: string; img: string };
const Items: React.FC<ItemsType> = ({ title, count, text, img }) => (
  <div className="center flex-col">
    <div className="z-2 bg-white center rounded-full h-[150px] w-[150px]">
      <Image src={`/${img}.webp`} width={90} height={90} />
    </div>
    <div className="font-bold text-[28px] mt-[10px] center">
      <VisibilitySensor>
        {({ isVisible }): ReactElement => (
          <div>
            {isVisible && (
              <CountUp end={count} duration={1} separator="," className="ml-[5px]" />
            )}
            {t(`global.${title}`)}
          </div>
        )}
      </VisibilitySensor>
    </div>
    <div className="text-[15px] center text-gray-8">{t(`landing.${text}`)}</div>
  </div>
);

const Info: React.FC = () => (
  <div className="center m-[2rem] mt-[6rem]">
    <div className="h-[80rem] md:h-[27rem] w-[280px] flex-col md:flex-row relative md:w-[90vw] justify-around max-w-[1200px] rounded-[8px] center bg-cover bg-no-repeat bg-[url('/info-background.webp')]">
      <Items count={14211} title="person" text="infoStudent" img="student" />
      <Items count={100} title="number" text="infoCourses" img="microphone" />
      <Items count={125975} title="minute" text="infoTime" img="watch" />
    </div>
  </div>
);

export default Info;

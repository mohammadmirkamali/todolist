import { ClockCircleOutlined, StarFilled } from '@ant-design/icons';
import { message, Rate } from 'antd';
import { t } from 'i18next';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import ScrollContainer from 'react-indiana-drag-scroll';
import { useDispatch, useSelector } from 'react-redux';
import { CourseType, TopRateType } from 'types/course.type';
import { UserType } from 'types/account.type';
import { calcTime, faNumber } from 'utils/common.util';
// import AntTooltip from 'components/Common/AntTooltip';
import TeacherAvatar from 'components/Common/TeacherAvatar';
import request from 'services/request';
import { CourseUrl, RegisterUrl } from 'services/routes';
import Login from 'components/Account/login';
import { getChapterAction } from 'store/course/course.action';
import { SButton } from 'components/Course/style';
import RegisterModal from './registerModal';

// const RateStudents: React.FC<{ data: TopRateType[] }> = ({ data }) => (
//   <div className="py-[7px] flex text-[16px] flex-col pr-[15px] overflow-hidden w-[90%]">
//     <p className="m-0">{t('course.rateStudents')}</p>
//     <ScrollContainer className="flex">
//       {data.map((item) => (
//         <div
//           key={item.id}
//           className=" flex flex-col ml-[30px] items-center max-w-[100px] text-[14px] shrink-0 text-center"
//         >
//           <div className="rounded-full overflow-hidden w-[40px] h-[40px]">
//             <Image src={item.avatar} width={40} height={40} alt="" />
//           </div>

//           <div className="toRight">
//             <AntTooltip name={item.nickname} length={13}>
//               {item.nickname}
//             </AntTooltip>

//             <div className="text-[12px]">
//               ( {faNumber(item.total_rate)} <StarFilled className="translate-y-[-2px] " />{' '}
//               )
//             </div>
//           </div>
//         </div>
//       ))}
//     </ScrollContainer>
//   </div>
// );

type InfoType = { course: CourseType };
const Information: React.FC<InfoType> = ({ course }) => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.account.user);
  const [loginModalVisible, setLoginModalVisible] = useState(false);
  const [tryRegister, setTryRegister] = useState(false);
  const [registerModalVisible, setRegisterModalVisible] = useState(false);
  const [register, setRegister] = useState(course.registered);

  const registerCourse = async (): Promise<void> => {
    if (course.price) {
      setRegisterModalVisible(true);
    } else {
      setLoading(true);
      const res: any = await request.post(RegisterUrl(course.id)); // eslint-disable-line
      setLoading(false);
      const text = res.data.message;
      res.ok && setRegister(true);
      res.ok ? message.success(text) : message.error(text);
      res.ok && dispatch(getChapterAction(course.id));
    }
  };

  const handleRegister = async (): Promise<void> => {
    setTryRegister(true);
    user ? registerCourse() : setLoginModalVisible(true);
  };

  useEffect(() => {
    tryRegister && user && dispatch(getChapterAction(course.id));
    tryRegister && registerCourse();
  }, [user]);

  return (
    <div className="text-[18px] pr-[30px] text-gray-10">
      <TeacherAvatar
        name={course.teachers[0].nickname}
        title={t('global.teacher')}
        img={course.teachers[0].avatar}
      />

      <div className="py-[7px] flex items-center text-[16px]">
        <ClockCircleOutlined className="text-[20px] pr-[10px]" />
        <div className="px-[20px] toRight">{calcTime(course.time)}</div>
        <div>{t('global.hour')}</div>
      </div>

      <div className="py-[7px] text-[16px] flex items-center">
        <i className="fas fa-user-graduate pr-[10px] text-[20px]" />
        <div className="pr-[20px] pl-[16px]">
          {faNumber(course.students_count.toLocaleString())}
        </div>
        <div>{t('course.students')}</div>
      </div>

      <div className="py-[7px] text-[16px] flex items-center pr-[6px]">
        <Image src="/book.webp" width={30} height={30} alt="" />
        <div className="px-[15px] toRight">{faNumber(course.lessons_count)}</div>
        <div>{t('global.course')}</div>
      </div>

      <div className="py-[7px] text-[16px] flex items-center pr-[15px]">
        <Rate value={course.rate} allowHalf />
        <div className="px-[15px] toRight">
          {`( ${t('global.person')} ${faNumber((2).toLocaleString())} ) `}
        </div>
      </div>

      {/* {data?.topRate?.length ? <RateStudents data={data.topRate} /> : null}
    {data?.userRate?.length ? <RateStudents data={data.userRate} /> : null} */}

      {!register && (
        <SButton onClick={handleRegister} loading={loading} className="toLeft">
          {t('global.register')}
          <span className="text-[16px] mr-[10px]">
            (
            {course.price
              ? `${faNumber(course.price / 1000)} ${t('global.tooman')}`
              : t('global.free')}
            )
          </span>
        </SButton>
      )}

      <Login isVisible={loginModalVisible} setIsVisible={setLoginModalVisible} />
      <RegisterModal
        course={course}
        isVisible={registerModalVisible}
        setIsVisible={setRegisterModalVisible}
      />
    </div>
  );
};

export default Information;

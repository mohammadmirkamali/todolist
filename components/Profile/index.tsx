import { EditOutlined, PlusOutlined } from '@ant-design/icons';
import React, { useState } from 'react';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import { Select } from 'antd';
import { t } from 'i18next';
import AntTooltip from 'components/Common/AntTooltip';
import { CourseType } from 'types/course.type';
import { faNumber } from 'utils/common.util';
import Card from 'components/Common/Card';
import ProfileImg from './profileImg';
import { SSelect } from './style';

const { Option } = Select;
const time = (date): number => new Date(date).getTime();
const EditProfile = dynamic(() => import('./editProfile'));
const EditPassword = dynamic(() => import('./editPassword'));
const account = {
  name: 'میرکمالی',
  number: '09123456789',
  email: 'mirrkamali@gmail.com',
  birth: '1400',
  img: '',
};

const Profile: React.FC<{ allCourses: CourseType[] }> = ({ allCourses }) => {
  const { name } = useRouter().query;
  const isUser = name === 'account';
  const user = isUser ? 'account' : (name as string).replaceAll('-', ' ');
  const [isModalVisible, setIsModalVisible] = useState(0);
  const [input, setInput] = useState('');
  const [editType, setEditType] = useState('');
  const userCourses = isUser
    ? [...allCourses]
    : [...allCourses].filter((item) => item.teacher_name === user);
  const [courses, setCourses] = useState(
    [...userCourses].sort((a, b) => time(b.created_at) - time(a.created_at)),
  );

  const profile: any = isUser // eslint-disable-line
    ? account
    : { ...courses[0], name: courses[0].teacher_name, img: courses[0].teacher_avatar };
  const handleFilter = (item): void => {
    setCourses(
      item === 'newest'
        ? [...userCourses].sort((a, b) => time(b.created_at) - time(a.created_at))
        : [...userCourses].sort((a, b) => b.count_students - a.count_students),
    );
  };

  const Edit = React.useCallback(
    ({ type, text }) =>
      text.length ? (
        <EditOutlined
          className="text-[18px] mr-[10px] cursor-pointer hover:text-blue-10 duration-300"
          onClick={(): void => {
            setEditType(type);
            setInput(text);
            setIsModalVisible(1);
          }}
        />
      ) : (
        <PlusOutlined
          className="text-[18px] mr-[10px] cursor-pointer hover:text-blue-10 duration-300"
          onClick={(): void => {
            setEditType(type);
            setInput(text);
            setIsModalVisible(1);
          }}
        />
      ),
    [],
  );

  return (
    <div className="pt-[110px] duration-300 md:pt-[70px] bg-gray-0 min-h-screen flex-col flex items-center justify-items-start">
      <div className="w-full py-[30px] rounded-[8px] xl:rounded mt-[10px] xl:mt-0 xl:mb-0 md:w-[560px] xl:pb-[23rem] relative xl:fixed right-0 bg-white xl:w-[350px] xl:h-[calc(100%-70px)]">
        <div className=" items-center flex-col flex">
          <ProfileImg image={courses[0].teacher_avatar} isUser={isUser} />
          <h2 className="font-bold text-[20px] pt-[10px] w-[250px] mt-[10px] flex items-center text-center justify-center">
            {profile.name}
            {isUser && <Edit type="name" text={profile.name} />}
          </h2>
          {isUser ? (
            <div className="w-[290px] text-[16px] mt-[30px] flex flex-col">
              <div className="flex justify-between ">
                <p>{t('global.phoneNumber')}</p>
                <p>
                  {faNumber(profile.number)}
                  <Edit type="number" text={profile.number} />
                </p>
              </div>

              <div className="flex justify-between ">
                <p>{t('global.birthYear')}</p>
                <p>
                  {faNumber(profile.birth)} <Edit type="birth" text={profile.birth} />
                </p>
              </div>

              <div className="flex justify-between flex-wrap">
                <p>{t('global.email')}</p>
                <span>
                  <AntTooltip name={profile.email} length={18} />
                  <Edit type="email" text={profile.email} />
                </span>
              </div>

              <div className="flex justify-between">
                <p className="text-[16px]">{t('global.coursesCount')}</p>
                <p>{faNumber(courses.length)}</p>
              </div>

              <button
                className="flex cursor-pointer hover:text-blue-10 duration-300"
                type="button"
                onClick={(): void => {
                  setEditType('changePassword');
                  setInput('');
                  setIsModalVisible(2);
                }}
              >
                <p className="text-[16px]">{t('account.changePassword')}</p>
                <EditOutlined className="text-[18px] mr-[10px] " />
              </button>
            </div>
          ) : (
            <div className="flex flex-col">
              <p className="text-[16px] m-auto">{profile.teacher_title}</p>
              <div className="flex justify-between w-[220px] text-[16px] mt-[30px]">
                <p className="text-[16px]">{t('global.coursesCount')}</p>
                <p>{faNumber(courses.length)}</p>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="xl:pr-[370px] w-[320px] md:w-[650px] py-[20px] xl:pl-[20px]  xl:justify-self-start xl:w-full">
        <div>
          <SSelect defaultValue="newest" onChange={handleFilter} className="rounded-sm">
            <Option value="newest">{t('global.newest')}</Option>
            <Option value="mostPopular">{t('global.mostPopular')}</Option>
          </SSelect>

          <div className="justify-center xl:justify-start flex flex-wrap">
            {courses.map((item) => (
              <div key={item.id} className="scale-[.9] m-[-15px]">
                <Card course={item} />
              </div>
            ))}
          </div>
        </div>
      </div>

      <EditProfile
        type={editType}
        input={input}
        visible={isModalVisible === 1}
        setIsModalVisible={setIsModalVisible}
      />
      <EditPassword
        visible={isModalVisible === 2}
        setIsModalVisible={setIsModalVisible}
      />
    </div>
  );
};

export default Profile;

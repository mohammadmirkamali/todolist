/* eslint-disable @typescript-eslint/no-unused-vars */
import { EditOutlined, LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import { message, Select } from 'antd';
import { t } from 'i18next';
import AntTooltip from 'components/Common/AntTooltip';
import { CoursesType, CourseType, SearchDataType, WebinarsType } from 'types/course.type';
import { faNumber } from 'utils/common.util';
import Card from 'components/Common/Card';
import ProfileImg from './profileImg';
import { SSelect } from './style';
import { UserType } from 'types/account.type';
import request from 'services/request';
import { ChangeMobileUrl, ForgetPasswordUrl } from 'services/routes';
import { useDispatch, useSelector } from 'react-redux';
import LoadingBox from 'components/Common/LoadingBox';
import { getSearchDataAction } from 'store/course/course.action';
import { getUserAction, postProfileAction } from 'store/account/account.action';
import { SModal } from 'components/Account/style';
import ProfileForm from './profileForm';

const { Option } = Select;
const time = (date): number => new Date(date).getTime();
const EditProfile = dynamic(() => import('./editProfile'));
const EditPassword = dynamic(() => import('../Account/editPassword'));

type ProfileType = { searchData: SearchDataType };
const Profile: React.FC<ProfileType> = ({ searchData }) => {
  const dispatch = useDispatch();
  const error = useSelector((state) => state.course.searchDataError);
  const profileData = useSelector((state) => state.account.profile); // use for change password and mobile
  const user = useSelector((state) => state.account.user);
  const data = [
    ...(searchData?.workshops || []),
    ...(searchData?.events || []).map((item) => ({ ...item, isWebinar: true })),
  ];
  const query = useRouter().query.profileId;
  const isUser = query === 'user';
  const profile = isUser
    ? user
    : data
        .map((item) => item.teachers.map((k) => k))
        .flat()
        .find((item) => item?.id.toString() === query);

  const profileCourses = isUser
    ? data.filter((item) =>
        [...user.events, ...user.workshops].map((k) => k.id).includes(item.id),
      )
    : data.filter((item) =>
        item.teachers.every((teacher) => teacher.id.toString() === query),
      );

  const [isModalVisible, setIsModalVisible] = useState('');
  const [loading, setLoading] = useState(null);
  const [input, setInput] = useState('');
  const [filterCourses, setFilterCourses] = useState(
    [...profileCourses].sort(
      (a, b) => time(b.created_at || '0') - time(a.created_at || '0'),
    ),
  );

  useEffect(() => {
    setFilterCourses(
      [...profileCourses].sort(
        (a, b) => time(b.created_at || '0') - time(a.created_at || '0'),
      ),
    );
  }, [query, searchData]);

  const changePassword = async (): Promise<void> => {
    const body = { AuthType: 'mobile', auth: user.mobile };
    setLoading('password');
    await dispatch(postProfileAction(ForgetPasswordUrl(), body));
    setIsModalVisible('password');
    setLoading('');
  };

  const handleFilter = (item): void => {
    setFilterCourses(
      item === 'newest'
        ? [...profileCourses].sort((a, b) => time(b.created_at) - time(a.created_at))
        : [...profileCourses].sort((a, b) => Number(b.price) - Number(a.price)),
    );
  };

  const Edit = React.useCallback(
    ({ type, text }) =>
      text?.length ? (
        <EditOutlined
          className="text-[18px] mr-[10px] cursor-pointer hover:text-blue-10 duration-300"
          onClick={(): void => setIsModalVisible(type)}
        />
      ) : (
        <PlusOutlined
          className="text-[18px] mr-[10px] cursor-pointer hover:text-blue-10 duration-300"
          onClick={(): void => setIsModalVisible(type)}
        />
      ),
    [],
  );

  const reloadData = (): void => {
    dispatch(getSearchDataAction());
    dispatch(getUserAction());
  };

  return (
    <div className="duration-300 bg-gray-0 min-h-screen flex-col flex items-center justify-items-start">
      <div className="w-full py-[30px] rounded-[8px] xl:rounded mt-[10px] xl:mt-0 xl:mb-0 md:w-[560px] xl:pb-[23rem] relative xl:fixed right-0 bg-white xl:w-[350px] xl:h-[calc(100%-70px)]">
        <LoadingBox data={profile} error={error} reload={reloadData}>
          <div className=" items-center flex-col flex">
            <ProfileImg image={profile?.avatar} isUser={isUser} />
            <h2 className="font-bold text-[20px] pt-[10px] w-[250px] mt-[10px] flex items-center text-center justify-center">
              {profile?.nickname}
            </h2>
            {isUser ? (
              <div className="w-[290px] text-[16px] mt-[30px] flex flex-col">
                <div className="flex justify-between ">
                  <p>{t('global.birthYear')}</p>
                  <p>{faNumber(user?.info.birthYear)}</p>
                </div>

                <div className="flex justify-between">
                  <p className="text-[16px]">{t('global.sex')}</p>
                  <p>
                    {t(
                      `global.${
                        user?.sex === 1 ? 'man' : user?.sex === 2 ? 'woman' : 'notChoose'
                      }`,
                    )}
                  </p>
                </div>

                <div className="flex justify-between">
                  <p className="text-[16px]">{t('global.coursesCount')}</p>
                  <p>{faNumber(user?.workshops.length + user?.events.length)} </p>
                </div>

                <div className="flex justify-between">
                  <p className="text-[16px]">{t('account.walletAmount')}</p>
                  <div className="flex">
                    <p>{faNumber(Number(user?.price).toLocaleString())}</p>
                    <PlusOutlined
                      className="text-[18px] mr-[4px] mt-[2px] cursor-pointer hover:text-blue-10 duration-300"
                      onClick={(): void => {
                        setIsModalVisible('mobile');
                        dispatch(
                          postProfileAction(null, {
                            data: { next: 'chargeWallet' },
                            ok: true,
                          }),
                        );
                      }}
                    />
                  </div>
                </div>

                <div className="flex justify-between ">
                  <p>{t('global.phoneNumber')}</p>
                  <div>
                    {faNumber(user?.mobile)}
                    <Edit type="mobile" text={user?.mobile} />
                  </div>
                </div>

                {user?.email && (
                  <div className="flex justify-between flex-wrap">
                    <p>{t('global.email')}</p>
                    <span>
                      <AntTooltip name={user.email || ''} length={18} />
                      <Edit type="email" text={user.email} />
                    </span>
                  </div>
                )}

                <button
                  className="flex cursor-pointer hover:text-blue-10 duration-300"
                  type="button"
                  onClick={changePassword}
                >
                  <p className="text-[16px]">{t('account.changePassword')}</p>
                  {loading === 'password' ? (
                    <LoadingOutlined />
                  ) : (
                    <EditOutlined className="text-[18px] mr-[10px] " />
                  )}
                </button>
                <button
                  className="flex cursor-pointer hover:text-blue-10 duration-300"
                  type="button"
                  onClick={(): void => setIsModalVisible('info')}
                >
                  <p className="text-[16px]">{t('account.editInfo')}</p>
                  {loading === 'info' ? (
                    <LoadingOutlined />
                  ) : (
                    <EditOutlined className="text-[18px] mr-[10px] " />
                  )}
                </button>
              </div>
            ) : (
              <div className="flex flex-col">
                <div className="flex justify-between w-[220px] text-[16px] mt-[30px]">
                  <p className="text-[16px]">{t('global.coursesCount')}</p>
                  <p>{faNumber(profileCourses.length)}</p>
                </div>
              </div>
            )}
          </div>
        </LoadingBox>
      </div>

      <div className="xl:pr-[370px] w-[320px] md:w-[650px] py-[20px] xl:pl-[20px]  xl:justify-self-start xl:w-full">
        <div>
          <SSelect defaultValue="newest" onChange={handleFilter} className="rounded-sm">
            <Option value="newest">{t('global.newest')}</Option>
            <Option value="mostPopular">{t('global.mostPopular')}</Option>
          </SSelect>

          <div className="justify-center xl:justify-start flex flex-wrap">
            <LoadingBox
              data={data && profile && searchData}
              error={error}
              reload={reloadData}
            >
              {filterCourses.map((item) => (
                <div key={item.id} className="scale-[.9] m-[-15px]">
                  <Card data={item} webinar={(item as WebinarsType).isWebinar} />
                </div>
              ))}
            </LoadingBox>
          </div>
        </div>
      </div>

      <EditProfile
        user={user}
        visible={isModalVisible === 'info'}
        setIsModalVisible={setIsModalVisible}
      />
      <SModal
        centered
        title={null}
        footer={null}
        width={600}
        destroyOnClose
        visible={isModalVisible === 'password' || isModalVisible === 'mobile'}
        onCancel={(): void => setIsModalVisible('')}
      >
        {profileData?.next === 'ForgetPassword_step2' ? (
          <EditPassword setIsVisible={setIsModalVisible} profile />
        ) : (
          <ProfileForm
            profileData={profileData}
            // nextAction={nextAction}
            setIsVisible={setIsModalVisible}
          />
        )}
      </SModal>
      {/* <EditPassword
        visible={isModalVisible === 2}
        setIsModalVisible={setIsModalVisible}
      /> */}
    </div>
  );
};

export default Profile;

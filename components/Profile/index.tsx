/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  EditOutlined,
  InfoCircleOutlined,
  LoadingOutlined,
  PlusOutlined,
} from '@ant-design/icons';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import { Select, Spin, Tooltip } from 'antd';
import { t } from 'i18next';
import AntTooltip from 'components/Common/AntTooltip';
import { SearchDataType, WebinarsType } from 'types/course.type';
import { faNumber } from 'utils/common.util';
import Card from 'components/Common/Card';
import ProfileImg from './profileImg';
import { ForgetPasswordUrl } from 'services/routes';
import { useDispatch, useSelector } from 'react-redux';
import LoadingBox from 'components/Common/LoadingBox';
import { getSearchDataAction } from 'store/course/course.action';
import { getUserAction, postProfileAction } from 'store/account/account.action';
import { SModal } from 'components/Account/style';
import ProfileForm from './profileForm';
import Transaction from './transaction';
import MyComments from './myComments';
import MyQuestions from './myQuestions';
import MyTraining from './myTraining';

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
    const body = {
      AuthType: user.email ? 'email' : 'mobile',
      auth: user.email ? user.email : user.mobile,
    };
    setLoading('password');
    const res: any = await dispatch(postProfileAction(ForgetPasswordUrl(), body)); // eslint-disable-line
    res.ok && setIsModalVisible('password');
    setLoading('');
  };

  const handleFilter = (item): void => {
    setFilterCourses(
      item === 'newest'
        ? [...profileCourses].sort((a, b) => time(b.created_at) - time(a.created_at))
        : [...profileCourses].sort((a, b) => Number(b.price) - Number(a.price)),
    );
  };

  const reloadData = (): void => {
    dispatch(getSearchDataAction());
    dispatch(getUserAction());
  };

  return (
    <div className="duration-300 bg-gray-0 min-h-screen flex-col flex items-center justify-items-start">
      <div className="w-full xl:overflow-auto py-[20px] rounded-[8px] xl:rounded mt-[10px] xl:mt-0 xl:mb-0 md:w-[560px] relative xl:fixed right-0 bg-white xl:w-[350px] xl:h-[calc(100%-70px)]">
        <LoadingBox data={profile} error={error} reload={reloadData}>
          <div className=" items-center flex-col flex mt-[30px] md:mt-0">
            <ProfileImg image={profile?.avatar} isUser={isUser} />
            <h2 className="font-bold text-[20px] pt-[10px] w-[250px] flex items-center text-center justify-center">
              {profile?.nickname}
            </h2>
            {isUser ? (
              <div className="w-[290px] text-[16px] mt-[20px] flex flex-col">
                <div className="flex justify-between ">
                  <p>{t('global.birthYear')}</p>
                  <p>{faNumber(user?.info?.birthYear)}</p>
                </div>

                {/* <div className="flex justify-between">
                  <p className="text-[16px]">{t('global.sex')}</p>
                  <p>
                    {t(
                      `global.${
                        user?.sex === 1 ? 'man' : user?.sex === 2 ? 'woman' : 'notChoose'
                      }`,
                    )}
                  </p>
                </div> */}

                <div className="flex justify-between">
                  <p className="text-[16px]">{t('global.coursesCount')}</p>
                  <p>{faNumber(user?.workshops.length + user?.events.length)} </p>
                </div>
                <div className="flex justify-between">
                  <div className="text-[16px]">
                    {t('global.hasanat')}{' '}
                    <span className="text-blue-0 text-[18px] mr-[4px] cursor-pointer">
                      <Tooltip
                        title={t('account.catchHasane')
                          .split('\n')
                          .map((key) => (
                            <div key={key}>{key}</div>
                          ))}
                        color="geekblue"
                      >
                        <InfoCircleOutlined />
                      </Tooltip>
                    </span>
                  </div>
                  <p>{faNumber(user?.real_rate)} </p>{' '}
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

                {user?.mobile && user?.mobile !== '09' && (
                  <div className="flex justify-between ">
                    <p>{t('global.phoneNumber')}</p>
                    <div>
                      {faNumber(user?.mobile)}
                      <EditOutlined
                        className="text-[18px] mr-[10px] cursor-pointer hover:text-blue-10 duration-300"
                        onClick={(): void => {
                          setIsModalVisible('mobile');
                          dispatch(
                            postProfileAction(null, {
                              data: { next: 'newMobile' },
                              ok: true,
                            }),
                          );
                        }}
                      />
                    </div>
                  </div>
                )}

                {user?.email && (
                  <div className="flex justify-between flex-wrap">
                    <p>{t('global.email')}</p>
                    <span>
                      <AntTooltip name={user.email || ''} length={18} />
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
                    <Spin />
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
                    <Spin />
                  ) : (
                    <EditOutlined className="text-[18px] mr-[10px] " />
                  )}
                </button>

                <Transaction />
                <MyQuestions />
                <MyTraining />
                <MyComments />
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
          {/* <SSelect defaultValue="newest" onChange={handleFilter} className="rounded-sm">
            <Option value="newest">{t('global.newest')}</Option>
            <Option value="mostPopular">{t('global.mostPopular')}</Option>
          </SSelect> */}

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
    </div>
  );
};

export default Profile;

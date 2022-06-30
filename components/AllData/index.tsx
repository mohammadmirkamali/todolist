import Card from 'components/Common/Card';
import LoadingBox from 'components/Common/LoadingBox';
import { t } from 'i18next';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ProfileRoute } from 'services/routes';
import { getSearchDataAction } from 'store/course/course.action';
import user from 'public/user.svg';

const AllData: React.FC<{ type: string }> = ({ type }) => {
  const dispatch = useDispatch();
  const searchData = useSelector((state) => state.course.searchData);
  const error = useSelector((state) => state.course.searchDataError);

  const teachers = [...(searchData?.workshops || []), ...(searchData?.events || [])]
    .map((item) => item.teachers)
    .flat();

  const uniqueTeachers = [...new Set(teachers.map((item) => item.id))].map((id) =>
    teachers.find((teacher) => teacher.id === id),
  );

  const data =
    type === 'courses'
      ? searchData?.workshops
      : type === 'events'
      ? searchData?.events
      : null;

  const reload = (): void => {
    dispatch(getSearchDataAction());
  };
  return (
    <div className="p-[36px] bg-gray-11 min-h-screen">
      <div className="center font-bold my-[24px] text-[32px]">
        {t(`landing.all-${type}`)}
      </div>
      <LoadingBox data={searchData} error={error} reload={reload}>
        <div className="flex flex-wrap center">
          {(type === 'events' || type === 'courses') &&
            data?.map((item) => (
              <div
                key={item.id}
                className="md:scale-[.85] md:m-[-24px] xl:scale-100 xl:m-0"
              >
                <Card data={item} webinar={type === 'events'} />
              </div>
            ))}
          {type === 'teachers' &&
            uniqueTeachers?.map((teacher) => {
              return (
                <Link
                  href={ProfileRoute(teacher.id, teacher.nickname || teacher.family)}
                  key={teacher.id}
                  passHref
                >
                  <a className="center mx-[16px] flex-col cursor-pointer my-[10px] md:m-[20px] text-black transition-all duration-500 text-center opacity-100 hover:opacity-70 hover:text-blue-2">
                    <Image
                      src={teacher.avatar || user}
                      width={130}
                      height={130}
                      alt={teacher.nickname}
                      className="rounded-full "
                    />
                    <div className="text-[16px] my-[5px] font-bold">
                      {teacher.nickname || teacher.family}
                    </div>
                  </a>
                </Link>
              );
            })}
        </div>
      </LoadingBox>
    </div>
  );
};

export default AllData;

import { t } from 'i18next';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ProfileRoute } from 'services/routes';
import user from 'public/user.svg';
import LoadingBox from 'components/Common/LoadingBox';
import { getHomeAction } from 'store/course/course.action';

const Teachers: React.FC = () => {
  const dispatch = useDispatch();
  const teachers = useSelector((state) => state.course.home)?.teachers;
  const error = useSelector((state) => state.course.homeError);

  const reloadData = (): void => {
    dispatch(getHomeAction());
  };

  return (
    <div className="center flex-col overflow-hidden">
      <h2 className="font-bold text-[24px] md:text-[27px] my-[30px]">
        {t('global.teachers')}
      </h2>

      <LoadingBox data={!!teachers} error={error} reload={reloadData}>
        <div className="flex flex-wrap items-center justify-center">
          {teachers?.map((teacher) => {
            return (
              <Link
                href={ProfileRoute(teacher.id, teacher.nickname || teacher.family)}
                key={teacher.id}
                passHref
              >
                <a className="center mx-[16px] flex-col cursor-pointer my-[10px] md:m-[20px] transition-all duration-500 text-center opacity-70 hover:opacity-100 hover:text-blue-2 grayscale-[1] hover:grayscale-0">
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

export default Teachers;

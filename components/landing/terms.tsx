import { SBadge, SContainer } from 'components/Common/Card/style';
import LoadingBox from 'components/Common/LoadingBox';
import { t } from 'i18next';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TermRoute } from 'services/routes';
import { getSearchDataAction } from 'store/course/course.action';
import { BadgeCategory, faNumber } from 'utils/common.util';

const img = 'https://dl.taalei-edu.ir/users_resource/16394/img/1616343386-4915-logo.jpg';

const Terms: React.FC = () => {
  const dispatch = useDispatch();
  const terms = useSelector((state) => state.course.searchData?.terms);
  const error = useSelector((state) => state.course.searchDataError);
  const badge = BadgeCategory(t('global.term'));

  const reloadData = (): void => {
    dispatch(getSearchDataAction());
  };

  return (
    <div className="w-full mb-[40px] center flex-col pb-[60px]">
      <h2 className="font-bold text-[24px] md:text-[27px] my-[30px]">
        {t(`global.terms`)}
      </h2>
      <div className="flex-wrap center w-[320px] min-h-[250px] md:w-[900px] xl:w-[1300px]">
        <LoadingBox data={!!terms} error={error} reload={reloadData}>
          {terms?.map((item) => (
            <div
              className="md:scale-[.85] md:m-[-24px] xl:scale-100 xl:m-0"
              key={item.id}
            >
              <Link href={TermRoute(item.id, item.title)}>
                <a>
                  <SContainer className="w-[300px] h-[310px] bg-white border border-gray-5 cursor-pointer relative rounded-[6px] m-[10px]">
                    <SBadge text={badge.name} color={badge.color} placement="start" />

                    <div className="bg-gray-7 absolute top-0 h-full w-full z-10 rounded-[6px] enter">
                      <div className="text-white absolute bottom-[60px] text-center w-full text-[25px] text-bold register">
                        {t('global.register')}
                      </div>
                    </div>

                    <div className="h-[160px] overflow-hidden rounded-tl-[6px] rounded-tr-[6px]">
                      <Image
                        src={item.image}
                        width={300}
                        height={170}
                        alt={item.description}
                        className="img  mt-[-20px]"
                      />
                    </div>

                    <div className="h-[130px] flex justify-center flex-col">
                      <h2 className="mx-[30px] text-[18px] text-right font-bold">
                        {item.title}
                      </h2>

                      <div className="flex items-center mr-[30px] mt-[6px] text-[16px]">
                        <Image
                          src={img}
                          width={30}
                          height={30}
                          alt=""
                          className="rounded-full"
                        />
                        <div className="mr-[8px] text-gray-3">{t('global.taali')}</div>
                      </div>
                    </div>

                    <div className="absolute bottom-[4px] text-gray-6 text-[12px] flex right-[28px] ">
                      <i className="fas fa-money-bill-wave ml-[6px] mt-[3px]" />
                      <div>
                        {Number(item.price)
                          ? `${faNumber(Number(item.price) / 1000)} ${t('global.tooman')}`
                          : t('global.free')}
                      </div>
                    </div>
                  </SContainer>
                </a>
              </Link>
            </div>
          ))}
        </LoadingBox>
      </div>
    </div>
  );
};

export default Terms;

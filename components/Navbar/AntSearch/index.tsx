import { SearchOutlined } from '@ant-design/icons';
import React, { useRef, useState } from 'react';
import { useRouter } from 'next/router';
import { Select, Spin } from 'antd';
import { t } from 'i18next';

import { SContainer, SSelect } from './style';
import useWindowSize from 'hooks/useWidowsSize';
import {
  CourseRoute,
  HomeRoute,
  ProfileRoute,
  TermRoute,
  WebinarRoute,
} from 'services/routes';
import Image from 'next/image';
import { SearchOptionType } from 'types/course.type';
import { useSelector } from 'react-redux';

type SearchType = {
  options: SearchOptionType[];
  landing?: boolean;
};

const { Option } = Select;

const AntSearch: React.FC<SearchType> = ({ options, landing }) => {
  const [focus, setFocus] = useState(landing);
  const [size] = useWindowSize();
  const router = useRouter();
  const ref = useRef(null);
  const user = useSelector((state) => state.account.user);

  const onSelect = (name: string): void => {
    const selected = options.find((item) => item.name === name);
    setFocus(false);
    ref.current.blur();
    router.push(
      selected.home
        ? HomeRoute()
        : selected.webinar
        ? WebinarRoute(selected.id, selected.name)
        : selected.term
        ? TermRoute(selected.id, selected.name)
        : selected.isTeacher
        ? ProfileRoute(selected.id, selected.name)
        : CourseRoute(selected.id, selected.name),
    );
  };

  return (
    <SContainer
      focus={focus ? 1 : 0}
      landing={landing ? 1 : 0}
      user={user ? 1 : 0}
      className={`${
        !landing ? 'translate-y-[55px]' : 'translate-y-[30px]'
      } xl:mr-[20px] md:translate-y-0`}
    >
      <SSelect
        showSearch
        ref={ref}
        size="large"
        landing={landing ? 1 : 0}
        suffixIcon={<SearchOutlined className="text-[25px] !hidden md:!block" />}
        onSelect={onSelect}
        value={null}
        onFocus={(): void => setFocus(true)}
        notFoundContent={options ? <>{t('global.notFound')}</> : <Spin />}
        onBlur={(): void => !landing && setFocus(false)}
        placeholder={
          landing
            ? t(size > 768 ? 'landing.searchTitle' : 'global.search')
            : t('global.search')
        }
      >
        {options?.map((option) => (
          <Option value={option.name} key={option.name}>
            <div className="option flex items-center">
              <span className="h-[25px] ml-[8px]">
                {option.avatar && (
                  <Image src={option.avatar} width={25} height={25} alt="" />
                )}
              </span>
              {option.name} {option.category && `(${option.category})`}
            </div>
          </Option>
        ))}
      </SSelect>
    </SContainer>
  );
};

export default AntSearch;

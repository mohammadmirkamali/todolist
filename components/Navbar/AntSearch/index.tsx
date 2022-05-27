import { SearchOutlined } from '@ant-design/icons';
import React, { useRef, useState } from 'react';
import { useRouter } from 'next/router';
import { Select, Spin } from 'antd';
import { t } from 'i18next';

import { SContainer, SSelect } from './style';
import useWindowSize from 'hooks/useWidowsSize';
import { CourseRoute, ProfileRoute, WebinarRoute } from 'services/routes';
import Image from 'next/image';
import { SearchOptionType } from 'types/course.type';

type SearchType = {
  options: SearchOptionType[];
  landing?: boolean;
  setSearching?: (e) => void;
};

const { Option } = Select;

const AntSearch: React.FC<SearchType> = ({ options, landing, setSearching }) => {
  const [focus, setFocus] = useState(landing);
  const [size] = useWindowSize();
  const router = useRouter();
  const ref = useRef(null);

  const onSelect = (name: string): void => {
    const selected = options.find((item) => item.name === name);
    setFocus(false);
    ref.current.blur();
    router.push(
      selected.webinar
        ? WebinarRoute(selected.id, selected.name)
        : selected.id
        ? CourseRoute(selected.id, selected.name)
        : ProfileRoute(selected.name),
    );
  };

  return (
    <SContainer
      focus={focus ? 1 : 0}
      landing={landing ? 1 : 0}
      className="translate-y-[35px] xl:mr-[20px] md:translate-y-0"
    >
      <SSelect
        showSearch
        ref={ref}
        size="large"
        landing={landing ? 1 : 0}
        suffixIcon={
          landing ? <SearchOutlined className="text-[25px] !hidden md:!block" /> : null
        }
        onSelect={onSelect}
        value={null}
        onFocus={(): void => (setFocus(true), !landing && setSearching(true))}
        notFoundContent={options ? <>{t('global.notFound')}</> : <Spin />}
        onBlur={(): void =>
          !landing && (setFocus(false), !landing && setSearching(false))
        }
        placeholder={
          landing ? (
            t(size > 768 ? 'landing.searchTitle' : 'global.search')
          ) : !focus && size > 768 ? (
            <SearchOutlined className="text-[20px] m-[-2px]" />
          ) : (
            t('global.search')
          )
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

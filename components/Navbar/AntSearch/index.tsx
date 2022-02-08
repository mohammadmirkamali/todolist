import { SearchOutlined } from '@ant-design/icons';
import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { Select } from 'antd';
import { t } from 'i18next';

import { SSelect } from './style';
import useWindowSize from 'hooks/useWidowsSize';
import { useScroll } from 'hooks/useScroll';
import { CourseRoute } from 'services/routes';

type SearchType = { options: { name: string; id: number }[]; landing?: boolean };

const AntSearch: React.FC<SearchType> = ({ options, landing }) => {
  const [focus, setFocus] = useState(landing);
  const [open, setOpen] = useState(false);
  const scrollDirection = useScroll();
  const [size] = useWindowSize();
  const { Option } = Select;
  const router = useRouter();

  const onSelect = (name: string): void => {
    const selected = options.find((item) => item.name === name);
    setOpen(false);
    router.push(CourseRoute(selected.id));
  };

  return (
    <SSelect
      showSearch
      size="large"
      open={open}
      landing={landing ? 1 : 0}
      focus={focus ? 1 : 0}
      suffixIcon={
        landing ? (
          <SearchOutlined className="text-[25px] translate-x-[15px] translate-y-[-5px]" />
        ) : null
      }
      onSelect={onSelect}
      value={null}
      onFocus={(): void => setFocus(true)}
      isdown={scrollDirection === 'down' ? 1 : 0}
      onSearch={(e): void => setOpen(e.length > 0)}
      notFoundContent={<>{t('global.notFound')}</>}
      onBlur={(): void => (setOpen(false), !landing && setFocus(false))}
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
        <Option
          value={option.name}
          key={option.id}
          className={`!text-[16px] w-[${landing ? '250px' : '300px'}] md:w-[${
            landing ? '550px' : '400px'
          }]`}
        >
          {option.name}
        </Option>
      ))}
    </SSelect>
  );
};

export default AntSearch;

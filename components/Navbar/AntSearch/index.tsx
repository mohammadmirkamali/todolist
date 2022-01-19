import { SearchOutlined } from '@ant-design/icons';
import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { Select } from 'antd';
import { t } from 'i18next';

import { CourseUrl } from 'store/main/main.service';
import { SSelect } from './style';
import useWindowSize from 'hooks/useWidowsSize';
import { useScroll } from 'hooks/useScroll';

type SearchType = { options: { name: string; id: number }[] };

const AntSearch: React.FC<SearchType> = ({ options }) => {
  const [focus, setFocus] = useState(false);
  const [open, setOpen] = useState(false);
  const scrollDirection = useScroll();
  const [size] = useWindowSize();
  const { Option } = Select;
  const router = useRouter();

  const onSelect = (name: string): void => {
    const selected = options.find((item) => item.name === name);
    setOpen(false);
    router.push(CourseUrl(selected.id));
  };

  return (
    <SSelect
      showSearch
      size="large"
      open={open}
      focus={focus ? 1 : 0}
      suffixIcon={null}
      onSelect={onSelect}
      onFocus={(): void => setFocus(true)}
      isDown={scrollDirection === 'down' ? 1 : 0}
      onSearch={(e): void => setOpen(e.length > 0)}
      notFoundContent={<>{t('global.notFound')}</>}
      onBlur={(): void => (setOpen(false), setFocus(false))}
      placeholder={
        !focus && size > 768 ? (
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
          className="!text-[16px] w-screen md:w-[400px]"
        >
          {option.name}
        </Option>
      ))}
    </SSelect>
  );
};

export default AntSearch;

import { FilePdfOutlined } from '@ant-design/icons';
import Link from 'next/link';
import React from 'react';
import { AttachesType } from 'types/course.type';
import { fileSize } from 'utils/common.util';

const Attaches: React.FC<{ data: AttachesType[] }> = ({ data }) => (
  <div className="flex flex-col toLeft px-[30px] pt-[15px] text-[16px] ">
    {data.map((file) => (
      <Link href={file.link} key={file.name}>
        <a className=" py-[15px] border-b border-b-gray-1 last:border-b-0 text-gray-10 flex hover:text-blue-1">
          <FilePdfOutlined style={{ fontSize: '24px' }} />
          <div className="mr-[8px]">
            {file.name} ({fileSize(file.size)})
          </div>
        </a>
      </Link>
    ))}
  </div>
);

export default Attaches;

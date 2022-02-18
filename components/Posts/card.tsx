import React from 'react';
import { t } from 'i18next';
import Image from 'next/image';
import Link from 'next/link';
import { PostType } from 'types/course.type';
import { faNumber } from 'utils/common.util';
import { SContainer } from 'components/Common/Card/style';
import { PostsRoute } from 'services/routes';

const Card: React.FC<{ post: PostType }> = ({ post }) => (
  <Link href={{ pathname: PostsRoute(), query: { id: post.post_id } }}>
    <a>
      <SContainer className="w-[300px] h-[380px] bg-white border border-gray-5 cursor-pointer relative rounded-[6px] m-[10px]">
        <div className="bg-gray-7 absolute top-0 h-full w-full z-10 rounded-[6px] enter">
          <div className="text-white absolute bottom-[60px] text-center w-full text-[25px] text-bold register">
            {t('global.see')}
          </div>
        </div>

        <div className="h-[250px] overflow-hidden rounded-tl-[6px] rounded-tr-[6px]">
          <Image
            src={post.post_img}
            width={300}
            height={250}
            alt={post.post_title}
            className="img  mt-[-20px]"
          />
        </div>

        <div className="h-[100px] flex justify-center flex-col">
          <h2 className="mx-[30px] text-[18px] font-bold">{post.post_title}</h2>

          <div className="flex items-center mr-[30px] mt-[6px] text-[16px]">
            <Image
              src={post.user_avatar}
              width={27}
              height={27}
              alt={post.user_name}
              className="rounded-full"
            />
            <div className="mr-[8px] text-gray-3">{post.user_name}</div>
          </div>
        </div>

        <div className="absolute bottom-[4px] text-gray-6 text-[12px] flex right-[35px] ">
          <div className="ml-[17px]">{faNumber(post.datetime_formatDifference)}</div>
        </div>
      </SContainer>
    </a>
  </Link>
);

export default Card;

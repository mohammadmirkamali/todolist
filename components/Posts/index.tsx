/* eslint-disable react/no-danger */
import { useDispatch, useSelector } from 'react-redux';
import { CloseOutlined } from '@ant-design/icons';
import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Link from 'next/link';
import { getPostsAction } from 'store/course/course.action';
import { PostsRoute } from 'services/routes';
import Card from './card';

const Posts: React.FC = () => {
  const dispatch = useDispatch();
  const id = useRouter().query?.id;
  const { posts } = useSelector((state) => state.course);
  const selectedPost = posts?.find((post) => post.id === Number(id));

  useEffect(() => {
    !posts && dispatch(getPostsAction());
  }, []);

  if (!posts) {
    return <div>loading</div>;
  }

  return (
    <div className="py-[110px] md:pt-[70px] min-h-screen flex flex-col xl:flex-row bg-gray-0">
      <div
        className={`bg-white ${
          id
            ? 'w-full h-full xl:h-[calc(100%-70px)] xl:w-[700px]'
            : 'h-0 xl:h-[calc(100%-70px)] xl:w-0'
        } xl:duration-300 overflow-hidden xl:overflow-auto toRight relative xl:fixed text-gray-3`}
      >
        <Link href={PostsRoute()}>
          <a className=" absolute left-[20px] link top-[10px] text-[20px]">
            <CloseOutlined />
          </a>
        </Link>

        <h2 className="font-bold text-[18px] border-b border-b-gray-5 m-0 lg:text-[25px] center py-[15px] text-center px-[55px]">
          {selectedPost?.title}
        </h2>

        {selectedPost && !selectedPost?.description && (
          <div className="relative w-full h-[300px] md:h-[500px]">
            <Image src={selectedPost?.image} layout="fill" objectFit="contain" alt="" />
          </div>
        )}

        <div
          className="p-[40px] text-[16px] mb-24 toLeft"
          dangerouslySetInnerHTML={{ __html: selectedPost?.description }}
        />
      </div>

      <div
        className={`flex-1 flex flex-wrap ${
          id ? 'xl:pr-[700px]' : 'xl:pr-0'
        } duration-300 justify-center mt-[30px]`}
      >
        {posts.map((post) => (
          <Card post={post} key={post.id} />
        ))}
      </div>
    </div>
  );
};

export default Posts;

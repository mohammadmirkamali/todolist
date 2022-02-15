/* eslint-disable react/no-danger */
import { useDispatch, useSelector } from 'react-redux';
import { CloseOutlined } from '@ant-design/icons';
import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { Skeleton } from 'antd';
import Image from 'next/image';
import Link from 'next/link';
import {
  Player,
  ControlBar,
  ReplayControl,
  ForwardControl,
  CurrentTimeDisplay,
  TimeDivider,
  PlaybackRateMenuButton,
} from 'video-react';
import { getPostsAction } from 'store/course/course.action';
import { PostsRoute } from 'services/routes';
import Card from './card';

const Posts: React.FC = () => {
  const dispatch = useDispatch();
  const id = useRouter().query?.id;
  const { posts } = useSelector((state) => state.course);
  const selectedPost = posts?.find((post) => post.post_id === Number(id));

  useEffect(() => {
    !posts && dispatch(getPostsAction());
  }, []);

  if (!posts) {
    return <Skeleton active paragraph={{ rows: 4 }} className="p-[80px]" />;
  }

  return (
    <div className="pt-[110px] md:pt-[70px] min-h-screen flex flex-col xl:flex-row bg-gray-0">
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
          {selectedPost?.post_title}
        </h2>

        <div className="relative w-full">
          {selectedPost?.post_type && (
            <React.Fragment key={selectedPost.post_film}>
              <Player className="toRight" poster={selectedPost.post_img}>
                <source src={selectedPost.post_film} />
                <ControlBar>
                  <ReplayControl seconds={10} order={1.1} />
                  <ForwardControl seconds={30} order={1.2} />
                  <CurrentTimeDisplay order={4.1} />
                  <TimeDivider order={4.2} />
                  <PlaybackRateMenuButton
                    rates={[5, 2, 1.5, 1.25, 1, 0.7, 0.5]}
                    order={7.1}
                  />
                </ControlBar>
              </Player>
            </React.Fragment>
          )}
        </div>

        {selectedPost && !selectedPost?.post_type && (
          <div className="relative w-full h-[300px] md:h-[500px]">
            <Image
              src={selectedPost?.post_img}
              layout="fill"
              objectFit="contain"
              alt=""
            />
          </div>
        )}

        <div
          className="p-[40px] text-[16px] toLeft"
          dangerouslySetInnerHTML={{ __html: selectedPost?.post_text }}
        />
      </div>

      <div
        className={`flex-1 flex flex-wrap ${
          id ? 'xl:pr-[700px]' : 'xl:pr-0'
        } duration-300 justify-center mt-[30px]`}
      >
        {posts.map((post) => (
          <Card post={post} key={post.post_id} />
        ))}
      </div>
    </div>
  );
};

export default Posts;

import React, { useEffect } from 'react';
import { t } from 'i18next';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { CourseType } from 'types/course.type';
import { getChapterAction } from 'store/course/course.action';
import PageLoading from 'components/Common/pageLoading';

const Navbar = dynamic(() => import('components/Navbar'));
const Course = dynamic(() => import('components/Course'));
const Head = dynamic(() => import('next/head'));

type PageType = { data?: CourseType };
const CoursePage: React.FC<PageType> = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const id = router.query.courseId as string;
  const course = useSelector((state) => state.course.chapters)?.[id]?.data;
  const error = useSelector((state) => state.course.chapters)?.[id]?.error;

  useEffect(() => {
    id && !course && dispatch(getChapterAction(id));
  }, [id]);

  return (
    <>
      <Head>
        <title>{t('global.title', { title: course?.title })}</title>
        <meta name="description" content={t('global.description')} />
      </Head>

      <Navbar />
      {course ? <Course course={course} /> : error ? <div>error</div> : <PageLoading />}
    </>
  );
};

export default CoursePage;

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
// export const getServerSideProps = async ({ query }) => {
//   const response = await request.get(CourseUrl(query.courseId));
//   console.log('first', response);

//   if (!response.data) {
//     return {
//       notFound: true,
//     };
//   }

//   return {
//     props: { data: response.data },
//   };
// };

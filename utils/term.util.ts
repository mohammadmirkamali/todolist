import { TermItemType } from 'types/course.type';

export const calculateWeeks = (data, days, hourPerWeek) => {
  const allWeeks = []; // final data that keep weeks and lesson of each day in week

  if (data && !!days?.length) {
    const lessons: TermItemType[] = [...data]; // all lessons
    const dailySecond = Number(((hourPerWeek * 3600) / (days.length || 1)).toFixed(0)); // time of each day in second

    while (lessons.length > 0) {
      const week = [];
      days
        .sort((a, b) => a - b)
        .forEach((day, index) => {
          const dayLessons = [];
          let dayTime = 0;
          const endTime =
            index === days.length - 1
              ? hourPerWeek * 3600 - week.reduce((a, b) => a + b.total, 0)
              : dailySecond;

          while (dayTime < endTime && !!lessons.length) {
            const bb = lessons.shift();
            dayLessons.push(bb);
            dayTime += bb.time;
          }

          week.push({
            total: dayTime,
            title: day,
            data: dayLessons,
          });
        });

      allWeeks.push({ total: week.reduce((a, b) => a + b.total, 0), data: week });
    }
  }
  return allWeeks;
};

export const mapTermData = (items, userCourses, allCourses): object[] => {
  return items?.map((item) => {
    return {
      id: item.workshop_id,
      lessonId: item.lesson_id,
      time: item.time,
      lessonTitle: item.title,
      title: allCourses?.find((key) => key.id === item.workshop_id).title,
      lessonIndex:
        allCourses
          ?.find((key) => key.id === item.workshop_id)
          .lessons.findIndex((key) => key === item.lesson_id) + 1,
      passed: userCourses
        .find((key) => key.id === item?.workshop_id)
        ?.passed_lessons?.includes(item.lesson_id),
    };
  });
};

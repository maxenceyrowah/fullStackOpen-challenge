import { Content } from './Content';
import { Header } from './Header';

export const Course = ({ courses }) => {
  const title = `Web development curriculum`;
  const content = courses.map((course) => <Content courses={course} key={course.id} />);

  return (
    <>
      <Header name={title} />
      {content}
    </>
  );
};

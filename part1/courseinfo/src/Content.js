const Part = ({ course }) => {
  const total = course.parts.reduce((acc, curr) => {
    return acc + curr.exercises;
  }, 0);

  return (
    <>
      <h3>{course.name}</h3>
      {course.parts.map((part) => (
        <p key={part.id}>
          {part.name} <span>{part.exercises}</span>
        </p>
      ))}
      <p>total of {total} exercises</p>
    </>
  );
};

export const Content = ({ courses }) => <Part course={courses} />;

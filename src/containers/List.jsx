import React from 'react';

const List = props => {
  const { topics = [], courses = [] } = props;

  return (
    <div>
      <div className="topics">
        {topics.map((topic, key) => (
          <button {...{ key }}>{topic}</button>
        ))}
      </div>
      <div className="courses">
        {courses.map((course, key) => (
          <div {...{ key }}>{course.title}</div>
        ))}
      </div>
    </div>
  );
};

export default List;

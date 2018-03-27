import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import urlJoin from 'url-join';

import { connectHits } from 'react-instantsearch/connectors';

import Splash from '../components/Splash';
// import CourseList from '../components/CourseList';
import Author from '../components/Author';

import play from '../assets/images/icons/icon_play.svg';
import clock from '../assets/images/icons/icon_clock.svg';

import { loadCourses } from '../actions';
import { NOOP } from '../constants';

const mapStateToProps = ({ courses }) => ({ courses });
const mapDispatchToProps = { loadCourses };

const dateOptions = {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
};

const authorRenderer = (author, index) => (
  <Author author={author} key={index} />
);

const CustomHits = connectHits(({ hits }) => (
  hits.map(hit => <HitEntry hit={hit} />)
));

const HitEntry = ({ hit }) => {
  const date = new Date(hit.date);

  return (<article className="course-item">
    <div className="course-item__heading">
      <img className="course-item__icon" src={play} alt="" />
      <div className="course-item__heading-right">
        <img className="course-item__icon" src={clock} alt="" />
        <p className="course-item__duration">{hit.duration.total} mins</p>
      </div>
    </div>

    <div className="course-item__container">
      <h2 className="course-item__title">
        <a className="no-link-style" href={urlJoin('/course/', hit.permalink)}>
          {hit.title}
        </a>
      </h2>

      <p className="course-item__details">
        <time dateTime={date.toISOString()}>{date.toLocaleString('fr-FR', dateOptions)}</time>
        {' par '}
        {hit.authors.map(authorRenderer)}
      </p>

      <p className="course-item__description">{hit.excerpt}</p>
    </div>
  </article>
  );
};

HitEntry.propTypes = {
  hit: PropTypes.shape().isRequired,
};

export class Home extends React.Component {
  static propTypes = {
    // courses: PropTypes.arrayOf(PropTypes.shape()).isRequired,
    // loadCourses: PropTypes.func.isRequired,
  };

  static defaultProps = {
    courses: [],
    loadCourses: NOOP,
  };

  componentDidMount() {
    // this.props.loadCourses();
  }

  render() {
    // const { courses } = this.props;

    return (
      <div className="home">
        <Splash />
        { /* <CourseList courses={courses} /> */}
        <div className="course-list">
          <div className="course-list__container container">
            <CustomHits />
          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);

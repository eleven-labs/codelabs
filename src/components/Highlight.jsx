import highlight from 'highlight.js';
import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Highlight extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    language: PropTypes.string.isRequired,
  };

  componentDidMount() {
    if (this.element) {
      highlight.highlightBlock(this.element);
    }
  }

  componentDidUpdate() {
    if (this.element) {
      highlight.initHighlighting.called = false;
      highlight.highlightBlock(this.element);
    }
  }

  render() {
    return (
      <pre>
        <code
          className={this.props.language}
          ref={element => { this.element = element; }}
        >
          {this.props.children}
        </code>
      </pre>
    );
  }
}

export default Highlight;

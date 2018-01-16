import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Search extends Component {
  constructor(props) {
    super(props);

    this.onChange = this.onChange.bind(this);
  }

  state = {
    needle: '',
  };

  onChange(event) {
    this.setState({ needle: event.target.value });
  }

  render() {
    const { needle } = this.state;

    return (
      <div className="search-bar">
        <input
          value={needle}
          onChange={this.onChange}
        />
        <button>
          <span className="fa fa-search" />
        </button>
      </div>
    );
  }
}

export default Search;

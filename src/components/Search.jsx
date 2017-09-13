import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Search extends Component {
  constructor(props) {
    super(props);

    this.onChnage = this.onChnage.bind(this);
  }

  state = {
    needle: '',
  };

  onChnage(event) {
    this.setState({ needle: event.target.value });
  }

  render() {
    const { needle } = this.state;

    return (
      <div className="search-bar">
        <input
          value={needle}
          onChange={this.onChnage}
        />
        <button>
          <span className="fa fa-search" />
        </button>
      </div>
    );
  }
}

export default Search;

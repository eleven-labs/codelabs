import React from 'react';
import PropTypes from 'prop-types';
import { parse } from 'markdown-to-ast';

import componentFactory from '../helpers/componentFactory';

const initialMD = `hello *cool*

- yeah
- lol

---

\`\`\`js
console.log(lol);
\`\`\`


[lien](http://google.fr)

`;

export default class Console extends React.Component {
  static propTypes = {
    md: PropTypes.string,
  };

  static defaultProps = {
    md: '',
  };

  constructor(props) {
    super(props);

    this.state = {
      md: initialMD,
    };

    this.onChange = this.onChange.bind(this);
  }

  onChange(event) {
    this.setState({
      md: event.currentTarget.value,
    });
  }

  render() {
    const comps = componentFactory(this.state.md);
    console.log(comps);
    return (
      <div>
        <textarea
          id="markdown"
          cols={100}
          rows={10}
          value={this.state.md}
          onChange={this.onChange}
        />
        <div id="preview">
          <div className="generated-component">
            {comps.map((renderer, key) => renderer({ key }))}
          </div>
        </div>
      </div>
    );
  }
}

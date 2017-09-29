import React from 'react';
import PropTypes from 'prop-types';
import { parse } from 'markdown-to-ast';

import componentFactory from '../services/componentFactory';

// this is rediculous, I can't beleive I'm doing this. this is because of my IDE.
const script = [
  ['<', 'script', '>'].join(''),
  'alert(\'toto\');',
  ['</', 'script', '>'].join(''),
].join();

const initialMD = `hello *world*

- yeah
- lol

\`mmm\`

<a href="http://google.com">
google
</a>

${script}

---

<hr />

\`\`\`js
console.log(lol);
\`\`\`

![](http://lorempixel.com/400/200/abstract/)

[lien](http://google.fr)

http://google.fr

<div>
  <div>
    <div>
      foo
    </div>
  </div>
</div>
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

  shouldComponentUpdate(nextProps, nextState) {
    return this.state.md !== nextState.md;
  }

  render() {
    const comps = componentFactory(this.state.md);

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

import React from 'react';
import PropTypes from 'prop-types';
import { parse } from 'markdown-to-ast';

import componentFactory from '../services/componentFactory';

// this is ridiculous. can't believe I'm doing this.
// the script tag breaks eslint, even inside string literals.
const script = [
  ['<', 'script', '>'].join(''),
  'alert(\'toto\');',
  ['</', 'script', '>'].join(''),
].join('');

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

\`\`\`bash
aws acm request-certificate --domain-name "blog.eleven-labs.com" --region "us-east-1"
\`\`\`

\`\`\`js
// special markup for the CodeBlock element
if (ast.type === 'CodeBlock') {
  return React.createFactory(Highlight)({
    language: ast.lang,
    children: ast.value,
  });
}
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
      <div className="codelabs-ast-console" style={{ padding: 20 }}>
        <textarea
          id="markdown"
          rows={15}
          value={this.state.md}
          onChange={this.onChange}
          style={{
            fontFamily: 'monospace',
            fontSize: 14,
            width: '100%',
          }}
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

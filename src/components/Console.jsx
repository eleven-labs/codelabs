import React from 'react';
import PropTypes from 'prop-types';
// import { parse } from 'markdown-to-ast';

import componentFactory from '../services/componentFactory';

// this is ridiculous. can't believe I'm doing this.
// the script tag breaks eslint, even inside string literals.
const script = [
  ['<', 'script', '>'].join(''),
  'alert(\'toto\');',
  ['</', 'script', '>'].join(''),
].join('');

const initialMD = `### hello **world**

- yeah
- lol

\`console.log('hello world');\`

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

> La subtilité de cette étape consiste à faire la demande de certificat dans la région us-east-1 (N. Virginia), sinon le certificat ne pourra pas être utilisé sur la future distribution Amazon Cloudfront.

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
      postPaths: [],
    };

    this.onChange = this.onChange.bind(this);
    this.onPostSelected = this.onPostSelected.bind(this);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return this.state.md !== nextState.md || this.state.postPaths !== nextState.postPaths;
  }

  onChange(event) {
    this.setState({
      md: event.currentTarget.value,
    });
  }

  async onPostSelected(event) {
    event.persist();

    this.setState({
      // md: await getPost(event.target.value),
    });
  }

  render() {
    const { postPaths } = this.state;
    const comps = componentFactory(this.state.md);

    return (
      <div className="codelabs-ast-console" style={{ padding: 20 }}>
        {false && <p>
          <select onChange={this.onPostSelected}>
            <option value="0">--- Select a post ---</option>
            {postPaths.map(post => (
              <option value={post} key={post}>{post.replace('.md', '')}</option>
            ))}
          </select>
        </p>}
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
          <div className="generated-component post-content">
            {comps.map((renderer, key) => renderer({ key }))}
          </div>
        </div>
      </div>
    );
  }
}

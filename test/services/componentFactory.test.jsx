import React from 'react';
import { mount } from 'enzyme';

import componentFactory from '../../src/services/componentFactory';

describe('Component Factory', () => {
  it('should create a paragraph component', () => {
    const md = `hello *cool*
    
- yeah
- lol

\`mmm\`

<a href="http://google.com">
google
</a>

<script>
alert('toto');
</script>

---

<hr />

\`\`\`js
console.log(lol);
\`\`\`


[lien](http://google.fr)

<div>
  <div>
    <div>
      foo
    </div>
  </div>
</div>
    `;

    const components = componentFactory(md);
    const wrapper = mount(
      <div>
        {components.map((renderer, key) => renderer({ key }))}
      </div>
    );

    expect(wrapper.find('Paragraph')).toHaveLength(3);
    expect(wrapper.find('Html')).toHaveLength(4);
    expect(wrapper.find('List')).toHaveLength(1);
    expect(wrapper.find('Code')).toHaveLength(1);
    expect(wrapper.find('CodeBlock')).toHaveLength(1);
    expect(wrapper.find('HorizontalRule')).toHaveLength(1);
    expect(wrapper.find('Link')).toHaveLength(1);
    expect(wrapper.find('ListItem')).toHaveLength(2);

    expect(wrapper.children()).toHaveLength(10);
  });
});

import React from 'react';

interface DemoProps {
  name: string;
}
class Demo1 extends React.Component<DemoProps> {
  render() {
    return (
      <div className='shopping-list'>
        <h1>Shopping list for {this.props.name}</h1>
        <ul>
          <li>Apple</li>
          <li>Banana</li>
          <li>Orange</li>
        </ul>
      </div>
    );
  }
}

export { Demo1 };

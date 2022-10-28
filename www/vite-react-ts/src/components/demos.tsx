import React from 'react';

class Demo1 extends React.Component {
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

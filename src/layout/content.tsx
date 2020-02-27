import React, { Component } from 'react';
import { Button } from 'antd';
import Content from '../router/index';

interface IProps {

}

class MainContent extends Component<IProps, any> {
  render() {
    return (
      <div style={{minHeight:'80vh'}}>
        <Content />
      </div>
    );
  }
}

export default MainContent;
import React, { Component } from 'react';
import { Card, Row, Col, Icon, Menu } from 'antd';
import './index.less';

import LeftCon from './leftCon';
import Avator from './common/avatar';
import CommentCom from './common/comment';
import CarouselPage from './common/carousel';

interface IProps {

}

class Blog extends Component<IProps, any> {
  render() {
    return (
      <div className='blog'>
        <div className='blogHeader'>
          <Row gutter={16} type='flex' justify='center'>
            <Col span={19} className='welcome'>
              <h2>欢迎来到我的博客</h2>
            </Col>
            <Col span={5}>
              <Menu mode="horizontal">
                <Menu.Item key="home">
                  <Icon type="home" />
                  博客首页
                </Menu.Item>
                <Menu.Item key="youtube">
                  <Icon type="youtube" />
                  视频教程
                </Menu.Item>
                <Menu.Item key="switcher">
                  <Icon type="switcher" />
                  其他订阅
                </Menu.Item>
              </Menu>
            </Col>
          </Row>
        </div>
        <div className='blogContent'>
          <Row gutter={16} type='flex' justify='center'>
            <Col span={19}>
              <div className='leftCon'>
                <CarouselPage/>
                <LeftCon />
                <CommentCom/>
              </div>
            </Col>
            <Col span={5}>
              <div className='rightCon'>
                <Avator/>
              </div>
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}

export default Blog;
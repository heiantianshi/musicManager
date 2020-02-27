import React, { Component } from 'react';
import { Avatar, Tag, Divider, Tooltip, Affix } from 'antd';
import './common.less';
import Tab from './tabs';

interface IProps {

}

class AvatarInfo extends Component<IProps, any> {
  render() {
    return (
      <Affix offsetTop={70}>
          <div className='avatar'>
            <Avatar size={80} icon="dropbox" />
            <h4>鸢尾</h4>
            <p>专注上单，中单十多年</p>
            <div className='tags'>
              <Tag color="magenta">magenta</Tag>
              <Tag color="red">red</Tag>
              <Tag color="volcano">volcano</Tag>
              <Tag color="orange">orange</Tag>
              <Tag color="gold">gold</Tag>
              <Tag color="lime">lime</Tag>
              <Tag color="green">green</Tag>
              <Tag color="cyan">cyan</Tag>
              <Tag color="blue">blue</Tag>
              <Tag color="geekblue">geekblue</Tag>
              <Tag color="purple">purple</Tag>
            </div>
            <Divider>社交账号</Divider>
            <div className='iconList'>
              <Tooltip title="www.dingding.com">
                <Avatar icon="dingding" />
              </Tooltip>
              <Tooltip title="www.github.com">
                <Avatar icon="github" />
              </Tooltip>
              <Tooltip title="www.qq.com">
                <Avatar icon="qq" />
              </Tooltip>
              <Tooltip title="www.wechat.com">
                <Avatar icon="wechat" />
              </Tooltip>
            </div>
            <Tab/>
          </div>
      </Affix>
    );
  }
}

export default AvatarInfo;
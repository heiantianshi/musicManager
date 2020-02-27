import React, { Component } from 'react';
import { Tabs, Icon,Card } from 'antd';
import './common.less';

const { TabPane } = Tabs;
interface IProps {

}

class Tab extends Component<IProps, any> {
    render() {
        return (
            <div className='tab'>
                <Tabs defaultActiveKey="1">
                    <TabPane
                        tab={
                            <span>
                                <Icon type="apple" />密圈
                            </span>
                        }
                        key="1"
                    >
                        <img className='img' src={require('../../../images/11.jpg')} />
                    </TabPane>
                    <TabPane
                        tab={
                            <span>
                                <Icon type="android" />
                                公号
                            </span>
                        }
                        key="2"
                    >
                        <img className='img' src={require('../../../images/22.jpg')} />
                    </TabPane>
                    <TabPane
                        tab={
                            <span>
                                <Icon type="qq" />
                                qq群
                            </span>
                        }
                        key="3"
                    >
                        <img className='img' src={require('../../../images/33.jpg')} />
                    </TabPane>
                </Tabs>
            </div>
        );
    }
}

export default Tab;
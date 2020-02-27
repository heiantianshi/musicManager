import React, { Component } from 'react';
import { Layout, Icon, Badge, Avatar, Popover } from 'antd';
import './index.less';

export interface ILayout {

}

class HeaderBar extends Component<ILayout, any> {
    constructor(props: any) {
        super(props)
        this.state = {
            src: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
        }
    }
    render() {
        return (
            <div className='headerBox'>
                <div className='wapperBox'>
                    <Badge count={100}>
                        <a href="#" className="head-example" />
                    </Badge>
                    <Icon type="alipay" />
                </div>
                <div className='wapperBox'>
                    <Icon type="alipay" />
                </div>
                <div className='AvatarBox'>
                    <Avatar size={"large"} src={this.state.src} />
                    <span>曲奇饼干</span>
                    <div className='PopoverBox'>
                        <div className='whiteSpace'>{''}</div>
                        <div className='popoverCon'>
                            <span className='p'><Icon type="user" /><span>个人中心</span></span>
                            <span className='p'><Icon type="setting" /><span>个人设置</span></span>
                            <span className='p'><Icon type="exclamation-circle" /><span>信息报错</span></span>
                            <span className='p'><Icon type="logout" /><span>退出登录</span></span>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default HeaderBar;
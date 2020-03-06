import React, { Component } from 'react';
import { Button, Avatar, Icon, Input, message, Popover } from 'antd';
import io from 'socket.io-client';
import './index.less';
const { TextArea } = Input;

interface IProps {
    match: any
}
let socket = io('ws://localhost:9093')

class Chat extends Component<IProps, any> {
    state = {
        showChat: false, // 显示聊天室
        user: '张三', // 当前登录用户
        leftCon: '', // 左边输入内容
        rightCon: '', // 右边输入内容
        chatContent: [], // 聊天记录
    }
    componentDidMount() {
        message.success(`${'data'}`)
        const user = this.props.match.params.user;
        this.setState({ user: user })
        // 显示连接成功与否
        socket.on('open', data => {
            message.success(`欢迎${user}来到聊天室`)
        })
        // 监听服务器发送的数据到客户端
        socket.on('sendClient', data => {
            const { chatContent } = this.state;
            this.setState({ chatContent: [...chatContent, data] })
        })
    }
    componentWillUnmount() {
        // io('ws://localhost:9093').on('disconnect');
    }

    // 左边用户输入
    private handleInputLeft = (e) => {
        this.setState({ leftCon: e.target.value })
    }
    // 右边小爱输入
    private handleInputRight = (e) => {
        this.setState({ rightCon: e.target.value })
    }
    // 取消
    private handleCancle = (type) => {
        this.setState({ [`${type}Con`]: '' })
    }
    // 发送
    private sendMsg = (type) => {
        const { leftCon, rightCon, user } = this.state;
        const data: any = {}
        data.content = type === 'right' ? rightCon : leftCon;;
        data.user = type === 'right' ? 'xiaoai' : user;
        socket.emit('sendServer', data)
        this.handleCancle(type)
    }
    // 判断聊天内容是谁发出
    private showChatContent = (who) => {
        const { chatContent, user } = this.state;
        if (who !== 'xiaoai') {
            return (
                chatContent.map((item: any, index: number) => {
                    if (item.user !== 'xiaoai') {
                        return (
                            // 聊天文字块---右
                            <div className='textRight' key={index}>
                                <div className='text'><div className='triangle'></div> {item.content}</div>
                                <div className='Avatar'><Avatar shape="square" src={require('../../images/avater1.jpg')} /></div>
                            </div>
                        )
                    } else {
                        return (
                            // 聊天文字块---左
                            <div className='textLeft' key={index}>
                                <div className='Avatar'><Avatar shape="square" src={require('../../images/avater2.jpg')} /></div>
                                <div className='text'><div className='triangle'></div>{item.content}</div>
                            </div>
                        )
                    }
                })
            )
        } else {
            return (
                chatContent.map((item: any, index: number) => {
                    if (item.user === 'xiaoai') {
                        return (
                            // 聊天文字块---右
                            <div className='textRight' key={index}>
                                <div className='text'><div className='triangle'></div> {item.content}</div>
                                <div className='Avatar'><Avatar shape="square" src={require('../../images/avater2.jpg')} /></div>
                            </div>
                        )
                    } else {
                        return (
                            // 聊天文字块---左
                            <div className='textLeft' key={index}>
                                <div className='Avatar'><Avatar shape="square" src={require('../../images/avater1.jpg')} /></div>
                                <div className='text'><div className='triangle'></div>{item.content}</div>
                            </div>
                        )
                    }
                })
            )
        }

    }
    // 打开表情包
    private showSmile = () => {

    }
    render() {
        const { leftCon, rightCon, user } = this.state;
        const smileList=['p1.jpeg','p2.jpeg','p3.jpg','p4.jpg','p5.jpg','p6.jpg']
        const smileBox=()=>(
            smileList.map(item=>(
                <img className='img' src={require(`../../images/${item}`)} alt=""/>
            ))
        )
        // 当前登录用户
        const chatUser = (
            <div className='chatWindow'>
                <div className='left'>
                    <div className='userMsg'>
                        <h3>小爱同学</h3>
                    </div>
                    <div className='chatPanel'>
                        {this.showChatContent(user)}
                    </div>
                    <div className='inputWindow'>
                        <div className=' toolbar'>
                            <Popover placement="topLeft" content={smileBox()} trigger="click">
                                <Icon type="smile" onClick={this.showSmile} />&emsp;
                            </Popover>
                            
                            <Icon type="picture" />
                        </div>
                        <div className='textPanel'>
                            <TextArea className='textArea' value={leftCon} onChange={this.handleInputLeft} />
                        </div>
                        <div className='buttonGroup'>
                            <Button type='default' onClick={this.handleCancle.bind(this, 'left')}>取消</Button>&emsp;
                        <Button type='primary' onClick={this.sendMsg.bind(this, 'left')}>发送</Button>&emsp;
                    </div>
                    </div>
                </div>
                <div className='right'>

                </div>
            </div>
        )
        // 小爱
        const XIAOAI = (
            <div className='chatWindow'>
                <div className='left'>
                    <div className='userMsg'>
                        <h3>{user}</h3>
                    </div>
                    <div className='chatPanel'>
                        {this.showChatContent('xiaoai')}
                    </div>
                    <div className='inputWindow'>
                        <div className=' toolbar'>
                            <Icon type="smile" />&emsp;
                        <Icon type="picture" />
                        </div>
                        <div className='textPanel'>
                            <TextArea className='textArea' value={rightCon} onChange={this.handleInputRight} />
                        </div>
                        <div className='buttonGroup'>
                            <Button type='default' onClick={this.handleCancle.bind(this, 'right')}>取消</Button>&emsp;
                        <Button type='primary' onClick={this.sendMsg.bind(this, 'right')}>发送</Button>&emsp;
                    </div>
                    </div>
                </div>
                <div className='right'>

                </div>
            </div>
        )
        // 聊天界面
        const chat = (
            <div className='chat'>
                <div>{chatUser}</div>
                <div>{XIAOAI}</div>
            </div>
        )

        return (
            <div>
                {chat}
            </div>
        );
    }
}

export default Chat;
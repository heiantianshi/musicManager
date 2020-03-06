import React, { Component } from 'react';
import { Button, Card, Input, Row, Col,Modal } from 'antd';
import {withRouter} from 'react-router-dom';
import WhiteSpace from '../../components/WhiteSpace';


class ChatLogin extends Component<any, any> {
    constructor(props){
        super(props)
        this.state = {
            value:''
        }
    }
    componentDidMount() {
        
    }
    private login = () => {
        const {value}=this.state;
        if(!value){
            Modal.error({
                title: '请输入正确用户名',
              });
              return
        }
        this.props.history.push(`/chat/basic/${value}`)
    }
    private handleChange=(e)=>{
        this.setState({value:e.target.value})
    }
    render() {
        const {value}=this.state;
        return (
            <Card bodyStyle={{minHeight:500,marginTop:200}}>
                <Row type='flex' justify='center'>
                    <Col span={8}>
                        <Input placeholder='请输入用户名' value={value} onChange={this.handleChange}/>
                        <WhiteSpace/>
                        <Button block type='primary' onClick={this.login}>进入聊天室</Button>
                    </Col>
                </Row>
            </Card>
        );
    }
}

export default withRouter(ChatLogin);
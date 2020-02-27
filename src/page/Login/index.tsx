import * as React from 'react';
import { Button, Form, Input, Checkbox, Icon,message } from 'antd';
import { FormComponentProps } from 'antd/es/form';
import Texty from 'rc-texty';
import QueueAnim from 'rc-queue-anim';
import './index.less';
import WhiteSpace from '../../components/WhiteSpace';
import Background from './Background';

interface ILoginPage extends FormComponentProps {
    history:any
}

class LoginPage extends React.Component<ILoginPage, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            show: false,
            loading:false
        }
    }
    componentDidMount() {
        this.setState({ show: true })
    }
    public handleLogin = () => {
        this.props.form.validateFieldsAndScroll((err,value)=>{
            if(!err){
                this.setState({loading:true})
                if(value.username==='admin' && value.password==='admin' && value.checkCode==='1234'){
                    sessionStorage.setItem('user',JSON.stringify(value))
                    setTimeout(()=>{
                        this.setState({loading:false})
                        this.props.history.push('/')
                    },1000)
                }else{
                    this.setState({loading:false})
                    message.error('账号或密码错误，请重新输入')
                }
            }
        })
    };


    render() {
        const { getFieldDecorator } = this.props.form;
        const { show,loading } = this.state;
        return (

            <div className='loginContainer'>
                <Background />
                <QueueAnim delay={3000} duration={800} type='left'>
                    <div className='loginBox' key='1'>
                        <WhiteSpace key='1' height={60} content={<h1 className='loginTitle'><Texty type='top' mode='smooth'>{show && 'ONLY LOVE MUSIC'}</Texty></h1>} />
                        <QueueAnim delay={500}>
                            <Form.Item key='1'>
                                {getFieldDecorator('username', {
                                    rules: [{ required: true, message: '请输入账号!admin' }],
                                })(
                                    <Input
                                        style={{ width: 300 }}
                                        prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                        placeholder="请输入账号"
                                    />,
                                )}
                            </Form.Item>
                            <Form.Item key='2'>
                                {getFieldDecorator('password', {
                                    rules: [{ required: true, message: '请输入密码!admin' }],
                                })(
                                    <Input
                                        style={{ width: 300 }}
                                        prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                        type="password"
                                        placeholder="请输入密码"
                                    />,
                                )}
                            </Form.Item>
                            <Form.Item key='3'>
                                {getFieldDecorator('checkCode', {
                                    rules: [{ required: true, message: '请输入验证码!1234' }],
                                })(
                                    <Input
                                        style={{ width: 300 }}
                                        prefix={<Icon type="safety-certificate" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                        placeholder="请输入验证码"
                                    />,
                                )}
                            </Form.Item>
                            <Form.Item key='4'>
                                {getFieldDecorator('remember', {
                                    valuePropName: 'checked',
                                    initialValue: true,
                                })(<Checkbox>记住我</Checkbox>)}
                            </Form.Item>
                            <Button key='5' style={{ width: 300 }} type="primary" onClick={this.handleLogin} loading={loading}>登录</Button>
                        </QueueAnim>
                    </div>
                </QueueAnim>
            </div>


        );
    }
}

export default Form.create()(LoginPage);
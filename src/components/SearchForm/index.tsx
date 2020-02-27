import * as React from 'react';
import { Form, Row, Col, Button, Icon } from 'antd';
import { FormComponentProps } from 'antd/es/form';
import './index.less';

interface UserFormProps extends FormComponentProps {
    searchForm:any[]
    extraBtn?:Array<any>;
    wrappedComponentRef:any
    getReset:() => void;
    getSearch:() => void;
}

class SearchForm extends React.Component<UserFormProps, any> {
    constructor(props: any) {
        super(props)
        this.state = {
            expand: false,
        }
    }
    // 渲染表单
    public getFields(searchForm:any) {
        const count = this.state.expand ? searchForm.length : 8;
        const { getFieldDecorator } = this.props.form;
        const children:any = [];
        const formItemLayout = {
            labelCol: {
              xs: { span: 6 },
              sm: { span: 6 },
              md: { span: 6 }
            },
            wrapperCol: {
              xs: { span: 15 },
              sm: { span: 15 },
              md: { span: 15 }
            }
          };
        searchForm.map((item:any,index:number)=>{
            children.push(
                <Col span={6} key={index} style={{ display: index < count ? 'block' : 'none' }}>
                    <Form.Item label={item.label} {...formItemLayout}>
                        {getFieldDecorator(`${item.id}`, item.options || {})(item.render())}
                    </Form.Item>
                </Col>
            );
        })
        return children;
    }
    // 搜索
    public handleSearch = (e: any) => {
        e.preventDefault();
        this.props.getSearch()
    };
    // 重置
    public handleReset = () => {
        this.props.getReset()
    };
    // 展开收起
    public toggle = () => {
        const { expand } = this.state;
        this.setState({ expand: !expand });
    };

    render() {
        const {searchForm=[],extraBtn}=this.props;
        return (
            <div className='myForm'>
                <Form className="ant-advanced-search-form" onSubmit={this.handleSearch}>
                    <Row gutter={24}>{this.getFields(searchForm)}</Row>
                    <Row>
                        <Col span={24} style={{ textAlign: 'left' }}>
                            {/* <Button type="primary" htmlType="submit" loading={commomState.loading}>搜索</Button> */}
                            <Button className='btnStyle' onClick={this.handleReset}>重置</Button>
                            {
                                extraBtn?extraBtn.map((item:any,index:number)=>(
                                    <Button key={index}  type="primary" className='btnStyle' onClick={item.Func}>{item.name}</Button>
                                )):''
                            }
                            {
                                searchForm.length>8?
                                <Button className='btnStyle' onClick={this.toggle}>
                                        {this.state.expand ? '收起' : '展开'}
                                        <Icon type={this.state.expand ? 'up' : 'down'} />
                                </Button>:''
                            }
                        </Col>
                    </Row>
                </Form>
            </div>
        )
    }
}
export default Form.create<UserFormProps>()(SearchForm)
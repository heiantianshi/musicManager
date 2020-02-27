import React, { Component } from 'react';
import { Comment, Avatar, Form, Button, List, Input } from 'antd';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime'
import { any } from 'prop-types';

const { TextArea } = Input;
dayjs.extend(relativeTime)

interface IProps {

}

class CommentCom extends Component<IProps, any> {
    state = {
        comments: [
            {
                author: 'Han Solo',
                avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
                content: '哈哈哈哈哈',
                datetime: dayjs().fromNow(),
            },
            {
                author: 'Han Solo',
                avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
                content: '哈哈哈哈哈,今天天气真好',
                datetime: dayjs().fromNow(),
            },
            {
                author: 'Han Solo',
                avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
                content: '哈哈哈哈哈，不能出门，好难受',
                datetime: dayjs().fromNow(),
            }
        ],
        submitting: false,
        values: '',
    };
    handleSubmit = () => {
        if (!this.state.values) {
            return;
        }
        this.setState({ submitting: true });
        setTimeout(() => {
            this.setState({
                submitting: false,
                values: '',
                comments: [
                    {
                        author: 'Han Solo',
                        avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
                        content: this.state.values,
                        datetime: dayjs().fromNow(),
                    },
                    ...this.state.comments,
                ],
            });
        }, 1000);
    };

    handleChange = e => {
        this.setState({
            values: e.target.value,
        });
    };

    render() {
        const { comments, submitting, values } = this.state;
        const CommentList = (comments) => (
            <List
                dataSource={comments}
                header={`${comments.length} 条评论`}
                itemLayout="horizontal"
                renderItem={(item: any) => <Comment {...item}/>}
            />
        );
        return (
            <div style={{backgroundColor:'#fff',padding:15}}>
                {comments.length > 0 && CommentList(comments)}
                <Comment
                    avatar={
                        <Avatar
                            src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                            alt="Han Solo"
                        />
                    }
                    content={
                        <div>
                            <Form.Item>
                                <TextArea rows={4} onChange={this.handleChange} value={values} />
                            </Form.Item>
                            <Form.Item>
                                <Button htmlType="submit" loading={submitting} onClick={this.handleSubmit} type="primary">
                                    添加评论
                                </Button>
                            </Form.Item>
                        </div>
                    }
                />
            </div>
        );
    }
}

export default CommentCom;
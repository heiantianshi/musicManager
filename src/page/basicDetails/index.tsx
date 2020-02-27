import React, { Component } from 'react';
import { Card, Descriptions,Table, Divider, Tag } from 'antd';

interface IProps {

}

class BasicDetails extends Component<IProps, any> {
    constructor(props){
        super(props)
        this.state={

        }
    }
    render() {
        const columns = [
            {
              title: 'Name',
              dataIndex: 'name',
              key: 'name',
              render: text => <a>{text}</a>,
            },
            {
              title: 'Age',
              dataIndex: 'age',
              key: 'age',
            },
            {
              title: 'Address',
              dataIndex: 'address',
              key: 'address',
            },
            {
              title: 'Tags',
              key: 'tags',
              dataIndex: 'tags',
              render: tags => (
                <span>
                  {tags.map(tag => {
                    let color = tag.length > 5 ? 'geekblue' : 'green';
                    if (tag === 'loser') {
                      color = 'volcano';
                    }
                    return (
                      <Tag color={color} key={tag}>
                        {tag.toUpperCase()}
                      </Tag>
                    );
                  })}
                </span>
              ),
            },
            {
              title: 'Action',
              key: 'action',
              render: (text, record) => (
                <span>
                  <a>Invite {record.name}</a>
                  <Divider type="vertical" />
                  <a>Delete</a>
                </span>
              ),
            },
          ];
          const data = [
            {
              key: '1',
              name: 'John Brown',
              age: 32,
              address: 'New York No. 1 Lake Park',
              tags: ['nice', 'developer'],
            },
            {
              key: '2',
              name: 'Jim Green',
              age: 42,
              address: 'London No. 1 Lake Park',
              tags: ['loser'],
            },
            {
              key: '3',
              name: 'Joe Black',
              age: 32,
              address: 'Sidney No. 1 Lake Park',
              tags: ['cool', 'teacher'],
            },
          ];
        return (
            <Card>
                <Descriptions title="退款申请">
                    <Descriptions.Item label="取货单号">1000000000</Descriptions.Item>
                    <Descriptions.Item label="状态">已取货</Descriptions.Item>
                    <Descriptions.Item label="销售单号">540000200512057660</Descriptions.Item>
                    <Descriptions.Item label="子订单">520000201412158369</Descriptions.Item>
                    <Descriptions.Item label="地址">成都市锦江区</Descriptions.Item>
                </Descriptions>
                <Descriptions title="用户信息">
                    <Descriptions.Item label="用户姓名">鸢尾</Descriptions.Item>
                    <Descriptions.Item label="联系电话">18100000000</Descriptions.Item>
                    <Descriptions.Item label="常用快递">菜鸟物流</Descriptions.Item>
                    <Descriptions.Item label="取货地址">浙江省杭州市西湖区万塘路18号</Descriptions.Item>
                    <Descriptions.Item label="备注">哈哈哈哈哈</Descriptions.Item>
                </Descriptions>
                <h3 style={{ marginBottom: 16 }}>退货商品</h3>
                <Table columns={columns} dataSource={data} bordered={true}/>
                <h3 style={{ marginBottom: 16 }}>退货进度</h3>
                <Table columns={columns} dataSource={data} bordered={true}/>
            </Card>
        );
    }
}

export default BasicDetails;
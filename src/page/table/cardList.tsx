import React, { Component } from 'react';
import { Card, Icon, Avatar, Col, Row } from 'antd';

const { Meta } = Card;

interface IProps {

}

class App extends Component<IProps, any> {
  render() {
    const card=(
      <Card
        // style={{ width: 330}}
        cover={
          <img
            alt="example"
            src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
          />
        }
        actions={[
          <Icon type="setting" key="setting" />,
          <Icon type="edit" key="edit" />,
          <Icon type="ellipsis" key="ellipsis" />,
        ]}
      >
        <Meta
          avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
          title="Card title"
          description="This is the description"
        />
      </Card>
    )
    return (
      
      <Card>
        <Card.Grid style={{width: '25%',textAlign: 'center',}}>{card}</Card.Grid>
        <Card.Grid style={{width: '25%',textAlign: 'center',}}>{card}</Card.Grid>
        <Card.Grid style={{width: '25%',textAlign: 'center',}}>{card}</Card.Grid>
        <Card.Grid style={{width: '25%',textAlign: 'center',}}>{card}</Card.Grid>
        <Card.Grid style={{width: '25%',textAlign: 'center',}}>{card}</Card.Grid>
        <Card.Grid style={{width: '25%',textAlign: 'center',}}>{card}</Card.Grid>
        <Card.Grid style={{width: '25%',textAlign: 'center',}}>{card}</Card.Grid>
      </Card>
    );
  }
}

export default App;
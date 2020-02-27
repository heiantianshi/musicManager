import React, { Component } from 'react';
import { Layout } from 'antd';
import './App.css';
import logo from './logo.svg';
import HeaderBar from './layout/headerBar/index';
import MainContent from './layout/content';
import Menus from './layout/menu';

const { Header, Content, Sider } = Layout;

class App extends Component {
  render() {
    return (
      <Layout>
        <Sider
          style={{
            overflow: 'auto',
            height: '100vh',
            position: 'fixed',
            left: 0,
          }}
        >
          {/* <img src={logo} className="App-logo" alt="logo" />
          <span style={{fontSize:20,color:'#fff',textAlign:'center'}}>Ant Design</span> */}
          <Menus />

        </Sider>
        <Layout style={{ marginLeft: 200 }}>
          <Header style={{ background: '#fff', padding: 0, boxShadow: '0px 2px 5px #ccc', paddingRight: 216, position: 'fixed', width: '100%', zIndex: 9999 }}>
            <HeaderBar />
          </Header>
          <Content style={{ margin: '80px 16px 0', overflow: 'scroll', }}>
            <MainContent />
          </Content>
        </Layout>
      </Layout>
    );
  }
}

export default App;
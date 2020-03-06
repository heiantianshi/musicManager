import * as React from 'react';
import { Layout, Icon, Tabs, Input } from 'antd';
import { HashRouter as Router, Route, Switch, Link, withRouter, Redirect } from 'react-router-dom';
import './index.less';
import WhiteSpace from '../../components/WhiteSpace/index';
import Banner from './commom/banner/banner';
import PlayBar from './commom/playBar';
import MusicList from './commom/playlist';
import LeftMenu from './leftMenu/index';
import Playlist from './commom/playlist';
import MvList from './mvList';

// 子页面
import SongListDetail from './page/playListDetail';

const { TabPane } = Tabs;
const { Search } = Input;
export interface IMusic {

}

class Music extends React.Component<IMusic, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            isLock: true,
            showSearch: false,
            searchVal: ''
        }
    }
    componentWillUnmount(){
        this.setState = (state, callback) => {
            return
        }    
    }
    private handleLock = () => {
        this.setState({ isLock: !this.state.isLock })
    }
    private showSearch = () => {
        const { searchVal } = this.state;
        if (searchVal.length) {
            console.log(2222)
        } else {
            this.setState({ showSearch: !this.state.showSearch })
        }
    }
    private handleSearch = (e: any) => {
        this.setState({ searchVal: e.target.value })
    }
    render() {
        const { isLock, showSearch } = this.state;
        // 搜索栏
        const search = (
            <div>
                <Icon type='search' style={{ fontSize: 16 }} onClick={this.showSearch} />
                <Input
                    placeholder="搜索"
                    onChange={this.handleSearch}
                    style={{ width: showSearch ? 200 : 0, padding: showSearch ? '4px 11px' : 0 }}
                />
            </div>
        )
        // 音乐首页路由
        const indexPage = () => {
            return (
                <Tabs defaultActiveKey="1" tabBarExtraContent={search}>
                    <TabPane tab="个性推荐" key="1">
                        <Banner />
                        <WhiteSpace />
                        <Playlist/>
                        {/* <MusicList /> */}
                    </TabPane>
                    <TabPane tab="mv" key="2">
                        <MvList/>
                    </TabPane>
                    <TabPane tab="排行榜" key="3">
                        Content of Tab Pane 3
                    </TabPane>
                </Tabs>
            )
        }
        return (
            <div className='musicContainer'>
                <div className='leftMenu'>
                    <LeftMenu />
                </div>
                <div className='rightContainer'>
                    <Router>
                        <Switch>
                            <Route path='/music/musicGround' component={indexPage} exact={true}/>
                            <Route path='/music/musicGround/detail/:id' component={SongListDetail} exact={true}/>
                            {/* <Redirect from="/" to="/music/musicGround"/> */}
                        </Switch>
                    </Router>
                </div>
                <div className={`footPlayBar ${isLock ? 'removeHover' : ''}`} >
                    <Icon className='lock' type={isLock ? 'lock' : 'unlock'} onClick={this.handleLock} />
                    <PlayBar />
                </div>
            </div>
        );
    }
}

export default Music;
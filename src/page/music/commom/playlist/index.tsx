import * as React from 'react';
import { Button, Popover, Icon } from 'antd';
import { withRouter } from 'react-router-dom';
import { observer } from "mobx-react";
import _ from 'lodash';
import MusicApi from '../../../../api/musicApi';
import http from '../../../../utils/http';
import './index.less';


@observer
class Playlist extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            currentCat: '', // 当前选中分类
            visible: false, // 分类菜单是否显示
            catList: [], // 获取分类
            hotList:[], // 热门分类
            playList:[], // 歌单 ( 网友精选碟 )
        }
    }
    componentDidMount() {
        // 获取分类
        this.getCatlistReq()
        // 获取热门分类
        this.getHotlisttReq()
        // 获取 歌单 ( 网友精选碟 )
        this.getPlayListReq({})
        // 获取歌单列表
        this.getSongList('华语')
    }
    // 获取分类
    private getCatlistReq = () => {
        http.get(MusicApi.getCatlist, {}).then((res: any) => {
            this.setState({ catList: res, })
        })
    }
    // 获取热门分类
    private getHotlisttReq = () => {
        http.get(MusicApi.getHotlist, {}).then((res: any) => {
            this.setState({ hotList: res, })
        })
    }
    // 歌单 ( 网友精选碟 )
    private getPlayListReq = (params:object) => {
        http.get(MusicApi.getPlaylist, {params:params}).then((res: any) => {
            this.setState({ playList: res, })
        })
    }

    // 监听获取每个歌单间隙
    private getEverySpace = () => {
        const {playList}=this.state;
        const playSonglist: any = this.refs['playSonglist']
        const width = playSonglist && playSonglist.offsetWidth; // 容器宽度
        const listNumber = Math.floor(width / 170) // 一排歌单数量
        const everySpaceWidth = width / (listNumber - 1) // 歌单间隙
        const songNumber=!(_.isEmpty(playList))?playList.playlists.length:0; // 当前页歌单总数量
        const spaceNumber=listNumber-(songNumber%listNumber);  // 空余位置能放歌单个数
        return spaceNumber
    }
    // 获取分类下具体歌单
    private getSongList = (name: string) => {
        this.setState({ currentCat: name })
        this.getPlayListReq({ order: 'hot', cat: name })
        this.handleClickChange(false)
    }
    // 处理热门分类
    private changeHotList = () => {
        const {hotList,currentCat } = this.state;
        return (
            !(_.isEmpty(hotList)) ? hotList.tags.map((item: any, index: number) => {
                return (
                    <span key={index} className='everyName'>
                        <span className='name1' 
                            onClick={this.getSongList.bind(this, item.name)} 
                            style={{backgroundColor:currentCat===item.name?'#f7e2e2':''}}
                        >
                            {item.name}
                        </span>
                        <span className='line'>|</span>
                    </span>
                )
            }) : ''
        )
    }
    // 处理分类
    private changeFormat = () => {
        const { catList,currentCat } = this.state;
        return (
            !(_.isEmpty(catList)) ? ['dribbble', 'fire', 'coffee', 'meh', 'appstore'].map((item: string, index: number) => {
                return (
                    <div key={index} className='listContainer'>
                        <div className='listLeft'>
                            <Icon type={item} />&nbsp;<span>{catList.categories[index]}</span>
                        </div>
                        <div className='listRight'>
                            {
                                catList.sub.map((val: any, i: number) => {
                                    return (
                                        <span key={i}>
                                            {val.category === index ?
                                                <span className='everyName'>
                                                    <span className='name' onClick={this.getSongList.bind(this, val.name)}
                                                    style={{color:currentCat===val.name?'#1890ff':''}}>
                                                        {val.name}
                                                        <span className='hot'>{val.hot ? 'hot' : ''}</span>
                                                    </span>
                                                    <span className='line'>|</span>
                                                </span>
                                                : ''}
                                        </span>

                                    )
                                })
                            }
                        </div>
                    </div>
                )
            }) : ''
        )

    }
    // 处理播放次数显示
    private changePlayCount = (val: number) => {
        if (val.toString().length > 5) {
            const num = val.toString()
            return `${num.substring(0, num.length - 4)}万`
        } else {
            return val
        }
    }
    // 点击歌单获取歌单详情页面
    private handleGetDetailPage = (id: any) => {
        this.props.history.push(`/music/musicGround/detail/${id}`)
    }
    // 处理歌单列表
    private changeSongList = () => {
        const {playList}=this.state;
        const spaceNumber=!(_.isEmpty(playList))&&this.getEverySpace()
        const List=JSON.parse(JSON.stringify(playList))
        for (let index = 0; index < spaceNumber; index++) {
            List.playlists.push({name:'hidden',playCount:1,creator:{nickname:'1'}})
        }
        return (
            !(_.isEmpty(playList)) ? List.playlists.map((item: any, index: number) => {
                return (
                    <div key={index} className='containerBox' 
                        onClick={this.handleGetDetailPage.bind(this,item.id)}
                        style={{visibility:item.name==='hidden'?'hidden':'visible'}}>
                        <span className='everyBox' style={{ backgroundImage: `url(${item.coverImgUrl})` }}>
                            <span className='playCount'><Icon type='caret-right'/>{this.changePlayCount(item.playCount)}</span>
                            <span className='playBtn'>
                                <span></span>
                            </span>
                            <span className='userNickName'><Icon type='user'/>{item.creator.nickname}</span>
                        </span>
                        <p>{item.name}</p>
                    </div>
                )
            }) : ''
        )
    }
    // 分类菜单是否显示
    private handleClickChange = (visible: boolean) => {
        this.setState({ visible: visible })
    }
    render() {
        const { currentCat, visible } = this.state;
        return (
            <div className='playList'>
                <div className='playListNav'>
                    <Popover
                        onVisibleChange={this.handleClickChange}
                        placement="bottomLeft"
                        content={this.changeFormat()} 
                        title="全部歌单"
                        trigger="click"
                        visible={visible}
                    >
                        <Button>{currentCat ? currentCat : '选择分类'}</Button>
                    </Popover>
                    <span>{this.changeHotList()}</span>
                </div>
                <div className='playSonglist' ref='playSonglist'>
                    {this.changeSongList()}
                </div>
            </div>
        );
    }
}

export default withRouter(Playlist);
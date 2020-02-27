import React, { Component } from 'react';
import { Modal, Icon, Popover, Button } from 'antd';
import MusicApi from '../../../api/musicApi';
import http from '../../../utils/http';
import _ from 'lodash';
import './index.less';

interface IProps {

}

class MvList extends Component<IProps, any> {
    constructor(props) {
        super(props)
        this.state = {
            mvList: [],  // 获取mv排行
            playMvUrl: '',
            poster: '',
            visible: false,
            currentCat: '', // 当前选中分类
        }
    }
    componentDidMount() {
        this.getMvList()
    }
    // 获取mv排行
    private getMvList = () => {
        http.get(MusicApi.getTopMv, {
            params: {
                limit: 28
            }
        }).then(res => {
            res&&this.setState({ mvList: res.data })
        })
    }
    // 获取播放mv地址
    private getPlayMv = (id, poster) => {
        http.get(MusicApi.getMvUrl, {
            params: {
                id: id
            }
        }).then(res => {
            this.setState({ playMvUrl: res.data.url, poster }, () => {
                this.setState({ visible: true })
            })
        })
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
    // 分类菜单是否显示
    private handleClickChange = (visible: boolean) => {
        this.setState({ visible: visible })
    }
    // 处理分类
    private changeFormat = () => {
        const { catList, currentCat } = this.state;
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
                                                        style={{ color: currentCat === val.name ? '#1890ff' : '' }}>
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
    // 获取分类下具体歌单
    private getSongList = (name: string) => {
        this.setState({ currentCat: name })
        // this.getPlayListReq({ order: 'hot', cat: name })
        this.handleClickChange(false)
    }
    // 处理热门分类
    private changeHotList = () => {
        const { hotList, currentCat } = this.state;
        return (
            !(_.isEmpty(hotList)) ? hotList.tags.map((item: any, index: number) => {
                return (
                    <span key={index} className='everyName'>
                        <span className='name1'
                            onClick={this.getSongList.bind(this, item.name)}
                            style={{ backgroundColor: currentCat === item.name ? '#f7e2e2' : '' }}
                        >
                            {item.name}
                        </span>
                        <span className='line'>|</span>
                    </span>
                )
            }) : ''
        )
    }
    handleOk = e => {
        console.log(e);
        this.setState({
            visible: false,
        });
    };

    handleCancel = e => {
        console.log(e);
        this.setState({
            visible: false,
        });
    };
    render() {
        const { mvList, visible, playMvUrl, poster, currentCat } = this.state;
        return (
            <div className='mvBox'>
                <div className='playListNav'>
                    <Popover
                        onVisibleChange={this.handleClickChange}
                        placement="bottomLeft"
                        content={this.changeFormat()}
                        title="全部歌单"
                        trigger="click"
                        visible={false}
                    >
                        <Button>{currentCat ? currentCat : '选择分类'}</Button>
                    </Popover>
                    <span>{this.changeHotList()}</span>
                </div>
                {
                    mvList.map((item, index) => (
                        <div key={index} className='mvCover'>
                            <img src={item.cover} alt="" onClick={this.getPlayMv.bind(this, item.id, item.cover)} />
                            <span className='playCount'><Icon type='caret-right' />{this.changePlayCount(item.playCount)}</span>
                            <span className='playBtn'>
                                <span></span>
                            </span>
                            <p>{item.name}  --by{item.artistName}</p>
                        </div>
                    ))
                }
                <Modal
                    visible={visible}
                    destroyOnClose={true}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    width={810}
                    maskClosable={false}
                    footer={null}
                    bodyStyle={{ padding: 5 }}
                    centered={true}
                >
                    <video className='video' width='800px' src={playMvUrl} poster={poster} controls />
                </Modal>
            </div>
        );
    }
}

export default MvList;
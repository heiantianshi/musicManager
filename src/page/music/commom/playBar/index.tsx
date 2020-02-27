import * as React from 'react';
import { Icon, Drawer, message } from 'antd';
import { observer, inject } from 'mobx-react';
import MusicStore from '../../../../store/musicStore';
import MusicApi from '../../../../api/musicApi';
import http from '../../../../utils/http';
import _ from 'lodash';
import './index.less';

export interface IMusic {
    palyingList?: Array<any>
    playingSong?: any
    putIntoNowPlaying?: any
}
@inject((store: any) => ({
    palyingList: store.MusicStore.palyingList,
    playingSong: store.MusicStore.playingSong,
    putIntoNowPlaying: store.MusicStore.putIntoNowPlaying,
}))
@observer
class PlayBar extends React.Component<IMusic, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            playFalg: false,
            visible: false,
            currentTime: '00:00', // 当前播放时间
            songMsg: {
                name: '落空-印子月',
                timeLength: '04:14',
                imgUrl: 'https://zos.alipayobjects.com/rmsportal/hzPBTkqtFpLlWCi.jpg',
                songUrl: ''
            }
        }
    }



    componentDidUpdate(prevProps: any) {
        if (this.props.playingSong !== prevProps.playingSong) {
            // 判断当前正在播放歌曲和刚添加进来的是否一样
            if (this.isSameSong(this.props.playingSong, prevProps.playingSong)) {
                this.getMusicUrl(this.props.playingSong.id)
            }
        }
    }
    // 播放时间改变
    private onTimeUpdate = () => {
        const { audio, timeline, playhead,playbar }: any = this.refs;
        const time = this.timeToMinute(Number(audio.currentTime))
        let timelineWidth = timeline.offsetWidth - playhead.offsetWidth;
        let playPercent = timelineWidth * (audio.currentTime / audio.duration);
        playhead.style.transform = "translateX(" + playPercent + "px)";
        playbar.style.width = `${playPercent+5}px`;
        this.setState({
            currentTime: time,
        });
        // 如果播放完毕--自动播放下一首
        if(audio.ended){
            this.handlePreNext('NEXT')
        }
    }
    // 进度条操作
    private timelineClick(e) {
        const { audio, timeline, playhead }: any = this.refs;
        let timelineWidth = timeline.offsetWidth - playhead.offsetWidth;

        // 更新坐标位置
        // e.pageX 鼠标点击位置
        // offsetLeft  元素 相对于它的直接父元素 的 偏移量
        let newLeft = e.pageX - timeline.offsetParent.offsetLeft;
        let currentTime = audio.duration * (e.pageX - timeline.offsetParent.offsetLeft) / timelineWidth;

        if (newLeft >= 0 && newLeft <= timelineWidth) {
            playhead.style.transform = "translateX(" + newLeft + "px)";
        }
        if (newLeft < 0) {
            playhead.style.transform = "translateX(0)";
            currentTime = 0;
        }
        if (newLeft > timelineWidth) {
            playhead.style.transform = "translateX(" + timelineWidth + "px)";
            currentTime = audio.duration;
        }
        // 更新时间
        let timeCurrent = this.timeToMinute(currentTime);
        this.setState({
            timeCurrent: timeCurrent,
            currentTime: currentTime,
        });

        // 如果在播放
        if (this.state.isPlay) {
            audio.currentTime = currentTime;
            audio.play();
        } else { // pause music
            audio.pause();
        }
    }
    // 判断当前播放歌曲是否是同一首歌---进行暂停播放
    public isSameSong = (current: any, pre: any) => {
        const { audio }: any = this.refs;
        console.log(this.refs)
        audio.load()
        if (current.id !== pre.id) {
            this.setState({ playFalg: false })
            return true
        } else {
            this.handlePlay()
            return false
        }
    }
    // 获取音乐播放地址
    private getMusicUrl = (id) => {
        http.get(MusicApi.getMusicUrl, { params: { id: id } }).then(res => {
            // 点击列表--把音乐放放入正在播放的音乐集合中
            const { playingSong } = this.props;
            const songMsg: any = {};
            songMsg.name = playingSong.name;
            songMsg.timeLength = playingSong.timeLength;
            songMsg.imgUrl = playingSong.albumPicUrl;
            songMsg.songUrl = res.data[0].url;
            this.setState({ songMsg }, () => {
                this.handlePlay()
            })
        })
    }

    // 切换播放按钮状态
    private handlePlay = () => {
        const { palyingList = [] } = this.props;
        if (!palyingList.length) {
            message.info('列表中暂无歌曲可播放')
            return
        }
        const { audio }: any = this.refs;
        const time = this.timeToMinute(Number(audio.duration))
        this.setState({ playFalg: !this.state.playFalg }, () => {
            const { playFalg } = this.state;
            if (playFalg) {
                audio.play()
            } else {
                audio.pause()
            }
        })
    }
    // 获取当前播放歌曲在播放列表位置
    private getSongIndex = () => {
        const { palyingList = [], playingSong } = this.props;
        const index = palyingList.findIndex(item => item.id === playingSong.id)
        return index
    }
    // 上一首下一首
    private handlePreNext = (type: string) => {
        const { palyingList = [] } = this.props;
        let index = this.getSongIndex()
        if (type === 'PRE') {
            if (index !== 0) {
                index--
            }
        } else {
            index++
        }
        this.props.putIntoNowPlaying(palyingList[index])

    }
    // 打开抽屉
    private showDrawer = () => {
        this.setState({
            visible: true,
        });
    };

    private onClose = () => {
        this.setState({
            visible: false,
        });
    };
    /** 按照格式处理列表数据 */
    public timeToMinute(time: number) {
        if (time > -1) {
            let timeLength: string = '';
            const min = Math.floor((time / 60 % 60)) < 10 ? '0' + Math.floor((time / 60 % 60)) : Math.floor((time / 60 % 60));
            const seconds = Math.floor((time % 60)) < 10 ? '0' + Math.floor((time % 60)) : Math.floor((time % 60));
            timeLength = `${min}:${seconds}`
            return timeLength;
        } else {
            return '00:00'
        }
    }
    render() {
        const { playFalg, songMsg, currentTime } = this.state;
        return (
            <div className='playbar'>
                <audio ref={'audio'} src={songMsg.songUrl} onTimeUpdate={this.onTimeUpdate}></audio>
                <div className='leftCol'>
                    <img src={songMsg.imgUrl} alt="" />
                    <div className='songName'>
                        <span>{songMsg.name}</span>
                        <span>{currentTime}/ {songMsg.timeLength}</span>
                    </div>
                </div>
                <div className='centerCol'>
                    <Icon type="step-backward" theme="filled" style={{ fontSize: 30 }} onClick={this.handlePreNext.bind(this, 'PRE')} />&emsp;
                    <Icon className='unselectable' type={playFalg ? 'pause-circle' : 'play-circle'} theme="filled" onClick={this.handlePlay} />&emsp;
                    <Icon type="step-forward" theme="filled" style={{ fontSize: 30 }} onClick={this.handlePreNext.bind(this, 'NEXT')} />
                    <div  ref={'timeline'} className='progressBar'>
                        <div ref={'playbar'} className='redProgress'></div>
                        <div ref={'playhead'} className='circle'></div>
                    </div>
                </div>
                <div className='rightCol'>
                    <Icon type="menu-unfold" onClick={this.showDrawer} />
                </div>
                <Drawer
                    title="Basic Drawer"
                    placement="right"
                    closable={false}
                    onClose={this.onClose}
                    visible={this.state.visible}
                >
                    <p>Some contents...</p>
                    <p>Some contents...</p>
                    <p>Some contents...</p>
                </Drawer>
            </div>
        );
    }
}

export default PlayBar;
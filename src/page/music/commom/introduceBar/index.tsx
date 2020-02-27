import * as React from 'react';
import { Button, Tag,Icon } from 'antd';
import dayjs from 'dayjs';
import './index.less';

interface IMusic {
    data:any
}

interface IState{
    playFalg:boolean;
    visible:boolean;
    isShow:boolean;
}

class IntroduceBar extends React.Component<IMusic, IState> {
    constructor(props: any) {
        super(props);
        this.state = {
            playFalg: false,
            visible: false,
            isShow:false,
        }
    }
    componentDidMount(){
        // console.log(this.props.data)
    }
    private showTags=(val:Array<string>)=>{
        let str:string=''
        val&&val.map((item:string)=>{
            str=`${str}${str?'/':''}${item}`
        })
        return str
    }
    // 处理播放次数显示
    private changePlayCount=(val:number=0)=>{
        if(val.toString().length>5){
            const num=val.toString()
            return `${num.substring(0, num.length-4)}万`
        }else{
            return val
        }
    }
    // 点击展开收起简介
    private handleDownUp=()=>{
        this.setState({isShow:!this.state.isShow})
    }
    render() {
        const {data={}}=this.props;
        const {isShow}=this.state;
        const tags=this.showTags(data.tags)
        return (
            <div className='Icontainer'>
                <img className='avatar' src={data.coverImgUrl} alt=""/>
                <div className='textContainer'>
                    <h2 className='h2'><Tag color="red">歌单</Tag>{data.name}</h2>
                    <p>
                        <Button type="danger" shape="round" icon="play-circle">
                            播放全部
                        </Button>&emsp;
                        <Button shape="round" icon="folder">
                            收藏
                        </Button>&emsp;
                        <Button shape="round" icon="share-alt">
                            分享
                        </Button>&emsp;
                        <Button shape="round" icon="download">
                            下载全部
                        </Button>
                    </p>
                    <p>
                        <img className='avatarUrl' src={data.creator&&data.creator.avatarUrl} alt=""/>
                        <span className='blueColor'>{data.creator&&data.creator.nickname}</span>&emsp;
                        <span className='gray'>{dayjs(data.createTime).format("YYYY-MM-DD HH:mm")}创建</span>
                    </p>
                    <p>标签：<span className='blueColor'>{tags}</span></p>
                    <p>
                        歌曲数：
                        <span className='gray'>{data.trackCount}</span>&emsp;
                        播放数：
                        <span className='gray'>{this.changePlayCount(data.playCount)}</span>
                    </p>
                    <span className='introduce'>
                        <span className='content'>
                            简介：<pre style={{height:isShow?'auto':'14px'}} className='gray'>{data.description}</pre>
                            <span style={{display:isShow?'none':'inline'}}>...</span>
                        </span>
                        <span className='icon'><Icon onClick={this.handleDownUp} type={isShow?'caret-up':'caret-down'} /></span>
                    </span>
                </div>
            </div>
        );
    }
}

export default IntroduceBar;
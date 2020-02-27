import * as React from 'react';
import {Icon,Avatar} from 'antd';
import './index.less';

export interface IMusic{

}

class LeftMenu extends React.Component<IMusic,any> {
    constructor(props:any) {
        super(props);
        this.state = {
            list:[
                {icon:'android',name:'发现音乐'},
                {icon:'apple',name:'私人FM'},
                {icon:'windows',name:'视频'},
                {icon:'dingding',name:'朋友'}
            ],
            myMusicList:[
                {icon:'weibo-square',name:'iTunes音乐'},
                {icon:'github',name:'下载管理'},
                {icon:'alipay-circle',name:'我的音乐云盘'},
                {icon:'dropbox',name:'我的收藏'}
            ],
            createSingerList:[
                {icon:'heart',name:'我喜欢的音乐'},
                {icon:'menu',name:'非主流'},
                {icon:'menu',name:'经典老歌'},
                {icon:'menu',name:'记忆中音乐'},
            ],
            currentActive:'',
            avater:'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png'
        }
    }
    // 点击列表
    private handleClick=(item:any)=>{
        console.log(item)
        this.setState({currentActive:item.name})
    }
    // 列表块
    private IconTerm=(list:Array<any>=[])=>{
        return(
            list.map((item:any,index:number)=>{
                const {currentActive}=this.state;
                return(
                    <p key={index} className={`IconTerm ${currentActive===item.name?'activeStyle':''}`} onClick={this.handleClick.bind(this,item)}>
                        <Icon className='icon' type={`${item.icon}`} />{item.name}
                    </p>
                )
            })
        )
    }
    render() {
        const {list,myMusicList,createSingerList,avater}=this.state;
        return (
            <div className='leftList'>
                {/* 顶部发现音乐 */}
                <div className='userAvatar'>
                    <Avatar className='avatar' size={40} src={avater} />
                    <span>黑暗天使1号</span>
                </div>
                {this.IconTerm(list)}
                {/* 我的音乐 */}
                <p className='title'>我的音乐</p>
                {this.IconTerm(myMusicList)}
                {/* 创建的歌单 */}
                <p className='title'>创建的歌单</p>
                {this.IconTerm(createSingerList)}
            </div>
        );
    }
}

export default LeftMenu;
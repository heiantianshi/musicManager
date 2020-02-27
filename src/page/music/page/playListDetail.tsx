import * as React from 'react';
import { Icon, Drawer } from 'antd';
import _ from 'lodash';
import IntroduceBar from '../commom/introduceBar';
import MyTable from '../commom/musicTable/index';
import CommonFun from '../commonFunc/index';
import MusicApi from '../../../api/musicApi';
import http from '../../../utils/http';

export interface IMusic {
    match?:any
}

class SongListDetail extends React.Component<IMusic, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            data:{}, // 详情顶部信息
            list:[], // 列表
            url:''
        }
    }
    componentDidMount(){
        this.getDatails()
    }

    // 获取详情页面信息
    private getDatails=()=>{
        const id=this.props.match.params.id;
        // 获取相关类型的歌单
        http.get(MusicApi.getPlaylistOne,{params:{id}}).then(res=>{
        })
        // 歌单详情
        http.get(MusicApi.getPlaylistDetail,{params:{id}}).then((res:any)=>{
            this.setState({
                data:res,
                list:CommonFun.dealTableData(res.playlist.tracks)
            })
        })
    }
    // private getDatails=()=>{
    //     const id=this.props.match.params.id;
    //     // 获取相关类型的歌单
    //     musicStore.getPlaylistOneReq({id:id}).then(res=>{
    //         console.log(res)
    //     })
    //     // 歌单详情
    //     musicStore.getPlaylistDetailReq({id:id}).then(res=>{
    //         this.setState({data:res})
    //         musicStore.getMusicUrlReq({id:res.privileges[0].id}).then(res=>{
    //             this.setState({url:res.data[0].url})
    //         })
    //     })
    // }
    render() {
        const { url,data,list } = this.state;
        return (
            <div >
                <IntroduceBar data={data.playlist}/>
                <MyTable dataSource={list}/>
            </div>
        );
    }
}

export default SongListDetail;
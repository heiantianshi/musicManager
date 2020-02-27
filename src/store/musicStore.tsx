import { observable, action } from 'mobx';

class MusicStore{
    /** 加载状态 */
    @observable loading:boolean=false;
    /** 当前播放歌曲所在整个列表 */
    @observable palyingList:Array<any>=[]; 
    /** 当前正在播放的歌曲 */
    @observable playingSong:any={};  

    /** 点击列表--把音乐放放入正在播放的音乐集合中 */
    @action public putIntoNowPlaying=(record:any,data?:any[],)=>{
        if(data){
            this.palyingList=data;
        }
        this.playingSong=record;
    }



}
export default new MusicStore()
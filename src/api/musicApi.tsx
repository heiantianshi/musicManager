
class MusicApi {
    /** banner*/
    getBanner: string = '/banner';

    /** 歌单分类*/
    getCatlist: string = '/playlist/catlist';

    /** 热门歌单分类*/
    getHotlist: string = '/playlist/hot';

    /** 歌单 ( 网友精选碟 )*/
    getPlaylist: string = '/top/playlist';

    /** 相关歌单推荐*/
    getPlaylistOne: string = '/related/playlist';

    /** 获取歌单详情*/
    getPlaylistDetail: string = '/playlist/detail';

    /** 获取音乐 url*/
    getMusicUrl: string = '/song/url';

    /** 获取mv排行*/
    getTopMv: string = '/top/mv';

    /** 获取mv详情*/
    getMvDetail: string = '/mv/detail';

    /** 获取mv播放地址*/
    getMvUrl: string = '/mv/url';

}
export default new MusicApi()
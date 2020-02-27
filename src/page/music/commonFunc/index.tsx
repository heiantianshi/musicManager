
class CommonFun {
    /** 按照格式处理列表数据 */
    public dealTableData = (data: Array<any>) => {
        const tableData: any = [];
        data.map((item => {
            const itemObj: any = {};
            itemObj.name = item.name;
            itemObj.id = item.id;
            itemObj.singer = item.ar[0].name;
            itemObj.singerId = item.ar[0].id;
            itemObj.album = item.al.name;
            itemObj.albumId = item.al.id;
            itemObj.albumPicUrl = item.al.picUrl;
            itemObj.tns = item.tns;
            itemObj.mv = item.mv;
            itemObj.timeLength = this.timeToMinute(item.dt);
            tableData.push(itemObj)
        }))
        return tableData
    }
    /** 按照格式处理列表数据 */
    public timeToMinute(time:number){
        if(time > -1){
            let timeLength:string='';
            const min = Math.floor((time/1000/ 60 % 60)) < 10 ? '0' + Math.floor((time/1000 / 60 % 60)) : Math.floor((time/1000 / 60 % 60));
            const seconds = Math.floor((time/1000 % 60)) < 10 ? '0' + Math.floor((time/1000 % 60)) : Math.floor((time/1000 % 60));
            timeLength=`${min}:${seconds}`
            return timeLength;
        }else{
            return '00:00'
        }
    }

}
export default new CommonFun()
import * as React from 'react';
import { Table, Icon } from 'antd';
import { observer, inject } from 'mobx-react';
import musicStore from '../../../../store/musicStore';
import MusicApi from '../../../../api/musicApi';
import http from '../../../../utils/http';
import './index.less';


export interface IProps {
    dataSource: Array<any>
    rest?: object
    playingSong?:any
}
@inject((store: any) => ({
    playingSong: store.MusicStore.playingSong,
    putIntoNowPlaying: store.MusicStore.putIntoNowPlaying,
}))
@observer
class MyTable extends React.Component<IProps, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            current: 0,
            rowId: ''
        }
    }
    static getDerivedStateFromProps(nextProps, prevState){
        if(nextProps.playingSong.id!==prevState.current){
            return {
                rowId:nextProps.playingSong.id,
                current:nextProps.playingSong.id
            }
        }
        return null
    }
    private clickLove = (index: number) => {

    }
    // 双击高亮
    private handleClickRow = (record: any) => {
        return record.id === this.state.rowId ? 'activeRow' : '';
    }
    
    render() {
        const { dataSource, rest } = this.props;
        const { current } = this.state;
        const columns: Array<any> = [
            {
                title: '',
                dataIndex: 'number',
                width: 80,
                align: 'center',
                key: 'number',
                fixed: true,
                render: (text: any, record: any, index: number) => {
                    return (
                        <span>
                            <span>{current === record.id ? <Icon type="sound" style={{ color: '#c3463a' }} /> : ((index + 1) < 10 ? `0${index + 1}` : (index + 1))}</span>
                            &emsp;
                            <Icon type="heart" theme="twoTone" twoToneColor="#eb2f96" />
                        </span>
                    )
                }
            },
            {
                title: '音乐标题',
                dataIndex: 'name',
                key: 'name',
                render: (text: any, record: any) => {
                    return (
                        <span>
                            <span>{text}</span>
                            <span>{record.tns && record.tns.length ? `(${record.tns[0]})` : ''}</span>&nbsp;
                            <span>{record.mv ? <Icon type="youtube" style={{ color: 'red', cursor: 'pointer' }} /> : ''}</span>
                        </span>
                    )
                }
            },
            {
                title: '歌手',
                dataIndex: 'singer',
                key: 'singer',
            },
            {
                title: '专辑',
                dataIndex: 'album',
                key: 'album',
            },
            {
                title: '时长',
                dataIndex: 'timeLength',
                key: 'timeLength',
            },
        ];
        const onRow = (record: any) => {
            return {
                onDoubleClick: (e: any) => {
                    this.setState({ 
                        current: record.id,
                        rowId: record.id
                     })
                     if(this.props.playingSong.id!==record.id){
                         musicStore.putIntoNowPlaying(record,this.props.dataSource)
                     }
                }
            }
        }
        return (
            <div>

                <Table
                    rowClassName={this.handleClickRow}
                    size={'small'}
                    onRow={onRow}
                    bordered={false}
                    columns={columns || []}
                    pagination={false}
                    dataSource={dataSource}
                    rowKey={record => record.id}
                    {...rest}
                />
            </div>
        );
    }
}

export default MyTable;
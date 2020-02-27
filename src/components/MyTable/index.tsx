import * as React from 'react';
import { Table, Icon } from 'antd';
import SearchForm from '../SearchForm/index';
import { getTimeStart, getTimeEnd } from '../../utils/utils';
import { observer } from "mobx-react";
import './index.less'

interface IProps {
    requsetParams: { path: any, requestType: string, params?: {} }
    columns: Array<any>;
    searchForm?: Array<any>;
    rowSelect?: any
    extraBtn?: Array<any>;
    rowKey?: any
    tableConfig?: any
    config?: any
}
@observer
class MyTable extends React.Component<IProps, any> {
    constructor(props: any) {
        super(props)
        this.state = {
            pageSize: 10,
            selectedKeys: [],
            currentPage: 1,
            data: {
                content: [
                    { id: '1122', con: [{ id: 'one' }, { id: 'one1' }] }, { id: '11122', con: [{ id: 'two' }] }, { id: '114422' },
                    { id: '112211' }, { id: '111222' }, { id: '1134422' },
                    { id: '11242' }, { id: '111522' }, { id: '1146422' },
                    { id: '11722' }, { id: '111822' }, { id: '1144922' },
                ],  // 模拟数据
                // content:[],
                totalElements: 0
            }
        }
    }
    filterFormRef: React.RefObject<any> = React.createRef();
    componentDidMount() {
        this.getListData(1)
    }
    // 转换参数格式
    public changeParams = (values: any) => {
        const requestData: any = {}
        Object.keys(values).forEach(key => {
            const val = values[key];
            if (val === "true") {
                requestData[key] = true;
            } else if (val === "false") {
                requestData[key] = false;
            } else if (key.includes("|") && Array.isArray(val) && val.length) {
                requestData[key.split("|")[0]] = getTimeStart(
                    val[0].format("YYYY-MM-DD")
                );
                requestData[key.split("|")[1]] = getTimeEnd(
                    val[1].format("YYYY-MM-DD")
                );
            } else {
                if (!key.includes("|")) {
                    requestData[key] = val;
                }
            }
        });
        const result: any = {}
        for (const key in requestData) {
            if (requestData.hasOwnProperty(key)) {
                const element = requestData[key];
                if (element) {
                    result[key] = requestData[key];
                }
            }
        }
        return result
    }
    // 获取数据
    public getListData = (page: number) => {
        const { searchForm } = this.props;
        const { path, params = {}, requestType } = this.props.requsetParams;
        const { pageSize } = this.state;
        // 没有表单时
        if (!searchForm) {
            const requestData = {
                page,
                size: pageSize,
                ...params,
            };
            // path && commomState.requestLoading(path, requestType, requestData).then((res: any) => {
            //     res && this.setState({ data: this.composeData(res) });
            // })
            return
        }
        const { validateFields } = this.filterFormRef.current.props.form
        validateFields((err: any, values: any) => {
            if (!err) {
                const searchData = this.changeParams(values)
                const requestData = {
                    page,
                    size: pageSize,
                    ...params,
                    ...searchData
                };
                // path && commomState.requestLoading(path, requestType, requestData).then((res: any) => {
                //     res && this.setState({ data: this.composeData(res) });
                // })
            }
        })

    }
    public composeData = (data: any): any => {
        console.log(data)
        if (data && ("content" in data)) {
            return this.setIndexOfData(data)
        };
        let newData: any = {};
        Object.keys(data).forEach(key => {
            const item: any = data[key];
            if (item && item.content) {
                newData = {
                    ...newData,
                    ...item
                };
            } else newData[key] = item;
        });
        return this.setIndexOfData(newData);
    };

    public setIndexOfData = (data: any) => {
        data.content = data.content.map((one: any, index: number) => ({
            ...one,
            index: (this.state.page - 1) * 10 + index + 1
        }));
        return data;
    };
    // 表格变化
    public tableChange = (pagination: any) => {
        const { current } = pagination;
        this.getListData(current)
        if (this.state.currentPage !== current && this.props.rowSelect) {
            this.props.rowSelect([], [])
            this.setState({
                selectedKeys: [],
                currentPage: current
            })
        }
    }
    // 重置
    public getReset = () => {
        this.filterFormRef.current.props.form.resetFields();
        this.getListData(1)
    }
    // 搜索
    public getSearch = () => {
        this.getListData(1)
    }

    render() {
        const { data, selectedKeys } = this.state;
        const { content, totalElements } = data;
        const { columns, rowSelect, extraBtn, searchForm, rowKey, config } = this.props;
        const pagination = {
            total: totalElements,
            showQuickJumper: true,
            showSizeChanger: true,
            pageSizeOptions: ['10', '20', '50']
        }
        const rowSelection = {
            fixed: true,
            selectedRowKeys: selectedKeys,
            onChange: (selectedRowKeys: any, selectedRows: any) => {
                this.setState({ selectedKeys: selectedRowKeys })
                rowSelect(selectedRowKeys, selectedRows)
            },

        };
        return (
            <>
                {
                    searchForm ?
                        <SearchForm
                            wrappedComponentRef={this.filterFormRef}
                            extraBtn={extraBtn}
                            searchForm={searchForm}
                            getReset={this.getReset}
                            getSearch={this.getSearch}
                        /> : ''
                }

                <Table
                    style={{ backgroundColor: '#fff' }}
                    {...config}
                    // loading={commomState.loading}
                    bordered={true}
                    columns={columns}
                    dataSource={content}
                    pagination={pagination}
                    onChange={this.tableChange}
                    rowSelection={rowSelect ? rowSelection : undefined}
                    scroll={{
                        x: columns.length > 8 ? columns.length * 150 : 0,
                        scrollToFirstRowOnChange: true
                    }}
                    rowKey={(record: any) => record[rowKey] || record.index}
                    rowClassName={() => "displayIcon"}
                />
            </>
        )
    }
}
export default MyTable
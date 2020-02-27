import * as React from 'react';
import MyTable from '../../components/MyTable/index';
import dayjs from 'dayjs';
import { Input, DatePicker, Icon, Select, AutoComplete, Modal, Form, InputNumber } from 'antd';

const { RangePicker } = DatePicker;
const { Option } = Select;
const FormItem = Form.Item;

interface IProps {
    form: any
}

class TableList extends React.Component<IProps, any> {
    constructor(props: any) {
        super(props)
        this.state = {
            procurementData: [],
            selectedRowKeys: [],
            selectedRows: [],
            visible:false
        }
    }

    public columns: any = [
        {
            title: "是否紧急",
            dataIndex: "urgent",
            key: "urgent",
            align:'center',
            render: (text: any) => {
                if (text === true) {
                    return (
                        <span style={{ color: "#e53d24" }}>
                            <Icon type="flag" theme="filled" />
                            &nbsp;是
                        </span>
                    );
                } else {
                    return <span>否</span>;
                }
            }
        },
        {
            title: "需求单号",
            dataIndex: "demandCode",
            key: "demandCode",
            align:'center',
        },
        {
            title: "需求单明细行号",
            dataIndex: "lineCode",
            key: "lineCode",
            align:'center',
        },
        {
            title: "采购方信息",
            dataIndex: "purchaserName",
            key: "purchaserName",
            align:'center',
        },
        {
            title: "商品信息",
            dataIndex: "goodsName",
            key: "goodsName",
            align:'center',
        },
        {
            title: "配送方式",
            dataIndex: "deliveryType",
            key: "deliveryType",
            align:'center',
        },
        {
            title: "需求数量",
            dataIndex: "demandAmount",
            key: "demandAmount",
            align:'center',
        },
        {
            title: "最迟到货时间",
            dataIndex: "deadLine",
            key: "deadLine",
            align:'center',
            render: (text: any) => dayjs(text).format("YYYY-MM-DD")
        },
        {
            title: "品类",
            dataIndex: "goodsTypeName",
            key: "goodsTypeName",
            align:'center',
        },
        {
            title: "需求获取时间",
            dataIndex: "deadLine1",
            key: "deadLine1",
            align:'center',
            render: (text: any) => dayjs(text).format("YYYY-MM-DD")
        },
        {
            title: "收货人",
            dataIndex: "consignee",
            key: "consignee",
            align:'center',
        },
        {
            title: "收货人联系方式",
            dataIndex: "phone",
            key: "phone",
            align:'center',
        },
        {
            title: "收货人详细地址",
            dataIndex: "detailedAddress",
            key: "detailedAddress",
            align:'center',
            ellipsis: true,
        }
    ];

    public searchForm: any[] = [
        {
            label: "商品信息",
            id: "goodsInformation",
            render: () => <Input placeholder="商品名称/国际编码/自编码" />
        },
        {
            label: "商品类型",
            id: "goodsTypeName",
            render: () => (
                <Select
                    showSearch
                    allowClear={true}
                    style={{ width: "100%" }}
                    placeholder="请选择"
                    optionFilterProp="children"
                    filterOption={(input, option: any) =>
                        option.props.children
                            .toString()
                            .toLowerCase()
                            .indexOf(input.toLowerCase()) >= 0
                    }
                >
                    <Option value="jack">Jack</Option>
                    {/* {goodsType.length
                    ? goodsType.map(item => {
                        return (
                          <Option key={item.value} value={item.value}>
                            {item.name}
                          </Option>
                        );
                      })
                    : ""} */}
                </Select>
            )
        },
        {
            label: "需求单号",
            id: "demandCode",
            render: () => <Input placeholder="请输入需求单号" />
        },
        {
            label: "配送方式",
            id: "deliveryType",
            render: () => (
                <Select
                    placeholder="请选择"
                    allowClear={true}
                >
                    <Option value="DISTRIBUTION_WAREHOUSE">配送省仓</Option>
                    <Option value="DIRECT_DELIVERY_STORE">门店直配</Option>
                </Select>
            )
        },
        {
            label: "配送区域",
            id: "province",
            render: () => (
                <Select
                    mode="multiple"
                    showSearch
                    allowClear={true}
                    style={{ width: "100%" }}
                    placeholder="请选择(可多选)"
                    optionFilterProp="children"
                    filterOption={(input, option: any) =>
                        option.props.children
                            .toString()
                            .toLowerCase()
                            .indexOf(input.toLowerCase()) >= 0
                    }
                >
                    <Option value="DISTRIBUTION_WAREHOUSE">配送省仓</Option>
                    {/* {province.length
                    ? province.map(item => {
                        return (
                          <Option key={item.id} value={item.id}>
                            {item.name}
                          </Option>
                        );
                      })
                    : ""} */}
                </Select>
            )
        },
        {
            label: "采购方",
            id: "purchaserName",
            render: () => (
                <AutoComplete
                    style={{ width: "100%" }}
                    //   onSearch={this.handleInputAutoSearch}
                    placeholder="直接选择或搜索选择"
                >
                    {
                        this.state.procurementData.map((item: any) => (
                            <Option key={item.companyCode} value={item.companyCode}>
                                {item.companyName}
                            </Option>
                        ))
                    }
                </AutoComplete>
            )
        },
        {
            label: "可报价时间",
            id: "startTime|endTime",
            render: () => <RangePicker />
        },
        {
            label: "提交时间",
            id: "startTime1|endTime1",
            render: () => <RangePicker />
        },
    ]
    // 勾选
    public rowSelect = (selectedRowKeys: any, selectedRows: any) => {
        this.setState({ selectedRowKeys, selectedRows })
    }
    
    // 审核通过
    public auditOk = () => {
        if(this.isSelect()){
            this.setState({visible:true})
        }
    }
    // 审核不通过
    public auditFails = () => {
        if(this.isSelect()){
            this.audit()
        }
    }
    // 审核---发起请求
    public audit=()=>{
        this.setState({visible:false})
    }
    // 判断是否勾选有值
    public isSelect = () => {
        const { selectedRows } = this.state;
        if (!selectedRows.length) {
            Modal.warning({
                title: "请选择需要勾选的订单",
                content: (
                    <span style={{ color: "#de4f3f" }}>
                        无勾选订单，无法进行下一步操作
                  </span>
                )
            });
        } else {
            return true
        }
    }
    public handleOk = () => {
        const reason = this.props.form.getFieldValue("reason");
        console.log(reason)
        this.audit()
    }
    public handleCancel=()=>{
        this.setState({visible:false})
    }
    render() {
        const {visible}=this.state;
        const { getFieldDecorator } = this.props.form;
        // 其他按钮
        const extraBtn = (
            [
                { name: '审核通过', Func: this.auditOk },
                { name: '审核不通过', Func: this.auditFails },
            ]
        )
        // 请求表格数据的地址和参数
        const requsetParams = {
            path: '',
            requestType: 'post',
            params: {}
        }
        const title = (
            <span>
                请选择报价有效时长&emsp;
                <span style={{ fontSize: "12px" }}>
                    报价时长不得低于<span style={{ color: "green" }}>(最小报价时间)</span>
                </span>
            </span>
        )
        // 弹出框表单
        const content = (
            <Form layout={'inline'}>
                <FormItem label="请选择报价有效时长">
                    {getFieldDecorator("reason", {
                        rules: [
                            {
                                required: visible,
                                message: "请选择报价有效时长"
                            },
                            {
                                pattern: /^[1-9]\d*\.[5]$|0\.[5]$|^[1-9]\d*$/,
                                message: "请输入0.5的倍数"
                            }
                        ],
                        initialValue: 0
                    })(
                        <InputNumber
                            style={{ width: "100%" }}
                            min={0}
                            step={0.5}
                            formatter={value => {
                                if (value === 0) {
                                    return `${""}小时`;
                                } else {
                                    return `${value}小时`;
                                }
                            }}
                            parser={(value: any) => {
                                if (!(value.indexOf("小时") !== -1)) {
                                    return 0.0;
                                } else {
                                    return Number(value.replace("小时", ""));
                                }
                            }}
                        />
                    )}
                </FormItem>
            </Form>
        )
        return (
            <MyTable
            requsetParams={requsetParams}
            columns={this.columns}
            searchForm={this.searchForm}
            rowSelect={this.rowSelect}
            extraBtn={extraBtn}
            rowKey={'id'}
        />
        )
    }
}
export default Form.create()(TableList)
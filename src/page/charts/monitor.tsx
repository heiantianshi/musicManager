import React, { Component } from 'react';
import { Card, Col, Row } from 'antd';
import {
    G2,
    Chart,
    Geom,
    Axis,
    Tooltip,
    Coord,
    Label,
    Legend,
    View,
    Guide,
    Shape,
    Facet,
    Util
} from 'bizcharts';
import DataSet from "@antv/data-set";
import http from '../../utils/http';

interface IProps {

}
const { DataView } = DataSet;


class Monitor extends Component<IProps, any> {
    constructor(props) {
        super(props)
        this.state = {
            data: {}
        }
    }
    componentDidMount() {
        const url = "https://alifd.alibabausercontent.com/materials/@bizcharts/point-bubble/0.2.9/mock.json"
        http.get(url).then(res => {
            this.setState({ data: res })
        })
    }
    render() {
        // 数据源
        const data1 = [
            { genre: 'Sports', sold: 275, income: 2300 },
            { genre: 'Strategy', sold: 115, income: 667 },
            { genre: 'Action', sold: 120, income: 982 },
            { genre: 'Shooter', sold: 350, income: 5271 },
            { genre: 'Other', sold: 150, income: 3710 }
        ];

        // 定义度量
        const cols1 = {
            sold: { alias: '销售量' },
            genre: { alias: '游戏种类' }
        };
        const data2 = [
            {
                month: "Jan",
                city: "Tokyo",
                temperature: 7
            },
            {
                month: "Jan",
                city: "London",
                temperature: 3.9
            },
            {
                month: "Feb",
                city: "Tokyo",
                temperature: 6.9
            },
            {
                month: "Feb",
                city: "London",
                temperature: 4.2
            },
            {
                month: "Mar",
                city: "Tokyo",
                temperature: 9.5
            },
            {
                month: "Mar",
                city: "London",
                temperature: 5.7
            },
            {
                month: "Apr",
                city: "Tokyo",
                temperature: 14.5
            },
            {
                month: "Apr",
                city: "London",
                temperature: 8.5
            },
            {
                month: "May",
                city: "Tokyo",
                temperature: 18.4
            },
            {
                month: "May",
                city: "London",
                temperature: 11.9
            },
            {
                month: "Jun",
                city: "Tokyo",
                temperature: 21.5
            },
            {
                month: "Jun",
                city: "London",
                temperature: 15.2
            },
            {
                month: "Jul",
                city: "Tokyo",
                temperature: 25.2
            },
            {
                month: "Jul",
                city: "London",
                temperature: 17
            },
            {
                month: "Aug",
                city: "Tokyo",
                temperature: 26.5
            },
            {
                month: "Aug",
                city: "London",
                temperature: 16.6
            },
            {
                month: "Sep",
                city: "Tokyo",
                temperature: 23.3
            },
            {
                month: "Sep",
                city: "London",
                temperature: 14.2
            },
            {
                month: "Oct",
                city: "Tokyo",
                temperature: 18.3
            },
            {
                month: "Oct",
                city: "London",
                temperature: 10.3
            },
            {
                month: "Nov",
                city: "Tokyo",
                temperature: 13.9
            },
            {
                month: "Nov",
                city: "London",
                temperature: 6.6
            },
            {
                month: "Dec",
                city: "Tokyo",
                temperature: 9.6
            },
            {
                month: "Dec",
                city: "London",
                temperature: 4.8
            }
        ];
        const cols2 = {
            month: {
                range: [0, 1]
            }
        };
        const data3 = [
            {
                year: "1996",
                north: 322,
                south: 162
            },
            {
                year: "1997",
                north: 324,
                south: 90
            },
            {
                year: "1998",
                north: 329,
                south: 50
            },
            {
                year: "1999",
                north: 342,
                south: 77
            },
            {
                year: "2000",
                north: 348,
                south: 35
            },
            {
                year: "2001",
                north: 334,
                south: -45
            },
            {
                year: "2002",
                north: 325,
                south: -88
            },
            {
                year: "2003",
                north: 316,
                south: -120
            },
            {
                year: "2004",
                north: 318,
                south: -156
            },
            {
                year: "2005",
                north: 330,
                south: -123
            },
            {
                year: "2006",
                north: 355,
                south: -88
            },
            {
                year: "2007",
                north: 366,
                south: -66
            },
            {
                year: "2008",
                north: 337,
                south: -45
            },
            {
                year: "2009",
                north: 352,
                south: -29
            },
            {
                year: "2010",
                north: 377,
                south: -45
            },
            {
                year: "2011",
                north: 383,
                south: -88
            },
            {
                year: "2012",
                north: 344,
                south: -132
            },
            {
                year: "2013",
                north: 366,
                south: -146
            },
            {
                year: "2014",
                north: 389,
                south: -169
            },
            {
                year: "2015",
                north: 334,
                south: -184
            }
        ];
        const dv = new DataView().source(data3);
        dv.transform({
            type: "fold",
            fields: ["north", "south"],
            // 展开字段集
            key: "type",
            // key字段
            value: "value" // value字段
        });
        const cols3 = {
            year: {
                range: [0, 1]
            }
        };
        const colorMap = {
            Asia: G2.Global.colors[0],
            Americas: G2.Global.colors[1],
            Europe: G2.Global.colors[2],
            Oceania: G2.Global.colors[3]
        };
        const cols = {
            LifeExpectancy: {
                alias: "人均寿命（年）"
            },
            Population: {
                type: "pow",
                alias: "人口总数"
            },
            GDP: {
                alias: "人均国内生产总值($)"
            },
            Country: {
                alias: "国家/地区"
            }
        };
        return (
            <div style={{ background: '#ECECEC', padding: '30px' }}>
                <Row gutter={16}>
                    <Col span={8}>
                        <Card bordered={false}>
                            <Chart forceFit={true} height={300} data={data1} scale={cols1}>
                                <Axis name="genre" title />
                                <Axis name="sold" title />
                                <Legend position="top" />
                                <Tooltip />
                                <Geom type="interval" position="genre*sold" color="genre" />
                            </Chart>
                        </Card>
                    </Col>
                    <Col span={8}>
                        <Card bordered={false}>
                            <Chart forceFit={true} height={300} data={data2} scale={cols2}>
                                <Legend />
                                <Axis name="month" />
                                <Axis
                                    name="temperature"
                                    label={{
                                        formatter: val => `${val}°C`
                                    }}
                                />
                                <Tooltip
                                    crosshairs={{
                                        type: "y"
                                    }}
                                />
                                <Geom
                                    type="line"
                                    position="month*temperature"
                                    size={2}
                                    color={"city"}
                                    shape={"smooth"}
                                />
                                <Geom
                                    type="point"
                                    position="month*temperature"
                                    size={4}
                                    shape={"circle"}
                                    color={"city"}
                                    style={{
                                        stroke: "#fff",
                                        lineWidth: 1
                                    }}
                                />
                            </Chart>
                        </Card>
                    </Col>
                    <Col span={8}>
                        <Card bordered={false}>
                            <Chart forceFit={true} height={300} data={dv} scale={cols3}>
                                <Axis name="year" />
                                <Axis
                                    name="value"
                                    label={{
                                        formatter: (val: any) => {
                                            return (val / 10000).toFixed(1) + "k";
                                        }
                                    }}
                                />
                                <Legend />
                                <Tooltip
                                    crosshairs={{
                                        type: "cross"
                                    }}
                                />
                                <Geom type="area" position="year*value" color="type" />
                                <Geom type="line" position="year*value" size={2} color="type" />
                            </Chart>
                        </Card>
                    </Col>
                </Row>
                <Card style={{ marginTop: 16 }}>
                    <Chart forceFit={true} height={600} data={this.state.data} scale={cols}>
                        <Tooltip showTitle={false} />
                        <Axis
                            name="GDP"
                            label={{
                                formatter: (value: any) => {
                                    return (value / 1000).toFixed(0) + "k";
                                } // 格式化坐标轴的显示
                            }}
                        />
                        <Axis name="LifeExpectancy" />
                        <Legend />
                        <Geom
                            type="point"
                            position="GDP*LifeExpectancy"
                            color={[
                                "continent",
                                val => {
                                    return colorMap[val];
                                }
                            ]}
                            tooltip="Country*Population*GDP*LifeExpectancy"
                            opacity={0.65}
                            shape="circle"
                            size={["Population", [4, 65]]}
                            style={[
                                "continent",
                                {
                                    lineWidth: 1,
                                    strokeOpacity: 1,
                                    fillOpacity: 0.3,
                                    opacity: 0.65,
                                    stroke: val => {
                                        return colorMap[val];
                                    }
                                }
                            ]}
                        />
                    </Chart>
                </Card>
            </div>

        );
    }
}

export default Monitor;
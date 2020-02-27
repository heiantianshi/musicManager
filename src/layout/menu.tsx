import React, { Component } from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import { Menu, Icon } from 'antd';
import menuList from './menuList';

const { SubMenu } = Menu;

class Menus extends Component<any,any> {
    constructor(props: any) {
        super(props)
        this.state = {
            openKeys: [],
            selectedKeys: [],
        }
    }

    componentWillMount() {
        this.getLightMenu()
    }
    componentDidUpdate(prevProps:any, prevState:any){
        if(this.props.location.pathname!==prevProps.location.pathname){
            this.getLightMenu()
        }
    }
    // 列表数据展开
    public expandMenuList = () => {
        const listArr: Array<string> = [];
        const getList = (data: Array<any>) => (
            data.map((item: any) => {
                if (item.children) {
                    getList(item.children)
                }
                listArr.push(item.path)
            })
        )
        getList(menuList)
        return listArr
    }
    // 获取高亮的菜单
    public getLightMenu = () => {
        const list = this.expandMenuList()
        const path = window.location.hash.replace(/\#\//ig, '')
        const arr: Array<string> = [];
        list.map((item: string) => {
            if (path.search(item) !== -1) {
                arr.push(item)
            }
        })
        const sortArr=arr.sort( (a:any, b:any)=> {
            return b.length - a.length;
        })
        this.setState({
            openKeys: sortArr,
            selectedKeys:sortArr[0]
        })
    }
    public renderMenu = (menuList: Array<any>) => (
        menuList.map(item => {
            if (item.children) {
                return (
                    <SubMenu
                        key={item.path}
                        title={
                            <span>
                                {item.icon ? <Icon type={item.icon} /> : ''}
                                <span>{item.name}</span>
                            </span>
                        }
                    >
                        {this.renderMenu(item.children)}
                    </SubMenu>
                )
            }
            return (
                <Menu.Item key={item.path}>
                    <NavLink to={`/${item.path}`}>
                        {item.icon ? <Icon type={item.icon} /> : ''}
                        <span>{item.name}</span>
                    </NavLink>
                </Menu.Item>
            );
        })
    )
    public onOpenChange=(openKeys: string[])=>{
        this.setState({openKeys})
    }
    render() {
        const { openKeys, selectedKeys } = this.state;
        return (
            <Menu 
            mode="inline"
            theme='dark'
            onOpenChange={this.onOpenChange}
            openKeys={openKeys}
            selectedKeys={selectedKeys}
            >
                {this.renderMenu(menuList)}
            </Menu>
        );
    }
}

export default withRouter(Menus);
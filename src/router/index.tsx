import React from "react";
import { Switch, Route, Redirect, Link, withRouter } from "react-router-dom";
import { Breadcrumb, Card, Icon } from 'antd';
import './index.less';

import music from './music';
import blog from './blog';
import basic from './basicDetails';
import table from './table';
import form from './form';
import charts from './charts';
import chat from './chat';

const routeMap: any[] = [
    music,
    blog,
    basic,
    table,
    form,
    charts,
    chat
];
let breadcrumbNameMap = {};
routeMap.map(item=>(
    item.children.map(val=>{
        breadcrumbNameMap[`${item.baseUrl}`]=item.baseName
        breadcrumbNameMap[`${item.baseUrl}${val.path}`]=val.name
    })
))

const Home = withRouter(props => {
    const { location } = props;
    const pathSnippets = location.pathname.split('/').filter(i => i);
    const extraBreadcrumbItems = pathSnippets.map((_, index) => {
        const url = `/${pathSnippets.slice(0, index + 1).join('/')}`;
        return (
            <Breadcrumb.Item key={url}>
                <Link to={url}>{breadcrumbNameMap[url]}</Link>
            </Breadcrumb.Item>
        );
    });
    const breadcrumbItems = [
        <Breadcrumb.Item key="home">
            <Link to="/1">Home</Link>
        </Breadcrumb.Item>,
    ].concat(extraBreadcrumbItems);

    const user:any=sessionStorage.getItem('user')
    const isLogin=()=>{
        if(user){
            const userMsg=JSON.parse(user)
            if(userMsg.username==='admin' && userMsg.password==='admin'){
                return true
            }else{
                return false
            }
        }else{
            return false
        }

    }
    return (
        <div className="pageContent">
            <div className="Breadcrumb">
                <Breadcrumb>{breadcrumbItems}</Breadcrumb>
            </div>
            <Switch>
                {routeMap.map(one =>
                    one.children.map((child: any) => (
                        <Route
                            // exact={true}
                            path={`${one.baseUrl}${child.path}`}
                            key={child.path}
                            component={child.component}
                        />
                    ))
                )}
                <Redirect to={`${isLogin()?'/dashboard/monitor':'/login'}`}/>
            </Switch>
        </div>
    );
});


export default (): React.ReactElement => (<Home />);


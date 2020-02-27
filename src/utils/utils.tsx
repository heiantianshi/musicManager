import * as React from "react";
import { Badge,Modal } from "antd";
const { confirm } = Modal;

// 时间字符串转时间搓
export function getTimeStart(value: string): number {
  const date = new Date(value + ' 00:00:00');
  return date.getTime()
}


// 时间字符串转时间搓
export function getTimeEnd(value: string): number {
  const date = new Date(value + ' 23:59:59');
  return date.getTime()
}

// 删除提示框
export function showDeleteConfirm(Func:Function,content?:string,title?:string) {
  confirm({
    title: `${title?title:'确定删除吗?'}`,
    content: <span style={{color:'red'}}>{`${content?content:''}`}</span>,
    okText: '确定',
    okType: 'danger',
    cancelText: '取消',
    onOk:()=> {
      Func()
    }
  });
}
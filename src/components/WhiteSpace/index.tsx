import * as React from 'react';
import './index.less';

export interface IWhiteSpace{
    height?:number
    width?:number
    content?:string | number | React.ReactNode
}

class WhiteSpace extends React.Component<IWhiteSpace,any> {
    constructor(props:any) {
        super(props);
        this.state = {
            
        }
    }
    render() {
        const {height,width,content} =this.props;
        return (
            <div className='whiteSpace' style={{width:width?width:'100%',height:height?height:20}}>
                {
                    content?
                    <div className='content'>
                        {content}
                    </div>:''
                }
            </div>
        );
    }
}

export default WhiteSpace;
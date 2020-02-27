import React, { Component } from 'react';
import { Carousel } from 'antd';
import './common.less';

interface IProps {

}

class CarouselPage extends Component<IProps, any> {
    render() {
        return (
            <Carousel autoplay>
                <div>
                    <img className='img' src={require('../../../images/11.jpg')} />
                </div>
                <div>
                    <img className='img' src={require('../../../images/22.jpg')} />
                </div>
                <div>
                    <img className='img' src={require('../../../images/33.jpg')} />
                </div>
                <div>
                    <img className='img' src={require('../../../images/44.jpg')} />
                </div>
            </Carousel>
        );
    }
}

export default CarouselPage;
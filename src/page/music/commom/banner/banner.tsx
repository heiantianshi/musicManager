import * as React from 'react';
import BannerAnim from 'rc-banner-anim';
import TweenOne, { TweenOneGroup } from 'rc-tween-one';
import MusicApi from '../../../../api/musicApi';
import http from '../../../../utils/http';
import 'rc-banner-anim/assets/index.css';
import '../../index.less';
const { Element, Arrow, Thumb } = BannerAnim;
const BgElement = Element.BgElement;

export interface IBanner {

}
class Banner extends React.Component<IBanner, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            intShow: 0,
            prevEnter: false,
            nextEnter: false,
            thumbEnter: false,
            imgArray: [
                'https://zos.alipayobjects.com/rmsportal/hzPBTkqtFpLlWCi.jpg',
                'https://zos.alipayobjects.com/rmsportal/gGlUMYGEIvjDOOw.jpg',
            ],
            banner: []
        };
    }
    componentDidMount() {
        http.get(MusicApi.getBanner, {}).then((res: any) => {
            const imgArray: any[] = [];
            if (res && res.banners) {
                res.banners.map(item => {
                    imgArray.push(item.imageUrl)
                })
                this.setState({
                    imgArray: imgArray,
                    banner: res.banners,
                })
            }
        })
    }
    componentWillUnmount() {
        this.setState = (state, callback) => {
            return
        }
    }
    public onChange = (type: any, int: any) => {
        if (type === 'before') {
            this.setState({
                intShow: int,
            });
        }
    }

    public getNextPrevNumber = () => {
        let nextInt = this.state.intShow + 1;
        let prevInt = this.state.intShow - 1;
        if (nextInt >= this.state.imgArray.length) {
            nextInt = 0;
        }
        if (prevInt < 0) {
            prevInt = this.state.imgArray.length - 1;
        }

        return [prevInt, nextInt];
    }

    public prevEnter = () => {
        this.setState({
            prevEnter: true,
        });
    }

    public prevLeave = () => {
        this.setState({
            prevEnter: false,
        });
    }

    public nextEnter = () => {
        this.setState({
            nextEnter: true,
        });
    }

    public nextLeave = () => {
        this.setState({
            nextEnter: false,
        });
    }

    public onMouseEnter = () => {
        this.setState({
            thumbEnter: true,
        });
    }

    public onMouseLeave = () => {
        this.setState({
            thumbEnter: false,
        });
    }
    render() {
        const { imgArray, prevEnter, nextEnter, thumbEnter } = this.state;
        const intArray = this.getNextPrevNumber();
        const thumbChildren = imgArray.map((img: any, i: any) =>
            <span key={i}><i style={{ backgroundImage: `url(${img})` }} /></span>
        );
        return (
            <div className='bannerContainer'>
                <BannerAnim
                    autoPlaySpeed={4000}
                    onChange={this.onChange}
                    onMouseEnter={this.onMouseEnter}
                    onMouseLeave={this.onMouseLeave}
                    prefixCls="custom-arrow-thumb"
                    autoPlay
                >
                    {
                        imgArray.map((item: any, index: any) => {
                            return (
                                <Element key={index}
                                    prefixCls="banner-user-elem"
                                >
                                    <BgElement
                                        key="bg"
                                        className="bg"
                                        style={{
                                            backgroundImage: `url(${item})`,
                                            backgroundSize: 'cover',
                                            backgroundPosition: 'center',
                                        }}
                                    />
                                </Element>
                            )
                        })
                    }
                    <Arrow arrowType="prev" key="prev" prefixCls="user-arrow" component={TweenOne}
                        onMouseEnter={this.prevEnter}
                        onMouseLeave={this.prevLeave}
                    // animation={{ left: prevEnter ? 0 : -120 }}
                    >
                        <div className="arrow"></div>
                        <TweenOneGroup
                            enter={{ opacity: 0, type: 'from' }}
                            leave={{ opacity: 0 }}
                            appear={false}
                            className="img-wrapper" component="ul"
                        >
                            <li style={{ backgroundImage: `url(${imgArray[intArray[0]]})` }} key={intArray[0]} />
                        </TweenOneGroup>
                    </Arrow>
                    <Arrow arrowType="next" key="next" prefixCls="user-arrow" component={TweenOne}
                        onMouseEnter={this.nextEnter}
                        onMouseLeave={this.nextLeave}
                    // animation={{ right: nextEnter ? 0 : -120 }}
                    >
                        <div className="arrow"></div>
                        <TweenOneGroup
                            enter={{ opacity: 0, type: 'from' }}
                            leave={{ opacity: 0 }}
                            appear={false}
                            className="img-wrapper"
                            component="ul"
                        >
                            <li style={{ backgroundImage: `url(${imgArray[intArray[1]]})` }} key={intArray[1]} />
                        </TweenOneGroup>
                    </Arrow>
                    <Thumb prefixCls="user-thumb" key="thumb" component={TweenOne}
                    // animation={{ bottom: thumbEnter ? 0 : -70 }}
                    >
                        {thumbChildren}
                    </Thumb>
                </BannerAnim>
            </div>
        );
    }
}

export default Banner;
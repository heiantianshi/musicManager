import React, { Component } from 'react';
import { Card, Steps, Result, Button } from 'antd';

const { Step } = Steps;
interface IProps {

}

class FtepForm extends Component<IProps, any> {
    render() {
        return (
            <Card>
                <Steps current={1}>
                    <Step title="Finished" description="This is a description." />
                    <Step title="In Progress" subTitle="Left 00:00:08" description="This is a description." />
                    <Step title="Waiting" description="This is a description." />
                </Steps>
                <Result
                    status="success"
                    title="Successfully Purchased Cloud Server ECS!"
                    subTitle="Order number: 2017182818828182881 Cloud server configuration takes 1-5 minutes, please wait."
                    extra={[
                        <Button type="primary" key="console">
                            Go Console
                </Button>,
                        <Button key="buy">Buy Again</Button>,
                    ]}
                />
                
            </Card>
        );
    }
}

export default FtepForm;
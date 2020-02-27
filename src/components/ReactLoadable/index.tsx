import * as React from "react";
import Loadable from "react-loadable";
import { Spin } from "antd";

export const ReactLoadable = (loadComponent:any) => {
    return Loadable({
        loader: loadComponent,
        loading: () => (
            <div style={{ textAlign: "center" }}>
                <Spin size="large" />
            </div>
        )
    });
};


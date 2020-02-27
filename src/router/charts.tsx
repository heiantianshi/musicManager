
import { ReactLoadable } from "../components/ReactLoadable";

const routeMap: any = {
    baseUrl: "/dashboard",
    baseName: 'dashboard',
    children: [
        {
            name: "监控页",
            path: `/monitor`,
            component: ReactLoadable(() => import("../page/charts/monitor"))
        }
    ]
};

export default routeMap;

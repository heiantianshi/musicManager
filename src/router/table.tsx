
import { ReactLoadable } from "../components/ReactLoadable";

const routeMap: any = {
    baseUrl: "/table",
    baseName: '列表页',
    children: [
        {
            name: "查询表格",
            path: `/table-list`,
            component: ReactLoadable(() => import("../page/table/tableList"))
        },
        {
            name: "卡片列表",
            path: `/card-list`,
            component: ReactLoadable(() => import("../page/table/cardList"))
        }
    ]
};

export default routeMap;

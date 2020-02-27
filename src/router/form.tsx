
import { ReactLoadable } from "../components/ReactLoadable";

const routeMap: any = {
    baseUrl: "/form",
    baseName: '表单页',
    children: [
        {
            name: "基础表单",
            path: `/basic-form`,
            component: ReactLoadable(() => import("../page/form/basicForm"))
        },
        {
            name: "分步表单",
            path: `/step-form`,
            component: ReactLoadable(() => import("../page/form/stepForm"))
        }
    ]
};

export default routeMap;


import { ReactLoadable } from "../components/ReactLoadable";

const routeMap: any = {
    baseUrl: "/chat",
    baseName: '聊天室',
    children: [
        {
            name: "用户登录",
            path: `/login`,
            component: ReactLoadable(() => import("../page/chat/login"))
        },
        {
            name: "聊天主页",
            path: `/basic/:user`,
            component: ReactLoadable(() => import("../page/chat/index"))
        }
    ]
};

export default routeMap;

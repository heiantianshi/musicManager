
import { ReactLoadable } from "../components/ReactLoadable";

const routeMap:any = {
  baseUrl: "/profile",
  baseName:'详情页',
  children: [
    {
      name: "基础详情页",
      path: `/basic`,
      component: ReactLoadable(() => import("../page/basicDetails"))
    }
  ]
};

export default routeMap;

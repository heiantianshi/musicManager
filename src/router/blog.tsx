
import { ReactLoadable } from "../components/ReactLoadable";

const routeMap:any = {
  baseUrl: "/blog",
  baseName:'博客',
  children: [
    {
      name: "我的博客",
      path: `/myblog`,
      component: ReactLoadable(() => import("../page/blog"))
    }
  ]
};

export default routeMap;

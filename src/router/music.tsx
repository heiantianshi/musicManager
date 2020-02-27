
import { ReactLoadable } from "../components/ReactLoadable";

const routeMap:any = {
  baseUrl: "/music",
  baseName:'网易云音乐',
  children: [
    {
      name: "音乐地带",
      path: `/musicGround`,
      component: ReactLoadable(() => import("../page/music"))
    },
    {
      name: "歌单详情",
      path: `/musicGround/detail/:id`,
      component: ReactLoadable(() => import("../page/music/page/playListDetail"))
    }
  ]
};

export default routeMap;

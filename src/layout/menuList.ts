const MenuList = [
    {
        name: 'Dashboard',
        icon: 'dashboard',
        path: 'dashboard',
        hideInMenu: false,
        children: [
            {
                name: '监控页',
                path: 'dashboard/monitor',
                hideInMenu: false
            }
        ]
    },
    {
        name: '网易云音乐',
        icon: 'play-circle',
        path: 'music',
        hideInMenu: false,
        children: [
            {
                name: '音乐地带',
                path: 'music/musicGround',
                hideInMenu: false
            }
        ]
    },
    {
        name: '博客',
        icon: 'reddit',
        path: 'blog',
        hideInMenu: false,
        children: [
            {
                name: '我的博客',
                path: 'blog/myblog',
                hideInMenu: false
            }
        ]
    },
    {
        name: '表单页',
        icon: 'form',
        path: 'form',
        hideInMenu: false,
        children: [
            {
                name: '基础表单',
                path: 'form/basic-form',
                hideInMenu: false
            },
            {
                name: '分步表单',
                path: 'form/step-form',
                hideInMenu: false
            }
        ]
    },
    {
        name: '列表页',
        icon: 'table',
        path: 'table',
        hideInMenu: false,
        children: [
            {
                name: '查询表格',
                path: 'table/table-list',
                hideInMenu: false
            },
            {
                name: '卡片列表',
                path: 'table/card-list',
                hideInMenu: false
            }
        ]
    },
    {
        name: '详情页',
        icon: 'profile',
        path: 'profile',
        hideInMenu: false,
        children: [
            {
                name: '基础详情页',
                path: 'profile/basic',
                hideInMenu: false
            }
        ]
    },
    {
        name: '聊天室',
        icon: 'wechat',
        path: 'chat',
        hideInMenu: false,
        children: [
            {
                name: '聊天主页',
                path: 'chat/login',
                hideInMenu: false
            }
        ]
    },
]

export default MenuList
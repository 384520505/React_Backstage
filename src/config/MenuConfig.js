// 渲染列表的数组数据
const MenuList = [
    {
        title: '首页',
        key: '/home',
        icon: 'home'
    },
    {
        title: '商品',
        key: '/sub_product',
        icon: 'appstore',
        children: [
            {
                title: '品类管理',
                key: '/category',
                icon: 'bars'
            },
            {
                title: '商品管理',
                key: '/product',
                icon: 'tool'
            },
        ],
    },
    {
        title: '用户管理',
        key: '/user',
        icon: 'user'
    },
    {
        title: '角色管理',
        key: '/role',
        icon: 'team'
    },
    {
        title: '图形图标',
        key: '/charts',
        icon: 'area-chart',
        children: [
            {
                title: '柱形图',
                key: '/bar',
                icon: 'bar-chart',
            },
            {
                title: '折线图',
                key: '/line',
                icon: 'line-chart',
            },
            {
                title: '饼图',
                key: '/pie',
                icon: 'pie-chart',
            },
        ],
    }
];

export default MenuList;
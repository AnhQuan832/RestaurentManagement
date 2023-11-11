import { INavData } from '@coreui/angular';

export const navItems: INavData[] = [
  {
    name: 'Dashboard',
    url: '/dashboard',
    iconComponent: { name: 'cil-speedometer' }

  },
  {
    name: 'Menu',
    url: 'pages/menu',
    iconComponent: { name: 'cil-dog' }
  },
  {
    name: 'Order',
    url: 'pages/order',
    iconComponent: { name: 'cil-speedometer' }

  },
  {
    name: 'Table',
    url: 'pages/table',
    iconComponent: { name: 'cil-speedometer' }

  },
  {
    name: 'Staff',
    url: 'pages/staff',
    iconComponent: { name: 'cil-speedometer' }

  },
  {
    name: 'Statistic',
    url: 'pages/statistic',
    iconComponent: { name: 'cil-speedometer' }

  },
  // {
  //   name: 'Quỹ cứu trợ',
  //   iconComponent: { name: 'cil-chart-pie' },
  //   children: [
  //     {
  //       name: 'Quản lý quỹ',
  //       url: 'pages/donation',
  //     },
  //     {
  //       name: 'Danh sách ủng hộ',
  //       url: 'pages/donation-request',
  //     },
  //     {
  //       name: 'Yêu cầu hỗ trợ',
  //       url: 'pages/fund-request',
  //     }
  //   ]
  // },
  // {
  //   name: 'Tin nhắn',
  //   url: 'pages/chat',
  //   iconComponent: { name: 'cil-comment-bubble' }
  // },
  // {
  //   name: 'Đăng xuất',
  //   url: '/login',
  //   iconComponent: { name: 'cil-account-logout' }
  // },
];


import { lazy } from 'react';


import MainLayout from 'layout/Dashboard/index';
import Loadable from 'components/Loadable';


const Dashboard = Loadable(lazy(() => import('pages/dashboard/default')));
const Users = Loadable(lazy(() => import('pages/user/user')));
const Settings = Loadable(lazy(() => import('pages/setting/Setting')));
const Invoice = Loadable(lazy(() => import('pages/Invoice/Invoice')));
const Packages = Loadable(lazy(() => import('pages/packages/packages')));
const Destinations = Loadable(lazy(() => import('pages/Destination/Destinations')));
const RentCar = Loadable(lazy(() => import('pages/rentCar/rentCar')));
const Hotels = Loadable(lazy(() => import('pages/hotels/hotels')));
const Customers = Loadable(lazy(() => import('pages/Customers/Customers')));



const ComponentsRoutes = {
  path: '/',
  element: <MainLayout />,
  children: [
    {
      path: 'dashboard',
      element: <Dashboard />
    },
    {
      path: 'packages',
      element: <Packages />
    },
     {
      path: 'destinations',
      element: <Destinations />
    },
    {
      path: 'RentCar',
      element: <RentCar />
    },
    {
      path: 'hotel',
      element: <Hotels />
    },
    {
      path: 'Customers',
      element: <Customers />
    },
    {
      path: 'invoices',
      element: <Invoice />
    },
    {
      path: 'users',
      element: <Users />
    },
    {
      path: 'settings',
      element: <Settings />
    }
  ]
};

export default ComponentsRoutes;

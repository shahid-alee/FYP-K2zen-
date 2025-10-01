
import { lazy } from 'react';


import MainLayout from 'layout/Dashboard/index';
import Loadable from 'components/Loadable';


const Dashboard = Loadable(lazy(() => import('pages/dashboard/default')));
const Users = Loadable(lazy(() => import('pages/users/AddUser')));
const Settings = Loadable(lazy(() => import('pages/setting/Setting')));
const Invoice = Loadable(lazy(() => import('pages/Invoice/Invoice')));
const Tours = Loadable(lazy(() => import('pages/tours/tours')));
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
      path: 'tours',
      element: <Tours />
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

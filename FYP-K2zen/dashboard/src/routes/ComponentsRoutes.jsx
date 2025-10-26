/* eslint-disable prettier/prettier */
import { lazy } from 'react';

// project-imports
import MainLayout from 'layout/Dashboard/index';
import Loadable from 'components/Loadable';
import { Reviews } from '@mui/icons-material';

// render - data display components
// const Dashboard = Loadable(lazy(() => import('pages/dashboard/default')));
const Users = Loadable(lazy(() => import('pages/users/AddUser')));
const Settings = Loadable(lazy(() => import('pages/setting/Setting')));
const Invoice = Loadable(lazy(() => import('pages/Invoice/Invoice')));
const Packages = Loadable(lazy(() => import('pages/packages/packages')));
const Destinations = Loadable(lazy(() => import('pages/Destination/Destinations')));

const RentCar = Loadable(lazy(() => import('pages/rentCar/rentCar')));
const Hotels = Loadable(lazy(() => import('pages/hotels/hotels')));
const Customers = Loadable(lazy(() => import('pages/Customers/Customers')));
const HotelBookings = Loadable(lazy(() => import('pages/hotel booking/hotelBooking')));
const CarBookings = Loadable(lazy(() => import('pages/carbooking/carBookings')));
const CustomizePackages = Loadable(lazy(() => import('pages/customizePackage/customizePackage')));
const Review = Loadable(lazy(() => import('pages/reviews/reviews')));



const ComponentsRoutes = {
  path: '/',
  element: <MainLayout />,
  children: [
    // {
    //   path: 'dashboard',
    //   element: <Dashboard />
    // },
    {
      path: 'packages',
      element: <Packages/>
    },
     {
      path: 'destinations',
      element: <Destinations/>
    },
    {
      path: 'RentCar',
      element: <RentCar />
    },
    {
      path: 'hotels',
      element: <Hotels />
    },
    {
      path: 'customers',
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
      path: 'hotelbookings',
      element: <HotelBookings />
    },
     {
      path: 'carbookings',
      element: <CarBookings />
    },
    {
      path: 'customizePackages',
      element: <CustomizePackages />
    },
      {
      path: 'reviews',
      element: <Review />
    },
    {
      path: 'settings',
      element: <Settings />
    }
  ]
};

export default ComponentsRoutes;

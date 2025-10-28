import {
  Home3,
  HomeTrendUp,
  Box,
  Archive,
  User,
  Setting2,
  ShoppingCart,
  Bag2,
  UserSquare,
  ReceiptItem,
  Box2,
  Building,
  Car
} from "iconsax-react";  
import { Map } from "immutable";

const icons = {
  navigation: Home3,
  dashboard: HomeTrendUp,
  artifacts: Box,
  stockRegistering: Archive,
  users: User,
  settings: Setting2,
  orders: ShoppingCart,
  products: Bag2,
  buyer: UserSquare,
  customers: User,
  invoices: ReceiptItem,
  tours: Box2,
  hotels: Building,     
  rentCar: Car          
};

// ==============================|| MENU ITEMS - DASHBOARD ||============================== //

const UpdatedMenu = {
  id: 'group-dashboard',
  title: 'Navigation',
  icon: icons.navigation,
  type: 'group',
  children: [
    {
      id: 'dashboard',
      title: 'Dashboard',
      type: 'item',
      url: '/dashboard',
      icon: icons.dashboard,
      breadcrumbs: false
    },
     {
      id: 'Destinations',
      title: 'Destinations',
      type: 'item',
      url: '/destinations',
      icon: icons.tours,
      breadcrumbs: false
    },
    {
      id: 'pakages',
      title: 'Packages',
      type: 'item',
      url: '/packages',
      icon: icons.tours,
      breadcrumbs: false
    },
    {
      id: 'RentCar',
      title: 'Rent A Car',
      type: 'item',
      url: '/rentCar',
      icon: icons.rentCar,
      breadcrumbs: false
    },
    {
      id: 'hotel',
      title: 'Hotel',
      type: 'item',
      url: '/hotel',
      icon: icons.hotels,
      breadcrumbs: false
    },
    // {
    //   id: 'customers',
    //   title: 'Customers',
    //   type: 'item',
    //   url: '/customers',
    //   icon: icons.customers,
    //   breadcrumbs: false
    // },
    {
      id: 'invoices',
      title: 'Invoices',
      type: 'item',
      url: '/invoices',
      icon: icons.invoices,
      breadcrumbs: false
    },
    {
      id: 'users',
      title: 'Users',
      type: 'item',
      url: '/users',
      icon: icons.users,
      breadcrumbs: false
    },
     {
      id: 'packageBookings',
      title: 'packageBookings',
      type: 'item',
      url: '/packagebookings',
      icon: icons.users,
      breadcrumbs: false
    },
      {
      id: 'hotelBookings',
      title: 'hotelBookings',
      type: 'item',
      url: '/hotelbookings',
      icon: icons.users,
      breadcrumbs: false
    },
     {
      id: 'carBookings',
      title: 'carBookings',
      type: 'item',
      url: '/carbookings',
      icon: icons.users,
      breadcrumbs: false
    },
     {
      id: 'customizePackages',
      title: 'customizePackages',
      type: 'item',
      url: '/customizePackages',
      icon: icons.users,
      breadcrumbs: false
    },
     {
      id: 'reviews',
      title: 'reviews',
      type: 'item',
      url: '/reviews',
      icon: icons.users,
      breadcrumbs: false
    },
     {
      id: 'contactUs',
      title: 'contactUs',
      type: 'item',
      url: '/contactUs',
      icon: icons.users,
      breadcrumbs: false
    },
    {
      id: 'settings',
      title: 'Settings',
      type: 'item',
      url: '/settings',
      icon: icons.settings,
      breadcrumbs: false
    }
  ]
};

export default UpdatedMenu;
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./components/landingPage/navBar/navBar";
import HeroSection from "./components/landingPage/heroSection/heroSection";
// import Packages from "./components/landingPage/tourPackages/tourPackages";
import RentCar from "./components/landingPage/transportBooking/rentCar.jsx";
import Gallery from "./components/gallery/gallery";
import AboutUs from "./components/aboutUs/aboutUs";

// import  PackageDetail from "./components/landingPage/tourPackages/packageDetail.jsx"
import Footer from "./components/footer/footer.jsx";
import Hotels from "./components/hotels/hotels.jsx";
import Review from "./components/landingPage/review/review.jsx";
import ContactUs from "./components/contactUs/contactUs.jsx";
// import BookNow from "./components/destination/viewDestination/bookNow.jsx";
import HotelBooking from "./components/hotels/hotelBooking.jsx";
import ThankCard from "./components/hotels/thankCard.jsx";
import CarBooking from "./components/landingPage/transportBooking/carBooking.jsx";
import TourPackages from "./components/landingPage/tourPackages/tourPackages.jsx"
import PackageDetail from "./components/landingPage/tourPackages/packageDetail.jsx"
import Register from "./components/auth/register.jsx"
import Login from "./components/auth/login.jsx";
import Destination from "./components/destination/destination.jsx";
import Packages from "./components/destination/viewDestination/Packages.jsx";

import CustomizePackage from "./components/customizePackage/CustomizeYourPakage/customizePackage.jsx";
import CustomizeSummary from "./components/customizePackage/summary/customizeSummary.jsx";
import ThankYou from "./components/customizePackage/summary/thankCard/thankyou.jsx";
import ViewDetails from "./components/destination/viewDestination/viewDetails/viewDetails.jsx";
import PackageByBudget from "./components/customizePackage/PackageByBudget/PackageByBudget.jsx";



const TourType = () => <h2>Tour Type Page</h2>;

function App() {
  return (
    <Router>
      <NavBar />

      <Routes>
        <Route
          path="/"
          element={
            <>
              <HeroSection />
              <TourPackages />
              <RentCar />
              <Review/>
            </>
          }
        />
    
{/* <Route path="/packageDetail/:id" element={<PackageDetail />} /> */}

        <Route path="/destination" element={<Destination />} />
        <Route path="/viewDestination/Packages" element={<Packages />} />
        <Route path="viewDetails" element={<ViewDetails />} />
       

        {/* <Route path="/bookNow" element={<BookNow />} /> */}
        <Route path="/customizePackage" element={<CustomizePackage/>} />
        <Route path="/customizeSummary" element={<CustomizeSummary/>} />
        <Route path="/thankyou" element={<ThankYou/>} />
        <Route path="/PackageByBudget" element={<PackageByBudget/>} />


        <Route path="/gallery" element={<Gallery />} />
        <Route path="/rentCar" element={<RentCar />} />
        <Route path="/carBooking" element={<CarBooking />} />
        <Route path="/tourPackages" element={<TourPackages />} />
        <Route path="/packageDetail" element={<PackageDetail />} />
        <Route path="/hotels" element={<Hotels />} />
        <Route path="/hotelBooking" element={<HotelBooking />} />
        <Route path="/thankCard" element={<ThankCard />} />
        <Route path="/aboutUs" element={<AboutUs />} />
        <Route path="/contactUs" element={<ContactUs />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
      <Footer/>
    </Router>
  );
}

export default App;

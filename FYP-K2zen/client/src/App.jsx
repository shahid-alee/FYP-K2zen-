import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./components/landingPage/navBar/navBar";
import HeroSection from "./components/landingPage/heroSection/heroSection";
import Packages from "./components/landingPage/tourPackages/tourPackages";
import Transport from "./components/landingPage/transportBooking/rentCar";
import Gallery from "./components/gallery/gallery";
import AboutUs from "./components/aboutUs/aboutUs";
import  SkarduPackages  from "./components/destination/skarduPackages";
import  HunzaPackages  from "./components/destination/hunzaPackages.jsx";
import  PackageDetail from "./components/landingPage/tourPackages/packageDetail.jsx"
import Footer from "./components/footer/footer.jsx";
import Hotels from "./components/hotels/hotels.jsx";
import Review from "./components/landingPage/review/review.jsx";
import ContactUs from "./components/contactUs/contactUs.jsx";
import BookNow from "./components/destination/bookNow.jsx";
import HotelBooking from "./components/hotels/hotelBooking.jsx";
import Login from "./components/auth/login.jsx";
import Signup from "./components/auth/register.jsx";



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
              <Packages />
              <Transport />
              <Review/>
            </>
          }
        />
    
<Route path="/packageDetail/:id" element={<PackageDetail />} />

        <Route path="/destination/skarduPackages" element={<SkarduPackages />} />
        <Route path="/destination/hunzaPackages" element={<HunzaPackages />} />
        <Route path="/bookNow" element={<BookNow />} />

        <Route path="/tour-type" element={<TourType />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/rentCar" element={<Transport />} />
        <Route path="/hotels" element={<Hotels />} />
        <Route path="/hotelBooking" element={<HotelBooking />} />
        <Route path="/aboutUs" element={<AboutUs />} />
        <Route path="/contactUs" element={<ContactUs />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signUp" element={<Signup />} />
      </Routes>
      <Footer/>
    </Router>
  );
}

export default App;

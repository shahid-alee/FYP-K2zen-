import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./components/landingPage/navBar/navBar";
import HeroSection from "./components/landingPage/heroSection/heroSection";
import Packages from "./components/landingPage/tourPackages/tourPackages";
import Transport from "./components/landingPage/transportBooking/rentCar";
import Gallery from "./components/gallery/gallery";
import AboutUs from "./components/aboutUs/aboutUs";
import  SkarduPackages  from "./components/destination/viewDestination/skarduPackages.jsx";
import  HunzaPackages  from "./components/destination/viewDestination/hunzaPackages.jsx";
import  PackageDetail from "./components/landingPage/tourPackages/packageDetail.jsx"
import Footer from "./components/footer/footer.jsx";
import Hotels from "./components/hotels/hotels.jsx";
import Review from "./components/landingPage/review/review.jsx";
import ContactUs from "./components/contactUs/contactUs.jsx";
import BookNow from "./components/destination/viewDestination/bookNow.jsx";
import HotelBooking from "./components/hotels/hotelBooking.jsx";
import Register from "./components/auth/register.jsx"
import Login from "./components/auth/login.jsx";
import Destination from "./components/destination/destination.jsx";
import GilgitPackages from "./components/destination/viewDestination/gilgitPagkages.jsx";
import AstorePackages from "./components/destination/viewDestination/astorePakages.jsx";
import DiamerPackages from "./components/destination/viewDestination/diamerPakages.jsx";
import NagarPackages from "./components/destination/viewDestination/nagarPackages.jsx";
import GhanchePackages from "./components/destination/viewDestination/ghachePackages.jsx";
import GhizerPackages from "./components/destination/viewDestination/ghizerPackages.jsx";
import CustomizePackage from "./components/customizePackage/customizePackage.jsx";



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

        <Route path="/destination" element={<Destination />} />
        <Route path="/viewDestination/skarduPackages" element={<SkarduPackages />} />
        <Route path="/viewDestination/hunzaPackages" element={<HunzaPackages />} />
        <Route path="/viewDestination/gilgitPackages" element={<GilgitPackages/>} />
        <Route path="/viewDestination/astorePackages" element={<AstorePackages />} />
        <Route path="/viewDestination/diamerPackages" element={<DiamerPackages />} />
        <Route path="/viewDestination/nagarPackages" element={<NagarPackages />} />
        <Route path="/viewDestination/ghanchePackages" element={<GhanchePackages />} />
        <Route path="/viewDestination/ghizerPackages" element={<GhizerPackages />} />

        <Route path="/bookNow" element={<BookNow />} />
        <Route path="/customizePackage" element={<CustomizePackage/>} />

        <Route path="/gallery" element={<Gallery />} />
        <Route path="/rentCar" element={<Transport />} />
        <Route path="/hotels" element={<Hotels />} />
        <Route path="/hotelBooking" element={<HotelBooking />} />
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

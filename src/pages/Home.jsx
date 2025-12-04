import Hero from "../components/Hero";
import Categories from "../components/Categories";
import { Helmet } from "react-helmet";
import Footer from "../components/Footer";


const Home = () => {
  return (
    <div className="min-h-screen bg-red-200">
      <Hero />
     <Footer />
    </div>
   
  );
};

export default Home;

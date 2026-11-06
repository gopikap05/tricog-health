import Navbar from '../layout/navbar';
import Footer from '../layout/footer';
import ScrollProgress from '../components/ScrollProgress';
import WhatsAppButton from '../common/WhatsAppButton';
import HeroSection from '../components/HeroSection';
import AboutUs from '../components/AboutUs';
import Problem from '../components/Problem';
import Solution from '../components/Solution';
import WhoWeServe from '../components/WhoWeServe';
import Product from '../components/Product';
import Customers from '../components/Customers';
import Testimonials from '../components/Testimonials';
import Certifications from '../components/Certifications';
import Team from '../components/Team';
import FAQ from '../components/FAQ';
import Resources from '../components/Resources';
import Cta from '../components/Cta';

export default function Home() {
  return (
    <>
      <ScrollProgress />
      <Navbar />
      <main>
        <HeroSection />
        <AboutUs />
        <Problem />
        <Solution />
        <WhoWeServe />
        <Product />
        <Customers />
        <Testimonials />
        <Certifications />
        <Team />
        <FAQ />
        <Resources />
        <Cta />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
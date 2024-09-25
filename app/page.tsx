import LandingPage from './components/landing';
import Sejarah from './components/CardSejarah';
import NavLogo from './components/navbarLogo';
import Surabaya from './components/sapaSurabaya';
import Galeri from './components/Gallery';

export default function Home() {
  return (
    <>
   <NavLogo/>
   <LandingPage/>
   <Sejarah/>
   <Surabaya/>
   <Galeri/>
    </> 
 )
}
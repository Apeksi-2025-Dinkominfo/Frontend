import LandingPage from './components/landing';
import Sejarah from './components/CardSejarah';
import NavLogo from './components/navbarLogo';
import Surabaya from './components/sapaSurabaya';

export default function Home() {
  return (
    <>
   <NavLogo/>
   <LandingPage/>
   <Sejarah/>
   <Surabaya/>
   </>
  )
}
import LandingPage from './components/landing';
import NavLogo from './components/navbarLogo';
import Sejarah from './components/CardSejarah';
import Surabaya from './components/sapaSurabaya';


export default function Home() {
  return (
    <>
   <NavLogo/>
   <LandingPage/>
   <Sejarah/>
   </>
  )
}
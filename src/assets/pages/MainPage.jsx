import FirstSection from '../sections/FirstSection';
import SecondSection from '../sections/SecondSection';
import ThirdSection from '../sections/ThirdSection';
import FourthSection from '../sections/FourthSection';
import BreakPointIndic from '../components/BreakPointIndic';
const MainPage = () => {
  return (
    <>
      <BreakPointIndic />
      <FirstSection />
      <SecondSection />
      <ThirdSection />
      <FourthSection />
    </>
  );
};

export default MainPage;

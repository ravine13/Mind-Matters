import { useContext } from 'react';
import { Button } from 'flowbite-react';
import { Link, useLocation } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import Foot from '../components/Footer';


const Home = () => {
  const { currentUser } = useContext(UserContext);
  const location = useLocation();

  return (
    <main className="px-4 my-12">
      <div className="relative flex mx-auto justify-center items-center h-[330px] md:h-[400px] w-full max-w-[1254px] rounded-2xl bg-gray-800">
        <h1 className="relative md:px-10 text-center text-3xl md:text-5xl font-semibold text-white z-30">
          Prioritize Your Mental Well-being
        </h1>
      </div>
      <div className="mx-auto my-16 max-w-[1254px]">
        <p className="w-full my-10 text-2xl font-semibold max-w-2xl">
          At Mind Matters, we believe in the power of mental health. Our platform offers a supportive community and resources to help you navigate your mental health journey. Connect with professionals, access valuable tools, and take control of your mental well-being.
        </p>
        <div className="flex flex-col md:flex-row gap-4">          
        </div>
      </div>
      {location.pathname === '/' && <Foot />}
    </main>
  );
}

export default Home;

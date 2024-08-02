import { Footer } from 'flowbite-react';
import { FaFacebookF, FaTwitter, FaInstagram, FaGithub, FaBrain } from 'react-icons/fa';

export default function Foot() {
  return (
    <Footer className="shadow-none px-2 mx-auto w-full max-w-[1280px] rounded-none">
      <div className="text-center py-2"> {/* Reduced the padding here */}
        <a href="#" className="flex items-center justify-center mb-3 text-2xl font-semibold text-gray-900"> {/* Reduced margin-bottom */}
          <FaBrain className="h-12 mr-3 sm:h-9" aria-hidden="true" />
          Mind-Matters
        </a>
        <span className="block text-sm text-center text-gray-500">
          © 2024 Mind-Matters™. All Rights Reserved. 
        </span>
        <ul className="flex justify-center mt-3 space-x-4"> {/* Reduced margin-top and space between icons */}
          <li>
            <a href="#" className="text-gray-500 hover:text-gray-900">
              <FaFacebookF className="w-5 h-5" aria-hidden="true" />
            </a>
          </li>
          <li>
            <a href="#" className="text-gray-500 hover:text-gray-900">
              <FaTwitter className="w-5 h-5" aria-hidden="true" />
            </a>
          </li>
          <li>
            <a href="#" className="text-gray-500 hover:text-gray-900">
              <FaInstagram className="w-5 h-5" aria-hidden="true" />
            </a>
          </li>
          <li>
            <a href="#" className="text-gray-500 hover:text-gray-900">
              <FaGithub className="w-5 h-5" aria-hidden="true" />
            </a>
          </li>
        </ul>
      </div>
    </Footer>
  );
}

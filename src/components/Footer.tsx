import React from "react";
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";

const Footer: React.FC = () => {
  return (
    <footer
      className="bg-gradient-to-r from-red-500 to-orange-400 text-white py-8 px-4"
      id="footer"
    >
      <div className="container mx-auto flex flex-col md:flex-row justify-between">
        <div className="mb-6 md:w-1/3">
          <h2 className="text-2xl font-semibold mb-2">Contact Us</h2>
          <p>123 Pizza Street</p>
          <p>City, Country</p>
          <p>Email: info@pizzapp.com</p>
          <p>Phone: +1 234 567 890</p>
        </div>
        <div className="mb-6 md:w-1/3">
          <h2 className="text-2xl font-semibold mb-2">Follow Us</h2>
          <div className="flex gap-4">
            <a href="#" className="text-xl">
              <FaFacebook />
            </a>
            <a href="#" className="text-xl">
              <FaTwitter />
            </a>
            <a href="#" className="text-xl">
              <FaInstagram />
            </a>
          </div>
        </div>
        <div className="md:w-1/3">
          <h2 className="text-2xl font-semibold mb-2">Subscribe</h2>
          <p>Subscribe to our newsletter for the latest news and offers:</p>
          <form className="mt-4">
            <input
              type="email"
              placeholder="Your Email"
              className="bg-gray-200 px-4 py-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 text-red-700"
            />
            <button
              type="submit"
              className="bg-red-500 text-white py-2 px-4 mt-2 rounded-md hover:bg-red-600 transition duration-300"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>
      <div className="text-center mt-8">
        <p>&copy; {new Date().getFullYear()} CraveWave. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;

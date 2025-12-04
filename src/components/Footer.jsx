const Footer = () => {
  return (
    <footer className="bg-[#0f0f0f] text-gray-300 pt-14 pb-8 mt-14">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">

        {/* Brand */}
        <div>
          <h2 className="text-2xl font-bold text-white tracking-wide">
            My Ecommerce Store
          </h2>
          <p className="text-gray-400 mt-3 text-sm leading-relaxed">
            Quality products with trusted service — delivered with care.
          </p>
        </div>

        

        {/* Information */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4 tracking-wide">
            Information
          </h3>
          <ul className="space-y-2 text-sm text-gray-400">
            <li className="hover:text-white transition">Shipping Info</li>
            <li className="hover:text-white transition">Return Policy</li>
            <li className="hover:text-white transition">FAQs</li>
            <li className="hover:text-white transition">Support</li>
          </ul>
        </div>

        {/* Contact */}
        <div>
           
          <h3 className="text-lg font-semibold text-white mb-4 tracking-wide">
            Contact
          </h3>
           <p className="text-gray-400 text-sm">Author: Maliha Akram</p>
          <p className="text-gray-400 text-sm">Email: MotifybyM@gmail.com</p>
          <p className="text-gray-400 text-sm mt-1">Phone: +92 300 1234567</p>
          <p className="text-gray-400 text-sm mt-1">Gujranwala, Pakistan</p>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800 mt-10 pt-6 text-center">
        <p className="text-gray-500 text-xs tracking-wide">
          © {new Date().getFullYear()} My Ecommerce Store — All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;

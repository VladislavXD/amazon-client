"use client";
import { Divider } from "@nextui-org/react";
import Link from "next/link";
import { FC } from "react";
import { 
  FaFacebook, 
  FaTwitter, 
  FaInstagram, 
  FaLinkedin,
  FaGithub,
  FaYoutube,
  FaTelegram
} from "react-icons/fa";
import { 
  FiMail, 
  FiPhone, 
  FiMapPin,
  FiCreditCard,
  FiShield,
  FiTruck
} from "react-icons/fi";

const Footer: FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#111111] text-white mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Верхняя часть footer */}
        <div className="py-8 sm:py-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* О компании */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-primary">Azura</h3>
              <p className="text-gray-300 text-sm leading-relaxed">
                Your trusted e-commerce platform offering quality products 
                with fast delivery and excellent customer service.
              </p>
              <div className="flex items-center gap-4">
                <Link href="https://www.facebook.com/vladislav.dev.xd/" className="text-gray-400 hover:text-primary transition-colors">
                  <FaFacebook className="w-5 h-5" />
                </Link>
                <Link href="https://x.com/vladislav_devXD" className="text-gray-400 hover:text-primary transition-colors">
                  <FaTwitter className="w-5 h-5" />
                </Link>
                <Link href="https://www.instagram.com/vladislav.dev_/" className="text-gray-400 hover:text-primary transition-colors">
                  <FaInstagram className="w-5 h-5" />
                </Link>
                <Link href="https://t.me/vladislavDevXD" className="text-gray-400 hover:text-primary transition-colors">
                  <FaTelegram className="w-5 h-5" />
                </Link>
                <Link href="https://github.com/VladislavXD" className="text-gray-400 hover:text-primary transition-colors">
                  <FaGithub className="w-5 h-5" />
                </Link>
              </div>
            </div>

            {/* Покупки */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Shop</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/category/electronics" className="text-gray-300 hover:text-primary transition-colors text-sm">
                    Electronics
                  </Link>
                </li>
                <li>
                  <Link href="/category/clothing" className="text-gray-300 hover:text-primary transition-colors text-sm">
                    Clothing
                  </Link>
                </li>
                <li>
                  <Link href="/category/books" className="text-gray-300 hover:text-primary transition-colors text-sm">
                    Books
                  </Link>
                </li>
                <li>
                  <Link href="/category/home" className="text-gray-300 hover:text-primary transition-colors text-sm">
                    Home & Garden
                  </Link>
                </li>
                <li>
                  <Link href="/category/sports" className="text-gray-300 hover:text-primary transition-colors text-sm">
                    Sports
                  </Link>
                </li>
                <li>
                  <Link href="/deals" className="text-gray-300 hover:text-primary transition-colors text-sm">
                    Special Deals
                  </Link>
                </li>
              </ul>
            </div>

            {/* Поддержка */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Support</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/help" className="text-gray-300 hover:text-primary transition-colors text-sm">
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link href="/shipping" className="text-gray-300 hover:text-primary transition-colors text-sm">
                    Shipping Info
                  </Link>
                </li>
                <li>
                  <Link href="/returns" className="text-gray-300 hover:text-primary transition-colors text-sm">
                    Returns
                  </Link>
                </li>
                <li>
                  <Link href="/size-guide" className="text-gray-300 hover:text-primary transition-colors text-sm">
                    Size Guide
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-gray-300 hover:text-primary transition-colors text-sm">
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link href="/faq" className="text-gray-300 hover:text-primary transition-colors text-sm">
                    FAQ
                  </Link>
                </li>
              </ul>
            </div>

            {/* Контакты */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Contact Info</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <FiMapPin className="w-4 h-4 text-primary flex-shrink-0" />
                  <span className="text-gray-300 text-sm">
                    123 Shopping St, City, State 12345
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <FiPhone className="w-4 h-4 text-primary flex-shrink-0" />
                  <span className="text-gray-300 text-sm">
                    +998-99(814)-00-00
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <FiMail className="w-4 h-4 text-primary flex-shrink-0" />
                  <span className="text-gray-300 text-sm">
                    support@azura.com
                  </span>
                </div>
              </div>
              
              {/* Часы работы */}
              <div className="space-y-2">
                <h4 className="font-medium text-sm">Customer Service Hours:</h4>
                <p className="text-gray-300 text-sm">
                  Mon - Fri: 9:00 AM - 6:00 PM<br />
                  Sat - Sun: 10:00 AM - 4:00 PM
                </p>
              </div>
            </div>
          </div>
        </div>

        <Divider className="bg-gray-700" />

        {/* Преимущества */}
        <div className="py-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="flex items-center gap-3">
              <FiTruck className="w-8 h-8 text-primary" />
              <div>
                <h4 className="font-semibold text-sm">Free Shipping</h4>
                <p className="text-gray-300 text-xs">On orders over $500</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <FiShield className="w-8 h-8 text-primary" />
              <div>
                <h4 className="font-semibold text-sm">Secure Payment</h4>
                <p className="text-gray-300 text-xs">100% protected</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <FiCreditCard className="w-8 h-8 text-primary" />
              <div>
                <h4 className="font-semibold text-sm">Easy Returns</h4>
                <p className="text-gray-300 text-xs">30-day return policy</p>
              </div>
            </div>
          </div>
        </div>

        <Divider className="bg-gray-700" />

        {/* Нижняя часть footer */}
        <div className="py-6">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="text-center sm:text-left">
              <p className="text-gray-300 text-sm">
                © {currentYear} Azura. All rights reserved.
              </p>
            </div>
            
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <Link href="/privacy" className="text-gray-300 hover:text-primary transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-gray-300 hover:text-primary transition-colors">
                Terms of Service
              </Link>
              <Link href="/cookies" className="text-gray-300 hover:text-primary transition-colors">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;



// fopyer 2 variant   
// "use client";
// import { Divider } from "@nextui-org/react";
// import Link from "next/link";
// import { FC } from "react";
// import { FaFacebook, FaTwitter, FaInstagram, FaGithub } from "react-icons/fa";

// const CompactFooter: FC = () => {
//   const currentYear = new Date().getFullYear();

//   return (
//     <footer className="bg-[#111111] text-white mt-auto">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="py-8">
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//             {/* Логотип и описание */}
//             <div className="space-y-4">
//               <h3 className="text-xl font-bold text-primary">Azura</h3>
//               <p className="text-gray-300 text-sm">
//                 Your trusted e-commerce platform for quality products.
//               </p>
//               <div className="flex items-center gap-4">
//                 <Link href="#" className="text-gray-400 hover:text-primary transition-colors">
//                   <FaFacebook className="w-5 h-5" />
//                 </Link>
//                 <Link href="#" className="text-gray-400 hover:text-primary transition-colors">
//                   <FaTwitter className="w-5 h-5" />
//                 </Link>
//                 <Link href="#" className="text-gray-400 hover:text-primary transition-colors">
//                   <FaInstagram className="w-5 h-5" />
//                 </Link>
//                 <Link href="#" className="text-gray-400 hover:text-primary transition-colors">
//                   <FaGithub className="w-5 h-5" />
//                 </Link>
//               </div>
//             </div>

//             {/* Быстрые ссылки */}
//             <div className="space-y-4">
//               <h3 className="text-lg font-semibold">Quick Links</h3>
//               <div className="grid grid-cols-2 gap-2">
//                 <Link href="/about" className="text-gray-300 hover:text-primary transition-colors text-sm">
//                   About
//                 </Link>
//                 <Link href="/contact" className="text-gray-300 hover:text-primary transition-colors text-sm">
//                   Contact
//                 </Link>
//                 <Link href="/help" className="text-gray-300 hover:text-primary transition-colors text-sm">
//                   Help
//                 </Link>
//                 <Link href="/shipping" className="text-gray-300 hover:text-primary transition-colors text-sm">
//                   Shipping
//                 </Link>
//                 <Link href="/returns" className="text-gray-300 hover:text-primary transition-colors text-sm">
//                   Returns
//                 </Link>
//                 <Link href="/faq" className="text-gray-300 hover:text-primary transition-colors text-sm">
//                   FAQ
//                 </Link>
//               </div>
//             </div>

//             {/* Контакты */}
//             <div className="space-y-4">
//               <h3 className="text-lg font-semibold">Contact</h3>
//               <div className="space-y-2 text-sm text-gray-300">
//                 <p>support@azura.com</p>
//                 <p>+1 (555) 123-4567</p>
//                 <p>Mon - Fri: 9:00 AM - 6:00 PM</p>
//               </div>
//             </div>
//           </div>
//         </div>

//         <Divider className="bg-gray-700" />

//         <div className="py-4">
//           <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
//             <p className="text-gray-300 text-sm">
//               © {currentYear} Azura. All rights reserved.
//             </p>
//             <div className="flex gap-4 text-sm">
//               <Link href="/privacy" className="text-gray-300 hover:text-primary transition-colors">
//                 Privacy
//               </Link>
//               <Link href="/terms" className="text-gray-300 hover:text-primary transition-colors">
//                 Terms
//               </Link>
//             </div>
//           </div>
//         </div>
//       </div>
//     </footer>
//   );
// };

// export default CompactFooter;
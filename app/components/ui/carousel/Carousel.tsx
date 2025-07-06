import React, { FC } from "react";
import { ICarouselItem } from "./carousel.interface";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import styles from "./carousel.module.css";

import { Parallax, Pagination, Navigation, Autoplay } from "swiper/modules";
import Image from "next/image";

import slide1 from "@/publick/images/carouselBg/slide1.jpg";
import slide2 from "@/publick/images/carouselBg/slide2.png";
import slide3 from "@/publick/images/carouselBg/slide3.jpg";

import technologyIcon from "@/publick/images/carouselBg/icon/technology.png";
import dotsIcon from "@/publick/images/carouselBg/icon/dots.png";

interface ICarousel {
  items: ICarouselItem[];
  className?: string;
}

const Carousel: FC<ICarousel> = ({items, className=''}) => {
  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-7">
      <Swiper
        speed={500}
        parallax={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        modules={[Parallax, Autoplay]}
        className={`${styles.mySwiper} rounded-3xl overflow-hidden shadow-xl`}
        breakpoints={{
          320: {
            height: 250,
          },
          640: {
            height: 300,
          },
          768: {
            height: 350,
          },
          1024: {
            height: 433,
          },
        }}
      >
        {items.map((item, index) => (
          <SwiperSlide key={index} className="relative w-full h-full overflow-hidden">
            {item.video ? (
              <video 
                width="640" 
                height="433" 
                loop 
                autoPlay 
                muted
                className="w-full h-full object-cover opacity-80"
              >
                <source src={item.video} type="video/mp4" />
                Ваш браузер не поддерживает видео.
              </video>
            ) : (
              <Image
                src={item.image || slide1.src}
                alt={`Slide ${index + 1}`}
                fill
                className="object-cover opacity-80"
                priority={index === 0}
                loading={index === 0 ? undefined : "lazy"}
              />
            )}

            {/* Overlay изображения для стилизации */}
            {index === 1 && (
              <Image
                src={technologyIcon.src}
                alt="Technology overlay"
                fill
                data-swiper-parallax="-1100"
                className="object-cover opaity-50"
                loading="lazy"
              />
            )}

            {index === 2 && (
              ''
            )}

            <div className={`
            absolute inset-0 flex flex-col 
            ${index === 0 ? 'items-center justify-center text-center' : 'items-start justify-center'} 
            ${index === 2 ? 'text-foreground-100': 'text-warning-800'}
             p-4 sm:p-6 md:p-10`}>
              <div
                className="title font-bold text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-6xl mb-4"
                data-swiper-parallax="-1000"
              >
                {item.title}
              </div>
              <div 
                className={`subtitle ${index === 0 ? 'text-center w-full' : 'w-full md:w-3/5 lg:w-1/2'} text-xs sm:text-sm md:text-base lg:text-lg xl:text-2xl`}
                data-swiper-parallax="-800"
              >
                {item.description}
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Carousel;



// import React, { FC } from "react";
// import { ICarouselItem } from "./carousel.interface";

// import { Swiper, SwiperSlide } from "swiper/react";
// import "swiper/css";
// import "swiper/css/pagination";
// import "swiper/css/navigation";
// import styles from "./carousel.module.css";

// import { Parallax, Pagination, Navigation, Autoplay } from "swiper/modules";
// import Image from "next/image";

// import slide1 from "@/publick/images/carouselBg/slide1.jpg";
// import slide2 from "@/publick/images/carouselBg/slide2.png";
// import slide3 from "@/publick/images/carouselBg/slide3.jpg";

// import technologyIcon from "@/publick/images/carouselBg/icon/technology.png";
// import dotsIcon from "@/publick/images/carouselBg/icon/dots.png";
// import { useTypedSelector } from "@/app/hooks/useTypedSelector";

// interface ICarousel {
//   items: ICarouselItem[];
//   className?: string;
// }

// const Carousel: FC<ICarousel> = ({items, className=''}) => {
//   const {selectedItemIndex} = useTypedSelector(state=> state.carousel)

//   const selectedItem = items[selectedItemIndex]


//   return (
//     <div className="w-full max-w-7xl mx-auto px-4 py-7">
//       <Swiper
//         speed={500}
//         parallax={true}
//         autoplay={{
//           delay: 5000,
//           disableOnInteraction: false,
//         }}
//         modules={[Parallax, Autoplay]}
//         className={`${styles.mySwiper} rounded-3xl overflow-hidden shadow-xl`}
//         breakpoints={{
//           320: {
//             height: 250,
//           },
//           640: {
//             height: 300,
//           },
//           768: {
//             height: 350,
//           },
//           1024: {
//             height: 433,
//           },
//         }}
//       >
//         <SwiperSlide className="relative w-full h-full overflow-hidden">
//           <video 
//             width="640" 
//             height="433" 
//             loop 
//             autoPlay 
//             muted
//             className="w-full h-full object-cover opacity-50"
//           >
//             <source src={selectedItem.video} type="video/mp4" />
//             Ваш браузер не поддерживает видео.
//           </video>

//           <div className="absolute inset-0 flex flex-col items-center justify-center text-warning-800 p-4 sm:p-6 md:p-10">
//             <div
//               className="title text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-6xl text-center font-bold mb-4 tracking-wider"
//               data-swiper-parallax="-1000"
//             >
//               {selectedItem.title}
//               <span 
//                 data-swiper-parallax="1000" 
//                 className="block text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl mt-2 font-light italic text-center"
//               >
                
//               </span>
//             </div>
//           </div>
//         </SwiperSlide>
//         <SwiperSlide className="relative w-full h-full overflow-hidden">
//           <Image
//             src={selectedItem.image || slide1.src}
//             alt="Slide 2"
//             fill
//             className="object-cover"
//             priority
//           />
//           <Image
//             src={technologyIcon.src}
//             alt="Technology overlay"
//             fill
//             data-swiper-parallax="-1100"
//             className="object-cover opacity-50"
//             loading="lazy"
//           />
          
//           <div className="absolute inset-0 flex flex-col items-start justify-center text-warning-800 p-4 sm:p-6 md:p-10">
//             <div
//               className="title font-bold text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-6xl mb-4"
//               data-swiper-parallax="-1000"
//             >
//               selectedItem.title
//             </div>
//             <div 
//               className="subtitle w-full md:w-3/5 lg:w-1/2 text-xs sm:text-sm md:text-base lg:text-lg xl:text-2xl" 
//               data-swiper-parallax="-800"
//             >
//               {selectedItem.description}
//             </div>
//           </div>
//         </SwiperSlide>
        
//         <SwiperSlide className="relative w-full h-full overflow-hidden">
//           <Image
//             src={slide3.src}
//             alt="Slide 3"
//             fill
//             className="object-cover"
//             loading="lazy"
//           />
//           <Image
//             src={dotsIcon.src}
//             alt="Dots overlay"
//             fill
//             data-swiper-parallax="1100"
//             className="object-cover opacity-30"
//             loading="lazy"
//           />
          
//           <div className="absolute inset-0 flex flex-col items-start justify-center text-foreground-100 p-4 sm:p-6 md:p-10">
//             <div
//               className="title font-bold text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-6xl text-center mb-4"
//               data-swiper-parallax="-1000"
//             >
//               {selectedItem.title}
//             </div>
//             <div 
//               className="subtitle w-full md:w-4/5 lg:w-3/5 text-xs sm:text-sm md:text-base lg:text-lg xl:text-2xl" 
//               data-swiper-parallax="-800"
//             >
//               {selectedItem.description}
//             </div>
//           </div>
//         </SwiperSlide>
//       </Swiper>
//     </div>
//   );
// };

// export default Carousel;






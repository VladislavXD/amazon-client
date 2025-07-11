import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";

// import required modules
import { FreeMode, Pagination, Autoplay } from "swiper/modules";
import ProductItem from "../../catalog/products-item/ProductItem";
import { IProduct } from "@/src/types/product.interface";
import Heading from "../../../Heading";

interface IProductsCarouselProps {
  products?: IProduct[]
  title?: string
}

const ProductsCarousel = ({products}: IProductsCarouselProps) => {

 
console.log(products, 'popular products');
  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-7 ">
      <Heading className="pt-10 pb-10 " ><h1>Popular Products</h1></Heading>
      
      <Swiper
        slidesPerView={3}
        speed={15000}
        parallax={true}
        freeMode={true}
        
        autoplay={{
                  delay: 2500,
        disableOnInteraction: false, 
        pauseOnMouseEnter: false,


        }}
        grabCursor={true}

        loop={true}
        breakpoints={{
          // Мобильные устройства (до 640px)
          320: {
            slidesPerView: 1,
            spaceBetween: 10,
          },
          // Планшеты (от 640px)
          640: {
            slidesPerView: 2,
            spaceBetween: 15,
          },
          // Десктоп малый (от 768px)
          768: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          // Десктоп средний (от 1024px)
          1024: {
            slidesPerView: 3,
            spaceBetween: 25,
          },
          // Десктоп большой (от 1280px)
          1280: {
            slidesPerView: 4,
            spaceBetween: 30,
          },
          // Очень большие экраны (от 1536px)
          1536: {
            slidesPerView: 5,
            spaceBetween: 35,
          }}
        }

        modules={[FreeMode, Pagination, Autoplay]}
        className="mySwiper [&_.swiper-wrapper]:!transition-timing-function-linear"
      >
        {

          products?.map((product) => (
            <SwiperSlide>
              <div className="h-full">
                <ProductItem key={product.id} product={product} />
              </div>
            </SwiperSlide>
          ))
        }
      </Swiper>
    </div>
  );
};

export default ProductsCarousel;

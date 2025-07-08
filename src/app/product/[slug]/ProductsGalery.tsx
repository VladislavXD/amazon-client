import React, { useRef, useState } from "react";
import { Image } from "@nextui-org/react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

import { FreeMode, Thumbs } from "swiper/modules";

interface ProductsGalleryProps {
  images: string[];
}

export const ProductsGallery = ({ images }: ProductsGalleryProps) => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  console.log(images);
  return (
    <>
      <Swiper
        spaceBetween={10}
        thumbs={{ swiper: thumbsSwiper }}
        modules={[FreeMode, Thumbs]}
        className="mySwiper2"
      >
        {images.map((image, index) => (
          <SwiperSlide key={index}>
            <div className="relative shadow-black/5 shadow-none rounded-large">
              <Image 
                src={image} 
                alt={`Product Image ${index + 1}`} 
                className="relative z-10 opacity-0 shadow-black/5 data-[loaded=true]:opacity-100 shadow-none transition-transform-opacity motion-reduce:transition-none !duration-300 rounded-large h-full w-full"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
        <Swiper
          // @ts-ignore
          onSwiper={setThumbsSwiper}
          slidesPerView={6}
          
          freeMode={true}
          watchSlidesProgress={true}
          modules={[FreeMode, Thumbs]}
          className="mySwiper overflow-x-auto -mx-2 -mb-4 mt-4 flex w-full max-w-full px-2 pb-4 pt-2"
          spaceBetween={12}
        >
          {images.map((image, index) => (
            <SwiperSlide key={index} className="relative h-16 w-16 flex-none cursor-pointer items-center justify-center rounded-medium ring-offset-background transition-shadow data-[selected=true]:outline-none data-[selected=true]:ring-2 data-[selected=true]:ring-focus data-[selected=true]:ring-offset-2">
              <Image 
                src={image} 
                alt={`Thumbnail ${index + 1}`} 
                className="relative z-10 opacity-0 shadow-black/5 data-[loaded=true]:opacity-100 shadow-none transition-transform-opacity motion-reduce:transition-none !duration-300 rounded-large h-full w-full"
              />
            </SwiperSlide>
          ))}
        </Swiper>
    </>
  );
};

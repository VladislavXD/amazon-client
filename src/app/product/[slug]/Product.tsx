"use client";
import Heading from "../../components/Heading";
import {
  Accordion,
  AccordionItem,
  Button,
  ButtonGroup,
  Image,
  Radio,
  RadioGroup,
} from "@nextui-org/react";

import { NextPage } from "next";
import { useEffect, useState } from "react";
import img from "@/publick/images/1.jpeg";
import ColorRadioGroup from "../../components/ui/input/radioGroup";
import { TbTruckDelivery } from "react-icons/tb";
import AddToCartButton from "../../components/ui/catalog/products-item/AddToCartButton";
import { IoCartOutline } from "react-icons/io5";
import { Rating } from "react-simple-star-rating";
import { useQuery } from "@tanstack/react-query";
import { IProduct } from "@/src/types/product.interface";
import { ProductService } from "@/src/services/product/product.service";
import AddToFavoriteButton from "../../components/ui/catalog/products-item/FavoriteButton";
import { ProductsGallery } from "./ProductsGalery";
import ProductRating from "../../components/ui/catalog/products-item/ProductRating";

interface IProductPage {
  initialProduct: IProduct;
  similarProducts: IProduct[];
  slug?: string;
}

const Product = ({
  initialProduct,
  similarProducts,
  slug = "",
}: IProductPage) => {
  const colorOptions = [
    { label: "Серый", value: "#808080" },
    { label: "Белый", value: "#ffffff" },
    { label: "черный", value: "#222222" },
    // Или с изображениями:
    // { label: "Мрамор", value: "marble", image: "/textures/marble.png" },
  ];
  const sizes = ["36", "37", "38", "39", "40", "41", "42"];

  const [selectedColor, setSelectedColor] = useState("#FF0000");
  const [selectedSize, setSelectedSize] = useState("36");

  const accordionContent = [
    {
      id: "1",
      title: "Size & Fit",
      content: [
        "Fits small; we recommend ordering a half size up",
        "Mid-weight, non-stretchy fabric",
        "Designed for a mini length",
      ].map((item) => (
        <li key={item} className="text-default-500">
          {item}
        </li>
      )),
    },
    {
      id: "2",
      title: "Shipping & Returns",
      content: [
        "Free shipping & returns",
        "Free, no-hassle returns",
        "Complimentary gift packaging",
        "Ships within 24 hours!",
      ].map((item) => (
        <li key={item} className="text-default-500">
          {item}
        </li>
      )),
    },
    {
      id: "3",
      title: "Designer Notes",
      content: [
        "Fits small; we recommend ordering a half size up",
        "Mid-weight, non-stretchy fabric",
        "Designed for a mini length",
      ].map((item) => (
        <li key={item} className="text-default-500">
          {item}
        </li>
      )),
    },
  ];
  
  const { data: product } = useQuery({
    queryKey: ["get product", initialProduct.id],
    queryFn: async () => {
      return ProductService.getBySlug(slug);
    },
    initialData: initialProduct,
    enabled: !!slug,
  });
  
  
  
  return (
    <>
      <Heading>
        <h1 className="text-2xl font-bold p-5">My Orders</h1>
      </Heading>
      <section className="relative flex min-h-dvh flex-col bg-background bg-radial">
        <div className="flex items-center justify-center p-4">
          <div className="max-w-8xl h-full w-full px-2 lg:px-24">
            <div className="relative flex flex-col gap-4 lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8">
              <div className="relative h-full w-full flex-none">
                <div className="max-w-fit min-w-min inline-flex items-center justify-between box-border whitespace-nowrap px-2 text-medium rounded-full absolute left-3 top-3 z-20 h-10 gap-1 bg-background/60 pl-3 pr-2 text-foreground/90 shadow-medium backdrop-blur-md backdrop-saturate-150 dark:bg-default-100/50">
                  test
                </div>
                <div className="relative shadow-black/5 shadow-none rounded-large">
                <ProductsGallery images={[img.src, img.src, img.src, img.src, img.src, img.src, img.src]}/>
                  {/* <Image
                    src={img.src}
                    className="relative z-10 opacity-0 shadow-black/5 data-[loaded=true]:opacity-100 shadow-none transition-transform-opacity motion-reduce:transition-none !duration-300 rounded-large h-full w-full"
                  />
                </div>
                <div className="overflow-x-auto data-[left-scroll=true]:[mask-image:linear-gradient(270deg,#000_calc(100%_-_var(--scroll-shadow-size)),transparent)] data-[right-scroll=true]:[mask-image:linear-gradient(90deg,#000_calc(100%_-_var(--scroll-shadow-size)),transparent)] data-[left-right-scroll=true]:[mask-image:linear-gradient(to_right,#000,#000,transparent_0,#000_var(--scroll-shadow-size),#000_calc(100%_-_var(--scroll-shadow-size)),transparent)] -mx-2 -mb-4 mt-4 flex w-full max-w-full gap-4 px-2 pb-4 pt-2">
                  <button className="relative h-24 w-24 flex-none cursor-pointer items-center justify-center rounded-medium ring-offset-background transition-shadow data-[selected=true]:outline-none data-[selected=true]:ring-2 data-[selected=true]:ring-focus data-[selected=true]:ring-offset-2">
                    <Image
                      src={img.src}
                      className="relative z-10 opacity-0 shadow-black/5 data-[loaded=true]:opacity-100 shadow-none transition-transform-opacity motion-reduce:transition-none !duration-300 rounded-large h-full w-full"
                      alt="Order Image"
                    />
                  </button> */}
                </div>
              </div>
              <div className="flex flex-col">
                <h1 className="text-2xl font-bold tracking-tight">
                  {product?.name}
                </h1>
                <h2 className="sr-only">Product information</h2>
                <div className="my-2 flex items-center gap-2 ">
                  <div className="flex items-center">
                    
                    <ProductRating product={product} />


                  
                  </div>
                </div>
                <p className="text-xl font-medium tracking-tight">$ {product.price}</p>
                <div className="mt-4">
                  {/* <div className="sr-only">{product.description}</div> */}
                  <div className="line-clamp-3 text-medium text-default-500">
                    {product.description}
                  </div>
                </div>
                <div className="relative flex flex-col gap-2 ml-1 mt-6">
                  <ColorRadioGroup
                    options={colorOptions}
                    value={selectedColor}
                    onChange={setSelectedColor}
                  />
                </div>
                <div className="mt-6 flex flex-col gap-1">
                  <div className="mb-4 flex items-center gap-2 text-default-700">
                    <TbTruckDelivery size={30} />
                    <p className="text-small font-medium">
                      Free shipping and 30 days return
                    </p>
                  </div>
                  <ButtonGroup
                    className="flex flex-wrap gap-2 items-start justify-start"
                    defaultValue={selectedSize}
                  >
                    {sizes.map((size) => (
                      <Button
                        key={size}
                        value={size}
                        color={selectedSize === size ? "primary" : "default"}
                        className="w-16 h-10 text-small"
                        onPress={() => setSelectedSize(size)}
                      >
                        {size}
                      </Button>
                    ))}
                  </ButtonGroup>
                </div>
                <div className="px-2 w-full -mx-1 mt-2">
                  <Accordion>
                    {accordionContent.map((item) => (
                      <AccordionItem
                        key={item.id}
                        aria-label={item.title}
                        title={item.title}
                        className="mb-2"
                      >
                        <section
                          style={{
                            willChange: "opacity",
                            opacity: 1,
                            height: "auto",
                            overflowY: "unset",
                          }}
                        >
                          <div className="py-2 pt-0 pb-6 text-base text-default-500">
                            <ul className="list-inside list-disc">
                              {item.content}
                            </ul>
                          </div>
                        </section>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </div>
                <div className="mt-2 flex gap-2">
                  <Button
                    className="z-0 group relative inline-flex items-center justify-center box-border appearance-none select-none whitespace-nowrap subpixel-antialiased overflow-hidden tap-highlight-transparent data-[pressed=true]:scale-[0.97] outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 px-6 min-w-24 h-12 gap-3 rounded-large w-full [&>svg]:max-w-[theme(spacing.8)] transition-transform-colors-opacity motion-reduce:transition-none bg-primary text-primary-foreground data-[hover=true]:opacity-hover text-medium font-medium"
                    color="primary"
                    variant="solid"
                    startContent={<IoCartOutline className="size-6" />}
                  >
                    Add to Cart
                  </Button>
                  <AddToFavoriteButton productId={3} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Product;

import { ICarouselItem } from "../carousel.interface"
import slide1 from "@/publick/images/carouselBg/slide1.jpg";
import slide2 from "@/publick/images/carouselBg/slide3.jpg";

export const carouselItems: ICarouselItem[] = [
	{
		title: 'Welcome to Future of Shopping',
		description:
			'Experience the next level of e-commerce',
    video: 'https://static.vecteezy.com/system/resources/previews/002/043/153/mp4/dust-particle-bokeh-abstract-on-black-background-free-video.mp4'
	},
	{
		title: 'Free Delivery!',
		description: `Don't miss it out. Only today, get free Next day delivery on all
              orders over $100. Hurry up, this offer is valid only for the next
              24 hours!`,
		image: slide1.src
	},
	{
		title: 'Premium Quality!',
		description: `Discover our collection of premium products with exceptional quality
              and unbeatable prices. Your satisfaction is our priority!`,
		image: slide2.src
	}
]

"use client";
import {
  Badge,
  Button,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
} from "@nextui-org/react";
import Image from "next/image";
import Link from "next/link";
import { FC, useState } from "react";
import amazonImage from "@/publick/AZURA_LOGO.svg";
import { PiShoppingCartThin } from "react-icons/pi";
import { useCart } from "@/src/hooks/useCart";
import Cart from './cart/Cart'


const Nav: FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuItems = [
    "Profile",
    "Dashboard",
    "Activity",
    "Analytics",
    "System",
    "Deployments",
    "My Settings",
    "Team Settings",
    "Help & Feedback",
    "Log Out",
  ];


  const {items} =useCart()
  return (

      <Navbar
        onMenuOpenChange={setIsMenuOpen}
        isBlurred={true}
        position="static"
        maxWidth="full"
        isBordered
        className="fixed"
      >
        <NavbarContent>
          <NavbarBrand>Beta</NavbarBrand>
        </NavbarContent>

        <NavbarContent  justify="center">
          <NavbarItem>
            <Link color="foreground" href="#">
              <Image
                src={amazonImage}
                alt="Amazon icon"
                className="size-28 fill-white "
              />
            </Link>
          </NavbarItem>
        </NavbarContent>

        <NavbarContent justify="end">
          <NavbarItem className="">
            <Badge
              content={items?.length}
              color="danger"
              placement="top-right"
              className={`${
                !items?.length && " opacity-0"
              } transition-all ease-in-out`}
            >
              <Cart/>
            </Badge>
          </NavbarItem>
        </NavbarContent>
      </Navbar>

  );
};

export default Nav;

"use client";

import { useProfile } from "@/src/hooks/useProfile";
import {
  Badge,
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  useDisclosure,
  User,
} from "@nextui-org/react";
import Link from "next/link";
import React from "react";
import { FaAmazon } from "react-icons/fa";
import { GrHomeRounded } from "react-icons/gr";
import { CiHeart } from "react-icons/ci";
import { CiSettings } from "react-icons/ci";
import LogOut from "./Modal";
import { useAuth } from "@/src/hooks/useAuth";
import { CiLogin } from "react-icons/ci";
import { usePathname } from "next/navigation";
import { useOrders } from "@/src/hooks/useOrder";
import LogOutModal from "./Modal";
import { PiShoppingCartSimpleThin } from "react-icons/pi";
import { useCart } from "@/src/hooks/useCart";
import { GoHistory } from "react-icons/go";
import { LiaBorderStyleSolid } from "react-icons/lia";
import AMAZON_LOGO from '@/publick/AZURA_MAIN_LOGO.svg'
import Image from "next/image";



type Props = {};

const Sidebar = (props: Props) => {
  const { profile } = useProfile();
  const { user } = useAuth();
  const pathname = usePathname();
  const { orders } = useOrders();
  const {onOpen, isOpen, onOpenChange} = useDisclosure();

    const { items } = useCart();
  


  return (
    <aside className="h-screen transition-all ease-in-out sm:p-6 p-3 border-e border-r-black z-10 backdrop-blur-sm opacity-90 fixed sm:w-72 w-16 mt-[64px]">
      <div>
        <div className="flex gap-2 items-center px-3 mb-10 ">
          {/* <FaAmazon className="sm:size-9 size-7" /> */}
          <Image src={AMAZON_LOGO} alt="AMAZON_LOGO" className="size-16 w-9 h-9"/>
          <h2 className="font-bold uppercase hidden sm:block">AZURA</h2>
        </div>
        <LogOutModal isOpen={isOpen} onOpenChange={onOpenChange}/>
        {user ? (
          <Dropdown backdrop="blur">
            <DropdownTrigger>
              <User
                as="button"
                key={profile?.avatarUrl}
                avatarProps={{
                  isBordered: true,
                  src: `${profile?.avatarUrl}`,
                }}
                className="transition-transform sm:px-3 p-0 ml-0 sm:ml-0  "
                description={
                  <span className="hidden sm:inline">{profile?.email}.</span>
                }
                name={<span className="hidden sm:inline">{profile?.name}</span>}
              />
            </DropdownTrigger>

            <DropdownMenu aria-label="User Actions" variant="flat">
              <DropdownItem key={`${profile?.email}`} className="h-14 gap-2">
                <p className="font-bold">Signed in as</p>
                <p className="font-bold opacity-70 text-gray">
                  {profile?.email}
                </p>
              </DropdownItem>
              <DropdownItem key="profile">
                <Link className="block w-full h-full" href={"/profile"}>
                  Profile
                </Link>
              </DropdownItem>
              <DropdownItem key="Lgout" color="danger" className="text-danger">
                
                <Link className="block w-full h-full" href={"/profile"} onClick={onOpen}>
                  Logout
                </Link>
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        ) : (
          <div className="  flex gap-3">
            <Button
              startContent={<CiLogin className="size-6 " />}
              as={Link}
              color="primary"
              size="sm"
              isIconOnly
              className="sm:w-full w-full flex sm:justify-start justify-center py-5"
              href="/auth"
              variant="flat"
            >
              <p className="sm:block hidden text-sm pl-1">Sign Up</p>
            </Button>
          </div>
        )}
      </div>

      <div className="sm:pt-8 pt-8">
        <p className="sm:block hidden text-xs text-[#95959E] ">Overview</p>
        <div className=" flex flex-col gap-2 pt-2">
          <Button
            isIconOnly
            as={Link}
            href="/"
            variant={pathname === "/" ? "shadow" : "flat"}
            startContent={<GrHomeRounded className="text-default-600 size-5 " />}
            className={`w-full rounded-large ${
              pathname === "/"
                ? "bg-[#28292D]"
                : "bg-[#000] hover:bg-[rgb(25,23,29)]"
            } flex sm:justify-start justify-center pl-0 sm:pl-5 my-3 text-default-600 md:ml-[10px] ml-0`}
          >
            <p className="sm:block hidden pt-1 pl-3">Home</p>
          </Button>

          <Button
            isIconOnly
            as={Link}
            href="/favorites"
            variant={pathname === "/favorites" ? "shadow" : "flat"}
            startContent={
              <Badge
                content={profile?.favorites.length}
                color="danger"
                placement="top-left"
                className={`${!profile?.favorites.length && " opacity-0"} 
                transition-all ease-in-out`}
              >
                <CiHeart className="text-default-600 size-8 " />
              </Badge>
            }
            className={`w-full  rounded-large 
               ${
                 pathname === "/favorites"
                   ? "bg-[#28292D]"
                   : "bg-[#000] hover:bg-[rgb(25,23,29)]"
               }
             flex sm:justify-start justify-center pl-0 sm:pl-5 my-3 text-default-600 `}
          >
            <p className="sm:block hidden pt-1 pl-2">Favorites</p>
          </Button>

          <Button
            isIconOnly
            as={Link}
            href="/recently-products"
            variant={pathname === "/recently-products" ? "shadow" : "flat"}
            startContent={
              // <Badge
              //   content={profile?.favorites.length}
              //   color="danger"
              //   placement="top-left"
              //   className={`${
              //     !profile?.favorites.length && " opacity-0"
              //   }
              //   transition-all ease-in-out`}
              // >

              <GoHistory className="text-default-600 size-6 " />
              // </Badge>
            }
            className={`w-full  rounded-large 
               ${
                 pathname === "/recently-products"
                   ? "bg-[#28292D]"
                   : "bg-[#000] hover:bg-[rgb(25,23,29)]"
               }
             flex sm:justify-start justify-center pl-0 sm:pl-5 my-3 text-default-600 `}
          >
            <p className="sm:block hidden pt-1 pl-2">Recently</p>
          </Button>
          <Button
            isIconOnly
            as={Link}
            href="/cart"
            variant={pathname === "/cart" ? "shadow" : "flat"}
            startContent={
              <Badge
                content={items.length}
                color="danger"
                placement="top-left"
                className={`${
                  !items.length && "opacity-0"
                }
                transition-all ease-in-out`}
              >
              <PiShoppingCartSimpleThin className="text-default-600 size-7 " />
              </Badge>
            }
            className={`w-full  rounded-large 
               ${
                 pathname === "/cart"
                   ? "bg-[#28292D]"
                   : "bg-[#000] hover:bg-[rgb(25,23,29)]"
               }
             flex sm:justify-start justify-center pl-0 sm:pl-5 my-3 text-default-600 `}
          >
            <p className="sm:block hidden pt-1 pl-2">Cart</p>
          </Button>

          {user && (
            <Button
              isIconOnly
              as={Link}
              href="/my-orders"
              variant={pathname === "/my-orders" ? "shadow" : "flat"}
              startContent={
                <Badge
                  content={orders?.length}
                  color="danger"
                  placement="top-left"
                  className={`${!orders?.length && " opacity-0"} 
                transition-all ease-in-out`}
                >

                  <LiaBorderStyleSolid className="text-default-600 size-7 " />
                </Badge>
              }
              className={`w-full  
                rounded-large ${
                  pathname === "/my-orders"
                    ? "bg-[#28292D]"
                    : "bg-[#000] hover:bg-[rgb(25,23,29)]"
                }
                 flex sm:justify-start justify-center pl-0 sm:pl-5 my-3 text-default-600 `}
            >
              <p className="sm:block hidden pt-1 pl-2">Orders</p>
            </Button>
          )}

          <Button
            isIconOnly
            as={Link}
            href="settings"
            variant={pathname === "/settings" ? "shadow" : "flat"}
            startContent={<CiSettings className="text-default-600 size-8" />}
            className={`w-full rounded-large 
             ${
               pathname === "/settings"
                 ? "bg-[#28292D]"
                 : "bg-[#000] hover:bg-[rgb(25,23,29)]"
             }
             flex sm:justify-start justify-center pl-0 sm:pl-5 my-3 text-default-600 `}
          >
            <p className="sm:block hidden pt-1 pl-2">Settings</p>
          </Button>
        </div>
      </div>

      <div className="h-full relative">
        <div className=" absolute  bottom-[55%] bg-aqua ml-2 sm:ml-0 ">
          {user ? <LogOut /> : null}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;

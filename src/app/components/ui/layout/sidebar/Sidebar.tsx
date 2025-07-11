"use client";

import { useProfile } from "@/src/hooks/useProfile";
import {
  Badge,
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
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
import { FaBorderTopLeft } from "react-icons/fa6";
import { usePathname } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { OrdersService } from "@/src/services/order.service";
import { useOrders } from "@/src/hooks/useOrder";
import { LiaHistorySolid } from "react-icons/lia";

type Props = {};

const Sidebar = (props: Props) => {
  const { profile } = useProfile();
  const { user } = useAuth();
  const pathname = usePathname();
  const { orders } = useOrders();

  return (
    <aside className="h-screen transition-all ease-in-out sm:p-6 p-3 border-e border-r-black z-10 backdrop-blur-sm opacity-90 fixed sm:w-72 w-16 mt-[64px]">
      <div>
        <div className="flex gap-2 items-center px-3 mb-10">
          <FaAmazon className="sm:size-9 size-7" />
          <h2 className="font-bold uppercase hidden sm:block">Amazon</h2>
        </div>
        {user ? (
          <Dropdown backdrop="blur">
            <DropdownTrigger>
              <User
                as="button"
                key={profile?.id}
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
              <DropdownItem key="profile" className="h-14 gap-2">
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
              <LiaHistorySolid className="text-default-600 size-8 " />
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
                  <FaBorderTopLeft className="text-default-600 size-7 " />
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
            href="test"
            variant={pathname === "/setings" ? "shadow" : "flat"}
            startContent={<CiSettings className="text-default-600 size-8" />}
            className={`w-full rounded-large 
             ${
               pathname === "/setings"
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

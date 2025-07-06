import Heading from "@/app/components/Heading";
import Layout from "@/app/components/ui/layout/Layout";
import Meta from "@/app/components/ui/Meta";
import { useProfile } from "@/app/hooks/useProfile";
import { OrdersService } from "@/app/services/order.service";
import { Divider, Image } from "@nextui-org/react";

import { useQuery } from "@tanstack/react-query";
import { NextPage } from "next";
import React from "react";
import { MdOutlinePhoneEnabled } from "react-icons/md";
import { MdOutlineDescription } from "react-icons/md";


const MyOrders: NextPage = () => {
  const { profile } = useProfile();
  // const { data: orders, isLoading } = useQuery({
  //   queryKey: ["my-orders"],
  //   queryFn: async () => await OrdersService.getAll(),
  //   select: ({ data }) => data,
  //   staleTime: 500,
  // });


  return (
    <Meta title="Profile">
      <Layout>
        <Heading>
          <h1 className="text-4xl text-warning-800 font-bold p-5">Profile</h1>
        </Heading>
        {/* <section className="max-w-3xl mx-auto p-5 bg-foreground-100 h-56 rounded-2xl">
          
        </section> */}
         <div className="flex flex-col md:flex-row bg-[#171717] w-full max-w-4xl mx-auto p-6 md:p-9 rounded-2xl gap-6">
          {/* Аватарка */}
          <div className="flex-shrink-0 mx-auto md:mx-0 md:flex">
            <Image
              key={profile?.id}
              isBlurred
              alt="Profile Avatar"
              className="rounded-full md:rounded-3xl"
              src={profile?.avatarUrl}
              width={220}
              height={220}
            />
          </div>
          
          {/* Divider - показывается только на десктопе */}
          <div className="hidden md:flex md:items-stretch">
            <Divider 
              orientation="vertical" 
              className="h-full min-h-[220px]"
            />
          </div>
          
          {/* Divider для мобильных */}
          <Divider 
            orientation="horizontal" 
            className="block md:hidden"
          />
          
          {/* Информация о профиле */}
          <div className="flex-1 flex flex-col p-0 md:p-5">
            <h2 className="font-semibold text-xl md:text-2xl  text-center md:text-left">
              {profile?.name}
            </h2>
            <p className="text-default-600 opacity-55 text-center md:text-left text-md">
              {profile?.email}
            </p>
            <div className="pt-9 flex-col gap-4">
              <p className="flex items-center gap-2"><MdOutlinePhoneEnabled/> {profile?.phone}</p>
              <p className="flex items-center gap-2"><MdOutlineDescription/> <span className="text-default-300">Description</span></p>
            </div>
            
          </div>

        </div>
      </Layout>
    </Meta>
  );
};

export default MyOrders;

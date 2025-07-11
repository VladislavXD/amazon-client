"use client";
import { Button, Divider, Image } from "@nextui-org/react";

import { NextPage } from "next";
import React from "react";
import { MdOutlinePhoneEnabled } from "react-icons/md";
import { MdOutlineDescription } from "react-icons/md";
import Heading from "../../components/Heading";
import { useProfile } from "@/src/hooks/useProfile";
import ProfileDropdown from "./profileDropdown";
import { useDisclosure } from "@heroui/react";
import ProfileModal from "./profileModal";
import ImageInput from "./ImageInput";



const Profile: NextPage = () => {
  const { profile } = useProfile();
  const {isOpen, onOpen, onOpenChange} = useDisclosure();


  return (


       <>
        <Heading>
          <h1 className="text-4xl text-warning-800 font-bold p-5">Profile</h1>
        </Heading>
        {/* <section className="max-w-3xl mx-auto p-5 bg-foreground-100 h-56 rounded-2xl">
        
        </section> */}
         <div className="flex flex-col md:flex-row bg-[#171717] w-full max-w-4xl mx-auto p-6 md:p-9 rounded-2xl gap-6">
          {/* Аватарка */}  

          <div className="flex-shrink-0 mx-auto md:mx-0 md:flex">
          
            <ImageInput initialImage={profile?.avatarUrl}/>
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
              <p className="flex items-center gap-2"><MdOutlineDescription/> {profile?.description === undefined ? 'Write about yourself' : (<p className={profile?.description ? 'text-default-800' : 'text-default-300'}>{profile?.description}</p>)}</p>
            </div>
          </div>
            <ProfileModal isOpen={isOpen} onOpenChange={onOpenChange}/>
            <ProfileDropdown onOpen={onOpen}/>
            {/* <Button onPress={onOpen}>Open Modal</Button> */}
        </div></>


  );
};

export default Profile;

'use client';
import React, { FC, useContext, useState } from "react";


import Heading from "../../components/Heading";
import { useAuth } from "@/src/hooks/useAuth";
import { useActions } from "@/src/hooks/useActions";
import { SubmitHandler, useForm } from "react-hook-form";
import { IEmailPassword } from "@/src/store/user/user.interface";
import Field from "../../components/ui/input/field";

import authBg from "@/publick/images/black-background-texture-2.jpg";
import GoogleIcon from '@/publick/authGoogle.svg'
import authLogo from '@/publick/social.png'

import { ThemeContext } from "@/src/providers/theme-provider";
import { Button, Checkbox, Link } from "@nextui-org/react";
import { validEmail } from "./valid-email";
import useAuthRedirect from "./useAuthRedirect";
import { NextPage } from "next";
import { Spinner } from "@heroui/react";






const Auth: NextPage = () => {
  useAuthRedirect()
  const { isLoading } = useAuth();

  const { login, register } = useActions();

  const [type, setType] = useState<"login" | "register">("login");


  const {error} = useAuth()

  const {
    register: formRegister,
    handleSubmit,
    formState: {errors},
    reset,
    
  } = useForm<IEmailPassword>({
    mode: "onChange",
  });


  const onsubmit: SubmitHandler<IEmailPassword> = (data) => {
    try{
      if (type === "login"){
        login(data)
      }
      else {
        register(data)
      }
    }catch(err){
      console.log(err);
    }
    
    reset();
  };


  const {theme} = useContext(ThemeContext)
  return (
    <>

        <div className={`flex items-center justify-center h-screen ${theme} dark:text-white`}>
          <div
            className="flex flex-col items-center h-screen w-screen justify-center overflow-hidden bg-content1 p-2 sm:p-4 lg:p-8"
            style={{
              backgroundImage: `url(${authBg.src})`,
              backgroundSize: "cover",
              backgroundPosition: "center center",
            }}
          >
            <div className="flex flex-col items-center pb-2">
              <img src={authLogo.src} className="h-[60px] w-[60px]" alt="" />
              <p className="text-xl font-medium">Welcome</p>
              <p className="text-small text-default-500">Create your account to get started</p>
            </div>
            <div className="mt-2 flex w-full max-w-sm flex-col gap-4 rounded-large bg-content1 px-8 py-6 shadow-small">
              <Heading className="pb-2 text-xl font-medium dark:text-white">{type == 'login' ? 'Log In' : 'Sign Up'}</Heading>
              
              <form 
              action="" 
              className="flex flex-col gap-3"
              onSubmit={handleSubmit(onsubmit)}
              >
              
                <Field
                  {...formRegister("email", {
                    required: "Email is required",
                    pattern: {
                      value: validEmail,
                      message: 'Please enter a valid email address! '
                    }
                  })}
                  type="email"
                  placeholder="Email"
                  isClear={true}
                  error={errors.email?.message}
                />

                <Field 
                 {...formRegister("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: 'Min length should more 6 symbols!'
                  }
                  
                })}
                type="password"
                placeholder="Password"
                error={errors.password?.message}
                
                />

                <p className="text-[#920B3A] text-xs lowercase mr-2" >{error != '' ? String(error) : ''}</p>
                <div className="flex items-center justify-between px-1 py-2">
                  <Checkbox defaultSelected color="primary" size="sm" aria-label="Remember me">Remember me</Checkbox>
                  <Link href="#" size="md" className="text-default-400 hover:text-default-300 transition-all ease-in-out">Forgot password?</Link>
                </div>

                <Button color="primary" isLoading={isLoading} type="submit">
                  {type == 'login' ? 
                  'Log In' : 'Sign up'}
                  </Button>
              </form>
              <div className="flex items-center gap-4 py-2">
                <div className="bg-divider border-none w-full h-divider flex-1"></div>
                <p className="shrink-0 text-tiny text-default-500">OR</p>
                <div className="bg-divider border-none w-full h-divider flex-1"></div>
              </div>
              
              <div className="flex flex-col gap-2 text-center">
                <Button variant="bordered" ><img src={GoogleIcon.src} alt="" />Continue With Google</Button>
                <p className="text-xs ">Need to create an account?
                <Link onClick={()=> 
                {setType(type === 'login' ? 'register' : 'login')}} href="#">
                {type == 'login' ? 'Sign Up' : 'login'}</Link> </p> 
              </div>
              
            </div>
          </div>
        </div>

    </>
  );
};

export default Auth;

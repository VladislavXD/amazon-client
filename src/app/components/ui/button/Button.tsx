import { ButtonHTMLAttributes, FC, PropsWithChildren } from "react";

import on from 'clsx'


interface IButton extends ButtonHTMLAttributes<HTMLButtonElement>{
  variant: 'orange' | 'white' | 'dark'
}


const Button: FC<PropsWithChildren<IButton>> = ({
  children, className,variant, 
  ...rest })=> {
  return <button
  {...rest} 
  className={on('rounded-3xl  font-medium shadow-xl px-10 py-2',
  {'text-white bg-primary' : variant === 'orange',
    'text-primary bg-white' : variant === 'white',

  }, 
  className)}>{children}</button>
}

export default Button
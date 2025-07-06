import { FC, PropsWithChildren } from "react"
import cn from 'clsx'


interface IHeading {
  className?: string
}


const Heading:FC<PropsWithChildren<IHeading>> = ({className, children}) => {
  return <h1 className={cn('font-semibold sm:text-3xl text-2xl text-warning-900', className)}>{children}</h1>
} 


export default Heading
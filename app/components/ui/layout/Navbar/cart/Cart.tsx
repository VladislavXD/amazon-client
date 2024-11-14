import { useCart } from '@/app/hooks/useCart'
import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownSection, DropdownTrigger } from '@nextui-org/react'
import React, { useState } from 'react'
import { PiShoppingCartThin } from 'react-icons/pi'
import CartItem from './cart-Item/CartItem'

type Props = {}

const Cart = (props: Props) => {
  const {items} = useCart()
  const [isDpropdownOpen, setDpropdownOpen] = useState(true)


  return (
    <>
      <Dropdown closeOnSelect={false}  backdrop='blur'  className='relative '>
        <DropdownTrigger>
          <Button
          isIconOnly
          variant='light'

          startContent={
            <PiShoppingCartThin className="size-8" />
          }
          ></Button>
        </DropdownTrigger>
        <DropdownMenu  
          bottomContent={<div className='fixed z-10 h-12 bottom-0 w-full bg-[#1C1C1F] rounded-md left-0 flex items-center justify-center '>
          <p></p>
          <Button color='primary' variant='ghost'  >Place order</Button>
        </div>}   variant='faded'  aria-label='statick action' className='h-[336px] overflow-hidden overflow-y-scroll'>
            {
              items.length ? (
                items.map(item => <DropdownItem >
                  <CartItem item={item} />
                </DropdownItem>
                )
              ) 
              :
              (
                <DropdownItem>
                  <div>Cart is empty!</div>
                </DropdownItem>
              )
            }
          
        </DropdownMenu>
      </Dropdown>

    </>
  )
}

export default Cart
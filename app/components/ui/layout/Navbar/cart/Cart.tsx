import { useCart } from "@/app/hooks/useCart";
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownSection,
  DropdownTrigger,
} from "@nextui-org/react";
import React, { useState } from "react";
import { PiShoppingCartThin } from "react-icons/pi";
import CartItem from "./cart-Item/CartItem";

type Props = {};

const Cart = (props: Props) => {
  const { items } = useCart();
  const [isDpropdownOpen, setDpropdownOpen] = useState(true);



  const totalPrice = items.reduce((acc, item) => acc + item.price * item.quantity, 0);  


  return (
    <>
      <Dropdown
        closeOnSelect={false}
        backdrop="blur"
        placement="bottom-end"
        className="relative"
      >
        <DropdownTrigger>
          <Button
            isIconOnly
            variant="light"
            startContent={<PiShoppingCartThin className="size-8" />}
          ></Button>
        </DropdownTrigger>
        <DropdownMenu
          bottomContent={
            !!items.length && (
              <div className="sticky bottom-0 z-10  w-full bg-[#1C1C1F] rounded-md flex-col items-center justify-center mt-2">
                <p className="p-2">Total: <span className="font-bold text-default-500">${totalPrice}</span></p>
                <Button color="primary" variant="ghost" className="w-full">
                  Place order
                </Button>
              </div>
            )
          }
          variant="faded"
          aria-label="statick action"
          className="max-h-[336px] overflow-y-auto"
        >
          {items.length ? (
            items.map((item) => (
              <DropdownItem key={item.id} textValue="Cart Item">
                <CartItem key={item.id} item={item} />
              </DropdownItem>
            ))
          ) : (
            <DropdownItem key={"empty"} className="text-center">
              <div>Cart is empty!</div>
            </DropdownItem>
          )}
        </DropdownMenu>
      </Dropdown>
    </>
  );
};

export default Cart;

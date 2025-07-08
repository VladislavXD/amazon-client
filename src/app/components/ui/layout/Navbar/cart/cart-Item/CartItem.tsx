import { useActions } from "@/src/hooks/useActions";
import { useCart } from "@/src/hooks/useCart";
import { ICartItem } from "@/src/types/cart.interface";
import { Button, Card, CardHeader, Image } from "@nextui-org/react";
import Link from "next/link";
import React, { FC } from "react";
import { CiCircleRemove } from "react-icons/ci";



const CartItem: FC<{ item: ICartItem }> = ({ item }) => {
  const {removeFromCart} = useActions()
  const {items} = useCart()

  const currenElement = items.find(itemCart=> itemCart.id === item.id)

  return (
    
      <Card className=""  >
        <CardHeader className="flex gap-3 w-[280px] " >
          <Image
            alt="acrtImage"
            height={70}
            radius={"sm"}
            width={100}
            src={`${item.product.images}`}
          />
          <div className="flex gap-2 relative  items-center w-full">
            <div className="flex flex-col ">
              <p className="text-sm w-28 max-w-full overflow-ellipsis whitespace-nowrap overflow-hidden">{item.product.name}</p>
              <p className="text-small text-default-500 w-28 max-w-full overflow-ellipsis whitespace-nowrap overflow-hidden">{item.product.slug}</p>
            </div>
            <Button 
            variant="light"  
            isIconOnly  
            color="danger"
            className="absolute right-0 text-lg"
            startContent={
              <CiCircleRemove />
            }
            onClick={()=> currenElement && removeFromCart({id: currenElement.id})}
            
            >
            
             
            </Button>
          </div>
        </CardHeader>
      </Card>
    
  );
};

export default CartItem;

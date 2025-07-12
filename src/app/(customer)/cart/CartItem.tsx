"use client";
import { useActions } from "@/src/hooks/useActions";
import { ICartItem } from "@/src/types/cart.interface";
import { Button, Card, CardBody, Image } from "@nextui-org/react";
import Link from "next/link";
import { FC } from "react";
import { FiMinus, FiPlus, FiTrash2 } from "react-icons/fi";
import { convertPrice } from "../../utils/ConvertPrice";

interface CartItemProps {
  item: ICartItem;
}

const CartItem: FC<CartItemProps> = ({ item }) => {
  const { removeFromCart, changeQuantity } = useActions();

  return (
    <Card className="p-2 xs:p-3 sm:p-4">
      <CardBody className="p-0">
        <div className="flex gap-2 xs:gap-3 sm:gap-4">
          {/* Изображение товара */}
          <div className="flex-shrink-0 h-auto">
            <Link href={`/product/${item.product.slug}`}>
              <Image
                src={item.product.images[0] || "/placeholder.jpg"}
                alt={item.product.name}
                className="w-12 h-12 xs:w-14 xs:h-14 sm:w-20 sm:h-20 object-cover rounded-lg cursor-pointer"
                fallbackSrc="/placeholder.jpg"
              />
            </Link>
          </div>

          {/* Информация о товаре */}
          <div className="flex-1 min-w-0">
            <div className="flex justify-between items-start gap-1">
              <div className="flex-1 min-w-0 pr-1">
                <Link href={`/product/${item.product.slug}`}>
                  <h4 className="font-semibold text-xs xs:text-sm sm:text-lg hover:text-primary cursor-pointer line-clamp-2 leading-tight">
                    {item.product.name}
                  </h4>
                </Link>
                <p className="text-gray-600 text-[10px] xs:text-xs sm:text-sm mt-0.5 xs:mt-1">
                  {item.product.category?.name}
                </p>
                <p className="text-sm xs:text-base sm:text-lg font-bold text-primary mt-1 xs:mt-1 sm:mt-2">
                  {convertPrice(item.price)}
                </p>
              </div>

              {/* Кнопка удаления */}
              <Button
                isIconOnly
                variant="light"
                color="danger"
                size="sm"
                onClick={() => removeFromCart({ id: item.id })}
                className="min-w-6 w-6 h-6 xs:min-w-8 xs:w-8 xs:h-8 p-0"
              >
                <FiTrash2 className="text-xs xs:text-sm sm:text-base" />
              </Button>
            </div>

            {/* Количество */}
            <div className="flex items-center justify-between mt-2 xs:mt-3 sm:mt-4">
              <div className="flex items-center gap-1 xs:gap-2">
                <Button
                  isIconOnly
                  size="sm"
                  variant="bordered"
                  onClick={() => changeQuantity({ type: 'minus', id: item.id })}
                  isDisabled={item.quantity <= 1}
                  className="min-w-6 w-6 h-6 xs:min-w-7 xs:w-7 xs:h-7 p-0"
                >
                  <FiMinus className="text-xs" />
                </Button>
                
                <div className="px-1.5 xs:px-2 sm:px-3 py-0.5 xs:py-1 bg-gray-100 rounded-md min-w-6 xs:min-w-8 sm:min-w-12 text-center text-xs xs:text-sm sm:text-base">
                  {item.quantity}
                </div>
                
                <Button
                  isIconOnly
                  size="sm"
                  variant="bordered"
                  onClick={() => changeQuantity({ type: 'plus', id: item.id })}
                  className="min-w-6 w-6 h-6 xs:min-w-7 xs:w-7 xs:h-7 p-0"
                >
                  <FiPlus className="text-xs" />
                </Button>
              </div>
              
              <span className="text-[10px] xs:text-xs sm:text-sm text-gray-600 font-medium ml-1">
                = {convertPrice(item.price * item.quantity)}
              </span>
            </div>
          </div>
        </div>
      </CardBody>
    </Card>
  );
};

export default CartItem;
"use client";
import Heading from "../../components/Heading";
import React, { useState } from "react";
import { NextPage } from "next";
import { useCart } from "@/src/hooks/useCart";
import { Card, CardBody, CardHeader, Button, Divider, Input, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure } from "@nextui-org/react";
import { convertPrice } from "../../utils/ConvertPrice";
import CartItem from "./CartItem";
import { FiShoppingCart } from "react-icons/fi";
import { Link } from "@heroui/react";


const MyCart: NextPage = () => {
  const { items } = useCart();
  const {isOpen, onOpen, onOpenChange} = useDisclosure();

  // Рассчитываем общие значения
  const subtotal = items.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const shipping = subtotal > 500 ? 0 : 50; // Бесплатная доставка от $500
  const tax = subtotal * 0.1; // 10% налог
  const finalTotal = subtotal + shipping + tax;

  return (
    <>
      <Heading>
        <h1 className="text-xl sm:text-2xl font-bold p-3 sm:p-5">My Cart</h1>
      </Heading>
      
      <section className="w-full max-w-7xl mx-auto px-1 xs:px-2 sm:px-4 py-2 sm:py-4">
        {/* Мобильная версия */}
        <div className="block lg:hidden">
          <div className="space-y-2 xs:space-y-4">
            {/* Товары в корзине */}
            <Card className="p-1 xs:p-2 sm:p-4">
              <CardHeader className="pb-1 xs:pb-2">
                <h2 className="text-sm xs:text-lg sm:text-xl font-semibold">
                  Items in Cart ({items.length})
                </h2>
              </CardHeader>
              <CardBody className="pt-0">
                {items.length === 0 ? (
                  <div className="text-center py-4 xs:py-8">
                    <FiShoppingCart className="mx-auto text-2xl xs:text-4xl text-gray-400 mb-2 xs:mb-4" />
                    <p className="text-gray-500 text-sm xs:text-base sm:text-lg">Your cart is empty</p>
                    <Link href="/">
                      <Button 
                        color="primary" 
                        variant="solid"
                        className="mt-2 xs:mt-4"
                        size="sm"
                      >
                        Continue Shopping
                      </Button>
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-2 xs:space-y-3">
                    {items.map((item) => (
                      <CartItem key={item.id} item={item} />
                    ))}
                  </div>
                )}
              </CardBody>
            </Card>

            {/* Фиксированная нижняя панель на мобильных */}
            {items.length > 0 && (
              <div className="fixed bottom-0 left-0 right-0 bg-[#171717]  shadow-lg p-2 xs:p-4 z-50">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs xs:text-sm text-gray-600">Total:</p>
                    <p className="text-sm xs:text-lg font-bold">{convertPrice(finalTotal)}</p>
                  </div>
                  <Button
                    color="primary"
                    size="sm"
                    onPress={onOpen}
                    className="px-3 xs:px-6"
                  >
                    <span className="text-xs xs:text-sm">Place Order</span>
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Десктопная версия */}
        <div className="hidden lg:grid lg:grid-cols-3 gap-8">
          {/* Левый блок - Товары в корзине */}
          <div className="lg:col-span-2">
            <Card className="p-4">
              <CardHeader>
                <h2 className="text-xl font-semibold">
                  Items in Cart ({items.length})
                </h2>
              </CardHeader>
              <CardBody>
                {items.length === 0 ? (
                  <div className="text-center py-8">
                    <FiShoppingCart className="mx-auto text-6xl text-gray-400 mb-4" />
                    <p className="text-gray-500 text-lg">Your cart is empty</p>
                    <Link href="/">
                      <Button 
                        color="primary" 
                        variant="solid"
                        className="mt-4"
                      >
                        Continue Shopping
                      </Button>
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {items.map((item) => (
                      <CartItem key={item.id} item={item} />
                    ))}
                  </div>
                )}
              </CardBody>
            </Card>
          </div>

          {/* Правый блок - Оформление заказа (фиксированный) */}
          <div className="lg:col-span-1">
            <div className="sticky top-10">
              <Card className="p-4">
                <CardHeader>
                  <h3 className="text-lg font-semibold">Order Summary</h3>
                </CardHeader>
                <CardBody className="space-y-4">
                  {/* Промокод */}
                  <div>
                    <Input
                      placeholder="Promocode"
                      variant="bordered"
                      size="sm"
                      endContent={
                        <Button size="sm" variant="light">
                          Apply
                        </Button>
                      }
                    />
                  </div>

                  <Divider />

                  {/* Детали заказа */}
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Subtotal:</span>
                      <span className="font-medium">{convertPrice(subtotal)}</span>
                    </div>
                    
                    <div className="flex justify-between">
                      <span className="text-gray-600">Shipping:</span>
                      <span className="font-medium">
                        {shipping === 0 ? (
                          <span className="text-green-600">Free</span>
                        ) : (
                          convertPrice(shipping)
                        )}
                      </span>
                    </div>
                    
                    <div className="flex justify-between">
                      <span className="text-gray-600">Tax:</span>
                      <span className="font-medium">{convertPrice(tax)}</span>
                    </div>

                    <Divider />

                    <div className="flex justify-between text-lg font-bold">
                      <span>Total:</span>
                      <span>{convertPrice(finalTotal)}</span>
                    </div>
                  </div>

                  {/* Кнопка оформления */}
                  <Button
                    color="primary"
                    size="lg"
                    className="w-full"
                    isDisabled={items.length === 0}
                  >
                    Place Order
                  </Button>

                  {/* Дополнительная информация */}
                  <div className="text-xs text-gray-500 space-y-1">
                    <p>✅ Secure Payment</p>
                    <p>✅ Free Shipping over $500</p>
                    <p>✅ 30-day Returns</p>
                  </div>
                </CardBody>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Модальное окно для оформления заказа на мобильных */}
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="full" scrollBehavior="inside">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                <h3 className="text-lg font-semibold">Order Summary</h3>
              </ModalHeader>
              <ModalBody>
                <div className="space-y-4">
                  {/* Промокод */}
                  <div>
                    <Input
                      placeholder="Promocode"
                      variant="bordered"
                      endContent={
                        <Button size="sm" variant="light">
                          Apply
                        </Button>
                      }
                    />
                  </div>

                  <Divider />

                  {/* Детали заказа */}
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Subtotal:</span>
                      <span className="font-medium">{convertPrice(subtotal)}</span>
                    </div>
                    
                    <div className="flex justify-between">
                      <span className="text-gray-600">Shipping:</span>
                      <span className="font-medium">
                        {shipping === 0 ? (
                          <span className="text-green-600">Free</span>
                        ) : (
                          convertPrice(shipping)
                        )}
                      </span>
                    </div>
                    
                    <div className="flex justify-between">
                      <span className="text-gray-600">Tax:</span>
                      <span className="font-medium">{convertPrice(tax)}</span>
                    </div>

                    <Divider />

                    <div className="flex justify-between text-lg font-bold">
                      <span>Total:</span>
                      <span>{convertPrice(finalTotal)}</span>
                    </div>
                  </div>

                  {/* Дополнительная информация */}
                  <div className="text-sm text-gray-500 space-y-2 mt-6">
                    <p>✅ Secure Payment</p>
                    <p>✅ Free Shipping over $500</p>
                    <p>✅ 30-day Returns</p>
                  </div>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Cancel
                </Button>
                <Button color="primary" onPress={onClose}>
                  Place Order
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>

      {/* Добавляем отступ снизу для мобильных устройств */}
      {items.length > 0 && (
        <div className="h-20 lg:h-0" />
      )}
    </>
  );
};

export default MyCart;
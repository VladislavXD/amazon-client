import Heading from "@/app/components/Heading";
import Layout from "@/app/components/ui/layout/Layout";
import Meta from "@/app/components/ui/Meta";
import { OrdersService } from "@/app/services/order.service";
import {
  Chip,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import { useQuery } from "@tanstack/react-query";
import { NextPage } from "next";
import React from "react";

type Props = {};

const MyOrders: NextPage = () => {
  const { data: orders, isLoading } = useQuery({
    queryKey: ["my-orders"],
    queryFn: async () => await OrdersService.getAll(),
    select: ({ data }) => data,
    staleTime: 500,
  });

  const statusColorMap: Record<string, "default" | "primary" | "secondary" | "success" | "warning" | "danger"> = {
    PAYED: "success",
    paused: "danger",
    PENDING: "warning",
    SHIPPED: "primary",
    DELIVERED: "success",
  };

  console.log("Orders:", orders);
  return (
    <Meta title="My Orders">
      <Layout>
        <Heading>
          <h1 className="text-2xl font-bold p-5">My Orders</h1>
        </Heading>
        <section>
          <Table aria-label="Example empty table" selectionMode="single">
            <TableHeader>
              <TableColumn>Order</TableColumn>
              <TableColumn>Date</TableColumn>
              <TableColumn>Total</TableColumn>
              <TableColumn>STATUS</TableColumn>
            </TableHeader>
            <TableBody emptyContent={"You have no orders yet."}>
              {(orders ?? []).map((order) => {
                return (
                  <TableRow key={order.id}>
                    <TableCell>{order.id}</TableCell>
                    <TableCell>
                      {new Date(order.createdAt).toLocaleDateString()}
                    </TableCell>
                    <TableCell>${order.total}</TableCell>
                    <TableCell>
                      <Chip
                        className="capitalize"
                        color={`${statusColorMap[order.status]}` || "default"}
                        size="sm"
                        variant="flat"
                      >
                      {order.status}
                      </Chip>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </section>
      </Layout>
    </Meta>
  );
};

export default MyOrders
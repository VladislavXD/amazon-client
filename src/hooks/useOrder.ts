import { useQuery } from "@tanstack/react-query";
import { useAuth } from "./useAuth";
import { OrdersService } from "../services/order.service";

export const useOrders = () => {

  const {user} = useAuth()

    const { data: orders } = useQuery({
      queryKey: ["my-orders"],
      queryFn: async () => await OrdersService.getAll(),
      select: ({ data }) => data,
      staleTime: 500,
      enabled: !!user,
    });
  
  return { orders }
}

import { api } from "@/lib/axios";

export interface GetOrdersResponse {
  orders: {
    orderId: string;
    createdAt: Date;
    status: "pending" | "canceled" | "processing" | "delivering" | "delivered";
    customerName: string;
    total: number;
  }[];
  meta: {
    pageIndex: number;
    perPage: number;
    totalCount: number;
  };
}

export async function getOrders() {
  const response = await api.get<GetOrdersResponse>("orders", {
    params: {
      //parametros de filtros e paginação
      pageIndex: 0,
    },
  });

  return response.data;
}

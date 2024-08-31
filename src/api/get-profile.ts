import { api } from "@/lib/axios";

export interface GetInterfaceResponse {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  role: "manager" | "customer";
  createdAt: Date | null;
  updatedAt: Date | null;
}

export async function getProfile() {
  const response = await api.get<GetInterfaceResponse>("/me");

  return response.data;
}

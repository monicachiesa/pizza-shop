import { api } from "@/lib/axios";

export interface CreateClientBody {
  name: string;
  email: string | null;
  phone: string | null;
  address: string | null;
}

export async function createClient({ name, email, phone, address }: CreateClientBody) {
  await api.post("/clients", { name, email, phone, address });
}

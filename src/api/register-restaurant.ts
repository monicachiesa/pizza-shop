import { api } from "@/lib/axios";

export interface registerRestaurantBody {
  email: string;
  restaurantName: string;
  phone: string;
  managerName: string;
}

//função que encapsula o axiios e recebe o e-mail do usuário.
//Não tem retorno do back end
export async function registerRestaurant({ email, restaurantName, phone, managerName }: registerRestaurantBody) {
  await api.post("/restaurants", { email, restaurantName, phone, managerName });
}

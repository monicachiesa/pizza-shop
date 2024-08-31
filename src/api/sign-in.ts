import { api } from "@/lib/axios";

export interface SignInBody {
  email: string;
}

//função que encapsula o axiios e recebe o e-mail do usuário.
//Não tem retorno do back end
export async function signIn({ email }: SignInBody) {
  await api.post("/authenticate", { email });
}

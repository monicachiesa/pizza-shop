import { Header } from "@/components/header";
import { api } from "@/lib/axios";
import { isAxiosError } from "axios";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

export function AppLayout() {
  const navigate = useNavigate();

  useEffect(() => {
    //intercepta todas as chamadas do axios
    const interceptorId = api.interceptors.response.use(
      (response) => response,
      (error) => {
        if (isAxiosError(error)) {
          const status = error.response?.status; //pega o status do retorno
          const code = error.response?.data.code; //pega o código do retorno

          //se o usuário não estiver logado, joga para a tela de login
          if (status == 401 && code === "UNAUTHORIZED") {
            navigate("signIn", { replace: true });
          }
        }
      },
    );

    return () => {
      //limpa o interceptor quando o componente desmonta
      api.interceptors.response.eject(interceptorId);
    }
  }, [navigate]);

  return (
    <div className="flex min-h-screen flex-col antialiased">
      <Header />

      <div className="flex flex-1 flex-col gap-4 p-8 pt-6">
        <Outlet />
      </div>
    </div>
  );
}

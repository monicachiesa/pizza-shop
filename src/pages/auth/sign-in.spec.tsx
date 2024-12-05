import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { SignIn } from "./sign-in";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/lib/react-query";
import { HelmetProvider } from "react-helmet-async";

describe("SignIn", () => {
  //checa se quando acessa a página de login caso na url já tenha algum e-mail
  it("should set default email input value if email is present on search params", () => {
    const wrapper = render(<SignIn />, {
      wrapper: ({ children }) => {
        return (
          //se precisar usar algum componente da react router dom, precisa necessariamente
          //utilizar esse router ao redor do elemento, senão não vai funcionar
          <HelmetProvider>
            <MemoryRouter
              initialEntries={[
                "/sign-in?email=monica.chiesa@universo.univates.br",
              ]}
            >
              <QueryClientProvider client={queryClient}>
                {children}
              </QueryClientProvider>
            </MemoryRouter>
          </HelmetProvider>
        );
      },
    });

    
  });
});

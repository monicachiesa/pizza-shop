import { render } from "@testing-library/react";
import { Pagination } from "../pagination";
import { userEvent } from "@testing-library/user-event";

//função sem nenhum tipo de comportamento
const onPageChangeCallback = vi.fn();

describe("Pagination", () => {
  //limpa as chamadas entre os testes
  beforeEach(() => {
    onPageChangeCallback.mockClear();
  });

  it("should display the right amount of pages and results", () => {
    const wrapper = render(
      <Pagination
        pageIndex={0}
        totalCount={200}
        perPage={10}
        onPageChange={() => {}}
      />,
    );

    expect(wrapper.getByText("Página 1 de 20")).toBeInTheDocument();
    expect(wrapper.getByText("Total de 200 itens")).toBeInTheDocument();
  });

  //deve pemitir navegar para a próxima página
  const user = userEvent.setup();

  it("should be able to navigate to the next page", async () => {
    const wrapper = render(
      <Pagination
        pageIndex={0}
        totalCount={200}
        perPage={10}
        onPageChange={onPageChangeCallback}
      />,
    );

    //busca um elemento pelo "cargo" dele
    const nextPageButton = wrapper.getByRole("button", {
      name: "Próxima página", //procura pelo botão de próxima página
    });

    //usa a lib @testing-library/user-event
    //simula o clique do botão
    await user.click(nextPageButton); //clica no botão

    expect(onPageChangeCallback).toHaveBeenCalledWith(1);
  });

  //testa a navegação para a página anterior
  it("should be able to navigate to the previus page", async () => {
    const wrapper = render(
      <Pagination
        pageIndex={5}
        totalCount={200}
        perPage={10}
        onPageChange={onPageChangeCallback}
      />,
    );

    //busca um elemento pelo "cargo" dele
    const nextPageButton = wrapper.getByRole("button", {
      name: "Página anterior", //procura pelo botão de próxima página
    });

    //usa a lib @testing-library/user-event
    //simula o clique do botão
    await user.click(nextPageButton); //clica no botão

    expect(onPageChangeCallback).toHaveBeenCalledWith(4);
  });

  //testa a navegação para a primeira página
  it("should be able to navigate to the first page", async () => {
    const wrapper = render(
      <Pagination
        pageIndex={5}
        totalCount={200}
        perPage={10}
        onPageChange={onPageChangeCallback}
      />,
    );

    //busca um elemento pelo "cargo" dele
    const nextPageButton = wrapper.getByRole("button", {
      name: "Primeira página", //procura pelo botão de próxima página
    });

    //usa a lib @testing-library/user-event
    //simula o clique do botão
    await user.click(nextPageButton); //clica no botão

    expect(onPageChangeCallback).toHaveBeenCalledWith(0);
  });

  //testa a navegação para a última página
  it("should be able to navigate to the last page", async () => {
    const wrapper = render(
      <Pagination
        pageIndex={0}
        totalCount={200}
        perPage={10}
        onPageChange={onPageChangeCallback}
      />,
    );

    //busca um elemento pelo "cargo" dele
    const nextPageButton = wrapper.getByRole("button", {
      name: "Última página", //procura pelo botão de próxima página
    });

    //usa a lib @testing-library/user-event
    //simula o clique do botão
    await user.click(nextPageButton); //clica no botão

    expect(onPageChangeCallback).toHaveBeenCalledWith(19);
  });
});

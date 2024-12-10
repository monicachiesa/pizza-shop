import { test, expect } from "@playwright/test";

test("Cadastrar um restaurante", async ({ page }) => {
  await page.goto("/signUp", { waitUntil: "networkidle" }); //vai até a página de login e espera carregar tudo

  //o fill preenche o campo
  await page.getByLabel('Nome do estabelecimento').fill('Pizza Shop')

  await page.getByLabel('Seu nome').fill('John Doe')

  await page.getByLabel('Seu e-mail').fill('johndoe@example.com.br')

  await page.getByLabel('Seu celular').fill('123812641264')

  await page.getByRole('button', { name: 'Finalizar cadastro' }).click();

  const toast = page.getByText('Restaurante cadastrado com sucesso!')

  expect(toast).toBeVisible(); //verifica se o toast está visível
});

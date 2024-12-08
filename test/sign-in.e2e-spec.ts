import { test, expect } from "@playwright/test";

test("Fazer login no sistema", async ({ page }) => {
  await page.goto("/signIn", { waitUntil: "networkidle" }); //vai até a página de login e espera carregar tudo

  await page
    .getByLabel("Seu e-mail")
    .fill("monica.chiesa@universo.univates.br");
  await page.getByRole("button", { name: "Acessar painel" }).click();

  const toast = page.getByText(
    "Enviamos um link de autenticação para seu e-mail",
  );

  expect(toast).toBeVisible();
  //procura pelo toast
});

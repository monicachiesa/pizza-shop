export function aplicarMascaraTelefone(numero: string) {
    // Remove qualquer caractere que não seja número
    const somenteNumeros = numero.replace(/\D/g, "");

    // Aplica a máscara com base no tamanho do número
    if (somenteNumeros.length <= 10) {
        // Formato (XX) XXXX-XXXX
        return somenteNumeros.replace(/(\d{2})(\d{4})(\d{0,4})/, "($1) $2-$3").trim();
    } else {
        // Formato (XX) XXXXX-XXXX
        return somenteNumeros.replace(/(\d{2})(\d{5})(\d{0,4})/, "($1) $2-$3").trim();
    }
}

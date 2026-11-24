export function converterMoedaParaNumero(texto: string): number {
  const valorNormalizado = texto
    .replace(/[^\d,-]/g, "")
    .replace(/\./g, "")
    .replace(",", ".");

  const valor = Number(valorNormalizado);

  if (!Number.isFinite(valor)) {
    throw new Error(`Valor monetário inválido: ${texto}`);
  }

  return valor;
}

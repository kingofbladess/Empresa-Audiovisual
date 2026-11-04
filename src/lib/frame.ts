/** Número estable a partir de un texto (para variar los fotogramas provisionales). */
export function hash(text: string) {
  let h = 0;
  for (let i = 0; i < text.length; i++) h = (h * 31 + text.charCodeAt(i)) | 0;
  return Math.abs(h);
}

export const formatDate = (iso: string) =>
  new Date(iso + "T12:00:00").toLocaleDateString("es-VE", { day: "numeric", month: "long", year: "numeric" });

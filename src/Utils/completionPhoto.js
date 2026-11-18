// Redimensiona o comprovante para não ocupar vários MB no JSON local.
export async function prepareCompletionPhoto(file) {
  if (!file || !['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) throw Error('Escolha uma foto JPG, PNG ou WebP. Se o iPhone usar HEIC, selecione uma foto compatível ou capture pela câmera.');
  if (file.size > 15 * 1024 * 1024) throw Error('Escolha uma foto de até 15 MB.');
  const url = URL.createObjectURL(file);
  try {
    const image = new Image();
    await new Promise((resolve, reject) => { image.onload = resolve; image.onerror = () => reject(Error('Não foi possível ler a foto.')); image.src = url; });
    const ratio = Math.min(1, 1000 / Math.max(image.naturalWidth, image.naturalHeight));
    const canvas = document.createElement('canvas');
    canvas.width = Math.max(1, Math.round(image.naturalWidth * ratio)); canvas.height = Math.max(1, Math.round(image.naturalHeight * ratio));
    const context = canvas.getContext('2d');
    if (!context) throw Error('Não foi possível preparar a foto.');
    context.fillStyle = '#fff'; context.fillRect(0, 0, canvas.width, canvas.height); context.drawImage(image, 0, 0, canvas.width, canvas.height);
    for (const quality of [0.75, 0.55, 0.35]) {
      const result = canvas.toDataURL('image/jpeg', quality);
      if (result.length < 300000) return result;
    }
    throw Error('Esta foto ainda está muito grande. Escolha uma imagem mais simples.');
  } finally { URL.revokeObjectURL(url); }
}

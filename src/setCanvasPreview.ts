import { PixelCrop } from 'react-image-crop';

const setCanvasPreview = (
  image: HTMLImageElement, 
  canvas: HTMLCanvasElement, 
  crop: PixelCrop 
) => {
  // Obtém o contexto 2D do canvas
  const ctx = canvas.getContext("2d");
  if (!ctx) {
    throw new Error("No 2d context");
  }

  /* 
    O devicePixelRatio aumenta ligeiramente a nitidez em dispositivos retina,
    às custas de tempos de renderização um pouco mais lentos e da necessidade de
    redimensionar a imagem de volta se você quiser fazer download/upload e manter
    o tamanho natural original da imagem. 
  */
  const pixelRatio = window.devicePixelRatio;
  const scaleX = image.naturalWidth / image.width;
  const scaleY = image.naturalHeight / image.height;

  // Redefine as dimensões do canvas considerando o recorte e o devicePixelRatio
  canvas.width = Math.floor(crop.width * scaleX * pixelRatio);
  canvas.height = Math.floor(crop.height * scaleY * pixelRatio);

  // Aplica o dispositivo de pixel (retina) ao contexto
  ctx.scale(pixelRatio, pixelRatio);
  // Configura a qualidade de suavização da imagem
  ctx.imageSmoothingQuality = "high";
  // Salva o estado do contexto
  ctx.save();

  // Calcula as coordenadas de início do recorte na imagem original
  const cropX = crop.x * scaleX;
  const cropY = crop.y * scaleY;

  // Move the crop origin to the canvas origin (0,0)
  ctx.translate(-cropX, -cropY);

  // Desenha a porção recortada da imagem no canvas
  ctx.drawImage(
    image,
    0,
    0,
    image.naturalWidth,
    image.naturalHeight,
    0,
    0,
    image.naturalWidth,
    image.naturalHeight
  );

  // Restaura o estado original do contexto
  ctx.restore();
};
export default setCanvasPreview;

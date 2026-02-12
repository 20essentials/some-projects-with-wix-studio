     images.forEach((img, i) => {
  const x = (i % this.atlasSize) * cellSize;
  const y = Math.floor(i / this.atlasSize) * cellSize;

  const imgAspect = img.width / img.height;
  const cellAspect = 1; // celda cuadrada
  let sx = 0, sy = 0, sWidth = img.width, sHeight = img.height;

  if (imgAspect > cellAspect) {
    // Más ancha → recortar horizontalmente
    sWidth = img.height * cellAspect;
    sx = (img.width - sWidth) / 2;
  } else {
    // Más alta → recortar verticalmente
    sHeight = img.width / cellAspect;
    sy = (img.height - sHeight) / 2;
  }

  ctx.drawImage(
    img,
    sx, sy, sWidth, sHeight, // parte de la imagen a tomar
    x, y, cellSize, cellSize // dónde y tamaño en el atlas
  );
});
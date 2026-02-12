images.forEach((img, i) => {
        const x = (i % this.atlasSize) * cellSize;
        const y = Math.floor(i / this.atlasSize) * cellSize;

        const imgAspect = img.width / img.height;
        let drawWidth = cellSize;
        let drawHeight = cellSize;
        let offsetX = 0;
        let offsetY = 0;

        if (imgAspect > 1) {
          drawHeight = cellSize / imgAspect;
          offsetY = (cellSize - drawHeight) / 2;
        } else {
          drawWidth = cellSize * imgAspect;
          offsetX = (cellSize - drawWidth) / 2;
        }

        ctx.drawImage(img, x + offsetX, y + offsetY, drawWidth, drawHeight);
      });
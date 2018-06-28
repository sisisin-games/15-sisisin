$(document).on('click', '.nyan', ({target}) => {
});

$(document).on('si:click', cell => {
});

jQuery(async $ => {
  const [, width, height] = (location.search.match(/\bsize=(\d+)x(\d+)/) || [, 4, 4]).map(Number);
  const imageWidth = 80;
  const imageHeight = 80;
  const table = [];
  const board = $('.board').css({
    width: `${width * imageWidth}px`,
    height: `${height * imageHeight}px`,
  });
  const sime = $('<div class="sime">').appendTo(board);

  for (let y = 0; y < height; y++) {
    const row = [];

    for (let x = 0; x < width ; x++) {
      const last = x + 1 === width && y + 1 === height;
      const nyan = $(`<div class="nyan" data-x="${x}" data-y="${y}">`)
        .toggleClass('last', last)
        .css({
          left: `${x * 100 / width}%`,
          top: `${y * 100 / height}%`,
          backgroundSize: `${imageWidth * width}px ${imageHeight * height}px`,
          backgroundPositionX: `-${imageWidth * x}px`,
          backgroundPositionY: `-${imageHeight * y}px`,
        })
        .appendTo(sime);

      row.push({
        x,
        y,
        nyan,
        last,
      });
    }

    table.push(row);
  }
});

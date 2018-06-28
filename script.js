$(document).on('click', '.nyan', ({target}) => {
  const nyan = $(target);
  const x = nyan.data('x');
  const y = nyan.data('y');
});

$(document).on('si:click', cell => {
});

jQuery(async $ => {
  const [, width, height] = (location.search.match(/\bsize=(\d+)x(\d+)/) || [, 4, 4]).map(Number);
  const imageWidth = 80;
  const imageHeight = 80;
  const board = $('.board').css({
    width: `${width * imageWidth}px`,
    height: `${height * imageHeight}px`,
  });
  const sime = $('<div class="sime">').appendTo(board);

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width ; x++) {
      const nyan = $(`<div class="nyan" data-x="${x}" data-y="${y}">`)
        .css({
          left: `${x * 100 / width}%`,
          top: `${y * 100 / height}%`,
          backgroundSize: `${imageWidth * width}px ${imageHeight * height}px`,
          backgroundPositionX: `-${imageWidth * x}px`,
          backgroundPositionY: `-${imageHeight * y}px`,
        })
        .toggleClass('blank', x + 1 === width && y + 1 === height)
        .data('x', x)
        .data('y', y)
        .appendTo(sime);
    }
  }
});

$(document).on('click', '.nyan:not(.blank)', ({target}) => {
  const nyan = $(target);
  const x = nyan.data('x');
  const y = nyan.data('y');
  const blank = $('.blank');
  const bx = blank.data('x');
  const by = blank.data('y');

  if (x !== bx && y !== by)
    return;

  const targets = [];

  for (let x1 = bx; bx < x ? x1 <= x : x <= x1; bx < x ? x1++ : x1--) {
    for (let y1 = by; by < y ? y1 <= y : y <= y1; by < y ? y1++ : y1--) {
      console.log(x1, y1);
    }
  }
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
      const nyan = $(`<div class="nyan">`)
        .toggleClass('blank', x === width - 1 && y === height - 1)
        .attr({
          'data-x0': x,
          'data-y0': y,
          'data-x': x,
          'data-y': y,
        })
        .css({
          left: `${x * 100 / width}%`,
          top: `${y * 100 / height}%`,
          backgroundSize: `${imageWidth * width}px ${imageHeight * height}px`,
          backgroundPositionX: `-${imageWidth * x}px`,
          backgroundPositionY: `-${imageHeight * y}px`,
        })
        .appendTo(sime);
    }
  }
});

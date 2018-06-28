$(document).on('click', '.nyan', ({target}) => {});

jQuery(async $ => {
  const [, width, height] = (location.search.match(/\bsize=(\d+)x(\d+)/) || [, 4, 4]).map(Number);
  const table = [];
  const board = $('.board').css({
    width: `${width * 80}px`,
    height: `${height * 80}px`,
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
          backgroundSize: `${80 * width}px ${80 * height}px`,
          backgroundPositionX: `-${80 * x}px`,
          backgroundPositionY: `-${80 * y}px`,
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

  board.removeClass('loading');
});

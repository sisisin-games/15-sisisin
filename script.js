$(document).on('click', '.nyan', ({target}) => {});

jQuery(async $ => {
  const [, width, height] = (location.search.match(/\bsize=(\d+)x(\d+)/) || [, 4, 4]).map(Number);
  const board = $('.board');
  const table = [];

  for (let y = 0; y < height; y++) {
    const row = [];

    for (let x = 0; x < width ; x++) {
      const nyan = $(`<div class="nyan" data-x="${x}" data-y="${y}">`).css({
        left: `${x / width}%`,
        top: `${y / height}%`,
        backgroundPositionX: ``,
        backgroundPositionY: ``,
      }).appendTo(board);

      row.push({
        x,
        y,
        nyan,
        last: x + 1 === width && y + 1 === height,
      });
    }

    table.push(row);
  }
});

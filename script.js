jQuery(async $ => {
  const [, width, height] = (location.search.match(/\bsize=(\d+)x(\d+)/) || [, 4, 4]).map(Number);
  const table = [];
  for (let y = 0; y < height; y++) {
    const row = [];
    table.push(row);
    for (let x = 0; x < width ; x++) {
      row.push();
    }
  }
  // const nyan = $(`<div class="nyan" data-x="${x}" data-y="${y}">`);
});

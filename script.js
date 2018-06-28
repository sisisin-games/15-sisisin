/* global Vue:false */
const [, sizeW, sizeH] = (location.search.match(/\bsize=(\d+)x(\d+)/) || [, 4, 4]).map(Number);

const app = new Vue({
  el: '.board',
  template: `
`,
  data: {
    sizeW,
    sizeH,
    width: 64,
    height: 64,
    blankX: sizeW - 1,
    blankY: sizeH - 1,
    nyans: [],
  },
  methods: {
    getStyle(nyan) {
      return {
        left: `${this.width * nyan.x}px`,
        top: `${this.height * nyan.y}px`,
        'background-size': `${this.width * sizeW}px ${this.height * sizeH}px`,
        'background-position': `-${this.width * nyan.x0}px -${this.height * nyan.y0}px`,
      };
    },
    check() {
      const w = this.sizeW;
      return this.nyans.every(({x, y}, i) => x === i % w && y === (i / w | 0));
    },
    click(nyan) {
      const {x, y} = nyan;
      const {blankX, blankY, nyans} = this;

      if (x === blankX) {
        for (const n of nyans) {
          if (n.x !== x)
            continue;

          if (y < blankY) {
            if (y <= n.y && n.y < blankY)
              n.y++;
          } else {
            if (blankY < n.y && n.y <= y)
              n.y--;
          }
        }
      } else if (y === blankY) {
        for (const n of nyans) {
          if (n.y !== y)
            continue;

          if (x < blankX) {
            if (x <= n.x && n.x < blankX)
              n.x++;
          } else {
            if (blankX < n.x && n.x <= x)
              n.x--;
          }
        }
      } else {
        return;
      }

      this.blankX = x;
      this.blankY = y;
      this.check();
    },
  },
});

app.$el.style.width = `${sizeW * app.width}px`;
app.$el.style.height = `${sizeH * app.height}px`;

for (let i = 0; i < sizeW * sizeH - 1; i++) {
  const x = i % sizeW;
  const y = i / sizeW | 0;
  app.nyans.push({x0: x, y0: y, x, y});
}

/* global Vue:false */

const app = new Vue({
  el: '#app',
  template: `
    <div class="board" :style="boardStyle()">
      <div class="sime">
        <div v-for="nyan in nyans" class="nyan" @click="click(nyan)" :style="nyanStyle(nyan)"></div>
      </div>
    </div>
  `,
  data: {
    sizeW: 0,
    sizeH: 0,
    width: 64,
    height: 64,
    blankX: 0,
    blankY: 0,
    nyans: [],
  },
  created() {
    const [, sizeW, sizeH] = (location.search.match(/\bsize=(\d+)x(\d+)/) || [, 4, 4]).map(Number);
    this.sizeW = sizeW;
    this.sizeH = sizeH;
    this.blankX = sizeW - 1;
    this.blankY = sizeH - 1;

    for (let i = 0; i < sizeW * sizeH - 1; i++) {
      const x = i % sizeW;
      const y = i / sizeW | 0;
      this.nyans.push({x0: x, y0: y, x, y});
    }
    for (let i = 0, x = this.blankX, y = this.blankY; i < sizeW * sizeH; i++) {
      const rx = Math.random() * this.sizeW
    }
  },
  methods: {
    boardStyle() {
      return {
        width: `${this.width * this.sizeW}px`,
        height: `${this.height * this.sizeH}px`,
      };
    },
    nyanStyle(nyan) {
      return {
        left: `${this.width * nyan.x}px`,
        top: `${this.height * nyan.y}px`,
        backgroundSize: `${this.width * this.sizeW}px ${this.height * this.sizeH}px`,
        backgroundPosition: `-${this.width * nyan.x0}px -${this.height * nyan.y0}px`,
      };
    },
    check() {
      const w = this.sizeW;
      return this.nyans.every(({x, y}, i) => x === i % w && y === (i / w | 0));
    },
    click(nyan) {
      const {x, y} = nyan;

      this.move(nyan);
      this.blankX = x;
      this.blankY = y;
      
      if (this.check())
        this.finish();
    },
    move(nyan) {
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
      }
    },
    finish() {
      alert('finish');
    },
  },
});

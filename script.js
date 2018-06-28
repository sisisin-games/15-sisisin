/* global Vue:false */

const app = new Vue({
  el: '#app',

  template: `
    <div class="board">
      <div class="sime" :style="simeStyle">
        <div v-for="nyan in nyans" class="nyan" @click="click(nyan)" :style="getNyanStyle(nyan)"></div>
      </div>
    </div>
  `,

  data: {
    finished: false,
    sizeW: 0,
    sizeH: 0,
    width: 80,
    height: 80,
    blankX: 0,
    blankY: 0,
    startedAt: 0,
    endedAt: 0,
    count: 0,
    nyans: [],
  },

  computed: {
    simeStyle() {
      return {
        width: `${this.width * this.sizeW}px`,
        height: `${this.height * this.sizeH}px`,
      };
    },
  },

  created() {
    const [, sizeW, sizeH] = (location.search.match(/\bsize=(?!1x1\b)(\d+)x(\d+)/) || [, 4, 4]).map(Number);
    this.sizeW = sizeW;
    this.sizeH = sizeH;
    this.blankX = sizeW - 1;
    this.blankY = sizeH - 1;

    // 初期化
    for (let i = 0; i < sizeW * sizeH - 1; i++) {
      const x = i % sizeW;
      const y = i / sizeW | 0;
      this.nyans.push({x0: x, y0: y, x, y});
    }

    // シャッフル
    do {
      for (let i = 0; i < sizeW * sizeH * 10; i++) {
        const {blankX, blankY, nyans} = this;
        const arr = nyans.filter(n => n.x === blankX && n.y !== blankY || n.y === blankY && n.x !== blankX);
        const nyan = arr[Math.random() * arr.length | 0];
        this.move(nyan);
      }
    } while (this.check());

    // 右下をあける
    for (let y = this.blankY; y < sizeH; y++) {
      const nyan = this.nyans.find(n => n.x === sizeW - 1 && n.y === y);
      if (nyan)
        this.move(nyan);
    }
  },

  mounted() {
    this.startedAt = Date.now();
  },

  methods: {
    getNyanStyle(nyan) {
      return {
        width: `${this.width}px`,
        height: `${this.height}px`,
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

    move(nyan) {
      const {x, y} = nyan;
      const {blankX, blankY, nyans} = this;

      if (x === blankX && y !== blankY) {
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
      } else if (y === blankY && x !== blankX) {
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
    },

    click(nyan) {
      if (this.finished)
        return;

      const {x, y} = nyan;

      this.move(nyan);
      this.count++;

      if (this.check())
        this.finish();
    },

    finish() {
      this.finished = true;
      this.endedAt = Date.now();
      const time = ((this.endedAt - this.startedAt) / 1000).toFixed(2);

      setTimeout(() => {
        alert(`クリア！\n操作数は ${this.count} 回\nタイムは ${time} 秒でした`);

        const {blankX: x, blankY: y} = this;
        this.nyans.push({x0: x, y0: y, x, y});
      }, 200);
    },
  },
});

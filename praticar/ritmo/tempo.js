(() => {
  const meters = {
    "2/4": { beats: 2, unit: "semínima" },
    "3/4": { beats: 3, unit: "semínima" },
    "4/4": { beats: 4, unit: "semínima" },
    "5/4": { beats: 5, unit: "semínima" },
    "6/8": { beats: 6, unit: "colcheia" },
    "7/8": { beats: 7, unit: "colcheia" },
  };

  class TapTempo {
    constructor() { this.reset(); }
    reset() { this.taps = []; return { bpm: null, count: 0 }; }
    tap(at) {
      if (!Number.isFinite(at)) return { bpm: null, count: this.taps.length };
      const previous = this.taps[this.taps.length - 1];
      if (previous === undefined || at <= previous || at - previous > 2500) this.taps = [at];
      else {
        this.taps.push(at);
        if (this.taps.length > 9) this.taps.shift();
      }
      const count = this.taps.length;
      const average = count > 1 ? (at - this.taps[0]) / (count - 1) : 0;
      return { bpm: average > 0 ? Math.round(60000 / average) : null, count };
    }
  }

  window.RHYTHM_CORE = { meters, TapTempo, minBpm: 30, maxBpm: 300 };
})();

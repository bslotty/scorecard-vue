import { ref, type Ref } from "vue";

export class Player {
  id    : string;
  name  : string;
  ledger: number[] = [];

  isLeader: boolean = false;
  turn: number = 0;
  currentScore: number = 0;

  constructor(name: string) {
    if (name.length <= 1) throw "Invalid name for Player";

    this.name = name;
    this.id = Math.round(Math.random() * 10000000) + "";
    return this;
  }

  private calcScore(index: number = -1): number {
    if (this.ledger.length == 0) return 0;
    if (index == 0) return this.ledger[0];
    if (index < 0) return this.ledger.reduce((a, b) => +a + +b);

    return this.ledger.filter((n, i) => i <= index).reduce((a, b) => +a + +b);
  }

  setOrder(n: number): Player {
    this.turn = n;
    return this;
  }

  getScores(): number[] {
    return this.ledger;
  }

  getScoreFrom(index: number): number {
    return this.calcScore(index);
  }

  setScores(a: number[]): Player {
    this.ledger = a;
    this.currentScore = this.calcScore();
    return this;
  }

  resetScores(): Player {
    this.setScores([]);
    return this;
  }

  addScore(n: number) {
    let list = this.getScores();
    if (list[0] == undefined) {
      list[0] = +n;
    } else {
      list.push(+n);
    }
    this.setScores(list);
  }

  updateScore(n: number, i: number) {
    let list = this.getScores();
    list[i] = +n;
    this.ledger = list;

    this.currentScore = this.calcScore();
  }

  removeScore(i: number) {
    let list = this.getScores();
    list.splice(i, 1);

    this.setScores(list);
  }

  getScore(i: number) {
    return this.ledger[i];
  }
}

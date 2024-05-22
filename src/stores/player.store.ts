import { ref } from "vue";
import { defineStore } from "pinia";
import { Player } from "@/models/Player";

export const usePlayerList = defineStore("playerList", () => {
  let players   = ref( parseJSON( localStorage.getItem("playerList")+"" ) );

  function sortList() {
    players.value = players.value.sort((a, b) => b.currentScore - a.currentScore);
  }

  function getList() {
    sortList();
    return players.value;
  }

  function clearPlayers() {
    players.value = [];
  }

  function restartMatch() {
    players.value.map((p) => p.resetScores());
  }

  function add(name: string) {
    players.value.push(new Player(name).setScores([0]));
  }

  function remove(player: Player) {
    players.value = players.value.filter((p) => p.id != player.id);
  }

  function parseJSON(strObj: string): Player[] {
    let obj = JSON.parse(strObj);
    if (obj == undefined)
      return [];

    let players = obj.map( (o:Player) => new Player(o.name).setScores(o.ledger) )

    return players;
  }

  return { getList, clearPlayers, restartMatch, add, remove };
});

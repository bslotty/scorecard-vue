import { ref } from "vue";
import { defineStore } from "pinia";
import { Player } from "@/models/Player";

export const usePlayerList = defineStore("playerList", () => {
  let players = ref([
    new Player("Player A").setScores([Math.round(Math.random() * 100), Math.round(Math.random() * 100), Math.round(Math.random() * 100), Math.round(Math.random() * 100)]),
    new Player("Player B").setScores([Math.round(Math.random() * 100), Math.round(Math.random() * 100), Math.round(Math.random() * 100), Math.round(Math.random() * 100)]),
    new Player("Player C").setScores([Math.round(Math.random() * 100), Math.round(Math.random() * 100), Math.round(Math.random() * 100), Math.round(Math.random() * 100)]),
    new Player("Player D").setScores([Math.round(Math.random() * 100), Math.round(Math.random() * 100), Math.round(Math.random() * 100), Math.round(Math.random() * 100)]),
    new Player("Player N").setScores([-333]),
  ]);

  function sortList() {
    players.value = players.value.sort((a, b) => b.currentScore - a.currentScore);
  }

  function getList(){
    sortList();
    return players.value
  }

  function clearPlayers() {
    players.value = []
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

  return { getList, clearPlayers, restartMatch, add, remove };
});

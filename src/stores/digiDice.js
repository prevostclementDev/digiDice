import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useDigidiceStore = defineStore('digidice', () => {
  const players = ref([]);
  let countPlayers = ref(2);
  const maxPlayers = 6;
  let gameStatus = ref('waiting') // waiting -> inprogress -> finish
  const loadData = JSON.parse(get());
  const metaData = JSON.parse(getSaveMetaData());

  if( loadData && ( Array.isArray(loadData) && loadData.length !== 0 ) ) {
    players.value = loadData;
    countPlayers.value = loadData.length;
  }

  if ( metaData ) {
    gameStatus.value = metaData.gameStatus
  }

  function increment(){
    if (countPlayers.value < maxPlayers) {
      countPlayers.value++;
      return true;
    }
    return false;
  }

  function addPlayer(pseudo) {
    players.value.push({
      pseudo:pseudo,
      scores:createScorePlayer()
    });
    save();
    saveMetaData();
  }

  function setStatus(status){
    gameStatus.value = status;
    saveMetaData();
  }

  function deletePlayer(index){
    players.value.splice(index,1);
    countPlayers.value--;
    save();
    saveMetaData();
  }

  function createScorePlayer(){
    return {
      '1':0,
      '2':0,
      '3':0,
      '4':0,
      '5':0,
      '6':0,
      'bln':0,
      'cr':0,
      'fll':0,
      'ps':0,
      'gs':0,
      'dgd':0,
      'c':0,
    }
  }

  function SymboleArray(){
    return [
      {name:'1',key:'1'},
      {name:'2',key:'2'},
      {name:'3',key:'3'},
      {name:'4',key:'4'},
      {name:'5',key:'5'},
      {name:'6',key:'6'},
      {name:'Brelan',key:'bln'},
      {name:'Square',key:'cr'},
      {name:'Full',key:'fll'},
      {name:'Small sequel',key:'ps'},
      {name:'Big sequel',key:'gs'},
      {name:'Digi\'Dice',key:'dgd'},
      {name:'Chance',key:'c'},
    ]
  }

  function updatePlayer(index,pseudo) {
    players.value[index] = pseudo;
    save();
  }

  function updateOrCreatePlayer(pseudo,index){
    if(!players[index]) {
      addPlayer(pseudo);
      return;
    }
    updatePlayer(index,pseudo);
  }

  function updateScorePlayer(index,type,value){
    players.value[index].scores[type] = parseInt(value);
    save();
  }

  function save(){
    window.localStorage.setItem('games',JSON.stringify(players.value));
  }

  function saveMetaData() {
    window.localStorage.setItem('metaGames',JSON.stringify({
      countPlayers:countPlayers.value,
      gameStatus:gameStatus.value
    }));
  }

  function get () {
    return window.localStorage.getItem('games');
  }

  function getSaveMetaData () {
    return window.localStorage.getItem('metaGames');
  }

  function reset(){
    players.value = [];
    countPlayers.value = 2;
    save();
  }

  function resetScorePlayer(){
    for ( let index in players.value ) {
      players.value[index].scores = createScorePlayer()
    }
    save();
  }

  function getWinner(){
    let winner = '';
    let higeshScore = 0;

    players.value.map(p=>{
      let total = 0;
      Object.keys(p.scores).map(k=>{
        total += p.scores[k];
      })

      if(total > higeshScore) {
        higeshScore = total;
        winner = p.pseudo;
      }

    })

    return [winner,higeshScore];
  }

  return { getWinner, setStatus, deletePlayer, reset, updateOrCreatePlayer, players, countPlayers, updateScorePlayer ,increment, SymboleArray, gameStatus, resetScorePlayer }
})

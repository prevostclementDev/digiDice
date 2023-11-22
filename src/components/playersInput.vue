<script setup>
import {onMounted, ref} from "vue";
import {useDigidiceStore} from "@/stores/digiDice";

const props = defineProps(['value','index']);
const digiDice = useDigidiceStore();
const input = ref(null);
const isValide = ref(true);

onMounted(()=>{
  input.value.focus();
})

function userUpdate () {
  if ( input.value.value !== '' ) {
    digiDice.updateOrCreatePlayer(input.value.value,props.index);
  } else {
    isValide.value = false;
  }
}

function deleteUser(){
  digiDice.deletePlayer(props.index);
}
</script>

<template>
  <li>
    <input :class="isValide ? '' : 'error'" @change="userUpdate()" ref="input" type="text" placeholder="Player name" :value="value">
    <button v-if="index > 1" @click="deleteUser()">
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path d="M2.31592 13.8913L8.21378 7.99345M8.21378 7.99345L14.1116 2.09558M8.21378 7.99345L2.31592 2.09558M8.21378 7.99345L14.1116 13.8913" stroke="#EB5B5A" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </button>
  </li>
</template>

<style scoped lang="scss">
li {
  margin: 10px 0;
  width: 70svw;
  display: flex;
  input {
    outline: none;
    border: 1px solid rgba(0, 0, 0, 0.40);
    padding: 8px;
    border-radius: 5px;
    width: 100%;
  }
  button {
    outline: none;
    background: transparent;
    border: none;
    width: 10%;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    margin: 0;
    padding: 0;
    svg {
      width: 20px;
      height: 20px;
    }
  }
}
</style>
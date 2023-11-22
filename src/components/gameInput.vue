<script setup>
import {onMounted, ref} from "vue";
import {useDigidiceStore} from "@/stores/digiDice";

const digidice = useDigidiceStore();
const props = defineProps(['score','symkey','index']);
const input = ref(null);

onMounted(()=>{
  input.value.focus();
})
function update(){
  digidice.updateScorePlayer(props.index,props.symkey,input.value.value);
}
</script>

<template>
  <td><input @change="update()" ref="input" type="number" :value="score" readonly></td>
</template>

<style scoped lang="scss">
  td {
    padding: 3px;
    input {
      width: 100%;
      height: 100%;
      background: none;
      border: none;
      outline: none;
      text-align: center;
      color: #191919;
      font-weight: 300;
      background: rgba(80, 214, 147, 0.05);
      border-radius: 5px;
      padding: 6px;
    }

  }
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  /* Firefox */
  input[type=number] {
    -moz-appearance: textfield;
  }
</style>

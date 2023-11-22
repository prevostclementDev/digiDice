import { defineStore } from 'pinia'
import {ref} from "vue";
import {useDigidiceStore} from "@/stores/digiDice";

export const useScoreStore = defineStore('scoreStore',()=>{
    const scoreBonus = {
        'h':{'f':{op:'/',value:2},'t':{op:'*',value:2}},
        'e':{'f':{op:'-',value:2},'t':{op:'+',value:2}},
        'm':{'f':{op:'-',value:4},'t':{op:'+',value:4}},
    };
    const multiplicator = {
        '/': function (a,b) { return a / b; },
        '+': function (a,b) { return a + b; },
        '-': function (a,b) { return a - b; },
        '*': function (a,b) { return a * b; }
    }
    let key = ref('');
    let index = ref('');
    let openFirstNumber = ref(false);
    let openTypeQuestion = ref(false);
    let openResponseQuestion = ref(false);

    let numberIn = ref(0);
    let typeOfQuestion = ref('null');

    const digidice = useDigidiceStore();

    function setKeyIndex(setKey,setIndex){
        key.value = setKey;
        index.value = setIndex;
    }

    function openFirstNumberModal() {
        window.scrollTo(0, 0);
        document.querySelector('body').style.overflow = 'hidden';
        openFirstNumber.value = true;
    }

    function setNumber(number) {
        numberIn.value = parseInt(number)
        openFirstNumber.value = false;

        if( number === '' ) {
            numberIn.value = 0;
        }

        if(numberIn.value === 0) {
            digidice.updateScorePlayer(index.value,key.value,numberIn.value);
            document.querySelector('body').style.overflow = 'auto';
        } else {
            openTypeQuestion.value = true;
        }

    }

    function setQuestionDifficulty(type) {
        typeOfQuestion.value = type;
        openTypeQuestion.value = false;
        openResponseQuestion.value = true;
    }

    function valid(bool) {
        let calculator = scoreBonus[typeOfQuestion.value][bool];
        digidice.updateScorePlayer(index.value,key.value,multiplicator[calculator.op](numberIn.value,calculator.value));
        openResponseQuestion.value = false;
        document.querySelector('body').style.overflow = 'auto';
    }

    return { openResponseQuestion, openFirstNumber,openTypeQuestion, setKeyIndex, openFirstNumberModal, setNumber , setQuestionDifficulty, valid };

})
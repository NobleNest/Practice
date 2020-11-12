<template>
    <div>
        <h2>Currency converter</h2>
        <span>Enter currency</span><input type="number" v-model = "currency"> <br>
        <span>Enter from</span>
        <select  v-model = "ValOld">
            <option v-for="item in arr" :value="item.buy" v-bind:key="item.ccy">{{ item.ccy }}</option>
        </select>
        <span>Enter to</span>
        <select v-model = "ValNew">
            <option v-for="item in arr" :value="item.buy"  v-bind:key="item.ccy">{{ item.ccy }}</option>
        </select>
        <button v-on:click="calculate()">Convert</button>
        <h3 v-if="converted">{{ Result | round }}</h3>
    </div>
</template>

<script>

import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'


export default {
    data: function(){
        return {
            currency:0,
            arr:[],
            Result: "",
            converted: true,
            ValOld: "",
            ValNew: ""
        };
    },
    mounted: function(){
        axios.get("https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5").then((response) =>{
            console.log(response.data);
            this.arr = response.data;
        })
    },
    methods: {
        calculate: function(){
            this.Result = this.ValOld / this.ValNew * this.currency
            console.log(this.Result)
        }
    },
    filters : {
        round : function(value) {
            return "Your new currency = " + (Math.round( value * 100 + Number.EPSILON ) / 100)
        }
    }
}
</script>

<style scoped>

</style>
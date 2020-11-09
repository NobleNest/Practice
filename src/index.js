import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'

new Vue({
    el: '#app',
    data: {
        search:"",
        students: [],
        stud: {id:"", name:"", group:"", mark:"", isDonePr:""},
        },
    mounted: function(){
        axios.get("http://46.101.212.195:3000/students").then((response) =>{
            console.log(response.data);
            this.students = response.data;
        })
    },
    methods: {
        deleteStudent: function(id){
            this.students = this.students.filter(elem => {
                return elem.id != id;
            });
        },
        add: function(){
            this.stud.id = this.students.length;
            this.students.push(JSON.parse(JSON.stringify(this.stud)));
        }
    }
});

new Vue({
    el: '#converter',
    data: {
        currency:0,
        arr:[],
        Result: "",
        converted: true,
        ValOld: "",
        ValNew: "",
    },
    mounted: function(){
        axios.get("https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5").then((response) =>{
            console.log(response.data);
            this.arr = response.data;
        })
    },
    methods: {
        calculate: function(){
            this.Result = "Your new currency = " + this.ValOld / this.ValNew * this.currency
        }
    }
});
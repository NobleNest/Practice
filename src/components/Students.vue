<template>
   <div>
        <div class = "search" style = "margin-left: 19.5em;">
            <input type="text" v-model = "search">
            <button v-on:click = "searchStudent()">Search</button>
            <div>Number of students: {{ studentsCount }}</div>
            <link :href = "style" rel="stylesheet">
            <button v-on:click = "changeStyle()">Change style</button>
        </div>
        <table class="table">
            <tr v-for="item in students"  v-bind:key="item._id"> 
                <template v-if = "item._id == searchid">
                    <td><input type="text" v-model = "stud.name"></td>
                    <td><input type = "checkbox" v-model = "stud.isDonePr"></td>
                    <td>
                        <select v-model="stud.group">
                            <option disabled value="RPZ 17 1/9">Please select group</option>
                            <option value="RPZ 17 1/9">RPZ 17 1/9</option>
                            <option value="RPZ 17 2/9">RPZ 17 2/9</option>
                        </select>
                    </td>
                    <td><input type="number" v-model = "stud.mark"></td>
                    <td> <a href = "#" @click="changeStudent(item._id)"><img src = "mod.png" width = "20" height = "20"></a></td>
                </template>


                <template v-else>
                    <td><router-link v-bind:to="'/student-info/'+item._id">
                        {{item.name}}
                    </router-link></td>
                    <td><input type="checkbox" v-model="item.isDonePr"></td>
                    <td>{{item.group}}</td>
                    <td>{{ item.mark}}</td>
                    <td><a href = "#" @click="changeValue(item._id)"><img src = "mod.png" width = "20" height = "20"></a></td>
                </template>

                <td><a href = "#" @click="deleteStudent(item._id)">Delete</a></td>
            </tr> 
        </table>
        
        <div class = "search">
            <input type="text" v-model = "stud.name">
            <select v-model="stud.group">
                <option disabled value="RPZ 17 1/9">Please select group</option>
                <option value="RPZ 17 1/9">RPZ 17 1/9</option>
                <option value="RPZ 17 2/9">RPZ 17 2/9</option>
            </select>
            <input type="number" v-model = "stud.mark">
            <input type = "checkbox" v-model = "stud.isDonePr">isDonePr
            <button v-on:click="add()">Add</button>
        </div> 
   </div>
</template>

<script>
    import Vue from 'vue'
 
    export default {
        props: {
           id: '',
        },
        data: function() {
           return {
                search:"",
                searchid:"",
                students: [],
                stud: {name:"", group:"", mark:"", isDonePr: false},
                style:"components/style.css",
                local:false
           };
        },
        mounted: async function(){   
            if(localStorage.style){
                    this.local = localStorage.style
                }
                else{
                    localStorage.style = this.local
                }
                if(this.local == 'false'){
                    this.style = "components/style.css"
                }
                else{
                    this.style = "components/add.css"
                }   
            let response = await Vue.axios.get("http://46.101.212.195:3000/students");
            this.students = response.data;
            this.$store.commit('setCount', this.students.length)
        },
        computed: {
            studentsCount () {
                return this.$store.getters.getCount
            }
        },
        methods: {
            deleteStudent: function(id){
                Vue.axios.delete("http://46.101.212.195:3000/students/" + id)
                .then((response) => {
                    console.log(response.data)
                    this.reload();
                })
            },
            add: function(){
                Vue.axios.post("http://46.101.212.195:3000/students",{
                    name: this.stud.name,
                    group: this.stud.group,
                    mark: this.stud.mark,
                    isDonePr: this.stud.isDonePr
                })
                .then((response) => {
                    console.log(response.data)
                    this.reload();
                })
            },
            reload: function(){
                Vue.axios.get("http://46.101.212.195:3000/students").then((response) => {
                console.log(response.data)
                    this.students = response.data;
                })
            },
            changeValue: function(id){
                this.stud = this.students.find(elem => {
                    if(elem._id == id){
                        return elem
                    }
                });
                this.searchid = id
            },
            changeStudent: function(id){
                Vue.axios.put("http://46.101.212.195:3000/students/" + id,{
                    name: this.stud.name,
                    group: this.stud.group,
                    mark: this.stud.mark,
                    isDonePr: this.stud.isDonePr
                })
                .then((response) => {
                    console.log(response.data)
                    this.reload();
                    this.searchid = ""
                })
            },
            changeStyle:function(){
                    this.local = !this.local
                    localStorage.style = this.local
                    if(this.local == false){
                        this.style = "components/style.css"
                    }
                    else{
                        this.style = "components/add.css"
                    }
                }
        }
    }
</script>

<style scoped>
    @import './style.css';
</style>
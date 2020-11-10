<template>
   <div>
        <div class = "search" style = "margin-left: 19.5em;">
            <input type="text" v-model = "search">
            <button v-on:click = "searchStudent()">Search</button>
        </div>
        <table class="table">
            <tr v-for="item in students"  v-bind:key="item._id"> 
                <td v-if = "item.name == search">
                    <input type="text" v-model = "stud.name">
                </td>
                <td v-if = "item.name != search">{{ item.name }}</td>

                <td v-if = "item.name != search"><input type="checkbox" v-model="item.isDonePr"></td>
                <td v-if = "item.name == search">
                    <input type = "checkbox" v-model = "stud.isDonePr">
                </td>
                <td v-if = "item.name == search">
                    <select v-model="stud.group">
                        <option disabled value="RPZ 17 1/9">Please select group</option>
                        <option value="RPZ 17 1/9">RPZ 17 1/9</option>
                        <option value="RPZ 17 2/9">RPZ 17 2/9</option>
                    </select>
                </td>
                <td v-if = "item.name == search">
                    <input type="number" v-model = "stud.mark">
                </td>
                <td v-if = "item.name != search">{{item.group}}</td>
                
                <td v-if = "item.name != search">{{ item.mark}}</td>
                <td v-if = "item.name == search">
                    <a href = "#" @click="changeStudent(item._id)"><img src = "mod.png" width = "20" height = "20"></a>
                </td>
                <td v-else><a href = "#" @click="deleteStudent(item._id)">Delete</a></td>
                <td v-if = "item.name != search"><a href = "#" @click="changeValue(item.name)"><img src = "mod.png" width = "20" height = "20"></a></td>
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
    import axios from 'axios'
    import VueAxios from 'vue-axios'
 
    export default {
       data: function() {
           return {
                search:"",
                students: [],
                stud: {name:"", group:"", mark:"", isDonePr:""},
           };
        },
        mounted: function(){      
            this.reload();
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
            changeValue: function(name){
                this.stud = this.students.find(elem => {
                    if(elem.name == name){
                        return elem
                    }
                });
                this.search = name
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
                })
            }
        }
    }
</script>
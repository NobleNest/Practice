   <template>
   <div class="main">
       <h3 class = "search">Student</h3>
       <table class="table" style = "text-align: center;
       vertical-align: middle;
       background-color: #abc;
       border: 1px solid #fff;">
           <td><img v-bind:src="student.photo" width = "100px" height = "100px" @click="showModal"></td>
            <td>{{ student.name }}</td>
            <td><input type="checkbox" v-model="student.isDonePr"></td>
            <td>{{student.group}}</td>
            <td>{{ student.mark}}</td>
       </table>
    
        <div class = "page" style = "
            position: relative;
            width: 100%;
            min-height: 100%;
        "> 
            <modal-window ref="modal"></modal-window>
        </div>
   </div>
</template>
<script>
    import ModalWindow from '/modal-window.vue'
    import Vue from 'vue'

    export default {
        props: {
            id:'',
        },
        components: {
            ModalWindow
        },
        data: function(){
            return{
                student:{},
            }
        },
        mounted: function(){
            Vue.axios.get("http://46.101.212.195:3000/students/" + this.id).then((response) => {
            console.log(response.data)
                this.student = response.data;
            })
        },
        methods:{
            showModal: function () {
                this.$refs.modal.show = true
                this.$refs.modal.photo = this.student.photo
            },
        }
    }
</script>
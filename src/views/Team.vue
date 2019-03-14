<template>
    <v-container>
        <v-layout>
            <v-flex>
                <v-tooltip top>
                <v-btn color="primary" flat to="/newperson" slot="activator" class="text-lowercase"><v-icon left="">add_circle</v-icon> New Member</v-btn>
                    <span>Add member to our team.</span>
                </v-tooltip>
            </v-flex>
        </v-layout>
        <v-layout row wrap>
            <v-flex sm4 md3 v-for="user in users">
               <v-card class="ma-2" >

                   <v-card-text>

                       <v-layout row wrap>
                           <v-flex xs4>
                               <v-avatar size="75"   class="mb-2 mt-5 align-content-center">
                                   <img :src="'http://172.20.10.2:9000/' + user.user_image">
                               </v-avatar>
                           </v-flex>
                           <v-flex xs8>
                               <p><v-icon>person</v-icon> {{user.name}}</p>
                               <p><v-icon>mail</v-icon> {{user.email}}</p>
                               <p><v-icon>phone_iphone</v-icon> {{user.phone}}</p>
                               <p><v-icon>map</v-icon> {{user.address}}</p>
                               <p><v-icon>transfer_within_a_station</v-icon> {{user.role}}</p>
                           </v-flex>
                       </v-layout>


                   </v-card-text>
               </v-card>
            </v-flex>
        </v-layout>
        <back-to-top visibleoffset="100">
            <v-btn class="info"><v-icon>expand_less</v-icon></v-btn>
        </back-to-top>
    </v-container>
</template>

<script>
    import backToTop from "vue-backtotop"
    import axios from 'axios';
    export default {
        components: {
            backToTop
        },
        name: "Team",
        data(){
            return{
                users: {},
            }
        },
        created() {
            this.getAllUsers();
        },
        methods:{
            getAllUsers(){
                axios.get("http://172.20.10.2:9000/api/users")
                    .then(res=>{
                       this.users=res.data.users;
                    })
                    .catch(err=>{
                        console.log(err)
                    });
            }
        }
    }
</script>

<style scoped>

</style>
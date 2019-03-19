<template>
    <v-container>
        <v-layout row wrap>
            <v-flex xs6 offset-xs3>
                <v-alert
                        :value="true"
                        type="success"
                        v-model="alert"
                >
                    <input width="100" v-model="alert_text"/>

                </v-alert>

            </v-flex>
        </v-layout>
        <v-layout row>
            <v-dialog v-model="dialog" persistent max-width="600px">
                <template v-slot:activator="{ on }">
                    <v-btn color="primary" dark v-on="on" flat class="text-lowercase"><v-icon left="">add_circle</v-icon> New Project</v-btn>
                </template>
                <v-card>
                    <v-form ref="form">
                    <v-card-title>
                        <span class="headline">Project Information</span>
                    </v-card-title>
                    <v-card-text>
                        <v-container grid-list-md>

                            <v-layout wrap>
                                <v-flex xs12>
                                    <v-text-field v-model="title" :rules="allRules" label="Project Title*" required></v-text-field>

                                </v-flex>
                                <v-flex xs12>
                                    <v-text-field v-model="description" :rules="allRules" label="Description*" required></v-text-field>
                                </v-flex>
                                <v-flex xs12 sm6>
                                    <v-select
                                            :rules="allRules"
                                            :items="users"
                                            item-text="name"
                                            item-value="id"
                                            label="Person*"
                                            v-model="user_id"
                                            required
                                    ></v-select>
                                </v-flex>
                                <v-flex xs12 sm6>
                                    <v-autocomplete
                                            v-model="status"
                                            :rules="allRules"
                                            :items="['ongoing','completed','started']"
                                            label="Status*"
                                            required
                                    ></v-autocomplete>
                                </v-flex>
                                <v-flex xs12 sm6>
                                    <v-menu

                                            ref="menu"
                                            v-model="menu"
                                            :close-on-content-click="false"
                                            :nudge-right="40"
                                            :return-value.sync="date"
                                            lazy
                                            transition="scale-transition"
                                            persistent
                                            offset-y
                                            full-width
                                            min-width="290px"
                                    >
                                        <template v-slot:activator="{ on }">
                                            <v-text-field
                                                    :rules="allRules"
                                                    v-model="start_at"
                                                    label="Start Date"
                                                    prepend-icon="event"
                                                    readonly
                                                    v-on="on"
                                            ></v-text-field>
                                        </template>
                                        <v-date-picker v-model="start_at" no-title scrollable>
                                            <v-spacer></v-spacer>
                                            <v-btn flat color="primary" @click="menu = false">Cancel</v-btn>
                                            <v-btn flat color="primary" @click="$refs.menu.save(date)">OK</v-btn>
                                        </v-date-picker>
                                    </v-menu>

                                </v-flex>
                                <v-flex xs12 sm6>
                                    <v-menu

                                            ref="menu1"
                                            v-model="menu1"
                                            :close-on-content-click="false"
                                            :nudge-right="40"
                                            :return-value.sync="date"
                                            lazy
                                            transition="scale-transition"
                                            persistent
                                            offset-y
                                            full-width
                                            min-width="290px"
                                    >
                                        <template v-slot:activator="{ on }">
                                            <v-text-field
                                                    :rules="allRules"
                                                    v-model="end_at"
                                                    label="End Date"
                                                    prepend-icon="event"
                                                    readonly
                                                    v-on="on"
                                            ></v-text-field>
                                        </template>
                                        <v-date-picker v-model="end_at" no-title scrollable>
                                            <v-spacer></v-spacer>
                                            <v-btn flat color="primary" @click="menu1 = false">Cancel</v-btn>
                                            <v-btn flat color="primary" @click="$refs.menu1.save(date)">OK</v-btn>
                                        </v-date-picker>
                                    </v-menu>



                                </v-flex>

                            </v-layout>

                        </v-container>

                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="blue darken-1" flat @click="dialog = false">Close</v-btn>
                        <v-btn color="blue darken-1" flat @click="createProject">Save</v-btn>
                    </v-card-actions>
                    </v-form>
                </v-card>
            </v-dialog>
        </v-layout>

       <v-card v-for="p in projects" :key="p.id">
           <v-layout row wrap :class="`pa-3 ${p.status} mb-2`" >
               <v-flex col xs6 md4>
                   <div class="subheading grey--text">Title</div>
                   <div class="text--darken-1">{{p.title}} <span class="grey--text">({{p.description}})</span></div>
               </v-flex>
               <v-flex col xs6 md2>
                   <div class="subheading grey--text">Person</div>
                   <div class="text--darken-1">{{p.user.name}}</div>
               </v-flex>
               <v-flex col xs6 md2>
                   <div class="subheading grey--text">Start Date</div>
                   <div class="text--darken-1">{{p.start_at}}</div>
               </v-flex>
               <v-flex col xs6 md2>
                   <div class="subheading grey--text">End Date</div>
                   <div class="text--darken-1">{{p.end_at}}</div>
               </v-flex>
               <v-flex col xs6 md2>
                   <div>
                   <v-menu>

                       <template v-slot:activator="{ on }">
                           <v-btn small=""
                                   :class="`status ${p.status}`"

                                   v-on="on"
                           >{{p.status}}
                               <v-icon right="">widgets</v-icon>
                           </v-btn>
                       </template>
                       <v-list>
                           <v-list-tile @click="updateStatus(p.id, 'started')">
                               <v-list-tile-title >started</v-list-tile-title>
                           </v-list-tile>
                           <v-list-tile @click="updateStatus(p.id, 'ongoing')">
                               <v-list-tile-title >ongoing</v-list-tile-title>
                           </v-list-tile>
                           <v-list-tile @click="updateStatus(p.id, 'completed')">
                               <v-list-tile-title >completed</v-list-tile-title>
                           </v-list-tile>
                       </v-list>
                       </v-menu>
                   </div>
               </v-flex>
           </v-layout>

       </v-card>
        <div class="text-xs-center">
            <v-pagination
                    v-model="pagination.current"
                    :length="pagination.total"
                    @input="onPageChange"

            ></v-pagination>
        </div>


    </v-container>
</template>

<script>
    import axios from 'axios';
    import moment from 'moment';
    export default {
        name: "Dashboard",
        created(){
          this.getUsers();
          this.getAllProjects();
        },

        data(){
            return{
                projects: {},
                pagination: {
                    current: 1,
                    total: 0

                },
                alert: false,
                alert_text: '',
                allRules: [v=> !!v || "The selected field is required."],
                start_at: '',
                end_at: '',
                user_id:'',
                menu: false,
                menu1:false,
                title: '',
                description: '',
                status: '',
                users: {},
                dialog: false,

            }
        },
    computed: {

    },

        methods:{
            updateView(){
                this.projects="";
                this.getAllProjects();
            },
            updateStatus(id,status){
               axios.get("http://172.20.10.2:9000/api/project/update/"+id+"/"+status)
                   .then(res=>{
                       this.updateView();
                   })
                   .catch(err=>{
                       console.log(err);
                   });
            },
            getAllProjects(){
                axios.get('http://172.20.10.2:9000/api/projects?page= '+ this.pagination.current)
                    .then(res=>{
                        this.projects=res.data.data;
                        this.pagination.current = res.data.current_page;
                        this.pagination.total = res.data.last_page;
                    })
                    .catch(err=>{
                        console.log(err)
                    });
            },
            onPageChange() {
                this.getAllProjects();
            },
            createProject(){
                if(this.$refs.form.validate()){
                    axios.post("http://172.20.10.2:9000/api/project/new",{
                        title: this.title,
                        description: this.description,
                        user_id:this.user_id,
                        status: this.status,
                        start_at: this.start_at,
                        end_at: this.end_at
                    })
                        .then(res=>{
                            this.alert_text=res.data.message;
                            this.alert=true;

                            this.dialog=false;
                            this.title='';
                            this.description='';
                            this.user_id='';
                            this.status='';
                            this.start_at='';
                            this.end_at='';
                            this.updateView();
                        })
                        .catch(err=>{
                            console.log(err.response.data);
                        });
                }

            },
            getUsers(){
                axios.get('http://172.20.10.2:9000/api/users')
                    .then(res=>{
                        this.users=res.data.users;
                    })
                    .catch(err=>{
                        console.log(err)
                    });
            }
        },

    }
</script>

<style scoped>

    .status.started{
        background: teal;
    }
    .status.ongoing{
        background: orangered;
    }
    .status.completed{
        background: green;
    }


    .completed{

        border-left: 5px solid green;

    }
    .ongoing{
        border-left:5px solid orangered;
    }
    .started{
        border-left: 5px solid teal;
    }

</style>
<template>
    <div>
    <nav>

        <v-toolbar dark color="primary" app>
            <v-toolbar-side-icon @click="drawer = !drawer"></v-toolbar-side-icon>
            <v-toolbar-title class="white--text">NTG Technology </v-toolbar-title>

            <v-spacer></v-spacer>

            <v-btn icon>
                <v-icon>search</v-icon>
            </v-btn>

           <v-toolbar-items>
               <v-menu offset-y  transition="scale-transition">
                   <v-btn slot="activator" icon>
                       <v-icon>widgets</v-icon>
                   </v-btn>
                   <v-list>
                       <v-list-tile v-for="item in items" :to="item.url">
                           <v-list-tile-title ><v-icon left>{{item.icon}}</v-icon> {{item.content}}</v-list-tile-title>
                       </v-list-tile>
                   </v-list>

               </v-menu>

           </v-toolbar-items>
        </v-toolbar>
    </nav>
        <v-navigation-drawer v-model="drawer" app>
            <v-layout column class="align-center mt-3">
                <v-flex>
                    <v-avatar size="100">
                        <img src="https://randomuser.me/api/portraits/men/85.jpg">
                    </v-avatar>
                </v-flex>
            </v-layout>
            <div class="mt-2  mb-3 text-xs-center">
                <v-btn flat>
                    <v-icon left>message</v-icon> Khine Win
                </v-btn>
            </div>
            <v-list>
                <v-divider></v-divider>
                <v-list-tile @click="drawer = !drawer" v-for="item in items" :to="item.url">
                    <v-list-tile-action>
                        <v-icon class="black--text">{{item.icon}}</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content class="black--text">{{item.content}}</v-list-tile-content>

                </v-list-tile>
            </v-list>
        </v-navigation-drawer>
    </div>

</template>

<script>
    export default {
        name: "Toolbar",
        data(){
            return{
                drawer: false,
                items :[
                    {icon : 'dashboard', content: "Dashboard" , url: "/"},
                    {icon: "person", content: "Team" ,url : "/team"},
                    {icon : "folder", content: "My Projects" , url: "/myproject"},
                    {icon : "exit_to_app", content: "Logout", url: "/logout"},

                ]
            }
        }
    }
</script>

<style scoped>

</style>
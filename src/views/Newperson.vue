<template>
    <v-container>
        <v-layout>
            <v-flex>
                <v-tooltip top>
                    <v-btn to="/team" color="primary" slot="activator" class="text-lowercase" flat><v-icon left>person</v-icon> Members</v-btn>
                    <span>All Members</span>
                </v-tooltip>
            </v-flex>
        </v-layout>



        <v-layout row wrap>
            <v-flex sm4 offset-sm4>
                <v-form ref="form" @submit.prevent="savePerson">
                    <v-layout row wrap>
                        <v-flex xs12 class="text-xs-center text-sm-center text-md-center text-lg-center">
                            <img :src="imageUrl" height="150" v-if="imageUrl"/>
                            <v-text-field label="Select Image" @click='pickFile' v-model='user_image' prepend-icon='attach_file'></v-text-field>
                            <input
                                    type="file"
                                    style="display: none"
                                    ref="image"
                                    accept="image/*"
                                    @change="onFilePicked"
                            >
                        </v-flex>
                    </v-layout>

                    <v-text-field

                            v-model="name"
                            name="name"
                            :rules="rule.name"
                            :counter="10"
                            placeholder="Mg Mg"
                            required
                            prepend-icon="person"
                    ></v-text-field>
                    <v-text-field
                            type="email"
                            v-model="email"
                            :rules="rule.email"
                            :counter="30"
                            placeholder="mgmg@gmail.com"
                            prepend-icon="mail"
                            required
                    ></v-text-field>
                    <v-text-field
                            type="tel"
                            v-model="phone"
                            :rules="rule.phone"
                            :counter="15"
                            placeholder="0943134783"
                            required
                            prepend-icon="phone_iphone"
                    ></v-text-field>
                   <v-text-field
                           v-model="address"
                           prepend-icon="map"
                           :rules="rule.address"
                           :counter="100"
                           required
                           placeholder="Mawlamyine"
                   >
                   </v-text-field>
                       <v-text-field

                               v-model="role"
                               prepend-icon="transfer_within_a_station"
                               :rules="rule.role"
                               :counter="20"
                               required
                               placeholder="Web Developer"
                       >



                   </v-text-field>
                    <v-btn type="submit" class="primary" large>Save</v-btn>


                </v-form>
            </v-flex>
        </v-layout>

    </v-container>
</template>

<script>
    import VImageInput from 'vuetify-image-input';
    import axios from 'axios';
    export default {
        components: {
            [VImageInput.name ]: VImageInput
    },

        name: "Newperson",
        data(){
            return{
                imageName: '',
                imageUrl: '',
                imageFile: '',
                name: '',
                email: '',
                phone: '',
                address: '',
                role: '',
                user_image: '',
                rule: {
                    user_image: [
                        v=> !!v || "The image field is required."
                    ],
                    name: [
                        v=> !!v || "The name field is required."
                    ],
                    email:[v=> !!v || "The email field is required."],
                    phone: [v=> !!v || "The phone field is required."],
                    address: [ v=> !!v || "The address field is required."],
                    role: [v=> !!v || "The role field is required."]
                }

            }
        },
        methods: {
            pickFile () {
                this.$refs.image.click ()
            },
            onFilePicked (e) {
                const files = e.target.files
                if(files[0] !== undefined) {
                    this.imageName = files[0].name
                    if(this.imageName.lastIndexOf('.') <= 0) {
                        return
                    }
                    const fr = new FileReader ()
                    fr.readAsDataURL(files[0])
                    fr.addEventListener('load', () => {
                        this.imageUrl = fr.result
                        this.imageFile = files[0] // this is an image file that can be sent to server...
                    })
                } else {
                    this.imageName = ''
                    this.imageFile = ''
                    this.imageUrl = ''

                }
            },


            savePerson(){



                if(this.$refs.form.validate()){
                    axios.post("http://172.20.10.2:9000/api/user/new",{
                        name: this.name,
                        email: this.email,
                        phone: this.phone,
                        address :this.address,
                        role: this.role,
                        user_image: this.imageUrl,
                        user_image_name: this.imageName

                    })
                        .then(res=>{
                            console.log(res);

                                this.name='';
                                this.email='';
                                this.phone='';
                                this.address='';
                                this.role='';
                                this.imageUrl ='';



                        })
                        .catch(err=>{

                            console.log(err.response.data);


                        })
                }
            }
        }
    }
</script>

<style scoped>

</style>
<template>
    <section id="home">
        <v-container v-if="addcontact_flag">
            <!-- ADD CONTACTS -->
            <h2>Add contact</h2>
            <v-form>
                <v-text-field
                    label="Full name"
                    v-model="new_name"
                    :rules="[textRules.alphabet]"
                ></v-text-field>
                <v-text-field
                    label="Email"
                    v-model="new_email"
                    :rules="[emailRules.email]"
                ></v-text-field>
                <v-text-field
                    label="Phone number"
                    v-model="new_phone"
                    :rules="[numberRules.number]"
                ></v-text-field>
            </v-form>

            <v-btn @click="addContact()" class="success" small>Add contact</v-btn>
            <v-btn @click="addcontact_flag = false" class="error" small>Cancel</v-btn>
        </v-container>


        <v-container  v-if="!addcontact_flag">
            <!-- SEARCH CONTACTS -->
            <v-row>
                <v-flex md6>
                    <v-text-field
                        label="Search"
                        v-model= 'search'
                    ></v-text-field>
                </v-flex>
                <v-flex md6>
                    <v-btn @click="addcontact_flag = true" class="success" small>Add contact</v-btn>
                </v-flex>
            </v-row>

            <!-- NO CONTACTS ALERT -->
            <v-alert type="info" v-if="list_contacts.length <= 0">
                You have no contacts currently
            </v-alert>

            <!-- LIST OF CONTACTS -->
            <v-row v-for="(contacts, contacts_index) in filteredList" :key="contacts_index">
                <v-flex md9>
                    <h3>{{contacts.name}}</h3>
                    <p>{{contacts.number}}</p>
                    <p>{{contacts.email}}</p>
                </v-flex>

                <v-flex md3>
                    <v-btn @click="deleteFn(contacts_index, contacts.name)" class="error" small><v-icon small>mdi-delete</v-icon>Delete</v-btn>
                    <v-btn @click="editFn(contacts_index, contacts.name, contacts.number, contacts.email)" small><v-icon small>mdi-pencil</v-icon>Edit</v-btn>
                </v-flex>
            </v-row>
        </v-container>
        <AlertDelete :name='delete_name'/>
        <AlertEdit/>
    </section>
</template>


<script>
// @ is an alias to /src
import { mapActions, mapGetters, mapMutations } from "vuex"
import { mapFields } from 'vuex-map-fields'
import AlertDelete from '@/components/AlertDelete.vue'
import AlertEdit from '@/components/AlertEdit.vue'

export default {
    name: 'Home',
    components: {
        AlertDelete,
        AlertEdit
    },
    computed: {
        ...mapFields('home', ['list_contacts','delete_alert', 'edit_alert', 'index_list', 'edit_name', 'edit_number', 'edit_email']),

        filteredList(){
            return this.list_contacts.filter(post => {
                return post.name.toLowerCase().includes(this.search.toLowerCase()) || post.email.toLowerCase().includes(this.search.toLowerCase()) || post.number.toLowerCase().includes(this.search.toLowerCase())
            })
        }
    },
    methods:{
        addContact(){
            let _s = this
            let phoneArray = []
            let emailArray = []

            //Validate empty fields
            if(_s.new_name != '' || _s.new_phone != '' || _s.new_email != ''){
                _s.list_contacts.forEach((item, i) => {
                    phoneArray.push(item.number)
                    emailArray.push(item.email)
                });

                //Validate if number and email already exists
                if(phoneArray.includes(_s.new_phone) || emailArray.includes(_s.new_email)){
                    alert("contact already exist")
                }
                else{
                    _s.list_contacts.unshift({
                        name: _s.new_name,
                        number: _s.new_phone,
                        email: _s.new_email
                    })
                    _s.addcontact_flag = false
                }
            }
            else{
                alert("Please complete the missing fields")
            }
        },
        deleteFn(index, name){
            this.delete_alert = true
            this.index_list = index
            this.delete_name = name
        },
        editFn(index, name, number, email){
            this.edit_alert = true
            this.index_list = index

            this.edit_name = name
            this.edit_number = number
            this.edit_email = email
        }
    },
    data: () => ({
        search: '',
        addcontact_flag: false,
        delete_name: '',
        new_name: '',
        new_phone: '',
        new_email: '',

        textRules: {
            alphabet: v => /^[a-zA-Z\s]*$/i.test(v) || "Letters only",
        },
        emailRules: {
            email: v => /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i.test(v) || "Enter Valid Email",
        },
        numberRules: {
            number: v => /^\+[0-9\s]*$/i.test(v) || "Enter valid phone number",
        },

    }),
}
</script>

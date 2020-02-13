<template>
    <v-dialog
      v-model="edit_alert"
      width="500"
    >
        <v-card>
            <v-card-text>
                <v-text-field
                    label="Name"
                    v-model="edit_name"
                    :rules="[textRules.alphabet]"
                ></v-text-field>
                <v-text-field
                    label="Email"
                    v-model="edit_email"
                    :rules="[emailRules.email]"
                ></v-text-field>
                <v-text-field
                    label="Phone number"
                    v-model="edit_number"
                    :rules="[numberRules.number]"
                ></v-text-field>
            </v-card-text>

            <v-divider></v-divider>

            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn @click="confirmUpdate()" class="success">Yes</v-btn>
                <v-btn @click="edit_alert = false" class="error">Cancel</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
    import { mapActions, mapGetters, mapMutations } from "vuex"
    import { mapFields } from 'vuex-map-fields'

    export default {
        computed: {
            ...mapFields('home', ['edit_alert', 'index_list', 'edit_name', 'edit_number', 'edit_email']),
        },
        methods: {
            ...mapActions('home', ['updateContact']),

            confirmUpdate(){
                this.updateContact(this.index_list)
            }
        },
        data: () => ({
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

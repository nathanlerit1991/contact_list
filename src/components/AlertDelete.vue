<template>
    <v-dialog
      v-model="delete_alert"
      width="500"
    >
        <v-card>
            <v-card-text>
                Are you sure you want to delete the contact: {{name}}?
            </v-card-text>

            <v-divider></v-divider>

            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn @click="confirmDelete()" class="success">Yes</v-btn>
                <v-btn @click="delete_alert = false" class="error">Cancel</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
    import { mapActions, mapGetters, mapMutations } from "vuex"
    import { mapFields } from 'vuex-map-fields'

    export default {
        props: ['name'],
        computed: {
            ...mapFields('home', ['delete_alert', 'index_list']),
        },
        methods: {
            ...mapActions('home', ['deleteContact']),

            confirmDelete(){
                this.deleteContact(this.index_list)
            }
        }
    }
</script>

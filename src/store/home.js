import { getField, updateField } from 'vuex-map-fields'

const state = {
    delete_alert: false,
    edit_alert: false,
    index_list: null,

    edit_name: '',
    edit_number: '',
    edit_email: '',


    list_contacts: [
        {
            name: 'John Smith',
            number: '+65 9825 7805',
            email: 'john.smith@email.com'
        },
        {
            name: 'Maria Johnson',
            number: '+65 8464 6929',
            email: 'maria.johnson@email.com'
        }
    ]
}

const getters = {
    getField,
}

const actions = {
    deleteContact( {commit}, index ){
        state.list_contacts.splice(index, 1)
        state.delete_alert = false
    },
    updateContact( {commit}, index ){
        //This structure ensure the reactivity of datum
        if(state.edit_name != '' && state.edit_number != '' && state.edit_email != ''){
            state.list_contacts[index].name =  state.edit_name
            state.list_contacts[index].number =  state.edit_number
            state.list_contacts[index].email =  state.edit_email

            state.edit_alert = false
        }
        else{
            alert("Please complete the missing fields")
        }
    }
}

const mutations = {
    updateField
}

export const home = {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
}

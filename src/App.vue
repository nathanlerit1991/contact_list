<template>
    <v-app>
        <v-content>
            <router-view/>
        </v-content>
    </v-app>
</template>

<style>
    #home{
        padding: 0 40%;
    }
    #home button{
        width: 100%;
        margin: 5px 0;
    }
</style>

<script>
export default {
    name: 'App',
    data: () => ({
    //
    }),
};
</script>

<template>
    <div>
        <Article    :key="article.id"  v-for="article in articles"  :id="article.id" :userId="article.userId" />
        
    </div>
</template>

<script>

import axios from 'axios';
import Article from './Article.vue';

export default {

    name: 'Articles',

    components: {
        Article
    },

    computed : {
         articles(){
            return this.$store.state.articles
         }
    },
    mounted(){

        this.getArticles();
        
    },

    methods:{

        async getArticles() {

            let headers = await this.$store.dispatch('authentificateRequest')

            axios
                .get('http://localhost:3000/articles',{headers}
                )
                .then((response) => {                  
                    this.$store.state.articles = response.data;
                    console.log(this.$store.state.user)
                });
        }
    }
}
</script>

<style scoped>
</style>
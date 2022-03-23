<template>
  <div class="article">

    
    <textarea v-model="title" class="titre" placeholder="Créez un titre"></textarea>
    <textarea v-model="content" class="articleContent" placeholder="Donnez vie à votre article"></textarea>

 
    <div class="notationContainer">
        <button class="submit" v-on:click="createArticle()">Postez votre article !</button>  
    </div>
  </div>
</template>

<script>

import axios from 'axios';

export default {

  name: 'ArticleCreation',

  props: {
    id: String
  },

  components:{
      
  },

  data() {
    return {
        title: null,
        content: null,
        author : null    
    }
  },

  async mounted(){
    let headers = await this.$store.dispatch('authentificateRequest')
    
      axios
        .get('http://localhost:3000/users/' + this.$store.state.user.userId, {headers})
        .then((response) => {
            this.author = response.data.name;
        });
  },
  

  methods:{

    async createArticle(){

      const article = {
          title : this.title,
          content : this.content,
          userId : this.$store.state.user.userId,
          author : this.author  
      }
      let headers = await this.$store.dispatch('authentificateRequest')

      axios
        .post('http://localhost:3000/articles/', {article}, {headers} )
        .then(() => {
            axios
                .get('http://localhost:3000/articles/', {headers}  )
                .then((response) => {
                    this.$store.dispatch('updateArticles', response.data )
                    console.log(this.$store.state.articles)
                });
        });
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

h4 {
  text-align: center;
  margin-top: 20px;
}
h5 {
  margin-left: 60px;
  color:white
}
h1{
    color:white
}
.articleContent {
 background-color: white;
 border-radius:10px;
 padding:10px;

}
.article{
  display: flex;
  flex-direction:column ;
  margin-top:40px;
  padding:  0 20px 0 20px;;
  border-radius: 10px ;
  box-shadow: 5px 5px 15px 5px  rgba(255,255,255,0.2); 
  background-image: linear-gradient(113deg, rgba(1, 1, 1, 0.6) 0%, rgba(255, 255, 255, 0.6) 70%);
  transition: all 200ms ease-in-out;
}
.article:hover{
  transform: scale(1.02);
  background-image: linear-gradient(113deg, rgba(1, 1, 1, 0.7) 0%, rgba(255, 255, 255, 0.7) 70%);
  box-shadow: 5px 5px 15px 5px  rgba(255,255,255,0.4); 

}
.titre{
  text-align: center;
  font-size: 2em;
  height : 50px;
  background: transparent;
  color:white;
  border:none
}
.titre::placeholder{
  color:white; 
}

.transparent{
    background-color: transparent;
    transition: all 200ms ease-in-out;
}
.transparent i{
    
    transition: all 200ms ease-in-out;
}
.transparent:hover{
    transform:scale(1.2);
    background-color: transparent;
}
.transparent:hover i{
    transform:scale(1.5);
   
}
.submit{
  font-size:1.5em;
  color: white;
  background: #2196F3;
  border-radius:10px;
  margin-left: 70%;
  padding-left:20px;
  padding-right:20px;
  margin-top:20px;
  margin-bottom:20px;
  transform-origin: left;
  transition: all 200ms ease-in-out;
}
.submit:hover{
  transform: scale(1.1) skewY(-1deg);
}
.green{
  background-color: green;
  color: white;
}
.red{
  background-color: red;
  color: white;

}
.blue{
  background-color: blue;
}
.white{
    color:white
}
.comments{
  border-left:1px black solid;
  border-bottom:1px black solid;
  border-right:1px black solid;
  border-radius:0 0 10px 10px
}
.comments p{
  padding:  0 0 0 20px !important;
}

</style>

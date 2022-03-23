<template>
  <div id="commentsContainer" class="commentsContainer">
    <Comment  :key="comment.id" v-for="comment in comments" :id="comment.id" />
    <div class="inputEnd">
      <textarea class="inputText" v-model="textComment"  placeholder="     saisissez votre commentaire" >   
      </textarea>
      <button class="submit" v-on:click="submit()">Envoyer</button>
    </div>
  </div>
</template>

<script>

import axios from 'axios';
import Comment from './Comment.vue';


export default {

  name: 'Comments',

  props: {
    id: String
  },

  components:{
   Comment
  },

  data() {
    return {
        comments : [],
        textComment : null
    }
  },
  computed : {

  },

  async mounted(){
    let headers = await this.$store.dispatch('authentificateRequest')
    axios
        .get('http://localhost:3000/comments/' + this.id, {headers})
        .then((response) => {
            this.comments = response.data
           
        });

  },

  methods:{
    submit : async function(){
      
      const comment ={
        articleId : this.id,
        userId: this.$store.state.user.userId,
        content : this.textComment
      }
      let headers = await this.$store.dispatch('authentificateRequest') 

      axios
        .post('http://localhost:3000/comments/'  , {comment}, {headers})
        .then(() => {
      axios
        .get('http://localhost:3000/comments/' + this.id, {headers})
        .then((response) => {
            this.comments = response.data;
            this.$parent.comments ++
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
.notationContainer{
  margin-top:20px ;
  display: flex;
  justify-content: center;
}
.likesBox{
    width: 70%;
    display: flex;
    align-items: center;
    justify-content: flex-start;
}
.commentsBox{
    width: 30%;
    display: flex;
    align-items: center;
    justify-content: flex-start;
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
button{
  width: 40px;
  height: 40px; 
  border-radius: 50%;
  margin: 20px;
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
.inputEnd{
  margin-top:20px;
  margin-bottom:20px;
  color:black !important;
  margin-left:60%;
  width:35%;
  position: relative;
}
.inputText{
width: 100%;
margin-bottom:20px;
transition: all 200ms ease-in-out;

}
.inputText:hover{
  transform: scale(1.1);

}
.submit{
  position: absolute;
  border-radius: 10px !important;
  width: unset;
  transform: translateX(-100px);
  transition: all 200ms ease-in-out;
}
.submit:hover{
  transform: translateX(-100px) scale(1.1);
  background-color: #2196F3;
  color:white;
}


</style>

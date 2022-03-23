<template>
  <div class="article">

    <h5>le: {{createdAt}}</h5>
    <h1 v-if="isRead">{{title}}</h1>
    <textarea v-if="isEdit" v-model="title" class="titreEdit"></textarea>
    <p v-if="isRead" class="articleContent">{{content}}</p>
    <textarea v-if="isEdit" class="articleContentEdit" v-model="content"></textarea>
    <h4>Rédigé par: {{author}}</h4>
    <div v-if="userCheck || isAdmin" class="usersAccess">
        <button  v-on:click="deleteArticle()">
            <i  class="fa fa-thin fa-trash"></i>
            <p>Delete</p>
        </button>
        <button v-if="isRead" v-on:click="switchToEdit()">
            <i class="fa fa-thin fa-pencil"></i>
            <p>Update</p>
        </button>  
        <button v-if="isEdit" v-on:click="updateArticle()">
            <i class="fa fa-thin fa-pencil"></i>
            <p>Save</p>
        </button>   
    </div>
    <div class="notationContainer">
        <div class="likesBox">
            <button class="transparent" v-on:click="like">
                <i class="white fa fa-regular fa-thumbs-up"></i>
            </button>
            <p class="white">{{likes}}</p>

            <button class="transparent" v-on:click="dislike">
                <i class="white fa fa-regular fa-thumbs-down"></i>
            </button>
            <p class="white">{{dislikes}}</p>
        </div>
        <div class="commentsBox">
            <p>commentaires:</p>
            <button class="transparent" v-on:click="showComments()">
            <i class="fa fa-regular fa-comments"></i>
            </button>
            <p>{{comments}} </p>
        </div>      
    </div>
    <div v-if="show">
        <Comments  :id="id" />
    </div>
  </div>
</template>

<script>

import axios from 'axios';
import Comments from './Comments.vue';


export default {

  name: 'Article',

  props: {
    id: String,
    userId: String
  },

  components:{
      Comments
  },

  data() {
     return {
        userCheck:null,
        isAdmin:null,
        author: null,
        createdAt: null,
        title: null,
        content: null,
        likes: 0,
        dislikes: 0,
        comments:0,
        show : null,
        isRead : true,
        isEdit : false
    } 
  },

  async mounted(){
    let headers = await this.$store.dispatch('authentificateRequest')
 
    axios
        .get('http://localhost:3000/articles/' + this.id,{headers})
        .then((response) => {
            this.author = response.data.author;
            this.createdAt = response.data.createdAt;
            this.title = response.data.title;
            this.content = response.data.content;
            if(this.userId == this.$store.state.user.userId){
               this.userCheck = true ;
            }
            this.isAdmin = this.$store.state.user.isAdmin
            
        }); 

    this.getLikes();
    this.getDislikes();
    this.getComments(); 
  },

  methods:{

    switchToEdit(){
        this.isEdit = true;
        this.isRead = false
    },
    switchOffToEdit(){
        this.isEdit = false;
        this.isRead = true

    },
   
    async getLikes() {
        let headers = await this.$store.dispatch('authentificateRequest')

        axios
        .get('http://localhost:3000/likes/' + this.id, {headers})
        .then((response) => {
            this.likes = response.data.length;
        });
    },

    async getDislikes() {
    let headers = await this.$store.dispatch('authentificateRequest')
    
        axios
        .get('http://localhost:3000/dislikes/' + this.id, {headers})
        .then((response) => {
            this.dislikes = response.data.length;
        });
    },

    async like() {
       let headers = await this.$store.dispatch('authentificateRequest')

        axios
        .post('http://localhost:3000/likes', {
            userId: this.$store.state.user.userId,
            articleId: this.id
        }, {headers})
        .then(() => {
            this.getLikes();
        });
    },

    async dislike() {
       let headers = await this.$store.dispatch('authentificateRequest')

        axios
        .post('http://localhost:3000/dislikes', {
            userId: this.$store.state.user.userId,
            articleId: this.id
        },{headers})
        .then(() => {
            this.getDislikes();
        });
    },
    async getComments(){
        let headers = await this.$store.dispatch('authentificateRequest')
        axios
        .get('http://localhost:3000/comments/' + this.id, {headers})
        .then((response) => {
            this.comments = response.data.length;
        });
    },
    async showComments(){
   
        if(this.show == null ){
            this.show = true
        }else{
            this.show = null
        }
        let headers = await this.$store.dispatch('authentificateRequest')
        axios
        .get('http://localhost:3000/comments/' + this.id, {headers})
        .then((response) => {
            this.comments = response.data.length;
        });
    },
    async deleteArticle(){
       let headers = await this.$store.dispatch('authentificateRequest')
      axios
        .delete('http://localhost:3000/articles/' + this.id, {headers})
        .then(() => {
          axios
                .get('http://localhost:3000/articles', {headers})
                .then((response) => {                 
                  this.$store.state.articles = response.data;
                 });
        });
    },
    async updateArticle(){ 
    this.switchOffToEdit();
    let headers = await this.$store.dispatch('authentificateRequest')
    axios
        .put('http://localhost:3000/articles/' + this.id,{
          content : this.content,
          title: this.title
        },{headers})
        .then(() => {
          axios
              .get('http://localhost:3000/articles', {headers})
              .then((response) => {               
                this.$store.state.articles = response.data;

              });
        });
    }


  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.articleContentEdit {
 background-color: white;
 border-radius:10px;
 padding:10px;
 width: 100%;
 min-height:100px

}
.titreEdit{
  width: 100%;
  text-align: center;
  font-size: 2em;
  height : 50px;
  background: transparent;
  color:white;
  border:none
}
.titreEdit::placeholder{
  color:white; 
}
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
  backdrop-filter: blur(10px);

}
.article:hover{
  /* transform: scale(1.02); */
  background-image: linear-gradient(113deg, rgba(1, 1, 1, 0.7) 0%, rgba(255, 255, 255, 0.7) 70%);
  box-shadow: 5px 5px 15px 5px  rgba(255,255,255,0.4); 
  backdrop-filter: blur(1px);



}
.notationContainer{
  margin-top:20px ;
  display: flex;
  justify-content: center;
  transform: scale(1.01);
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
.comments{
  border-left:1px black solid;
  border-bottom:1px black solid;
  border-right:1px black solid;
  border-radius:0 0 10px 10px
}
.comments p{
  padding:  0 0 0 20px !important;
}
.usersAccess{
  margin-top:20px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
}

.usersAccess button{
  transform: scale(1.3);
 border-radius: 10px;
 background: #f2f2f2a3;
 width: unset !important;
 padding-left: 20px;
 padding-right: 20px;
 transition: all 200ms ease-in-out;
}
.usersAccess button:hover{
  background-color: #fff;
  transform: scale(1.5);
}
</style>

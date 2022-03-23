<template>
  <div >
    <div class="container">
    <div class="comments">
    <h4 class=commentAuthor>{{author}} à dis :</h4>
    <p class="articleContent">{{content}}</p>
    <div class="likesBox">
            <h5 class="end">le: {{createdAt}}</h5>

            <button class="transparent" v-on:click="like">
                <i class="white fa fa-regular fa-thumbs-up"></i>
            </button>
            <p class="white compteur ">{{commentLikes}}</p>

            <button class="transparent" v-on:click="dislike">
                <i class="white fa fa-regular fa-thumbs-down"></i>
            </button>
            <p class="white compteur">{{commentDislikes}}</p>
            <button class="transparent borderWhite" v-on:click="showData()">
            <i class="fa fa-regular fa-comments"></i>
            </button>
            <p class="black compteur">{{responses}} </p>
        </div>
    </div>
    <div v-if="userCheck || isAdmin" class="userAccess">
       <button   v-on:click="deleteComment()">
            <i  class="fa fa-thin fa-trash"></i>
           
        </button>
    </div>
    </div>
    <div v-if="show">
        <Responses :id="id"/>
    </div>
  </div>
</template>

<script>

import axios from 'axios';
import Responses from './Responses.vue';


export default {

  name: 'Comment',

  props: {
    id: String
  },

  components:{
     Responses 
  },

  data() {
    return {
        isAdmin : null, 
        author: null,
        createdAt: null,        
        content: null,
        userId:null,
        userCheck:null,
        commentLikes: null,
        commentDislikes: null,
        responses: null,
        show : null
    }
  },

  async mounted(){
      let headers = await this.$store.dispatch('authentificateRequest') 
      axios
        .get('http://localhost:3000/comments/getOne/' + this.id, {headers})
        .then((response) => {
            this.createdAt = response.data.createdAt;
            this.content = response.data.content;
            this.userId = response.data.userId
            if(this.userId == this.$store.state.user.userId){
                   this.userCheck = true ;
            }
            this.isAdmin = this.$store.state.user.isAdmin
            
            axios
              .get('http://localhost:3000/users/' + this.userId, {headers})
              .then((response) => {
                  this.author = response.data.name;

              });

        });
     

    this.getCommentLikes();
    this.getCommentDislikes();
    this.getCommentResponse();

  },

  methods:{

    showData : async function(){
      
        if(this.show == null ){
            this.show = true
        }else{
            this.show = null
        }
        let headers = await this.$store.dispatch('authentificateRequest')
         axios
        .get('http://localhost:3000/responses/' + this.id, {headers})
        .then((response) => {
            this.responses = response.data.length;
        });
    }, 
    async getCommentLikes() {
      let headers = await this.$store.dispatch('authentificateRequest') 
        axios
          .get('http://localhost:3000/commentLike/' + this.id, {headers})
          .then((response) => {
              this.commentLikes = response.data.length;
        });
    },

    async getCommentDislikes() {
      let headers = await this.$store.dispatch('authentificateRequest')
        axios
        .get('http://localhost:3000/commentDislike/' + this.id, {headers})
        .then((response) => {
            this.commentDislikes = response.data.length;
        });
    },
    async getCommentResponse() {
        let headers = await this.$store.dispatch('authentificateRequest')
        axios
        .get('http://localhost:3000/responses/' + this.id, {headers})
        .then((response) => {
            this.responses = response.data.length;
        });
    },

    async like() {
        let headers = await this.$store.dispatch('authentificateRequest')
        axios
        .post('http://localhost:3000/commentLike', {
            userId: this.$store.state.user.userId,
            commentId: this.id
        }, {headers})
        .then(() => {
            this.getCommentLikes();
        });
    },

    async dislike() {
        let headers = await this.$store.dispatch('authentificateRequest') 
        axios
        .post('http://localhost:3000/commentDislike', {
            userId: this.$store.state.user.userId,
            commentId: this.id
        }, {headers})
        .then(() => {
            this.getCommentDislikes();
        });
    },
    async deleteComment(){
      let headers = await this.$store.dispatch('authentificateRequest') 
      axios
        .delete('http://localhost:3000/comments/' + this.id, {headers})
        .then(() => {
          axios
                .get('http://localhost:3000/comments/' + this.$parent.id, {headers} )
                .then((response) => {                
                   this.$parent.comments = response.data;
                   this.$parent.$parent.comments -- ;
                });
        });
    }  
  }
  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.container{
display: flex;

}
.userAccess{
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: 40px;

  }
.userAccess button{
    transform: scale(1.2) translateY(-7px);
  transition: all 200ms ease-in-out;
  border-radius: 50%;
  width:30px;
  height:30px;
  background: #f2f2f2a3;
}
.userAccess:hover button{
  transform: scale(1.5) translateY(-7px);
  background-color: white;
}
.white{
    color:white
}
.black{
    color:black !important
}
.comments{
  width: 70%;
  border-radius:10px;
  background-image: linear-gradient(113deg, rgba(1, 1, 1, 0.6) 0%, rgba(255, 255, 255, 0.6) 100%);
  transition: all 200ms ease-in-out;
  box-shadow: 5px 5px 15px 5px  rgba(255,255,255,0.2); 
  margin-bottom: 20px;
  
}
.comments:hover{
  transform: scale(1.02);
}
.comments p{
  padding-left:40px;
  color: white;
}
.comments h4,
.comments h5{
  padding:  0 20px 0 20px !important;
  color: white;
}
.commentAuthor{
  padding: 0px !important;
  border-radius : 10px;
  transform: translate(10px,  -10px);
  background-color: black;
  width: fit-content;
}
.end{
  color:black !important;
  margin-left:50%;
  align-self: flex-end;
}
.likesBox{
  display: flex;
  height: 30px;
}
.transparent{
  background: transparent;
  border-radius: 50%;
  height: 30px;
  width: 30px;
  transition: all 200ms ease-in-out;
}
.transparent i{
  transition: all 200ms ease-in-out;
}
.transparent:hover{
  transform: scale(1.2)
}
.transparent:hover i{
  transform: scale(1.4)
}
.borderWhite{
  border: 1px white solid
}
.compteur{
  padding-left: 20px !important;
  padding-right: 20px
}
</style>

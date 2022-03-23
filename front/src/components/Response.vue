<template>
<div class="container">
  <div v-if="userCheck || isAdmin" class="userAccess">
       <button   v-on:click="deleteResponse()">
            <i  class="fa fa-thin fa-trash"></i>
           
        </button>
  </div>
  <div class="comments">
    <h4 class=commentAuthor>{{author}} à dis :</h4>
    <p class="articleContent">{{content}}</p>
    <div class="likesBox">
            <h5 class="end">le: {{createdAt}}</h5>

            <button class="transparent" v-on:click="like">
                <i class="black fa fa-regular fa-thumbs-up"></i>
            </button>
            <p class="black compteur ">{{responseLikes}}</p>

            <button class="transparent" v-on:click="dislike">
                <i class="black fa fa-regular fa-thumbs-down"></i>
            </button>
            <p class="black compteur">{{responseDislikes}}</p>

        </div>
 
  </div>
</div>
</template>

<script>

import axios from 'axios';

export default {

  name: 'Response',

  props: {
    id: String
  },

  components:{
  },

  data() {
    return {
        isAdmin : null,
        userCheck:null,
        author: null,
        createdAt: null,        
        content: null,
        userId:null,
        responseLikes: null,
        responseDislikes: null
        
    }
  },

  async mounted(){
      let headers = await this.$store.dispatch('authentificateRequest')
    axios
        .get('http://localhost:3000/responses/getOne/' + this.id, {headers})
        .then((response) => {
            this.createdAt = response.data.createdAt;
            this.content = response.data.content;
            this.userId = response.data.userId;
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

    this.getResponseLikes();
    this.getResponseDislikes();

  },

  methods:{
    async getResponseLikes() {
      let headers = await this.$store.dispatch('authentificateRequest')
              axios
        .get('http://localhost:3000/responseLike/' + this.id, {headers})
        .then((response) => {
            this.responseLikes = response.data.length;
        });
    },

    async getResponseDislikes() {
      let headers = await this.$store.dispatch('authentificateRequest')
        axios
        .get('http://localhost:3000/responseDislike/' + this.id, {headers})
        .then((response) => {
            this.responseDislikes = response.data.length;
        });
    },

    async like() {
      let headers = await this.$store.dispatch('authentificateRequest')
        axios
        .post('http://localhost:3000/responseLike', {
            userId: this.$store.state.user.userId,
            responseId: this.id
        }, {headers})
        .then(() => {
            this.getResponseLikes();
        });
    },

    async dislike() {
      let headers = await this.$store.dispatch('authentificateRequest')
        axios
        .post('http://localhost:3000/responseDislike', {
            userId: this.$store.state.user.userId,
            responseId: this.id
        }, {headers})
        .then(() => {
            this.getResponseDislikes();
        });
    },
    async deleteResponse(){
      let headers = await this.$store.dispatch('authentificateRequest')
      axios
        .delete('http://localhost:3000/responses/' + this.id, {headers})
        .then(() => {
          axios
                .get('http://localhost:3000/responses/' + this.$parent.id, {headers} )
                .then((response) => {                
                   this.$parent.responses = response.data;
                   this.$parent.$parent.responses -- ;
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
 
  margin-left:13%;
  position:absolute
  }
.userAccess button{
    transform: scale(1.2) translateY(20px);
  transition: all 200ms ease-in-out;
  border-radius: 50%;
  width:30px;
  height:30px;
  background: #f2f2f2a3;
  transform-origin: center;
}
.userAccess:hover button{
  transform: scale(1.5) translateY(18px);
  background-color: white;
}

.white{
    color:white
}
.comments{
  margin-left:20%;
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
.black{
  color:black !important
}
</style>

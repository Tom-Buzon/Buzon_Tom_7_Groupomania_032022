<template>
    <div  class="responsesContainer">
    <Response  :key="index" v-for="(response, index) in responses" :id="response.id" />
    
    <div class="inputEnd">
      <textarea class="inputText" v-model="textResponse"  placeholder="     saisissez votre réponse" >   
      </textarea>
      <button class="submit" v-on:click="submit()">Envoyer</button>
    </div>
  </div>
</template>

<script>

import axios from 'axios';
import Response from './Response.vue';

export default {

  name: 'Responses',

  props: {
    id: String
  },

  components:{
    Response
  },

  data() {
    return {
        responses : [],
        textResponse : null
    }
  },

  async mounted(){
      let headers = await this.$store.dispatch('authentificateRequest')
    axios
        .get('http://localhost:3000/responses/' + this.id, {headers})
        .then((response) => {
            this.responses = response.data
           
        });

  },

  methods:{
    submit : async function(){
      //console.log(this.textComment)
      const response ={
        commentId : this.id,
        userId: this.$store.state.user.userId,
        content : this.textResponse
      }
      let headers = await this.$store.dispatch('authentificateRequest')
      axios
        .post('http://localhost:3000/responses/'  , {response}, {headers})
        .then(() => {
            axios
              .get('http://localhost:3000/responses/' + this.id, {headers})
              .then((response) => {
                  this.responses = response.data;
                  this.$parent.responses ++

              });
      });      
    }

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>


.white{
    color:white
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
  transform: translateX(-70px) translateY(27px);
  transition: all 200ms ease-in-out;
}
.submit:hover{
  transform: translateX(-70px) translateY(27px) scale(1.1);
  background-color: #2196F3;
  color:white;
}
</style>

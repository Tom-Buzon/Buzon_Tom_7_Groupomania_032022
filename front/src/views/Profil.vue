<template>
<div>
<nav>
<h1 class="card__title">Groupomania</h1>
<div class="form-row">
      <button @click="goApp()" class="logout profil">
        App
      </button>
      <button @click="logout()" class="logout">
        Déconnexion
      </button>
    </div>
</nav>
  <div class="card">
    
    <h1>mon profil</h1>
    <h3>Name :</h3>
    <p>{{ name }}</p>
    
    <button @click="deleteProfil()" class="deleteProfil">Supprimer mon profil</button>

  </div>
</div>
</template>

<script>
import axios from 'axios';

//import { mapState } from 'vuex';
//import Articles from '../components/Articles.vue'


export default {
  name: 'Profil',
  components:{
    
  },
    data() {
     return {
       name : null
    } 
  },
  mounted: function () {

    if (this.$store.state.user.ID === -1) {
      this.$router.push('/');
      return ;
    }
     this.$store.state.user = JSON.parse(localStorage.getItem('user'))

      let authorization =[];
            authorization.push(this.$store.state.user.userId)
            authorization.push(this.$store.state.user.token )
            authorization.push(this.$store.state.user.isAdmin )
      let headers = { authorization } 
    axios
       .get('http://localhost:3000/users/' + this.$store.state.user.userId, {headers})
       .then((response) => {
           this.name = response.data.name;

       });

  },
  methods: {
      logout: function () {
            this.$store.commit('logout');
            this.$router.push('/');

    },
    deleteProfil(){
      let authorization =[];
            authorization.push(this.$store.state.user.userId)
            authorization.push(this.$store.state.user.token )
            authorization.push(this.$store.state.user.isAdmin )
      let headers = { authorization } 
    axios
       .delete('http://localhost:3000/users/' + this.$store.state.user.userId, {headers})
       .then(() => {
          this.$store.commit('logout');
            this.$router.push('/');
       });

    },
    goApp: function () {
      this.$router.push('/home'); 
    },

    
  }
}

</script>

<style scoped>

nav {
  /* display: flex; */
  justify-content: center;
  position: sticky;
  top: 0px;
  left: 0;
  right: 0;
  border-bottom: 1px #000000 solid;
  background-color:white  ;
}
.card{
  margin-top:40px;
  text-align: center;
  border-radius: 20px;
  background: #2196F3;
  color:white
}

.logout {
  background: #2196F3;
  color:white;
  border-radius: 8px;
  font-weight: 800;
  font-size: 15px;
  border: none;
  width: 150px;
  padding: 8px;
  transition: .4s background-color;
  position: absolute;
  right: 0px;
  top:0px
}
.profil{
  right:170px !important
}
.deleteProfil{
  transform: scale(1.5);
  margin-top:40px
}

</style>>

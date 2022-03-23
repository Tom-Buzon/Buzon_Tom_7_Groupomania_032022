<template>
<div>
<nav>
<h1 class="card__title">Groupomania</h1>
<div class="form-row">
      <button @click="goProfil()" class="logout profil">
        Mon Profil
      </button>
      <button @click="logout()" class="logout">
        Déconnexion
      </button>
    </div>
</nav>
  <div class="card">
    
    <ArticleCreation />
     
    <Articles />

  </div>
</div>
</template>

<script>
import { mapState } from 'vuex';
import Articles from '../components/Articles.vue'
import ArticleCreation from '../components/ArticleCreation.vue'

export default {
  name: 'Home',

  components:{
    Articles , ArticleCreation
  },
  
  mounted: function () {

   // this.$store.state.user = JSON.parse(localStorage.getItem('user'))
  
    console.log(this.$store.state )
      if (this.$store.state.user.ID === -1) {
      this.$router.push('/');
      return ;
    }
    
  },

  computed: {
    ...mapState({
      articles: 'articles',
      user : 'user'
    })
  },
    
  methods: {

    logout: function () {
      this.$store.commit('logout');
      this.$router.push('/');

    },
    goProfil: function () {
      //console.log('hello')
      this.$router.push('/profil');
    
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

</style>>

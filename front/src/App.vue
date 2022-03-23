<template>
  <router-view></router-view>
</template>

<script>

export default {
  name: 'App',
  components: {
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;800&display=swap');


* {
  font-family: 'Poppins', sans-serif;
  margin:0;
  padding: 0;
  box-sizing: border-box;
}

#app {
  max-width: 100%;
}

body {
 /*  background-image: linear-gradient(62deg, #FBAB7E 0%, #F7CE68 100%); */
 /* filter: blur(4px); */

  background-image: url('../public/images/cyril-mazarin-WSvth_lwCi0-unsplash.jpg');
  background-size:cover ;
  background-attachment: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding:0px;
  background-position: center;
}

img {
  max-width: 100%;
  border-radius: 8px;
}

.card {
  max-width: 100%;
  width: 1200px;
  background:rgba(1, 1, 1, 0);
  border-radius: 16px;
  padding:32px;
}

.card__title {
  text-align:center;
  font-weight: 800;
}

.card__subtitle {
  text-align: center;
  color:#666;
  font-weight: 500;
}



  .card__action {
    color:#2196F3;
    text-decoration: underline;
  }

  .card__action:hover {
    cursor:pointer;
  }

  .button:hover {
    cursor:pointer;
    background: #1976D2;
  }

  .button--disabled {
    background:#cecece;
    color:#ececec
  }
  .button--disabled:hover {
    cursor:not-allowed;
    background:#cecece;
  }

</style>

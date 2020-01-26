<template>
  <div id="app">
    <Game></Game>
  </div>
</template>

<script>
import Game from './components/Game.vue'

export default {
  name: 'app',
  components: {
    Game
  }
}
</script>
<style>
body {
  background-color: #F5CDA7;
  display:flex;
  justify-content: center;

}
#app {
  margin:20pt;
}
</style>
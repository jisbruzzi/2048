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
  background-color: #f8fe55;
  display:flex;
  justify-content: center;

}
#app {
  margin:20pt;
}
</style>
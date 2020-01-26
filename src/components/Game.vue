<template>
    <div id="container">
        <span id="title">2048 LOCO</span>
        <game-board></game-board>
    </div>
</template>
<script>
import GameBoard from './GameBoard.vue'
export default {
    name:"Game",
    components:{
        GameBoard
    }
}
</script>

<style scoped>
#title {
    font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
    text-align: center;
    margin: 8pt;
    font-size: 30pt;
    font-weight: 1000;
    letter-spacing: 4pt;
    color:#FAA381;
}
#container {
    display:flex;
    flex-direction: column;
    
}
</style>
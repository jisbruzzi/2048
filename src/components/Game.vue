<template>
    <div>
        <div>Pepenacho's 2048</div>
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
<template>
    <div id="container">
        <transition-group name="boxes" tag="div">
            <div v-for="box in boxes" 
                v-bind:key="box.id" 
                class="box" 
                v-bind:style="styleForBox(box)">
                <div class="text-container">{{box.value}}</div>
            </div>
        </transition-group>
    </div>
</template>
<script>
import {move} from './GameRules.js'

export default {
    name:"GameBoard",
    data:()=>{return {boxes:[]}},
    created(){
        this.onKeyDown = this.onKeyDown.bind(this)
        document.addEventListener("keydown",this.onKeyDown)
    },
    destroyed(){
        document.removeEventListener("keydown",this.onKeyDown)
    },
    methods:{
        onKeyDown(e){
            console.log(e)
            switch(e.key){
                case "ArrowUp":
                    this.boxes=move("up",this.boxes);
                    break;
                case "ArrowDown":
                    this.boxes=move("down",this.boxes);
                    break;
                case "ArrowLeft":
                    this.boxes=move("left",this.boxes);
                    break;
                case "ArrowRight":
                    this.boxes=move("right",this.boxes);
                    break;
            }
        },
        styleForBox(box){
            let zIndex = box.above ? 1 : 0;
            let len=(box.value+"").length;
            let fontSize= 75;
            switch(len){
                case 3:fontSize=50;break;
                case 4:fontSize=38;break;
            }
            return `left:${box.x*100}px;top:${box.y*100}px;z-index:${zIndex};font-size:${fontSize}px;`
        }
    }
    
}
</script>

<style scoped>
#container {
    width: 400px;
    height: 400px;
    border-width: 4px;
    border-color: #5F00BA;
    border-style:solid;
    position:relative;
    background-color:#A09BE7;
}
.box{
    width:90px;
    height:90px;
    margin: 1px;
    border-width: 4px;
    border-color: #D6FF79;
    background-color:#B0FF92;
    color:#5F00BA;
    border-style:solid;
    position: absolute;
    font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
    font-size: 75px;
    text-align: center;
    vertical-align: middle;
    display:flex;
    flex-direction: column;
    justify-content: space-around;
}

.boxes-enter-active, .boxes-leave-active {
    transition: opacity .5s;
}
.boxes-enter, .boxes-leave-to{
    opacity:0;
}
.boxes-move{
    transition: transform cubic-bezier(0.445, 0.05, 0.55, 0.95) 0.1s;

}
</style>
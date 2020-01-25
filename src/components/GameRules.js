function boxAt(boxes,{x,y}){
    return boxes.find(b=>b.x==x && b.y==y) || null;
}
function randomPosition(){
    return {
        x:Math.floor(Math.random()*4),
        y:Math.floor(Math.random()*4),
    }
}
function boardIsFull(boxes){
    for(let x=0;x<4;x++){
        for(let y=0;y<4;y++){
            if(!boxAt(boxes,{x,y})){
                return false;
            }
        }
    }
    return true;
}
function addBox(boxes){
    if(boardIsFull(boxes)){
        return boxes;
    }
    let pos=null;
    do{
        pos=randomPosition();
    }while(boxAt(boxes,pos)!=null)
    return boxes.concat([{
        x:pos.x,
        y:pos.y,    
        value:Math.floor(Math.random()*4),
        id:Math.random()*1000
    }])
}

function movePosition(direction,pos){
    switch(direction){
        case "up":pos.y-=1;break;
        case "down":pos.y+=1;break;
        case "left":pos.x-=1;break;
        case "right":pos.x+=1;break;
    }
    return pos;
}
function moveBox(direction,box){
    let pos=movePosition(direction,{x:box.x,y:box.y});
    return {
        x:pos.x,
        y:pos.y,
        value:box.value,
        id:box.id
    };
}
function moveBoxes(direction,boxes){
    return boxes.map(b=>moveBox(direction,b))
}

export function move(direction,boxes){
    console.log(direction,boxes)
    let ret= addBox(moveBoxes(direction,boxes));
    console.log(ret)
    return ret;
}
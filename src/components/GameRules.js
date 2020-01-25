function addBox(boxes){
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


function moveBoxes(direction,boxes){
    function boxesInAxis(z){

    }


    let ret=[]
    for(let z=0;z<3;z+=1){
        let current=boxesInAxis(z);
        let projected=projectBoxescurrent);
        let moved=moveBoxes(projected);
        let unProjected=rebuildBoxes(z,moved);
        ret=ret.concat(unProjected);
    }
    return ret;
}

export function move(direction,boxes){
    console.log(direction,boxes)
    let ret= addBox(moveBoxes(direction,boxes));
    console.log(ret)
    return ret;
}
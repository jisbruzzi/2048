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
    let possibleValues=[2,4];
    return boxes.concat([{
        x:pos.x,
        y:pos.y,    
        value:possibleValues[Math.floor(Math.random()*possibleValues.length)],
        id:Math.random()*1000,
        above:false
    }])
}


function moveBoxes(direction,boxes){
    function inAxis(b,z){
        if(direction=="up" || direction=="down"){
            return z==b.x;
        }else{
            return z==b.y;
        }
    }
    function project(box){// movement towards 0
        let z=0;
        switch(direction){
            case "up": z = box.y; break;
            case "down": z = 3 - box.y; break;
            case "left": z = box.x; break;
            case "right": z = 3 - box.x; break;
        }
        return {
            z,
            id:box.id,
            value:box.value,
            merged:false
        };
    }
    function moveProjectedBoxes(boxes){
        function boxAt(z){
            return boxes.find(b=>b.z==z) || null
        }
        let orderedBoxes = []
        function lastBox(){
            if(orderedBoxes.length==0){
                return null
            }else{
                return orderedBoxes[orderedBoxes.length-1];
            }
        }
        function mergeBoxes(recent,previous){
            previous.above=false
            return {
                z:previous.z,
                value:recent.value*2,
                id:recent.id,
                above:true,
                merged:true,
            }
        }

        console.log("entran:",boxes)
        for(let z=0;z<4;z+=1){
            let current = boxAt(z)
            let last=lastBox()
            if(current!=null){
                if(last==null){
                    orderedBoxes.push(current)
                }else{
                    if(last.value==current.value && !last.merged){
                        orderedBoxes.pop()
                        orderedBoxes.push(mergeBoxes(current,last))
                    }else{
                        orderedBoxes.push(current)
                    }
                }
            }
        }
        let ret = orderedBoxes.map((box,index)=>{
            box.z=index;
            return box;
        })
        console.log("salen:",ret)
        return ret;
    }
    function rebuildBox(z,box){
        let newBox={}
        switch(direction){
            case "up":
                newBox.x=z;
                newBox.y=box.z;
            break;
            case "down":
                newBox.x=z;
                newBox.y=3 - box.z;
            break;
            case "left":
                newBox.x=box.z;
                newBox.y=z;
            break;
            case "right":
                newBox.x=3-box.z;
                newBox.y=z;
            break;
        }
        newBox.id=box.id;
        newBox.value=box.value;
        newBox.above=box.above;
        return newBox;
    }


    let ret=[]
    for(let z=0;z<4;z+=1){
        let current=boxes.filter(b=>inAxis(b,z))
        let projected=current.map(project);
        let moved=moveProjectedBoxes(projected);
        let unProjected=moved.map(b=>rebuildBox(z,b));
        ret=ret.concat(unProjected);
    }
    return ret;
}

export function move(direction,boxes){
    let ret= addBox(moveBoxes(direction,boxes));
    return ret;
}
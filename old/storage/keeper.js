///Хранит все основную информацию о переменных, проводит с ней различные операции
class Keeper{
    constructor(){
        this.spritesheetArray=[];
        this.imageArray =[];
        this.tileArray = [];
        //this.audioArray=[];
        this.userArray =[];
        this.clientArray =[];
        //this.personArray = [];
       
        this.map = [];
        this.creatureArray = [];
        this.objectArray =[];
        //this.cellArray = [];
        
    }
    getUserByPersonId(personId){
        for(let i in this.userArray){
           if(this.userArray[i].personId == personId)
            {
                return this.userArray[i];
            }
       }
        return false;
    }
    getClientByUserId(userId){
        for(let i in this.clientArray){
            if(this.clientArray[i].user){
                if(this.clientArray[i].user.id == userId)
                {
                    return this.clientArray[i];
                }
            }
           
       }
        return false;
    }
    ///Получить количество клиентов
    getClientsCount(){
        let count = 0;
        for(let i in this.clientArray){
            count++;
        }
        return count;
    }
    ///Получить пользователя по логину
    getUserByLogin(login){
       for(let i in this.userArray){
           if(this.userArray[i].login == login)
            {
                return this.userArray[i];
            }
       }
        return false;
    }
    ///Получить пользователя по SID
    getUserBySID(sid){
       for(let i in this.userArray){   
            if(this.userArray[i].sessionId == sid)
            {
                return this.userArray[i];
            }
        }
    return false;     
    }
    ///Получить клиента по пользователю
    getClientByUser(user){
        for(let i in this.clientArray){   
            if(this.clientArray[i].user == user)
            {
                return this.clientArray[i];
            }
        }
    return false; 
    }
    ///Получить персонажа по id
    getPersonById(id){
        for(let i in this.creatureArray){   
            if(this.creatureArray[i].id == id)
            {
                return this.creatureArray[i];
            }
        }
    return false; 
    }
    ///Получить зону по id
    getZoneById(id){
        for(let i in this.map){   
            if(this.map[i].id == id)
            {
                return this.map[i];
            }
        }
    return false; 
    }
    ///Показать всех клиентов (не работает)
    showAllClients(){
        for(let i in this.clientArray){   
            SERVICE.logger.debugLog(this.clientArray[i]);
        }
        
    }
    addUser(login,password){
        let num = this.userArray.push(new SERVICE.class.server.user({
            id:null,
            login: login,
            password: password,

        }));
        return this.userArray[num -1];
    }
    addPerson(name){
        let num = this.creatureArray.push(new SERVICE.class.server.person({
            id:null,
            images:null,
            name:name,
            x: SERVICE.math.randomInteger(40,60),
            y: SERVICE.math.randomInteger(40,60),
            sizeWidth:0.5,
            sizeHeight:0.5,
            speed : 0.05,
            isPlayer:true,

        }));
        return this.creatureArray[num -1];
    }
    addCreature(name){
        let num = this.creatureArray.push(new SERVICE.class.server.person({
            id:null,
            images:null,
            name:name,
            x: SERVICE.math.randomInteger(40,60),
            y: SERVICE.math.randomInteger(40,60),
            sizeWidth:0.5,
            sizeHeight:0.5,
            speed : 0.01,
            isPlayer:false,

        }));
        return this.creatureArray[num -1];
    }
    addObject(name){
        let size = SERVICE.math.randomInteger(1,3)
        let num = this.objectArray.push(new SERVICE.class.server.object({
            id:null,
            images:null,
            name:name,
            x: SERVICE.math.randomInteger(40,60),
            y: SERVICE.math.randomInteger(40,60),
            sizeWidth:size,
            sizeHeight:size,
        }));
        return this.creatureArray[num -1];
    }
    addTileToMap(x,y,key,frame){
        this.map[x+':'+y] = new SERVICE.class.server.tile({
            id:null,
            x: x,
            y: y,
            images: {
                key:key
            },
            frame:frame

        });
        return this.map[x+':'+y];
    }
    addZoneToMap(x,y,tileMap,leftTopDotX,leftTopDotY,width,height){
        let num = this.map[x+':'+y] = new SERVICE.class.server.zone({
            id:null,
            tileMap:tileMap,
            x:x,
            y:y,
            leftTopDotX:leftTopDotX,
            leftTopDotY:leftTopDotY,
            width:width,
            height:height
        });
        return this.map[x+':'+y];
    }
    getZoneByXY(x,y){
        for(let i in this.map){
            ///Если x и y оказываются в пределах зоны возвращаем id этой зоны
            if(((this.map[i].leftTopDot.x <= x) && (x < (this.map[i].leftTopDot.x + this.map[i].width))) && ((this.map[i].leftTopDot.y <= y) && (y < (this.map[i].leftTopDot.y + this.map[i].height))))
                return this.map[i];
        }
        return false;
    }
    getRegion(zone){
        let region ={
            x:null,
            y:null,
            zoneArray : [],
        };
        for(let i = 1; i< 10 ; i++){
            let str = null;
            switch(i){
                case 1: str = (zone.x - 1)+':'+(zone.y -1);
                    break;
                case 2: str = (zone.x)+':'+(zone.y -1);
                    break;
                case 3: str = (zone.x + 1)+':'+(zone.y -1);
                    break;
                case 4: str = (zone.x - 1)+':'+(zone.y);
                    break;
                case 5: str = (zone.x)+':'+(zone.y);
                    break;
                case 6: str = (zone.x + 1)+':'+(zone.y);
                    break;
                case 7: str = (zone.x - 1)+':'+(zone.y + 1);
                    break;
                case 8: str = (zone.x)+':'+(zone.y + 1);
                    break;
                case 9: str = (zone.x + 1)+':'+(zone.y + 1);
                    break;
            }
            if(this.map[str]){
                if(i == 1 ){
                    region.x = this.map[str].leftTopDot.x;
                    region.y = this.map[str].leftTopDot.y;
                }
                region.zoneArray.push(this.map[str].tileMap);
            }
            else{
                region.zoneArray.push(null);
            }
        }
        return region;
    }
    ///exeptionsId - id исключений которые не ищем
    getCreaturesInRadus(x,y,radius,exeptionsId){
        let arr = [];
        for(let i in this.creatureArray){
            let crX = this.creatureArray[i].Position.x;
            let crY = this.creatureArray[i].Position.y;
            let crW = this.creatureArray[i].Size.width /2;
            let crH = this.creatureArray[i].Size.height /2;
            //console.log(x,y,radius,crX,crY,crW,crH);
            //console.log((crX+crW),(x-radius));
            ///Если x и y оказываются в пределах зоны возвращаем id этой зоны
            if( ( ( (crX+crW) <= (x+radius) ) && ( (x-radius) < (crX - crW) ) ) && ( ( (crY+crH) <= (y+radius) ) && ((y-radius) < (crY - crH) ) ) ){
                if(!this.isInArray(this.creatureArray[i].id,exeptionsId))
                    arr.push(this.creatureArray[i]); 
            }     
        }
        return arr;
        
    }
    ///exeptionsId - id исключений которые не ищем
    getObjectsInRadus(x,y,radius,exeptionsId){
        let arr = [];
        for(let i in this.objectArray){
            let crX = this.objectArray[i].Position.x;
            let crY = this.objectArray[i].Position.y;
            let crW = this.objectArray[i].Size.width /2;
            let crH = this.objectArray[i].Size.height /2;
            //console.log(x,y,radius,crX,crY,crW,crH);
            //console.log((crX+crW),(x-radius));
            ///Если x и y оказываются в пределах зоны возвращаем id этой зоны
            if( ( ( (crX+crW) <= (x+radius) ) && ( (x-radius) < (crX - crW) ) ) && ( ( (crY+crH) <= (y+radius) ) && ((y-radius) < (crY - crH) ) ) ){
                if(!this.isInArray(this.objectArray[i].id,exeptionsId)){
                    
                    arr.push(this.objectArray[i]);
                }
                         
            }     
        }
        return arr;
        
    }
    isInArray(elem,array){
        for(let i in array){
            if(array[i] == elem)
                return true;
        }
        return false;
    }
    
    
}
module.exports = Keeper;
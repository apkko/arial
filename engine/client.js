class Client {
    constructor(id,socket){
        this.id = id;
        this.socket = socket;
        this.connect = true;
        this.user = null
        
        this.manager = false;
        //Обновление мэнэджера
        this.managerTimeUpdate = G_ENGINE.SETTING.MANAGER_UPDATE;
        this.managerLastTimeUpdate = Date.now();
        ///
        this.admin = false;
        //this.sendData = new SendData();
        this.buttonData ={
            up:false,
            down:false,
            right:false,
            left:false,
        }
        ///SEND
        
        this.person = null;
        this.personOldX = null;
        this.personOldY = null;
        this.personCurrentZoneId = null;
        this.creatures = [];
        this.objects =  [];
        this.tileMapData ={
            data: null,
            needToSend:false,
            isSended: false,
        }; 
        
        
    }
    getUserId(){
        if(this.hasUser()){
            return this.user.id;
        }else{
            return false;
        }
    }
    //Проверка есть ли клиент
    hasUser(){
        if(this.user != null)
            return true;
        else
            return false;
    }
    onDelete(){
        if(this.user != null){
            this.user.setOffline();
        }
    }
    
    prepareDataToSend(){
        
    }
    prepareSendData(){
        let data ={
            person:null,
            creatures:null,
            objects:null
        }
        //data.creatures = this.creatures;
        //data.objects = this.objects;
        data.person = this.preparePersonData();
        return data;
    }
    prepareTileMapData(){
        let data ={
            tileMap:null,
        }
        if(this.tileMapData.needToSend){
            data.tileMap = this.tileMapData.data;
            this.tileMapData.isSended = true;
        }
        return data;
    }
    ///Подготовка данных о персонаже
    preparePersonData(){
        return this.user.person;
    }
    prepareCreaturesData(person,client){
        ///Получаем список существ в пределах видимости
        ///getCreaturesInRadus
        let  exeptionsId = [];
        exeptionsId.push(person.id);
        let creatures = SERVICE.keeper.getCreaturesInRadus(person.Position.x,person.Position.y,person.overlook/2,exeptionsId);
        if(JSON.stringify(client.sendData.creatures) !== JSON.stringify(creatures))
            client.sendData.creatures = creatures;
        else 
            client.sendData.creatures = null;
    }
    collectObjectsData(person,client){
        ///Получаем список объектов в пределах видимости
        let exeptionsId = [];
        let objects = SERVICE.keeper.getObjectsInRadus(person.Position.x,person.Position.y,person.overlook/2,exeptionsId);
        if(JSON.stringify(client.sendData.objects) !== JSON.stringify(objects))
            client.sendData.objects = objects;
        else 
            client.sendData.objects = null;
    }
    ///Сбор информации о карте
    collectTileMap(person,client){
        ///Если игрок передвигался
        if((client.sendData.personOldX != person.Position.x) || (client.sendData.personOldY != person.Position.y)){
            //console.log("MOVE")
            ///Меняем старые координаты в буфере на новые
            client.sendData.personOldX = person.Position.x;
            client.sendData.personOldY = person.Position.y;
            
            ///ищем зону по текущим координатам
            let zone = SERVICE.keeper.getZoneByXY(person.Position.x,person.Position.y);
            //Если такая зона вообще существует
            if(zone){
                ///Если это не текущая зона в которой игрок
                //console.log("TEST NEW ZONE")
                //console.log(zone.id , client.sendData.personCurrentZoneId);
                if(zone.id != client.sendData.personCurrentZoneId){
                    //console.log("NEW ZONE UPDATED")
                    ///Меняем у перса текущую зону
                    client.sendData.personCurrentZoneId = zone.id;
                    ///Получаем смежные зоны, и передаем их
                    client.sendData.tileMapData.data = SERVICE.keeper.getRegion(zone);
                    
                    /*
                    let zone = SERVICE.keeper.getZoneById(id);
                    client.sendData.tileMapData.data.coordX = zone.leftTopDot.x;
                    client.sendData.tileMapData.data.coordY = zone.leftTopDot.y;
                    client.sendData.tileMapData.data.map = zone.tileMap;
                    */
                    ///Флаг нужно ли отправлять данные (данные обновлены, ставим флаг)
                    client.sendData.tileMapData.needToSend = true;
                    client.sendData.tileMapData.isSended = false;
                   
                  
                }
                ///Флаг нужно ли отправлять данные (так как мы передвигались НО локация не поменялась отправлять данные не надо)
                if(client.sendData.tileMapData.isSended)
                    client.sendData.tileMapData.needToSend = false;
            }
            //Флаг нужно ли отправлять данные (Так как мы не понимаем где находится игрок отправлять данные не надо)
            if(client.sendData.tileMapData.isSended)
                client.sendData.tileMapData.needToSend = false;
        }
        else{
            ///Флаг нужно ли отправлять данные (так как мы не передвигались отправлять данные не надо)
            if(client.sendData.tileMapData.isSended)
                client.sendData.tileMapData.needToSend = false;
        }       
    }
    
}
module.exports = Client;
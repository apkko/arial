////Тут подготавляиваются данные для передачи клиенту
class Collector{
    constructor(){
        this.tileMapSize = 150;
        this.isComplate = false;
    }
    collectAllData(callback){
   
        ////Собираем данные, по окончанию сборки ставим флаг 
        for(let i in SERVICE.keeper.clientArray){
            ///Если клиенту назначен пользовател
            if(SERVICE.keeper.clientArray[i].user){
                ///Если пользователь в онлайне
                if(SERVICE.keeper.clientArray[i].user.online){
                    let person = SERVICE.keeper.getPersonById(SERVICE.keeper.clientArray[i].user.personId);
                    this.collectPersonData(person,SERVICE.keeper.clientArray[i]);
                    this.collectCreaturesData(person,SERVICE.keeper.clientArray[i]);
                    this.collectObjectsData(person,SERVICE.keeper.clientArray[i]);
                    this.collectTileMap(person,SERVICE.keeper.clientArray[i]);
                    
                 
                } 
            }
        }
        
        this.isComplate = true;
        if(this.isComplate){
             callback();
            this.isComplate =false;
        }
    }
    collectPersonData(person,client){
        client.sendData.person = person;
    }
    collectCreaturesData(person,client){
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
    collectTileMap2(person,client){
        ///Берем координаты персонажа, ищим в какой зоне (в каком квадрате) он находится 
        ///Сравниваем ID полученной зоны с зоной записаной в параметре перонажа ZoneID, если они совпадают (значит персонаж либо не передвигается либо передвигается по текущей зоне и можно не передавать новую карту) ничего не делаем, в противном случаем, если зона отличается (персонаж передвинулся в соседнюю зону) - меняем в параметре ZoneId на ID полученной зоны, и создаем объект регион и кладем в него массив зон (9 штук (8 вокруг нашей зоны)) и крайние верхние левые координаты (координата первой зоны первого тайла), и передаем этот массив на клиент.
        ///Что такое зона? - Объект с массивом тайлов определенного размера (к примеру 50 на 50), ID, координаты крайнего левого верхнего тайла, свои координаты X и Y 
        
        let cellNumb=0;
        
            for(let y=0; y < this.tileMapSize;y++){
                client.sendData.full.tileMap.map[y] = []; 
                for(let x=0; x< this.tileMapSize;x++){
                    
                    let xP = (person.x - (this.tileMapSize/2 - x));
                    let yP = (person.y - (this.tileMapSize/2 - y));
                     
                    if((y == 0) && (x == 0)){
                        client.sendData.full.tileMap.coordX = xP;
                        client.sendData.full.tileMap.coordY = yP;
                    }
                      if(SERVICE.keeper.map[xP+':'+yP]){
                         
                        
                        client.sendData.full.tileMap.map[y][x] = {
                            key:SERVICE.keeper.map[xP+':'+yP].images.key,
                            frame:SERVICE.keeper.map[xP+':'+yP].frame,
                        };
                       
                      }
                      ///Если такой клетки нет
                      else{
                        client.sendData.full.tileMap.map[y][x]= {
                            key:null,
                            frame:null,
                        }
                      }
                      cellNumb++;

                }
                
            }
        
    }
}
module.exports = Collector;
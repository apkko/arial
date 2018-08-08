///Файл запускающий сервер
console.log("...Application started...");

const PORT = process.env.PORT || 3000;
console.log('...Current port:'+PORT);

var engine = new require('./engine/engine.js');

var Engine = new engine(PORT);

//console.log(Engine);




console.log("...All require is included...");

console.log("...All Services is created...");
//console.log(G_ENGINE);
Engine.init();

Engine.start();

/*
let ent1 = G_ENGINE.EntityManager.createEntity('player_human');
console.log(ent1);
*/
///Запускаем слушатель

//SERVICE.listener.start();
//SERVICE.gamer.start();

//let person = SERVICE.keeper.addPerson('test');

//let user = SERVICE.keeper.addUser('login','password');
//user.personId = person.id;

//let person2 = SERVICE.keeper.addPerson('test2');
//let user2 = SERVICE.keeper.addUser('login2','password2');
//user2.personId = person2.id;

//SERVICE.keeper.tileArray.push({imageKey:'grass',frame:0})



/*
for(let i= 0 ; i< 10;i ++){
    SERVICE.keeper.addCreature('BOT'+i);
    console.log("bot is created");
}
for(let i= 0 ; i< 10;i ++){
    SERVICE.keeper.addObject('Stone'+i);
    console.log("object is created");
}
createMap(function(){
    console.log('Map is created');
})
function f(callback){
    for(let y = 0; y < 50 ; y++){
        if(y == 0) console.log('start');
        for(let x = 0; x < 50 ; x++){
            SERVICE.keeper.addTileToMap(x,y,'grass',5);
        }
        if(y == 49)
            callback();
    }
}
function createMap(callback){
    ///Создаем карту по зонам
    ///Ширина высота зоны (в координтатах (количество тайлов))
    let widthZone = 15;
    let heightZone = 15;
    ///Количество зон по ширине и высоте
    let zoneWidthCount = 50;
    let zoneHeightCount = 50;
    ////Создаем зоны
    for(let i = 0; i< zoneHeightCount; i++){
        
        if(i == 0) console.log('Start creatig Map');
        
        for(let j = 0; j< zoneWidthCount; j++){
            
            ///Создаем тайлмап для зоны
            let tileMap = [];
            for(let y = 0; y < heightZone ; y++){
                tileMap[y] = [];
                

                for(let x = 0; x < widthZone ; x++){
                    ///Кладем в массив тайлов для зоны ID тайла
                    tileMap[y][x] = SERVICE.math.randomInteger(0,5); ///id tile
                }
                
            }
            ////Добавляем зону на карту
            SERVICE.keeper.addZoneToMap(j,i,tileMap,j*widthZone,i*heightZone,widthZone,heightZone);
        }
        ///Просто коллбэк по завершению создания карты
        if(i == zoneHeightCount -1){
            callback();
        }
    }
    
    
}

*/




/*
function randomInteger(min, max) {
    var rand = min - 0.5 + Math.random() * (max - min + 1)
    rand = Math.round(rand);
    return rand;
  }

*/




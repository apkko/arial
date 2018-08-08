///Весь работающий код находится в системах
///Для каждого компонента своя система его обрабатывающая
///Приоритеты у систем
///Нужен доступ и ко всем мэнэджерам
class System{
    constructor(){
       
    }
    ///Получить сущьности с такимито компонетами
    getEntityWith(arr){
        
    }
    
}
class Movement extends System{
    constructor(){
       super();
    }
    update(){
        console.log('NEW_TEST');
        //console.log('update movement system');
    }
    
}
class Direction extends System{
    constructor(){
       super();
    }
    update(){
        
    }
    
}
class Collision extends System{
    constructor(){
       super();
    }
    update(){
        
    }
    
}

module.exports.Movement = Movement;
module.exports.Direction = Direction;
module.exports.Collision = Collision;

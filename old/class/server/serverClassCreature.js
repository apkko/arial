var GameEntity = require('./serverClassGameEntity.js');
class Creature extends GameEntity{
    constructor(obj){
        //Тип объекта
        var type = 'creature';
        //Вызов конструктора родительского класса GameEntity(id,тип,имя,картинки, координаты, размеры)
        super(obj.id,type,obj.name,obj.images,obj.x,obj.y,obj.sizeWidth,obj.sizeHeight);
        
        //this.sex = obj.sex || null;
        //this.characteristics = obj.characteristics || null;
       // this.scills = obj.scills || null;
       // this.needs = obj.needs || null;
       // this.ailments = obj.ailments || null;
       // this.inventory = obj.inventory || null;
       // this.equipment = obj.equipment || null;
       // this.action = obj.action || null;
        this.speed = obj.speed || null;
        //this.vector = obj.vector || null;
        this.controller = new SERVICE.class.server.II();//obj.controller || null; ///ИИ
        this.isPlayer = obj.isPlayer || null; ///Контролирует - игрок или ии
        
        this.overlook = 15; //obj.overlook || null;
    }
    update(){
        
        this.moveUpdate();
        
        
    }
    moveUpdate(){
        ///Получаем будушие координаты на которые надо передвинуться
        let newCoord = this.getFutureCoords();
        ///Создаем новый объект с этими координатами
        let rect = {
            Position:{
                x:newCoord.x,
                y:newCoord.y,
            },
            Size:{
                width:this.Size.width,
                height:this.Size.height,
            }
        };
        
        ///Проверяем можем ли мы передвинуться
        if(this.checkMove(rect)){
            ///Передвигаем объект
            this.move(newCoord.x,newCoord.y)
        }
        
    }
    
    ///Проверка передвижения
    checkMove(obj){
        ///Проверка на столкновение о всеми объектами
        if(!this.checkCollisionWithOtherObjects(obj)){
            return true;
        }
        return false;

    }
    ///return object with x y
    getFutureCoords(){
        let newX = this.Position.x;
        let newY = this.Position.y;
        if(this.isPlayer){
            
            this.Physics.Direction = this.Input.Mouse.direction;
            ///Проверяем нажаты ли кнопки у клиента
           // let user = SERVICE.keeper.getUserByPersonId(this.id);
            //if(user){
               // let client = SERVICE.keeper.getClientByUserId(user.id);
                //if(client){
                    if(this.Input.Button.UP){//if(client.buttonData.up){
                        newX = this.Position.x + (this.speed*Math.cos(this.Physics.Direction));
                        newY = this.Position.y + (this.speed*Math.sin(this.Physics.Direction));

                    }
                    if(this.Input.Button.LEFT){
                        newX = this.Position.x + (this.speed*(0.25)*Math.sin(this.Physics.Direction));
                        newY = this.Position.y - (this.speed*(0.25)*Math.cos(this.Physics.Direction));
                    }
                    if(this.Input.Button.RIGHT){
                        newX = this.Position.x - (this.speed*(0.25)*Math.sin(this.Physics.Direction));
                        newY = this.Position.y + (this.speed*(0.25)*Math.cos(this.Physics.Direction));
                    }
                    if(this.Input.Button.DOWN){
                        newX = this.Position.x - (this.speed*(0.5)*Math.cos(this.Physics.Direction));
                        newY = this.Position.y - (this.speed*(0.5)*Math.sin(this.Physics.Direction));
                    }
                //}
           // }
        }else{
            ///Если это бот
            if(SERVICE.math.randomInteger(-1000,10) > 0 )
                this.Physics.Direction = SERVICE.math.randomInteger(-Math.PI,Math.PI);

            if(SERVICE.math.randomInteger(-100,100) > 0 ){
                newX = this.Position.x + (this.speed*Math.cos(this.Physics.Direction));
                newY = this.Position.y + (this.speed*Math.sin(this.Physics.Direction));
            }
        }
        return {x:newX,y:newY};
        
    }
}
module.exports = Creature;
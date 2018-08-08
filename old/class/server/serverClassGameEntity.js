var Root = require('./serverClassRoot.js');
class GameEntity extends Root{
    constructor(id,type,name,images,x,y,sizeWidth,sizeHeight){
        super(id, type);
        this.Description = new SERVICE.components.description(name);
        this.Graphics = new SERVICE.components.graphics(images);
        this.Position = new SERVICE.components.position(x,y);
        this.Physics = new SERVICE.components.physics();
        this.Size = new SERVICE.components.size(sizeWidth,sizeHeight);
        //this.images = images || null;
        //this.x= x;
        //this.y= y;
        //this.z= z;
        //this.sizeHeight = sizeHeight || null;
        //this.sizeWidth = sizeWidth || null;
        
        
    
    }
    ///Проверка столкновения объекта со всеми объектами
    checkCollisionWithOtherObjects(obj){
        let collision = false;
        for(let i in SERVICE.keeper.creatureArray){
            ///Если этот объект не наш текущий и если столкновение есть
            
            if((this != SERVICE.keeper.creatureArray[i]) && (this.checkCollision(obj,SERVICE.keeper.creatureArray[i]))) {
                collision = true;  
            }
            
            
        }
        for(let i in SERVICE.keeper.objectArray){
            ///Если этот объект не наш текущий и если столкновение есть
            
            if((this != SERVICE.keeper.objectArray[i]) && (this.checkCollision(obj,SERVICE.keeper.objectArray[i]))) {
                collision = true;  
            }
            
            
        }
        return collision;
    }
    ///Передвижение
    move(x,y){
        this.Position.x = x;
        this.Position.y = y;
    }
    ///Проверка столкновения двух прямоугольников
    checkCollision(obj1,obj2){
        
        
            /*
            //Левая, правая, верхняя, нижняя границы квадрата 1
            var x_a1 = obj1.Position.x;
            var x_a2 = x_a1 + obj1.Size.width;
            var y_a1 = obj1.Position.y;
            var y_a2 = y_a1 + obj1.Size.height;

            //Левая, правая, верхняя, нижняя границы квадрата 2
            var x_b1 = obj2.Position.x;
            var x_b2 = x_b1 + obj2.Size.width;
            var y_b1 = obj2.Position.y;
            var y_b2 = y_b1 + obj2.Size.height;
            */
            //Левая, правая, верхняя, нижняя границы квадрата 1
            var x_a1 = obj1.Position.x - (obj1.Size.width/2);
            var x_a2 = x_a1 + obj1.Size.width;
            var y_a1 = obj1.Position.y - (obj1.Size.height/2);
            var y_a2 = y_a1 + obj1.Size.height;

            //Левая, правая, верхняя, нижняя границы квадрата 2
            var x_b1 = obj2.Position.x - (obj2.Size.width/2);
            var x_b2 = x_b1 + obj2.Size.width;
            var y_b1 = obj2.Position.y - (obj2.Size.height/2);
            var y_b2 = y_b1 + obj2.Size.height;
            
            //Проверка пересечения прямоугольников
            if (x_a2>x_b1 && x_a1<x_b2 && y_a2>y_b1 && y_a1<y_b2) {
                //console.log("Прямоугольники пересекаются :)");
                return true;
            } else {
                //console.log("НЕТ пересечения :(");
                return false;
            }
    }
    
    ///Рандомное передвижение
    randomMove(){
        
        if(SERVICE.math.randomInteger(-1000,10) > 0 )
        this.vector = SERVICE.math.randomInteger(-Math.PI,Math.PI);
         
        if(SERVICE.math.randomInteger(-100,100) > 0 ){
            let newX = this.Position.x + (this.speed*Math.cos(this.vector));
            let newY = this.Position.y + (this.speed*Math.sin(this.vector));
            ///Создаем прямоугольник для проверки будущего шага
            let rect = {
                Position:{
                    x:newX,
                    y:newY,
                },
                Size:{
                    width:this.Size.width,
                    height:this.Size.height,
                }
            };
            if(!this.checkCollisionWithOtherObjects(rect)){
                this.x = newX;
                this.y = newY;
            }
        }      
    }
}
module.exports = GameEntity;
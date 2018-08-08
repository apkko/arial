var Root = require('./serverClassRoot.js');
class Zone extends Root{
    constructor(obj){
        var type = 'zone';
        super(obj.id, type);
        ///карта тайлов которые входят в эту зону
        this.tileMap = obj.tileMap;
        ///Координаты зоны(для поиска соседних)
        this.x = obj.x;
        this.y = obj.y;
        ///Игровые координаты верхней левой точки
        this.leftTopDot = {
            x:obj.leftTopDotX,
            y:obj.leftTopDotY      
        };
        //Размеры
        this.width = obj.width;
        this.height = obj.height;
       
    }
}
module.exports = Zone;
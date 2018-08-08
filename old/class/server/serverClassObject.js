var GameEntity = require('./serverClassGameEntity.js');
class GameObject extends GameEntity{
    constructor(obj){
        //Тип объекта
        var type = 'object';
        //Вызов конструктора родительского класса GameEntity(id,тип,имя,картинки, координаты, размеры)
        super(obj.id,type,obj.name,obj.images,obj.x,obj.y,obj.sizeWidth,obj.sizeHeight);
        ///ObjectTypeId
        ///ObjectKindId
        ///Массив предметов для создания
        ///Массив предметов при получении из объекта
        ///ObjectProtoId Id прототипа
        ///Какието временные показатели
        ///Флаг на персонаже ли
        ///Характеристики
        ///Модификаторы характеристик
    }
}
module.exports = GameObject;
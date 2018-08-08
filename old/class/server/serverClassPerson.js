var Creature = require('./serverClassCreature.js');
class Person extends Creature{
    constructor(obj){
        //Тип объекта
        //Вызов конструктора родительского класса GameEntity(id,тип,имя,картинки, координаты, размеры)
        super(obj); 
        this.Input = new SERVICE.components.input();
    }
}
module.exports = Person;
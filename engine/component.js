///Компоненты сущностей ни к чему доступ не нужен
class Component{
    constructor(id,name,attribute){
        this.id = id;
        this.componentName = name;
        this.attribute = attribute;
        
    }

}
class TComponent extends Component{
    constructor(id,name,attribute){
        super(id,name,attribute);
    }

}
/*
//Компонент позиция
class Position extends Component{
    constructor(x,y){
        super(1,'Position');
        
        this.x = x;
        this.y = y;
    }

}
*/
/*
//Компонент направление
class Direction extends Component{
    constructor(dir){
        super(2,'Direction');
        this.dir = dir;
    }

}
//Компонент Скорость за кадр
class Velocity extends Component{
    constructor(){
        super(3,'Velocity');
        this.xPerFrame = 0;
        this.yPerFrame = 0;
    }

}
//Компонент Физика
class Physics extends Component{
    constructor(){
        super(4,'Physics');
    }

}
//Компонент Форма
class Form extends Component{
    constructor(){
        super(5,'Form');
    }

}
//Компонент Описание
class Description extends Component{
    constructor(name){
        super(6,'Description');
        this.name = name;
        //this.description
    }

}
//Компонент Тип
class Type extends Component{
    constructor(type){
        super(7,'Type');
        this.type = type;
    }

}
//Компонент Вид (картинки)
class Visual extends Component{
    constructor(){
        super(8,'Visual');
    }

}
//Компонент Скорость
class Speed extends Component{
    constructor(){
        super(9,'Speed');
    }

}
*/
module.exports.Component = Component;
module.exports.TComponent = TComponent;
/*
module.exports.Position = Position;
module.exports.Direction = Direction;
module.exports.Velocity = Velocity;
module.exports.Physics = Physics;
module.exports.Form = Form;
module.exports.Type = Type;
module.exports.Speed = Speed;
module.exports.Visual = Visual;
module.exports.Description = Description;
*/
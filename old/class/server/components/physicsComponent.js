class PhysicsComponent {
    constructor(){
        this.Direction = 0;
        ///Указывает передвежим ли объект
        this.Movable = true;
        ///Указывает Твердый ли объект
        this.Solid = true;
        
    }
}
module.exports = PhysicsComponent;
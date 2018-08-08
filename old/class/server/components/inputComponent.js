class InputComponent {
    constructor(){  
        this.Button ={
            UP:false,
            DOWN:false,
            RIGHT:false,
            LEFT:false,
        };
        this.Mouse={
            direction:0, 
        };
    }
}
module.exports = InputComponent;
var Root = require('./serverClassRoot.js');
var SendData = require('./serverClassSendData.js');
class Client extends Root{
    constructor(socket){
        var type = 'client';
        super(null, type);
        this.socket = socket;
        this.connect = true;
        this.user = null
        this.sendData = new SendData();
        this.buttonData ={
            up:false,
            down:false,
            right:false,
            left:false,
        }
    }
}
module.exports = Client;
///Обработчик полученных и отправляемы данных
class Handler{
    constructor(){
        
    }
    ///Обработка входящих данных
    handleInputData(client,data){
        let socket = client.socket;
        if(data.command){
            
            switch(data.command){
                ////Проверка логина и пароля
                case 'C0001': 
                    //if(SETTING.SHOWMOUSEBOTTONDATA == true)
                        SERVICE.logger.debugLog('Get data from client['+socket.id+']:\ncommand:'+data.command+';\nSID:'+data.SID+';\ndata:'+JSON.stringify(data.data));
                    this.C0001(client,data)
                    break;
                ///Проверка SID пользователя клиента
                case 'C0002':
                    //if(SETTING.SHOWMOUSEBOTTONDATA == true)
                        SERVICE.logger.debugLog('Get data from client['+socket.id+']:\ncommand:'+data.command+';\nSID:'+data.SID+';\ndata:'+JSON.stringify(data.data));
                    this.C0002(client,data);
                    break;
                ///Регистрация пользователя клиента
                case 'C0003':
                    //if(SETTING.SHOWMOUSEBOTTONDATA == true)
                        SERVICE.logger.debugLog('Get data from client['+socket.id+']:\ncommand:'+data.command+';\nSID:'+data.SID+';\ndata:'+JSON.stringify(data.data));
                    this.C0003(client,data);
                    break;
                ///Выход клиента из игры
                case 'C0004':
                    //if(SETTING.SHOWMOUSEBOTTONDATA == true)
                        SERVICE.logger.debugLog('Get data from client['+socket.id+']:\ncommand:'+data.command+';\nSID:'+data.SID+';\ndata:'+JSON.stringify(data.data));
                    this.C0004(client,data);
                    break;
                    ///Информация о нажатых клавишах
                case 'C0005':
                    ///Если это данные ВВОДА (клавиатура, мышь показывать или нет)
                    if(SETTING.WRITEBOTTONDATA == true)
                        SERVICE.logger.debugLog('Get data from client['+socket.id+']:\ncommand:'+data.command+';\nSID:'+data.SID+';\ndata:'+JSON.stringify(data.data));
                    this.C0005(client,data);
                    break;
                    ///Информация о направлении мышки
                case 'C0006':
                    ///Если это данные ВВОДА (клавиатура, мышь показывать или нет)
                    if(SETTING.WRITEMOUSEDATA == true)
                        SERVICE.logger.debugLog('Get data from client['+socket.id+']:\ncommand:'+data.command+';\nSID:'+data.SID+';\ndata:'+JSON.stringify(data.data));
                        
                    this.C0006(client,data);
                    break;
            }
        }
    }
    ////Проверка логина и пароля
    C0001(client,data){
        let user, oldClient;
        ///Если логин и пароль верные, получаем пользователя и создаем для него SID и отправляем пользователю
        if(user = SERVICE.identificator.identification(client,data.data.login,data.data.password)){
            ///Получаем старого клиента у которого наш пользователь, удаляем его у него и отклчаем
            if(oldClient = SERVICE.keeper.getClientByUser(user)){
                ///Если старый клиент не наш текщий клиент
                if(oldClient != client){
                    oldClient.user = null;
                    oldClient.socket.disconnect();
                }
                
            }
            ///Присваиваем клиенту пользователя
            client.user = user;
            SERVICE.logger.debugLog('Client['+client.socket.id+']:Login on User:'+client.user.login);
            ///Отправляем юзеру новый SID
            this.sendSidToUser(client,user.addSID(client.socket.id));
            ///Ставим у пользователя статус online
            client.user.online = true;
        }
    }
    ///Проверка SID пользователя клиента
    C0002(client,data){
        let user, oldClient;
        ///Проверка SID пользователя клиента
        if(SERVICE.identificator.checkSID(client,data.SID)){
            ///Проверка пройдена
            this.sendSIDcheckData(client,true);
        }
        /// Получаем новго пользователя по SID
        else if(user = SERVICE.identificator.getNewUserBySID(client,data.SID)){
            ///Получаем старого клиента у которого наш пользователь, удаляем его у него и отклчаем
            if(oldClient = SERVICE.keeper.getClientByUser(user)){
                
                oldClient.user = null;
                oldClient.socket.disconnect();
            }
            ///Присваиваем клиенту пользователя
            client.user = user;
            SERVICE.logger.debugLog('Client['+client.socket.id+']:Login on User:'+client.user.login);
            this.sendSIDcheckData(client,true);
            ///Ставим у пользователя статус online
            client.user.online = true;
        }
        else{
            /// SID не верный
            this.sendSIDcheckData(client,false);
        }
    }
    ///Регистрация пользователя
    C0003(client,data){
        ////Проверяем есть ли такой логин
        if(!SERVICE.keeper.getUserByLogin(data.data.login)){
            ///Такого логина нет, можно создавать клиента (тут должна быть еще провекра пароля)
            let user = SERVICE.keeper.addUser(data.data.login,data.data.password);
            SERVICE.logger.debugLog('Client['+client.socket.id+']:Registration is sucsess.');
            SERVICE.logger.debugLog('Create new User(login:'+user.login+').');
            ///Присваиваем клиенту пользователя
            user.personId = SERVICE.keeper.addPerson(data.data.login).id;
            client.user = user;
            SERVICE.logger.debugLog('Client['+client.socket.id+']:Login on User:'+client.user.login);
            ///Отправляем клиенту новый SID
            this.sendSidToUser(client,user.addSID(client.socket.id));
            ///Ставим у пользователя статус online
            client.user.online = true;
            
        }
        data.data.login,data.data.password
    }
    ///Выход клиента из игры
    C0004(client,data){
        ///Какието действия когда клиент выходит из игры, типо поставить у юзера стату офлайн, и по этому статусу определять передавать ли на клиент данные
        ///Ставим у пользователя статус online = false
        client.user.online = false;
    }
    ///Выход клиента из игры
    C0005(client,data){
        let pers = SERVICE.keeper.getPersonById(client.user.personId);
        ///Нажатие клавиши (мышки или клавиатуры)

        
        /*
        this.gameX = this.gameX  + (this.moveForFrame * Math.cos(angle));
        this.gameY = this.gameY  + (this.moveForFrame * Math.sin(angle));
        pers.x + (pers.speed*Math.cos(pers.speed))
        pers.move(pers.x + (pers.speed*pers.vector),pers.y - (pers.speed*pers.vector));
        */
        pers.Input.Button.UP = data.data.up;
        pers.Input.Button.DOWN = data.data.down;
        pers.Input.Button.RIGHT = data.data.right;
        pers.Input.Button.LEFT = data.data.left;
            
        //client.buttonData.up = data.data.up;
        //client.buttonData.left = data.data.left;
        //client.buttonData.right = data.data.right;
        //client.buttonData.down = data.data.down;
        /*
        if(data.data.up){
            client.buttonData.up = data.data.up;
            //console.log(pers.x + (pers.speed*pers.vector),pers.y + (pers.speed*pers.vector));
            //console.log(pers.x,pers.y,pers.speed,pers.vector);
            //pers.move(pers.x + (pers.speed*Math.cos(pers.vector)),pers.y + (pers.speed*Math.sin(pers.vector)));
            
        }
        if(data.data.left){
             client.buttonData.left = data.data.left;
            //pers.move(pers.x + (pers.speed*Math.sin(pers.vector)),pers.y - (pers.speed*Math.cos(pers.vector)));
        }
        if(data.data.right){
             client.buttonData.right = data.data.right;
            
            //pers.move(pers.x - (pers.speed*Math.sin(pers.vector)),pers.y + (pers.speed*Math.cos(pers.vector)));
        }
        if(data.data.down){
             client.buttonData.down = data.data.down;
            //pers.move(pers.x - (pers.speed*Math.cos(pers.vector)),pers.y - (pers.speed*Math.sin(pers.vector)));
        }
        if(data.data.spasebar){
            
        }
        */
        /*
        console.log(data.data);
        switch(data.data){
            case 'up': 
                console.log(pers.x + (pers.speed*pers.vector));
                pers.move(pers.x + (pers.speed*pers.vector),pers.y + (pers.speed*pers.vector));
                //pers.move(pers.x - 1,pers.y - 1); ///iso
                break;  
            case 'left':
                pers.move(pers.x - 0.1,pers.y);
                //pers.move(pers.x - 0.05,pers.y + 0.05); ///iso
                break;
            case 'right': 
                pers.move(pers.x + 0.1,pers.y);
                //pers.move(pers.x + 0.05,pers.y - 0.05); ///iso
                
                break;
            case 'down':
                pers.move(pers.x,pers.y + 0.1);
                //pers.move(pers.x + 0.05,pers.y + 0.05); ///iso
                break;
        }
        */
        /*
        switch(data.data.button){
            case 'up': 
                pers.move(pers.x,pers.y - 0.1);
                //pers.move(pers.x - 1,pers.y - 1); ///iso
                break;  
            case 'left':
                pers.move(pers.x - 0.1,pers.y);
                //pers.move(pers.x - 0.05,pers.y + 0.05); ///iso
                break;
            case 'right': 
                pers.move(pers.x + 0.1,pers.y);
                //pers.move(pers.x + 0.05,pers.y - 0.05); ///iso
                
                break;
            case 'down':
                pers.move(pers.x,pers.y + 0.1);
                //pers.move(pers.x + 0.05,pers.y + 0.05); ///iso
                break;
        }
        */
    }
    ///Направление мышки
    C0006(client,data){
        let pers = SERVICE.keeper.getPersonById(client.user.personId);
        if(data.data){
            //console.log(data.command,data.data);
            pers.Input.Mouse.direction = data.data.vector;
           // pers.vector = data.data.vector;
        }
    }
    ///Подготовка данных для отправки юзеру
    prepeareOutputData(client,command,data){
        let inputData = {
            command:command,
            data:data
        };
        SERVICE.sender.sendData(client,inputData);
    }
    ///Отправка SID пользователю
    sendSidToUser(client,sid){
        this.prepeareOutputData(client,'S0001',sid);
    }
    ///Отправка ответа о проверке SID
    sendSIDcheckData(client,check){
        this.prepeareOutputData(client,'S0002',check);
    }
    sendFullData(client,data){
        this.prepeareOutputData(client,'S0010',data);
    }
    sendTileMapData(client,data){
        this.prepeareOutputData(client,'S0011',data);
    }
}
module.exports = Handler;
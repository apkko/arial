///Мэнэджеры...Хранят и создают и управляют сущностями, компонентами, системами и служебными объектами
///Нужен доступ к классам  сущностей, компонентов и систем, и к объектам мэнэджеров
//ECS///
var ENTITY = require('./entity.js');
var COMPONENT = require('./component.js');
var System =  require('./system.js');
/////
////Services
var Client =  require('./client.js');
var User =  require('./user.js');
var MD5 =  require('./lib/md5.js');
////
class Manager{
    constructor(id){
        this.id = id;
    }
    init(){}
    ///Добавить новый id
    getNewIdFromArray(arr){
        if(arr.length == 0)
            return 1;
        else 
            return arr[arr.length -1].id + 1;
    }
    //Клонирование компонента
    cloneObject(obj){
        var clone =  JSON.stringify(obj);
        clone =  JSON.parse(clone);
        return clone;
    }
    //Проверка есть ли элемент в массивe
    isInArray(elem,array){
        for(let i in array){
            if(array[i] == elem)
                return true;
        }
        return false;
    }
}
//Мэнэджер Сущностей
class Entity_Manager extends Manager{
    constructor(){
        super();
        ///массив cущностей
        this.entities = [];
        ///массив типов cущностей
        this.entityTemplates = [];
    }
    //Инициализация
    init(){
        ///Создание типов компонентов и самих компонентов из бд или атласа
        this.addAllEntityTemplates();
        this.addAllEntitys();
    }
    //Создание сущности по id шаблона
    createEntityByTemplateId(id){
        //Получаем тип сущности
        let template = this.getEntityTemplateById(id);
        //Если такой тип есть
        if(template){
            let num = this.entities.push(new ENTITY.Entity(this.getNewIdFromArray(this.entities)));
            this.entities[num -1].addEntityTemplateId(template.id); 
            for(let i in template.components){
                ///КЛОНИРУЕМ КОМПОНЕНТЫ
                this.entities[num -1].addComponent(this.cloneObject(template.components[i]));
            }
             //console.log(this.entities[num -1]);
            return this.entities[num -1];
            
        }else{
           console.log('bad Template'); 
            return false;
        } 
    }
    //Создание сущности по названию шаблона
    createEntityByTemplateName(name){
        //Получаем тип сущности
        let template = this.getEntityTemplateByName(name);
        //Если такой тип есть
        if(template){
            let num = this.entities.push(new ENTITY.Entity(this.getNewIdFromArray(this.entities)));
            this.entities[num -1].addEntityTemplateId(template.id); 
            for(let i in template.components){
                ///КЛОНИРУЕМ КОМПОНЕНТЫ
                this.entities[num -1].addComponent(this.cloneObject(template.components[i]));
            }
             //console.log(this.entities[num -1]);
            return this.entities[num -1];
            
        }else{
           console.log('bad Template'); 
            return false;
        } 
    }
    //Создание типа сущности
    createEntityTemplate(name,componentsArray){
        let num = this.entityTemplates.push(new ENTITY.TEntity(this.getNewIdFromArray(this.entityTemplates),name));
        for(let i in componentsArray){
            this.entityTemplates[num -1].addComponent(componentsArray[i]);
        }
        //console.log(this.entityTemplates[num -1]);
        return this.entityTemplates[num -1];
    }
    //Получить данные о шаблонах сущностях для отправки мэнэджеру
    getEntityTemplatesDataForManager(){
        return this.entityTemplates;
    }
    //Получить данные о сущностях для отправки мэнэджеру
    getEntitysDataForManager(){
        return this.entities;
    }
    //Получаем тип сущности по ID
    getEntityTemplateByComponentName(componentName){
        for(let i in this.entityTemplates){
            if(this.entityTemplates[i].componentName == componentName)
                return this.entityTemplates[i];
        }
        return false;
    }
    //Получаем тип сущности по ID
    getEntityTemplateById(entityTypeId){
        for(let i in this.entityTemplates){
            if(this.entityTemplates[i].id == entityTypeId)
                return this.entityTemplates[i];
        }
        return false;
    }
    //Получаем шаблон сущности по Названию Шаблона
    getEntityTemplateByName(entityTemplateName){
        for(let i in this.entityTemplates){
            if(this.entityTemplates[i].entityTemplateName == entityTemplateName)
                return this.entityTemplates[i];
        }
        return false;
    }
    ///Добавляем все типы сущностей (берем их из бд или атласа какогото)
    getAllentityTemplates(){
        let types = [];
        for(let i in this.entityTemplates){
            types.push(this.entityTemplates[i]);
        }
        return types;
    }
    addAllEntityTemplates(){
        this.createPlayerHumanType();
        
    }
    ///Добавляем все сущности (берем их из бд или атласа какогото)
    addAllEntitys(){
        
    }
    ///////СОЗДАНИЕ РАЗНЫХ ТИПОВ СУЩНОСТЕЙ
    createPlayerHumanType(){
        ///ТИП ЧЕЛОВЕК
        let player = this.createEntityTemplate('Player',[G_ENGINE.ComponentManager.createComponentByName('Position'),G_ENGINE.ComponentManager.createComponentByName('Direction'),G_ENGINE.ComponentManager.createComponentByName('Player'),G_ENGINE.ComponentManager.createComponentByName('Group'),G_ENGINE.ComponentManager.createComponentByName('Type')]);
        player.getComponent('Position').attribute.x = 50;
        player.getComponent('Position').attribute.y = 50;
        player.getComponent('Group').attribute.group = 'creature';
        player.getComponent('Type').attribute.type = 'human';
    }
    ///////////////

}
//Мэнэджер Компонентов
class Component_Manager extends Manager{
    constructor(){
        super();
        ///массив компонентов
        this.components = [];
        ///массив типов компонентов
        this.componentTemplates = [];
    }
    //Инициализация
    init(){
        ///Создание типов компонентов и самих компонентов из бд или атласа
        this.addAllComponentTemplates();
        this.addAllComponents();
    }
    //Создание типа component
    createComponentType(name,attribute){
        let num = this.componentTemplates.push(new COMPONENT.TComponent(this.getNewIdFromArray(this.componentTemplates),name,attribute));
        //this.componentTemplates[num -1].addParams(params);
        
        
        
        //console.log(this.componentTemplates[num -1]);
        return this.componentTemplates[num -1];
    }
    //Создание компонента по Типу (Имени) компонента ///id 
    createComponentByName(componentName){
        for(let i in this.componentTemplates){
            if(this.componentTemplates[i].componentName == componentName){
                ///КЛОНИРУЕМ АТТРИБУТЫ
                return new COMPONENT.Component(this.componentTemplates[i].id,this.componentTemplates[i].componentName,this.cloneObject(this.componentTemplates[i].attribute));
            }
                
        }
        return false;
    }
    //Создание компонента по Типу (Имени) компонента ///id 
    createComponentById(id){
        for(let i in this.componentTemplates){
            if(this.componentTemplates[i].id == id){
                ///КЛОНИРУЕМ АТТРИБУТЫ
                return new COMPONENT.Component(this.componentTemplates[i].id,this.componentTemplates[i].componentName,this.cloneObject(this.componentTemplates[i].attribute));
            }
                
        }
        return false;
    }
    //Получить данные о пользователях для отправки мэнэджеру
    getComponentTemplatesDataForManager(){
        return this.componentTemplates;
    }
    ///Добавляем все типы компонентов (берем их из бд или атласа какогото)
    addAllComponentTemplates(){
        this.createComponentType('Position',{x:0,y:0});
        this.createComponentType('Direction',{direction:0});
        this.createComponentType('Player',{});
        this.createComponentType('Group',{group:null});///creature/
        this.createComponentType('Type',{type:null});//human
        this.createComponentType('Kind',{kind:null});
        this.createComponentType('Member',{});
    }
    ///Добавляем все типы компонентов (берем их из бд или атласа какогото)
    addAllComponents(){
        
    }
    getComponentTypeByName(name){
        for(let i in this.componentTemplates){
            if(this.componentTemplates[i].componentName == name)
                return this.componentTemplates[i];
        }
        return false;
    }

}
//Мэнэджер Систем
class System_Manager extends Manager{
    constructor(){
        super();
        ///массив систем
        this.systems = [];
    }
    //Обновление всех систем
    updateSystems(){
        for(let i in this.systems){
            this.systems[i].update();
        }
    }
    //Добавление всех систем в движок
    addAllSystems(){
        //Добавление системы передвижения
        this.systems.push(new System.Movement());
    }

}
//Мэнэджер Эвентов
class Event_Manager extends Manager{
    constructor(){
        super();
        ///массив систем
        this.events = [];
    }
    //Добавление всех систем в движок
    addAllEvents(){
        //Добавление системы передвижения
        //this.events.push(new SERVICE.ECS.system.Movement());
    }

}
//Мэнэджер Аккаунтов (создание аккаунтов, получение указателя на сущьность аккаутна)
class Account_Manager extends Manager{
    constructor(){
        super();
        ///массив систем
        this.users = [];
    }
    //Получить пользователя
    getUser(user){
        for(let i in this.users){
            if(this.users[i] == user)
                return this.users[i]
        }
        return false;
    }
    //Получить пользователя по логину
    getUserByLogin(login){
        for(let i in this.users){
            if(this.users[i].login == login)
                return this.users[i]
        }
        return false;
    }
    //Получить пользователя по SID
    getUserBySID(SID){
        for(let i in this.users){
            if(this.users[i].sessionId == SID)
                return this.users[i]
        }
        return false;
    }
    //Получить данные о пользователях для отправки мэнэджеру
    getUsersDataForManager(){
        return this.users;
    }
    ///Создание пользователя
    createUser(login,password){
        let num = this.users.push(new User({
            id:this.getNewIdFromArray(this.users),
            login: login,
            password: password,

        }));
        return this.users[num -1];
    }
    ///идентификация
    identification(id,login,password){
        let user;
        ///Идентифицируем по логину.
        if(! (user = this.getUserByLogin(login))){
            ///Если такого логина не нашли
            G_ENGINE.LogManager.debugLog('Client['+id+']:Identifiacation is failed. Reason: bad login.');
            return false;
        }
        else{
            ///Если такой логин есть проверяем пароль
            if(user.checkPassword(password)){
                ///Логин и пароль верные
                G_ENGINE.LogManager.debugLog('Client['+id+']:Identifiacation is sucsess.');
                //Возвращаем пользователя
                return user;
            }
            else{
                ///Пароль не верный
                G_ENGINE.LogManager.debugLog('Client['+id+']:Identifiacation is failed. Reason: bad password.');
                return false;
            }
        }
               
    }
    ///Проверка SID у пользователя клиента
    checkSID(id,user,sid){
        //Если у клиента есть user
        if(user){
            ///Если SID пользователя клиента не совпадает с полученным SID
            if(user.checkSID(sid)){
                ///SID не верный
                G_ENGINE.LogManager.debugLog('Client['+id+']:SID identifiacation is failed. Reason: bad SID.');
                return false;
            }
            else{
                G_ENGINE.LogManager.debugLog('Client['+id+']:SID identifiacation is sucsess.');
                return true;
            }
        }
        G_ENGINE.LogManager.debugLog('Client['+id+']:SID identifiacation is failed. Reason: Client dont have User');
        return false;
    } 
    ///Получить новго пользователя по SID
    getNewUserBySID(client,sid){
        let user;
        ///Если такого SID нет ни у одного из пользователей
        if(! (user = SERVICE.keeper.getUserBySID(sid))){
            ///SID не верный
            G_ENGINE.LogManager.debugLog('Client['+client.socket.id+']:SID identifiacation is failed. Reason: bad SID.');
            return false;
        }
        else{
            ////Возвращаем новго пользователя
            G_ENGINE.LogManager.debugLog('Client['+client.socket.id+']:SID identifiacation is sucsess. Get new User.');
            return user;
        }
    }
    
}
//Мэнэджер Сети и Клиентов
class Network_Manager extends Manager{
    constructor(){
        super();
        ///массив Rклиентов
        this.clients = [];
    }
    init(){
    }
    //Получение клиента по сокету, (false если такого нет)
    getClient(socket){
        if(socket){
            if(socket.id){
                if(this.clients[socket.id])
                    return true;
            }
        }
        return false;
    }
    //Получить клиента по пользователю
    getClientByUser(user){
        for(let i in this.clients){
            if(this.clients[i].user == user)
                return this.clients[i];
        }
        return false
    }
    //Создание клиента (Проверка на сокет, есть ли он, есть ли у него id, проверка нет ли уже такого клиента)
    createClient(socket){
        if(socket){
            if(socket.id){
                if(!this.getClient(socket)){
                    this.clients[socket.id] = new Client(this.getNewIdFromArray(this.clients),socket);
                    return this.clients[socket.id];
                }
            }
        }else{
            return false
        }
        
    }
    //Удаление клиента
    deleteClient(socket){
        if(socket){
            if(socket.id){
                if(this.getClient(socket)){
                    this.clients[socket.id].onDelete();
                    delete this.clients[socket.id];
                    return true;
                }
            }
            
        }else{
            return false;
        }
        
    }
    //Возвращает количество клиентов
    getClientsCount(){
        let num =0;
        for(let i in this.clients){
            num++;
        }
        return num;
    }
    //Получить данные о клиентах для отправки мэнэджеру
    getClientsDataForManager(){
        let clients = [];
        for(let i in this.clients){
            let userId = null;
            if(this.clients[i].hasUser())
                userId = this.clients[i].user.id;
            clients.push({socketId:this.clients[i].socket.id,userId:this.clients[i].getUserId(),userId:userId,isManager:this.clients[i].manager});
        }
        return clients;
    }
    ///Начало слушания порта
    startListenSocket(PORT){
        var that = this;
        
        var io = require('socket.io').listen(PORT);
        G_ENGINE.LogManager.debugLog("Socket is listening.");
     
        ///События при подключении клиента
        io.on('connection',function(socket){
            
            G_ENGINE.LogManager.debugLog('New Connection: Socket = '+socket.id+'.');
            ///Создаем нового клиента
            if(that.createClient(socket)){
                G_ENGINE.LogManager.debugLog('Add New Client['+socket.id+'].');
                G_ENGINE.LogManager.debugLog('Now count of Clients = '+that.getClientsCount());
            }
            ///Событие при дисконнекте
            socket.on('disconnect', function() {
                G_ENGINE.LogManager.debugLog('Connection: Socket = '+socket.id+' is closed.');
                ///Удаляем клиента
                if(that.deleteClient(socket)){
                    G_ENGINE.LogManager.debugLog('Client['+socket.id+'] is deleted.');
                    G_ENGINE.LogManager.debugLog('Now count of Clients = '+that.getClientsCount());
                    
                }else{
                    G_ENGINE.LogManager.debugLog('Fail on delete Client['+socket.id+'].');
                }
          
            });
            
            ///Событие при получении информации
            socket.on('data', function(data) {
                ///Если это данные ВВОДА (клавиатура, мышь показывать или нет)
                if(G_ENGINE.SETTING.WRITEALLINPUTDATA)
                    G_ENGINE.LogManager.debugLog('Get data from client['+socket.id+']:\ncommand:'+data.command+';\nSID:'+data.SID+';\ndata:'+JSON.stringify(data.data));
                //Передаем полученную инфу мэнэджеру обработчику (Если клиент существует)
                if(that.getClient(socket))
                    G_ENGINE.GetManager.handleInputClientData(that.clients[socket.id],data);
            });
        });
        
    }
    //Отправка данных клиенту
    sendData(client,data){
        
        client.socket.emit('data',data);
        //G_ENGINE.LogManager.debugLog('Send data to Client['+client.socket.id+']:'+JSON.stringify(data));
        
    }
    getDataForManager(){
        let data ={
            serverTime: new Date(),
            serverIsStopped: G_ENGINE.isStop,
            gameUpdateInterval:G_ENGINE.SETTING.GAME_UPDATE,
            managerUpdateInterval:G_ENGINE.SETTING.MANAGER_UPDATE,
            clients:this.getClientsDataForManager(),
            users:G_ENGINE.AccountManager.getUsersDataForManager(),
            entityes:G_ENGINE.EntityManager.getEntitysDataForManager(),
            entityTemplates:G_ENGINE.EntityManager.getEntityTemplatesDataForManager(),
            componentTemplates:G_ENGINE.ComponentManager.getComponentTemplatesDataForManager(),
        }
        return data;
    }
    //Отправка данных для отправки
    sendDataToAllUser(){
        ////Собираем данные и отправляем
        for(let i in this.clients){
            ///Если клиент мэнэджер
            if(this.clients[i].manager){
                //Смотрим сколько прошло времени с последнего обновления
                let currentTime = Date.now();
                let delta  = currentTime - this.clients[i].managerLastTimeUpdate; 
                //Если прошло больше нужного отправляем
                if (delta >= this.clients[i].managerTimeUpdate){
                    
                    this.sendManagerData(this.clients[i],this.getDataForManager());
                    this.clients[i].managerLastTimeUpdate = currentTime;
                }
            }
            ///Если клиенту назначен пользователь
            else if(this.clients[i].hasUser()){
                ///Если пользователь в онлайне
                if(this.clients[i].user.online){
                    let data = this.clients[i].prepareSendData();
                    this.sendFullData(this.clients[i],data);
                    ///Проверяем нужно ли отправлять информацию о тайлах (карте)
                    
                    /*
                    if(!client.sendData.tileMapData.isSended){
                        SERVICE.handler.sendTileMapData(client,client.sendData.prepeareTileMapData());
                    }
                    */
                    
                    // let person = SERVICE.keeper.getPersonById(SERVICE.keeper.clientArray[i].user.personId);
                    //this.collectPersonData(person,SERVICE.keeper.clientArray[i]);
                    //this.collectCreaturesData(person,SERVICE.keeper.clientArray[i]);
                    //this.collectObjectsData(person,SERVICE.keeper.clientArray[i]);
                    //this.collectTileMap(person,SERVICE.keeper.clientArray[i]);
                    
                 
                } 
            }
        }
    }
    ///Подготовка данных для отправки юзеру
    prepeareOutputData(client,command,data){
        let inputData = {
            command:command,
            data:data
        };
        this.sendData(client,inputData);
    }
    ///Отправка SID пользователю
    sendSidToUser(client,sid){
        this.prepeareOutputData(client,'SC0001',sid);
    }
    ///Отправка ответа о проверке SID
    sendSIDcheckData(client,check){
        this.prepeareOutputData(client,'SC0002',check);
    }
    sendFullData(client,data){
        this.prepeareOutputData(client,'SC0010',data);
    }
    sendTileMapData(client,data){
        this.prepeareOutputData(client,'SC0011',data);
    }
    sendManagerData(client,data){
        this.prepeareOutputData(client,'SM0001',data);
    }
    sendManagerAuthStatus(client,data){
        this.prepeareOutputData(client,'SM0001',data);
    }

}
////Приводит логи в удобный вид, складывает логи в файл
class Log_Manager extends Manager {
    constructor(setting){
        super();
        this.fs = require('fs');
        this.debug = setting.DEBUGMODE;
    }
    addLog(){
        
    }
    ///добавить лог для ДЕБАГА
    debugLog(string){
        ///Выводим в консоль тестовые логи
        if(this.debug == true){
            console.log(this.formatDateDMYHMS(new Date())+" : "+string);
        }
            
        else{
            ///Пишем в файл (логируем вне консоли)
            let str = this.formatDateDMYHMS(new Date())+" : "+string;
            this.fs.appendFileSync('./log.txt', `\n${str}`);
        }
    }
    ///добавить постоянный лог
    consoleLog(string){
        ///Выводим Главные логи в консоль
        let str = this.formatDateDMYHMS(new Date())+" : "+string;
        console.log(this.formatDateDMYHMS(new Date())+" : "+string);
        this.fs.appendFileSync('./log.txt', `\n${str}`);
        
    }
    ///Формат даты
    formatDateDMYHMS(date) {

      var dd = date.getDate();
      if (dd < 10) dd = '0' + dd;

      var mm = date.getMonth() + 1;
      if (mm < 10) mm = '0' + mm;

      var yy = date.getFullYear() % 100;
      if (yy < 10) yy = '0' + yy;
        
        var hh = date.getHours();
      if (hh < 10) hh = '0' + hh;
        
        var mn = date.getMinutes();
      if (mn < 10) mn = '0' + mn;
        
        var ss = date.getSeconds();
      if (ss < 10) ss = '0' + ss;

      return dd + '.' + mm + '.' + yy + ';' + hh + ':' +mn + ':' + ss;
    }
}
///Мэнэджер обрабатывающий ВХОДЯЩИЕ данные для клиента
class Get_Manager extends Manager{
    constructor(){
        super();
    }
    ///Обработка входящих данных
    handleInputClientData(client,data){
        let socket = client.socket;
        if(data.command){
            
            switch(data.command){
                ////Проверка логина и пароля
                case 'CS0001': 
                    //if(SETTING.SHOWMOUSEBOTTONDATA == true)
                        G_ENGINE.LogManager.debugLog('Get data from client['+socket.id+']:\ncommand:'+data.command+';\nSID:'+data.SID+';\ndata:'+JSON.stringify(data.data));
                    if(data.data)
                        this.CS0001(client,data.data)
                    break;
                ///Проверка SID пользователя клиента
                case 'CS0002':
                    //if(SETTING.SHOWMOUSEBOTTONDATA == true)
                        G_ENGINE.LogManager.debugLog('Get data from client['+socket.id+']:\ncommand:'+data.command+';\nSID:'+data.SID+';\ndata:'+JSON.stringify(data.data));
                    if(data.SID)
                        this.CS0002(client,data.SID);
                    break;
                ///Регистрация пользователя клиента
                case 'CS0003':
                    //if(SETTING.SHOWMOUSEBOTTONDATA == true)
                        G_ENGINE.LogManager.debugLog('Get data from client['+socket.id+']:\ncommand:'+data.command+';\nSID:'+data.SID+';\ndata:'+JSON.stringify(data.data));
                    if(data.data)
                        this.CS0003(client,data.data);
                    break;
                ///Выход клиента из игры
                case 'CS0004':
                    //if(SETTING.SHOWMOUSEBOTTONDATA == true)
                        G_ENGINE.LogManager.debugLog('Get data from client['+socket.id+']:\ncommand:'+data.command+';\nSID:'+data.SID+';\ndata:'+JSON.stringify(data.data));
                    if(data.data)
                        this.CS0004(client,data.data);
                    break;
                    ///Информация о нажатых клавишах
                case 'CS0005':
                    ///Если это данные ВВОДА (клавиатура, мышь показывать или нет)
                    //if(SETTING.WRITEBOTTONDATA == true)
                        G_ENGINE.LogManager.debugLog('Get data from client['+socket.id+']:\ncommand:'+data.command+';\nSID:'+data.SID+';\ndata:'+JSON.stringify(data.data));
                    if(data.data)
                        this.CS0005(client,data.data);
                    break;
                    ///Информация о направлении мышки
                case 'CS0006':
                    ///Если это данные ВВОДА (клавиатура, мышь показывать или нет)
                    //if(SETTING.WRITEMOUSEDATA == true)
                        G_ENGINE.LogManager.debugLog('Get data from client['+socket.id+']:\ncommand:'+data.command+';\nSID:'+data.SID+';\ndata:'+JSON.stringify(data.data));
                    if(data.data)
                        this.CS0006(client,data.data);
                    break;
                case 'MS0001': 
                    //if(SETTING.SHOWMOUSEBOTTONDATA == true)
                        G_ENGINE.LogManager.debugLog('MANAGER:Get data from client['+socket.id+']:\ncommand:'+data.command+';\nSID:'+data.SID+';\ndata:'+JSON.stringify(data.data));
                    if(data.data)
                        this.MS0001(client,data.data)
                    break;
            }
        }
    }
    ////Проверка логина и пароля
    CS0001(client,data){
        let user, oldClient;
        ///Если логин и пароль верные, получаем пользователя и создаем для него SID и отправляем пользователю
        if(user = G_ENGINE.AccountManager.identification(client.socket.id,data.login,data.password)){
            ///Получаем старого клиента у которого наш пользователь, удаляем его у него и отклчаем
            if(oldClient = G_ENGINE.NetworkManager.getClientByUser(user)){
                ///Если старый клиент не наш текщий клиент
                if(oldClient != client){
                    oldClient.user = null;
                    oldClient.socket.disconnect();
                }
                
            }
            ///Присваиваем клиенту пользователя
            client.user = user;
            G_ENGINE.LogManager.debugLog('Client['+client.socket.id+']:Login on User:'+client.user.login);
            //Создаем пользователю новый SID
            let sid = MD5(client.socket.id.toString());
            user.addSID(sid);
            ///Отправляем юзеру новый SID
            G_ENGINE.NetworkManager.sendSidToUser(client,sid);
            ///Ставим у пользователя статус online
           client.user.setOnline();
        }
    }
    ///Проверка SID пользователя клиента
    CS0002(client,SID){
        let user, oldClient;
        let id = client.socket.id;
        ///Проверка есть ли у клиента пользователь
        if(client.hasUser()){
            ///Проверка SID пользователя клиента
            if(client.user.checkSID(SID)){
                ///Проверка пройдена
                G_ENGINE.NetworkManager.sendSIDcheckData(client,true);
            }else{
                G_ENGINE.LogManager.debugLog('Client['+client.socket.id+']:Identification FAIL: Client has BAD user');
                
            }
        }
        /// Ищем пользователя по SID
        else if(user = G_ENGINE.AccountManager.getUserBySID(SID)){
            ///Получаем старого клиента у которого наш пользователь, удаляем его у него и отклчаем
            if(oldClient = G_ENGINE.NetworkManager.getClientByUser(user)){

                oldClient.user = null;
                oldClient.socket.disconnect();
            }
            ///Присваиваем клиенту пользователя
            client.user = user;
            G_ENGINE.LogManager.debugLog('Client['+client.socket.id+']:Login on User:'+client.user.login);
            G_ENGINE.NetworkManager.sendSIDcheckData(client,true);
            ///Ставим у пользователя статус online
            client.user.setOnline();
        }
        else{
            /// SID не верный
            G_ENGINE.LogManager.debugLog('Client['+client.socket.id+']:Identification FAIL: Bad SID');
            G_ENGINE.NetworkManager.sendSIDcheckData(client,false);
        }
    }
    ///Регистрация пользователя
    CS0003(client,data){
        ////Проверяем есть ли такой логин
        if(!G_ENGINE.AccountManager.getUserByLogin(data.login)){
            ///Такого логина нет, можно создавать клиента (тут должна быть еще провекра пароля)
            let user = G_ENGINE.AccountManager.createUser(data.login,data.password);
            G_ENGINE.LogManager.debugLog('Client['+client.socket.id+']:Registration is sucsess.');
            G_ENGINE.LogManager.debugLog('Create new User(login:'+user.login+').');
            ///СОЗДАНИЕ СУЩЕСТВА (ПЕРСОНАЖА) для пользователя
            user.person = G_ENGINE.EntityManager.createEntityByTemplateName('Player'); ///1 - тип сущности персонаж

            client.user = user;
            G_ENGINE.LogManager.debugLog('Client['+client.socket.id+']:Login on User:'+client.user.login);
            ///Отправляем клиенту новый SID
            G_ENGINE.NetworkManager.sendSidToUser(client,user.addSID(client.socket.id));
            ///Ставим у пользователя статус online
           client.user.setOnline();
            
        }
    }
    ///Выход клиента из игры
    CS0004(client,data){
        ///Какието действия когда клиент выходит из игры, типо поставить у юзера стату офлайн, и по этому статусу определять передавать ли на клиент данные
        ///Ставим у пользователя статус online = false
        client.user.setOffline();
    }
    ///Выход клиента из игры
    CS0005(client,data){
        let pers = client.user.person;
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
    CS0006(client,data){
        let pers = SERVICE.keeper.getPersonById(client.user.personId);
        if(data.data){
            //console.log(data.command,data.data);
            pers.Input.Mouse.direction = data.data.vector;
           // pers.vector = data.data.vector;
        }
    }
    ////Проверка логина и пароля мэнэджера
    MS0001(client,data){
        let user, oldClient;
        if(data.login && data.password){
            ///Если логин и пароль верные, получаем пользователя и создаем для него SID и отправляем пользователю
            if((data.login == G_ENGINE.SETTING.MANAGER.login) && (data.password == G_ENGINE.SETTING.MANAGER.password)){
                client.manager = true;
                G_ENGINE.LogManager.debugLog('Client['+client.socket.id+']:MANAGER:Identification sucsess');
                G_ENGINE.NetworkManager.sendManagerAuthStatus(client,true);
                
            }else{
                G_ENGINE.LogManager.debugLog('Client['+client.socket.id+']:MANAGER:Identification fail');
                G_ENGINE.NetworkManager.sendManagerAuthStatus(client,false);
            }
        }
        
    }
    
}



module.exports.Entity = Entity_Manager;
module.exports.Component = Component_Manager;
module.exports.System = System_Manager;
module.exports.Event = Event_Manager;
module.exports.Account = Account_Manager;
module.exports.Network = Network_Manager;
module.exports.Log = Log_Manager;
module.exports.Get = Get_Manager;


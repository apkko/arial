class Identificator{
    constructor(){
        
    }
    identification(client,login,password){
        let user;
        ///Идентифицируем по логину.
        if(! (user = SERVICE.keeper.getUserByLogin(login))){
            ///Если такого логина не нашли
            SERVICE.logger.debugLog('Client['+client.socket.id+']:Identifiacation is failed. Reason: bad login.');
            return false;
        }
        else{
            ///Если такой логин есть проверяем пароль
            if(this.authentication(user,password)){
                ///Логин и пароль верные
                SERVICE.logger.debugLog('Client['+client.socket.id+']:Identifiacation is sucsess.');
                return user;
            }
            else{
                ///Пароль не верный
                SERVICE.logger.debugLog('Client['+client.socket.id+']:Identifiacation is failed. Reason: bad password.');
                return false;
            }
        }
               
    }
    ///Проверка SID у пользователя клиента
    checkSID(client,sid){
        //Если у клиента есть user
        if(client.user){
            ///Если SID пользователя клиента не совпадает с полученным SID
            if(client.user.sessionID != sid){
                ///SID не верный
                SERVICE.logger.debugLog('Client['+client.socket.id+']:SID identifiacation is failed. Reason: bad SID.');
                return false;
            }
            else{
                SERVICE.logger.debugLog('Client['+client.socket.id+']:SID identifiacation is sucsess.');
                return true;
            }
        }
        SERVICE.logger.debugLog('Client['+client.socket.id+']:SID identifiacation is failed. Reason: Client dont have User');
        return false;
    } 
    ///Получить новго пользователя по SID
    getNewUserBySID(client,sid){
        let user;
        ///Если такого SID нет ни у одного из пользователей
        if(! (user = SERVICE.keeper.getUserBySID(sid))){
            ///SID не верный
            SERVICE.logger.debugLog('Client['+client.socket.id+']:SID identifiacation is failed. Reason: bad SID.');
            return false;
        }
        else{
            ////Возвращаем новго пользователя
            SERVICE.logger.debugLog('Client['+client.socket.id+']:SID identifiacation is sucsess. Get new User.');
            return user;
        }
    }
    ////Аутентификация
    authentication(user,password){
        if(user.password == password)
        {
            return true;
        }
        else return false;
    }
    
    
    
    /*
    IdentificationHendler(SRV,socket,IdentData){
        let client = SRV.DK.clientArray[socket.id];
    
        let identData ={
            result:null,
            userData:null,
            error:null,
            SID:null
        };
 
        ///Если есть sid
        if(IdentData.SID)
        {
            //let client = SRV.DK.clientArray[socket.id];
            ///Идентифицируем по Sid
            //key - это SRV.DK.clientArray[key]  key это socket.id
            let key = this.IdentificationBySid(SRV.DK.userArray,IdentData.SID);
            ///Если есть клиент с таким sid
            if(key !== false)
            {
                client.user = SRV.DK.userArray[key];
           
                ///Создаем нового клиента
                 
                ///Отключаем старый сокет
     
                ///Новый сокет записываем клиенту
        
                console.log('Идентификация пройдена Socket:'+socket.id+'; Login:'+client.user.login);
                ///Проверяем выбран ли активный персонаж если да то удаляем его
                if(client.user.activeCreatureId){
                   client.user.activeCreatureId = null;
                   }
                ///Создаем то что передавать
                var userData ={login: client.user.login, userCreatures:client.user.userCreaturesId}; 
                ///Обнуляем текущего выбранного перса
                 client.user.activeCreatureId = null;
                ///Отправляем данные
            
               SRV.DS.SendUserData(client,{command:'identData',data:{result:true,userData:userData,error:null,SID:null} });
                
                SRV.DS.SendUserData(client,{command:'assetsUpdate',data: {images:SRV.DK.imageArray,spritesheets:SRV.DK.spritesheetArray}});
            
            }
            else 
            {
                console.log('Нет совпадений с полученным sid - Socket:'+socket.id);
                
                 SRV.DS.SendUserData(client,{command:'identData',data: {result:false,userData:null,error:'Нет совпадений с полученным sid',SID:null}});
             
            }   
        }
        
        
        ///Если есть regData
        else if(IdentData.authData.registration)
        {
            ///Если получили пароль и логин
            if(password && login)
            {
                ///Проверяем есть ли пользователь с таким логином
                if(!this.IdentificationByLogin(SRV.DK.userArray,login))
                {
                    ///Нужна проверка на сложность пароля
                    ///Создаем User
                    var userNumb= SRV.DK.userArray.push(new SRV.CLS.SC.User(IdentData.authData));
                    let user = SRV.DK.userArray[userNumb-1];
                    ///Создаем Id для User
                    user.id = this.GetNewID(SRV.DK.userArray);
                    console.log('Новый User создан c ID:'+user.id);
                    ///Создаем Client и присваиваем ему User и SID(генерируем)
                    
                    //let client = SRV.DK.clientArray[socket.id];
                    //console.log('Новый Клиент создан');
                    client.user = user;
                    client.user.sessionId = SRV.MD5(socket.id.toString());
                    console.log('Sid:'+client.sessionId);
                    var userData ={login:client.user.login,userCreatures:client.user.userCreaturesId};
                    ///Отправляем данные
                   
                    
                    
                    SRV.DS.SendUserData(client,{command:'identData',data:{result:true,userData:userData,error:null,SID:null} });
                    
                    
                    SRV.DS.SendUserData(client,{command:'assetsUpdate',data: {images:SRV.DK.imageArray,spritesheets:SRV.DK.spritesheetArray}});
                    
                
                }
                else
                {
                    
                    SRV.DS.SendUserData(client,{command:'identData',data: {result:false,userData:null,error:'Пользователь с таким логином yже сществует',SID:null}});
                
                    console.log('Пользователь с таким логином yже сществует');
                }     
            }
            else console.log('Не получены логин и пароль для регистрации');
                
        }
        ///Если есть authData 
        else if(IdentData.authData)
        {
            if(login && password)
            {
                ///Идентифицируем по логину.
                let num= this.IdentificationByLogin(SRV.DK.userArray,login);
                //Если есть такой логин
                if(num !== false)
                {
                    ///Проходим процедуру аутентификации (проверяем пароль)
                    if(this.Authentication(SRV.DK.userArray[num],password))
                    {
                    
                        
                      
                        ///Присваиваем клиенту пользователя
                        client.user = SRV.DK.userArray[num];
                        client.user.sessionId = SRV.MD5(socket.id.toString());
                        ///Проверяем выбран ли активный персонаж если да то удаляем его
                        if(client.user.activeCreatureId){
                            client.user.activeCreatureId = null;
                        }
                        var userData ={login:client.user.login,userCreatures:client.user.userCreaturesId}; 
                        ///Обнуляем текущего выбранного перса
                        client.user.activeCreature = null;
                        ///Отправляем данные
                        console.log('Аутентификация пройдена(пароль верный) - Socket:'+socket.id); 
                        
                        SRV.DS.SendUserData(client,{command:'identData',data:{result:true,userData:userData,error:null,SID:client.user.sessionId} });
                        
                        SRV.DS.SendUserData(client,{command:'assetsUpdate',data: {images:SRV.DK.imageArray,spritesheets:SRV.DK.spritesheetArray}});
                       
                     
                    }
                    else
                    {
                        console.log('Аутентификация не пройдена(пароль не верный) - Socket:'+socket.id);
                        
                        
                        SRV.DS.SendUserData(client,{command:'identData',data: {result:false,userData:null,error:'Аутентификация не пройдена(пароль не верный)',SID:null}});
                   
                    }
                    
                }
                else 
                {
                    console.log('Нет такого логина - Socket:'+socket.id);
                   
                    SRV.DS.SendUserData(client,{command:'identData',data: {result:false,userData:null,error:'Нет такого логина',SID:null}});
               
                }
            
                
                
            }
            else 
            {
                console.log('Не получено Login/Password - Socket:'+socket.id);
               
                
                SRV.DS.SendUserData(client,{command:'identData',data: {result:false,userData:null,error:'Не получено Login/Password',SID:null}});
              
            }   
            
        }
        else {
            
        }
    
    }
    ////Идентификация по логину
    IdentificationByLogin(array,login){
       for(var i=0;i< array.length;i++ ){
           if(array[i].login == login)
               {
                   return i;
               }
       }
        return false;
    }
    ////Идентификация по СИДУ
    IdentificationBySid(array,sid){
       for(let i in array){   
           if(array[i])
               {
                   if(array[i].sessionId == sid)
                       {
                           return i;
                       }
               }
           
       }
        return false;
    }
    ////Аутентификация
    Authentication(user,password){
    
           if(user.password == password)
               {
                   return true;
               }
           else return false;
    }
    */
}
module.exports = Identificator;
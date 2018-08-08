///Обрабатывает полученные данные от клиента
class Listener{
    constructor(){
    }
    ///Начало слушания порта
    start()
    {
        SERVICE.logger.debugLog("Listener is started.");
        ///События при подключении клиента
        SERVICE.io.on('connection',function(socket){
            
            SERVICE.logger.debugLog('New Connection: Socket = '+socket.id+'.');
            ///Создаем нового клиента
            SERVICE.keeper.clientArray[socket.id] = new SERVICE.class.server.client(socket);
            SERVICE.logger.debugLog('Add New Client['+socket.id+'].');
            SERVICE.logger.debugLog('Now count of Clients = '+SERVICE.keeper.getClientsCount()); 
            
            ///Событие при дисконнекте
            socket.on('disconnect', function() {
                SERVICE.logger.debugLog('Connection: Socket = '+socket.id+' is closed.');
                ///Удаляем клиента
                //SERVICE.keeper.clientArray[socket.id].socket.disconnect();
                delete SERVICE.keeper.clientArray[socket.id];
                SERVICE.logger.debugLog('Client['+socket.id+'] is deleted.'); 
                SERVICE.logger.debugLog('Now count of Clients = '+SERVICE.keeper.getClientsCount()); 
            });
            
            ///Событие при получении информации
            socket.on('data', function(data) {
                ///Если это данные ВВОДА (клавиатура, мышь показывать или нет)
                if(SETTING.WRITEALLINPUTDATA)
                    SERVICE.logger.debugLog('Get data from client['+socket.id+']:\ncommand:'+data.command+';\nSID:'+data.SID+';\ndata:'+JSON.stringify(data.data));
                SERVICE.handler.handleInputData(SERVICE.keeper.clientArray[socket.id],data);
            });
            ///Событие при получении информации
            socket.on('manager', function(data) {
                ///Если это данные ВВОДА (клавиатура, мышь показывать или нет)
                if(SETTING.WRITEALLINPUTDATA)
                    SERVICE.logger.debugLog('Get data from client['+socket.id+']:\ncommand:'+data.command+';\nSID:'+data.SID+';\ndata:'+JSON.stringify(data.data));
                SERVICE.handler.handleInputData(SERVICE.keeper.clientArray[socket.id],data);
            });
            
           
        });
        
    }
    

}

module.exports = Listener;
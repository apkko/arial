////Приводит логи в удобный вид, складывает логи в файл
class Logger {
    constructor(){
        this.debug = SETTING.DEBUGMODE;
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
            SERVICE.fs.appendFileSync('./service/log.txt', `\n${str}`);
        }
    }
    ///добавить постоянный лог
    consoleLog(string){
        ///Выводим Главные логи в консоль
        let str = this.formatDateDMYHMS(new Date())+" : "+string;
        console.log(this.formatDateDMYHMS(new Date())+" : "+string);
        SERVICE.fs.appendFileSync('./service/log.txt', `\n${str}`);
        
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
module.exports = Logger;
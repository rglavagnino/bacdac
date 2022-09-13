export function obtenerConexcionMongoCtrl():string{
    const mongoCtrl =  'mongodb://admin:lapicero2@dackubpr:9032/Systran?authSource=admin&readPreference=primary&directConnection=true&ssl=false'
    return mongoCtrl;
}
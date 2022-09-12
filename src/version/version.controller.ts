import { Controller, Get, Delete, Post, Body, Param, Patch } from '@nestjs/common';
import { VersionService } from './version.service';

@Controller('version')
export class VersionController {
    constructor(private readonly versionSrv: VersionService){}
    
    @Post()
    mostrarVersion(
        @Body('version') tituloVersion:string
    , @Body('descripcion') descripcionVersion:string
    , @Body('alias') aliasVersion: string
    , @Body('numero') numeroVersion: number
    ) {
        const ver =  this.versionSrv.insertarVersion(tituloVersion,descripcionVersion,aliasVersion,numeroVersion);
        return{version:ver};
    } 

    @Get()
    obtenerTodasLasVersion() {
        return this.versionSrv.obtenerVersiones();
    }

    @Get(':num')
    obtenerVersion(@Param('num') numero:number){
        return this.versionSrv.obtenerVersion(numero)
    }

    @Patch(':num')
    actualizarVersion(@Param('num') numero:number
    ,@Body('version') tituloVersion:string
    , @Body('descripcion') descripcionVersion:string
    , @Body('alias') aliasVersion: string
    ){
        this.versionSrv.actualizarVersion(
            numero,tituloVersion,descripcionVersion,aliasVersion
        )   
    }
@Delete(':num')
    borrarVersion(@Param('num') numero:number){
        this.versionSrv.borrarVersion(numero)

    }
}

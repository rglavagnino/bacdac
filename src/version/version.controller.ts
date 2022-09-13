import { Controller, Get, Delete, Post, Body, Param, Patch } from '@nestjs/common';
import { VersionService } from './version.service';

@Controller('version')
export class VersionController {
    constructor(private readonly versionSrv: VersionService){}
    
    @Post()
    async mostrarVersion(
        @Body('version') tituloVersion:string
    , @Body('descripcion') descripcionVersion:string
    , @Body('alias') aliasVersion: string
    , @Body('numero') numeroVersion: number
    ) {
        const ver =  await this.versionSrv.insertarVersion(tituloVersion,descripcionVersion,aliasVersion,numeroVersion);
        return{version:ver};
    } 

    @Get()
    async obtenerTodasLasVersion() {
        return await this.versionSrv.obtenerVersiones();
    }

    @Get(':num')
    async obtenerVersion(@Param('num') numero:number){
        return await this.versionSrv.obtenerVersion(numero)
    }

    @Patch(':num')
    async actualizarVersion(@Param('num') numero:number
    ,@Body('version') tituloVersion:string
    , @Body('descripcion') descripcionVersion:string
    , @Body('alias') aliasVersion: string
    ){
        await this.versionSrv.actualizarVersion(
            numero,tituloVersion,descripcionVersion,aliasVersion
        )   
    }
@Delete(':num')
    async borrarVersion(@Param('num') numero:number){
        const n = await this.versionSrv.borrarVersion(numero)
        return {'Borrados':n}
    }
}

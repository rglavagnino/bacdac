import { Injectable , NotFoundException} from '@nestjs/common';
import { Version } from './version.model';
import {InjectModel} from '@nestjs/mongoose'
import { Model } from 'mongoose';
import { profileEnd } from 'console';


@Injectable()
export class VersionService {
    private version: Version[] = [];
    constructor(@InjectModel('Version') private readonly versionModelo:Model<Version>) {}

    async insertarVersion(
        version:string
        ,descripcion:string
        ,alias: string
        ,numero:number
    ){
        const nuevaVersion = new this.versionModelo({
            version:version
            ,descripcion:descripcion
            ,alias:alias
            ,numero:numero
        })
        const resultadoVersion =await nuevaVersion.save()
        console.log(resultadoVersion.id)

        return resultadoVersion.id as string
    }

    async obtenerVersiones(){
        const resul = await  this.versionModelo.find().exec();
        return resul.map((ver)=>({
            id:ver.id,
            version:ver.version,
            descripcion:ver.descripcion,
            alias:ver.alias,
            numero:ver.numero
        }))
    }

    async obtenerVersion(num: number){
        const vers = await this.buscarVersion(num)
        return {id: vers._id, version:vers.version, descripcion:vers.descripcion,
        alias:vers.alias, numero:vers.numero};
    }

    async actualizarVersion(numero: number, version: string, descripicion: string, alias:string){
        const verAct = await this.buscarVersion(numero)
        
        if (version){
            verAct.version = version;
        }
        if (alias){
            verAct.alias = alias
        }
        if (descripicion){
            verAct.version = version
        }

        await verAct.save()
    }

    private async buscarVersion(num:number):Promise<Version>{
        const vers = await this.versionModelo.findOne({numero:num})
        if (!vers){
            throw new NotFoundException('No hay version')
        }
        return vers;
    }

    async borrarVersion(num:number){
        // const[ver,ind] = this.buscarVersion(num)
        // this.version.splice(ind,1)
        let result = await this.versionModelo.deleteOne({numero:num}).exec()
        return result.deletedCount
    }
}

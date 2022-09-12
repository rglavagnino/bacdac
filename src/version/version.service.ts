import { Injectable , NotFoundException} from '@nestjs/common';
import { Version } from './version.model';

@Injectable()
export class VersionService {
    private version: Version[] = [];

    insertarVersion(
        version:string
        ,descripcion:string
        ,alias: string
        ,numero:number
    ): string{
        const nuevaVersion = new Version(version,descripcion,alias,numero)
        this.version.push(nuevaVersion)
        return 'version' + version
    }

    obtenerVersiones(){
        return [...this.version];
    }

    obtenerVersion(num: number){
        const vers = this.buscarVersion(num)[0]
        return {...vers};
    }

    actualizarVersion(numero: number, version: string, descripicion: string, alias:string){
        const [ver, ind] = this.buscarVersion(numero)
        const verAct = this.version[ind] = {...ver,}
        if (version){
            verAct.version = version;
        }
        if (alias){
            verAct.alias = alias
        }
        if (descripicion){
            verAct.version = version
        }

        this.version[ind] = verAct
    }

    buscarVersion(num:number):[Version,number]{
        const versIndex = this.version.findIndex((ver) => ver.numero == num);
        const vers = this.version[versIndex]
        if (!vers){
            throw new NotFoundException('No hay version')
        }
        return [vers,versIndex];
    }

    borrarVersion(num:number){
        const[ver,ind] = this.buscarVersion(num)
        this.version.splice(ind,1)
    }
}

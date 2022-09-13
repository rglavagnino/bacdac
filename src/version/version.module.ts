import { Module } from '@nestjs/common';
import { VersionController } from './version.controller';
import { VersionService } from './version.service';
import {MongooseModule} from '@nestjs/mongoose'
import { versionSchema } from './version.model';


@Module({
    imports:[MongooseModule.forFeature([
        {name:'Version', schema: versionSchema}
    ])]
    ,controllers: [VersionController]
    ,providers:[VersionService]
})
export class VersionModule {}

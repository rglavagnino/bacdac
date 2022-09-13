import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { VersionController } from './version/version.controller';
import { VersionService } from './version/version.service';
import { VersionModule } from './version/version.module';
import { MongooseModule } from '@nestjs/mongoose';
import { obtenerConexcionMongoCtrl } from './param/param';


@Module({
  imports: [VersionModule, MongooseModule.forRoot(obtenerConexcionMongoCtrl())],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

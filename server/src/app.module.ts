import { Module } from '@nestjs/common';
import { TrackModule } from './track/track.module';
import { MongooseModule } from '@nestjs/mongoose';
import { FileModule } from './file/file.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import * as path from 'path';
import { AlbumModule } from './album/album.mobule';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: path.resolve(__dirname, 'static'),
    }),
    MongooseModule.forRoot(
      'mongodb+srv://admin:root@cluster0.lhcvmuo.mongodb.net/music-platform?retryWrites=true&w=majority',
    ),
    TrackModule,
    FileModule,
    AlbumModule,
  ],
})
export class AppModule {}

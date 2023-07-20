import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { FileService, FileType } from '../file/file.service';
import { Album, AlbumDocument } from './schemas/album.schema';
import { CreateAlbumDto } from './dto/create-album.dto';

@Injectable()
export class AlbumService {
  constructor(
    @InjectModel(Album.name) private albumModel: Model<AlbumDocument>,
    private fileService: FileService,
  ) {}
  async create(dto: CreateAlbumDto, picture): Promise<Album> {
    const picturePath = this.fileService.createFile(FileType.IMAGE, picture);
    const album = await this.albumModel.create({
      ...dto,
      picture: picturePath,
    });
    return album;
  }

  async getAll(count = 10, offset = 0): Promise<Album[]> {
    const album = await this.albumModel
      .find()
      .skip(Number(offset * count))
      .limit(Number(count));
    return album;
  }

  async getOne(id: ObjectId): Promise<Album> {
    const album = (await this.albumModel.findById(id)).populate('tracks');
    return album;
  }

  async delete(id: ObjectId): Promise<ObjectId> {
    const album = await this.albumModel.findByIdAndDelete(id);
    return album._id;
  }
  // async search(query: string): Promise<Track[]> {
  //   const tracks = await this.trackModel.find({
  //     name: { $regex: new RegExp(query, 'i') },
  //   });
  //   return tracks;
  // }
}

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Track, TrackDocument } from './schemas/track.schema';
import { Model, ObjectId } from 'mongoose';
import { Comment, CommentDocument } from './schemas/comment.schema';
import { CreateTrackDto } from './dto/create-track.dto';
import { CreateCommentDto } from './dto/create-comment.dto';
import { FileService, FileType } from '../file/file.service';
import { Album, AlbumDocument } from '../album/schemas/album.schema';

@Injectable()
export class TrackService {
  constructor(
    @InjectModel(Track.name) private trackModel: Model<TrackDocument>,
    @InjectModel(Album.name) private albumModel: Model<AlbumDocument>,
    @InjectModel(Comment.name) private commentModel: Model<CommentDocument>,
    private fileService: FileService,
  ) {}
  async create(dto: CreateTrackDto, picture, audio): Promise<Track> {
    const album = await this.albumModel.findById(dto.albumId);
    const albumId = album ? album._id : null;
    const audioPath = this.fileService.createFile(FileType.AUDIO, audio);
    const picturePath = this.fileService.createFile(FileType.IMAGE, picture);
    const track = await this.trackModel.create({
      ...dto,
      albumId: albumId,
      listens: 0,
      audio: audioPath,
      picture: picturePath,
    });
    if (albumId) {
      album.tracks.push(track._id);
      await album.save();
    }
    return track;
  }
  async getAll(count = 10, offset = 0): Promise<Track[]> {
    const tracks = await this.trackModel
      .find()
      .skip(Number(offset * count))
      .limit(Number(count));
    return tracks;
  }
  async getOne(id: ObjectId): Promise<Track> {
    const track = (await this.trackModel.findById(id)).populate('comments');
    return track;
  }

  async search(query: string): Promise<Track[]> {
    const tracks = await this.trackModel.find({
      name: { $regex: new RegExp(query, 'i') },
    });
    return tracks;
  }

  async delete(id: ObjectId): Promise<ObjectId> {
    const track = await this.trackModel.findByIdAndDelete(id);
    this.fileService.removeFile(track.audio);
    this.fileService.removeFile(track.picture);
    // console.log(track.albumId);
    // if (track.albumId) {
    //   console.log(track.albumId);

    //   const album = await this.albumModel.findById(track.albumId);
    //   const newTracks = album.tracks.filter((t) => {
    //     // @ts-ignore
    //     return String(t._id) !== String(track._id);
    //   });
    //   console.log(newTracks);
    //   album.tracks = newTracks;
    //   await album.save();
    // }
    return track._id;
  }
  async addComment(dto: CreateCommentDto): Promise<Comment> {
    const track = await this.trackModel.findById(dto.trackId);
    const comment = await this.commentModel.create({ ...dto });
    track.comments.push(comment._id);
    await track.save();
    return comment;
  }
  async listen(id: ObjectId) {
    const track = await this.trackModel.findById(id);
    track.listens += 1;
    await track.save();
  }
}

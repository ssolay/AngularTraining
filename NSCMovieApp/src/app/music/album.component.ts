import { Component, Input } from '@angular/core';
import { MusicService } from '../shared/musciservice/music.service';

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  providers: [MusicService]
})
export class AlbumComponent {

  //private view: GridDataResult;

  @Input() 
  set artistName(artistName: string) {
    this.artistName = artistName;

    // get the albums for this artist
    //this.getAlbums();
  }
  get artistId() { return this.artistName }

  constructor(private itunesService: MusicService) { }

  /*getAlbums() {
    this.itunesService.getAlbums(this.artistId).then((results: Array<any>) {
      this.view = {
        data: results,
        total: results.length
      }
    });
  }*/
}
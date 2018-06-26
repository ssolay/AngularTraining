import { Component } from '@angular/core';
import { MusicService } from '../shared/musciservice/music.service';

@Component({
    selector: 'app-artist',
    templateUrl:'./music.component.html',
    providers: [MusicService]
})
export class MusicComponent {

  searchResults: Array<String>=[];
  artistId: number = 0;

  selectedArtist: string;

  constructor(private musicService: MusicService) { }

  search(searchTerm) {
    this.musicService.search(searchTerm).subscribe(data => {
      this.searchResults = data;
      console.log('data', data);
    });
    
  }

  /*getAlbums(artistId: number, artistName: string) {
    this.artistId = artistId;
    this.selectedArtist = artistName;
  }*/
}
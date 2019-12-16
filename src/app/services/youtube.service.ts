import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class YoutubeService {

  private youtubeUrl = ' https://www.googleapis.com/youtube/v3';
  private apiKey = '';
  private playList = 'UUd9amnKhPc2I8cWByhBeHCQ';
  private nextToken: string;

  constructor(public http: HttpClient) { }

  getVideos() {
    const url = `${this.youtubeUrl}/playlistItems`;

    let parametros = new HttpParams()
      .set('part', 'snippet')
      .set('maxResults', '10')
      .set('playlistId', this.playList)
      .set('key', this.apiKey);

    if (this.nextToken) {
      parametros = parametros.set('pageToken', this.nextToken);
    }

    return this.http.get(url, { params: parametros }).pipe(map((res: any) => {
      this.nextToken = res.nextPageToken;

      const videos: any[] = [];
      for (const video of res.items) {
        videos.push(video.snippet);
      }

      return videos;
    }));
  }
}

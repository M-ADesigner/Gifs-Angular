import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchResponse } from '../interface/gifs.interfaces';
const GIPHY_API_KEY: string = 'oA5pCs26bNUPzX1wfjGN0plVZ8qIZljq';

@Injectable({ providedIn: 'root' })
export class GifsService {
  public gifList: Gif[] = [];

  private _tagHistory: string[] = [];
  private apiKey: string = GIPHY_API_KEY;
  private serviceUrl: string = 'https://api.giphy.com/v1/gifs';

  constructor(private http: HttpClient) {
    this.loadLocalStorage();
    console.log('Gifs Ready');
  }

  private organizeHistory = (tag: string): void => {
    tag = tag.toLocaleLowerCase();

    if (this._tagHistory.includes(tag)) {
      this._tagHistory = this._tagHistory.filter((oldtag) => oldtag !== tag);
    }
    this._tagHistory.unshift(tag);
    this._tagHistory = this.tagsHistory.splice(0, 10);
    this.saveLocalStorage();
  };

  private saveLocalStorage(): void {
    localStorage.setItem('history', JSON.stringify(this._tagHistory));
  }

  private loadLocalStorage() {
    if (!localStorage.getItem('history')) return;
    this._tagHistory = JSON.parse(localStorage.getItem('history')!);
  }

  get tagsHistory() {
    return [...this._tagHistory];
  }

  searchTag(tagHistory: string): void {
    this.organizeHistory(tagHistory);
    this._tagHistory.unshift(tagHistory);

    const params = new HttpParams()
      .set('api_key', this.apiKey)
      .set('limit', '5')
      .set('q', tagHistory);

    this.http
      .get<SearchResponse>(`${this.serviceUrl}/search?`, { params })
      .subscribe((resp) => {
        this.gifList = resp.data;
      });
  }
}

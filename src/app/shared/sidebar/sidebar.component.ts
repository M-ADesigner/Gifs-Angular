import { Component, ViewChild } from '@angular/core';
import { SearchBoxComponent } from 'src/app/gifs/components/search-box/search-box.component';
import { GifsModule } from 'src/app/gifs/gifs.module';
import { Gif } from 'src/app/gifs/interface/gifs.interfaces';
import { GifsService } from 'src/app/gifs/services/gifs.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent {
  constructor(private gifsService: GifsService) {}

  get tags(): string[] {
    return this.gifsService.tagsHistory;
  }

  public searchTag(newTag: string) {
    this.gifsService.searchTag(newTag);
  }
}

import { Component, ElementRef, ViewChild } from '@angular/core';
import { GifsService } from '../../services/gifs.service';

@Component({
  selector: 'gifs-search-box',
  template: `
    <h5>Buscar:</h5>
    <input
      type="text"
      class="form-control"
      placeholder="Buscar gifs..."
      (keyup.enter)="searchTag()"
      #txtTagInput
    />
  `,
  styleUrls: ['./search-box.component.css'],
})
export class SearchBoxComponent {
  constructor(private gifsServices: GifsService) {}

  // TODO: NEW DECORADOR
  @ViewChild('txtTagInput')
  public taginput!: ElementRef<HTMLInputElement>;

  public searchTag = () => {


    const newTag = this.taginput.nativeElement.value;

    if(newTag === '') return;

    this.gifsServices.searchTag(newTag);

    this.taginput.nativeElement.value = '';
  };
}

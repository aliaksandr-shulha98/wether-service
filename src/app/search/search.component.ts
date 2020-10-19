import {AfterViewInit, Component, EventEmitter, OnDestroy, Output, ViewChild} from '@angular/core';
import places from 'places.js';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements AfterViewInit, OnDestroy {
  private instance = null;

  @ViewChild('input') input;

  @Output() whenChange ? = new EventEmitter();

  ngAfterViewInit(): void {
    this.instance = places({
      container: this.input.nativeElement
    });
    this.instance.on('change', e => {
      this.whenChange.emit(e);
    });
  }

  ngOnDestroy(): void {
    this.instance.removeAllListeners('change');
    this.instance.destroy();
  }

}

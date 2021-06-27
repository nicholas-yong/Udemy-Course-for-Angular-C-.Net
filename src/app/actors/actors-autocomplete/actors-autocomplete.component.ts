import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { R3ResolvedDependencyType } from '@angular/compiler';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocomplete, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatTable } from '@angular/material/table';
import { actorsMovieDTO } from '../actors.model';
import { ActorsService } from '../actors.service';

@Component({
  selector: 'app-actors-autocomplete',
  templateUrl: './actors-autocomplete.component.html',
  styleUrls: ['./actors-autocomplete.component.css']
})
export class ActorsAutocompleteComponent implements OnInit {

  constructor(private actorsService: ActorsService) { }

  control: FormControl = new FormControl();

  @Input()
  selectedActors: actorsMovieDTO[] = [];

  actorsToDisplay: actorsMovieDTO[] = [];

  columnsToDisplay = ['picture', 'name', 'character', 'actions'];

  @ViewChild(MatTable) table: MatTable<any>;

  ngOnInit(): void {
    this.control.valueChanges.subscribe( value =>
      {
        this.actorsService.searchByName( value ).subscribe( response =>
          {
            this.actorsToDisplay = response;
          });
      });
  }

  optionSelected(event:MatAutocompleteSelectedEvent)
  {
    this.control.patchValue('');
    if( this.selectedActors.findIndex( x => x.id == event.option.value.id) !== -1 )
    {
      return;
    }
    this.selectedActors.push(event.option.value);
    if(this.table !== undefined)
    {
      this.table.renderRows();
    }
  }

  remove(actor)
  {
    let index = this.selectedActors.findIndex(a => a.name === actor.name);
    this.selectedActors.splice(index, 1);
    this.table.renderRows();
  }

  dropped(event: CdkDragDrop<any[]>)
  {
    let previous_index = this.selectedActors.findIndex( actor => actor === event.item.data)
    moveItemInArray(this.selectedActors, previous_index, event.currentIndex);
    this.table.renderRows();
  }

}

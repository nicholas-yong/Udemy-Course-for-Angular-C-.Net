import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { actorCreationDTO, actorDTO } from '../actors.model';
import { ActorsService } from '../actors.service';

@Component({
  selector: 'app-edit-actor',
  templateUrl: './edit-actor.component.html',
  styleUrls: ['./edit-actor.component.css']
})
export class EditActorComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute, private actorsService: ActorsService, private router : Router) { }

  model: actorDTO;

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params: Params) =>
      {
       this.actorsService.getByID( params.id ).subscribe( actor  =>
       {
         console.log(actor);
          this.model = actor
       });
      });
  }

  saveChanges(actorCreationDTO: actorCreationDTO)
  {
    this.actorsService.edit( this.model.id, actorCreationDTO ).subscribe(() =>
    {
      this.router.navigate(['/actors']);
    });

  }

}

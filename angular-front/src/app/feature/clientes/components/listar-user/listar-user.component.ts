import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Users } from '../../shared/models/users';
import { ClientService } from '../../shared/services/client.service';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

import { MatInputModule } from '@angular/material/input';
import { ModalComponent } from 'src/app/core/components/modal/modal.component';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-listar-user',
  standalone: true,
  imports: [CommonModule, MatButtonModule, RouterLink, MatIconModule, MatInputModule],
  templateUrl: './listar-user.component.html',
  styleUrl: './listar-user.component.css'
})
export class ListarUserComponent implements OnInit {
  clientList: Array<Users>;
  clientListFilter: Array<Users>;
  filter: string;

  constructor(
    private clientService: ClientService,
    private router: Router,
    public dialog: MatDialog,
    ) { }

  ngOnInit(): void {
    this.clientService.getAllClient().subscribe({
      next: (result: Array<Users>) => {
        this.clientList = result;
        this.clientListFilter = result;
      }
    });
  }

  onDelete(id: number) {
    this.dialog.open( ModalComponent, 
      {
     width: '250px',
     enterAnimationDuration: '0ms',
     exitAnimationDuration: 'oms',
     disableClose: true,
     data: {
       title: "Eliminar Usuario",
       message: "Esta seguro de eliminar Usuario",
       update: true
    }
   }
   ).afterClosed().subscribe(result => {
     if(result){
       this.clientService.deleteClientbyId(id).subscribe({
           next: () => {
             let client = this.clientList.find(x => x.idClient === id);
             this.clientList.splice(this.clientList.indexOf(client), 1);
           }
         })
     }
     });

     
    
  }

  onUpdate(id: number) {
      this.router.navigate([`clientes/crear/${id}`]);
  }

  onfilterUser(nombre: any) {
    this.clientListFilter = this.clientList.filter(x => x.name.includes(nombre.target.value));
  }
}


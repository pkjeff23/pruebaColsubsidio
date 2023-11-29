import { Component, OnInit } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators, FormArray } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { ClientService } from '../../shared/services/client.service';
import { Users } from '../../shared/models/users';
import { ActivatedRoute, Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import {
  MatDialog,
  MatDialogRef,
  MatDialogActions,
  MatDialogClose,
  MatDialogTitle,
  MatDialogContent,
} from '@angular/material/dialog';
import { ModalComponent } from 'src/app/core/components/modal/modal.component';
@Component({
  selector: 'app-crear-cliente',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule],
  templateUrl: './crear-cliente.component.html',
  styleUrl: './crear-cliente.component.css'
})


export class CrearClienteComponent implements OnInit {
  formulario: FormGroup;
  telefonoForm: FormGroup;
  hide = true;
  idCliente: number = null;

  constructor(
    private clientService: ClientService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private location: Location,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.formulario = this.formBuilder.group({
      idClient: [this.idCliente],
      name: ['', [Validators.required, Validators.pattern("[a-zA-Z ]*")]],
      email: ['', [Validators.required, Validators.email, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      phones: this.formBuilder.array([]),
      password: ['', Validators.required],
    });

    if (this.route.snapshot.paramMap.get('id')) {
      this.idCliente = parseInt(this.route.snapshot.paramMap.get('id'));
      this.getClient();
    } else {
      this.addTelefono();
    }
  }

  newTelefono(): FormGroup {
    return this.formBuilder.group({
      citycode: [null, [Validators.required]],
      countrycode: [null, [Validators.required]],
      number: [null, [Validators.required]]
    });
  }

  addTelefono() {
    this.getTelefonos().push(this.newTelefono());
  }

  getTelefonos(): FormArray {
    return this.formulario.get('phones') as FormArray;
  }

  getClient() {
    this.clientService.getClientbyId(this.idCliente).subscribe({
      next: (result: Users) => {

        result.phones.forEach(x => {
          this.addTelefono();
        });

        this.formulario.patchValue(result);
        this.formulario.updateValueAndValidity();
      },
      error: (ex) => {
        console.log(ex.message);
      }
    })
  }

  get passwordInput() {
    return this.formulario.get('password');
  }
  
  getErrorMessageName(): string{
    if (this.formulario.controls['name'].hasError('pattern')) {
      return 'No se aceptan numero ni caracteres especiales';
    }

    if (this.formulario.controls['name'].hasError('required')) {
      return 'no puede estar vacio';
    }

    return ''
  }
  getErrorMessageEmail(): string{
    if (this.formulario.controls['email'].hasError('pattern')) {
      return 'No es un email valido';
    }

    return this.formulario.controls['email'].hasError('email') ? 'no es un email valido' : '';
  }
  
  getErrorMessageCountryCode(index: number): string{
    
    if (this.getTelefonos().controls[index].get('countrycode').hasError('required')) {
      return 'Este campo es obligatorio';
    }
    
    if (this.getTelefonos().controls[index]['countrycode'].hasError('pattern')) {
      return 'Solo se aceptan numeros';
    }

    return ''
  }

  getErrorMessageCityCode(): string{
    if (this.formulario.controls['phones']['citycode'].hasError('pattern')) {
      return 'Solo se aceptan numeros';
    }

    if (this.formulario.controls['phones']['citycode'].hasError('required')) {
      return 'no puede estar vacio';
    }
    return ''
  }
  getErrorMessageNumber(): string{
    if (this.formulario.controls['phones']['number'].hasError('pattern')) {
      return 'Solo se aceptan numeros';
    }

    if (this.formulario.controls['number'].hasError('required')) {
      return 'no puede estar vacio';
    }
    return ''
  }
  
  getErrorMessagePassWord(): string{
    if (this.formulario.controls['password'].hasError('pattern')) {
      return 'Solo se aceptan numeros';
    }

    if (this.formulario.controls['password'].hasError('required')) {
      return 'no puede estar vacio';
    }
    return ''
  }
  onSave() {

    if (this.formulario.invalid) {
      return;
    }

    this.clientService.registerClient(this.formulario.value).subscribe({
      next: (result: Users) => {
        this.openDialog("cliente creado con exito", "Se creo usuario");
      }
    });
  }

  onUpdate() {
    if (this.formulario.invalid) {
      return;
    }

    this.dialog.open(ModalComponent,
      {
        width: '250px',
        enterAnimationDuration: '0ms',
        exitAnimationDuration: 'oms',
        disableClose: true,
        data: {
          title: "Actualizar",
          message: "Esta seguro de actualizar este usario ?",
          isinfo: false
        }
      }
    ).afterClosed().subscribe(result => {
      if (result) {
        this.clientService.updateClient(this.route.snapshot.paramMap.get('id'), this.formulario.value).subscribe({
          next: (result: Users) => {
            this.openDialog("Usuario actualizado", "Se actualizo el usuario correctamente", true);
          },
        });
      }
    });
  }

  onBack() {
    this.location.back();
  }

  openDialog(title, msg, isinfo = true): void {
    this.dialog.open(ModalComponent,
      {
        width: '250px',
        enterAnimationDuration: '0ms',
        exitAnimationDuration: 'oms',
        data: {
          title: title,
          message: msg,
          isinfo: isinfo
        }
      }
    );
  }
}

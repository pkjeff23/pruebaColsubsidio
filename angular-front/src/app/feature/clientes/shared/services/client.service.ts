import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Users } from '../models/users';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  clientservice = environment.clientServices; 

  constructor(private httpClient: HttpClient) { }

  public getAllClient(): Observable<Array<Users>>{
    return this.httpClient.get<Array<Users>>(`${this.clientservice}/client`);
  }

  public registerClient(form: Users): Observable<Users>{
    
    return this.httpClient.post<Users>(`${this.clientservice}/client`,form);
  }

  public updateClient(idclient,form: Users): Observable<Users>{
    return this.httpClient.put<Users>(`${this.clientservice}/client/${idclient}`,form);
  }

  public getClientbyId(idclient: number): Observable<Users>{
    return this.httpClient.get<Users>(`${this.clientservice}/client/${idclient}`);
  }

  public deleteClientbyId(idclient: number): Observable<Users>{
    return this.httpClient.delete<Users>(`${this.clientservice}/client/${idclient}`);
  }
}

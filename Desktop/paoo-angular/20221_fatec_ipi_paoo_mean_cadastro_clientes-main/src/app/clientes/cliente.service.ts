import { Cliente } from "./cliente.model";
import { Subject } from 'rxjs'
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

//single source of truth
@Injectable({providedIn: 'root'})
export class ClienteService{
    private clientes: Cliente[] = [];
    private listaClientesAtualizada = new Subject<Cliente[]>();

    constructor (private httpClient: HttpClient) {
    }

    getClientes(): void{
        this.httpClient.post<{mensagem: string, clientes: Cliente[]}>
        ('http://localhost:3000/api/clientes', {})
        .subscribe((dados ) => {
            this.clientes = dados.clientes
            this.listaClientesAtualizada.next([...this.clientes])
        })
    }

    // getClientes(): Cliente[]{

    //     return [...this.clientes];
    // }

    adicionarCliente (nome: string, fone: string, email: string): void {
        this.clientes.push({
            nome, fone, email
        })
        this.listaClientesAtualizada.next([...this.clientes])    
    }

    getListaDeClientesAtualizadaObservable(){
        return this.listaClientesAtualizada.asObservable()
    }
}
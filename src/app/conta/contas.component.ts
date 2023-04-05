import { Component, OnInit } from '@angular/core';
import { ContaService } from '../services/api.service';
import { Conta } from 'src/models/api';

@Component({
  selector: 'app-conta',
  templateUrl: './contas.component.html',
  styleUrls: ['./contas.component.css']
})
export class ContasComponent implements OnInit {
  contas: Conta[];
  conta: Conta;
  newConta: Conta = {
    count:'',
    banco: '',
    cc: '',
    titular: '',
    saldo: 0
  };
  opcaoSelecionada = 'listar';
  idConta: string;
  banco: string;
  cc: string;
  titular: string;
  saldo: number;
  message: string;
  tipoMovimentacao: string;
  valor: number;

  constructor(private contaService: ContaService) { }

  ngOnInit(): void {
    this.getContas();
  }

  onSelect(opcao: string): void {
    this.opcaoSelecionada = opcao;
  }

  addConta(): void {
    if (!this.newConta.banco || !this.newConta.cc || !this.newConta.titular) { return; }
    this.contaService.postConta(this.newConta)
      .subscribe(conta => {
        this.contas.push(conta);
        this.newConta = {
          count:'',
          banco: '',
          cc: '',
          titular: '',
          saldo: 0
        };
      });
  }

  getContas(): void {
    this.contaService.getContas()
      .subscribe(contas => this.contas = contas);
  }
  onSearch(): void {
    if (!this.idConta) {
      return;
    }
    this.contaService.getConta(this.idConta)
      .subscribe(conta => {
        this.conta = conta;
        this.banco = conta.banco;
        this.cc = conta.cc;
        this.titular = conta.titular;
        this.saldo = conta.saldo;
      });
  }
  onUpdate(id: string): void {
    if (!this.banco || !this.cc || !this.titular || !this.saldo) {
      return;
    }
    const data = {
      banco: this.banco,
      cc: this.cc,
      titular: this.titular,
      saldo: this.saldo
    };
    this.contaService.updateConta(id, data).subscribe(() => {
      this.getContas();
      this.message = 'Conta atualizada com sucesso.';
    });
    this.limparCampos();
  }
  onMovimentacao(idConta: string, opcao: string): void {
    if (opcao === 'depositar') {
      this.contaService.depositar(idConta, this.valor)
        .subscribe(() => {
          this.getContas();
          this.message = 'Depósito realizado com sucesso.';
        });
    } else if (opcao === 'sacar') {
      this.contaService.sacar(idConta, this.valor)
        .subscribe(() => {
          this.getContas();
          this.message = 'Saque realizado com sucesso.';
        });
    }
    this.limparCampos();
  }
  limparCampos(): void {
    this.idConta = undefined;
    this.banco = undefined;
    this.cc = undefined;
    this.titular = undefined;
    this.saldo = undefined;
    this.message = undefined;
    this.conta = undefined;
  }
  
  onSubmit() {
    if (this.opcaoSelecionada === 'buscar') {
      if (!this.idConta) { return; }
      this.contaService.getConta(this.idConta)
        .subscribe(conta => this.conta = conta);
    }
    else if (this.opcaoSelecionada === 'criar') {
      if (!this.newConta.banco || !this.newConta.cc || !this.newConta.titular) { return; }
      this.contaService.postConta(this.newConta)
        .subscribe(conta => {
          this.contas.push(conta);
          this.newConta = {
            count:'',
            banco: '',
            cc: '',
            titular: '',
            saldo: 0
          };
        });
    }
    else if (this.opcaoSelecionada === 'editar') {
      const data = {
        banco: this.banco,
        cc: this.cc,
        titular: this.titular,
        saldo: this.saldo
      };
      this.contaService.updateConta(this.idConta, data)
        .subscribe(
          response => {
            console.log(response);
            this.message = 'Conta atualizada com sucesso.';
          },
          error => {
            console.log(error);
          });
    }
    else if (this.opcaoSelecionada === 'deletar') {
      if (!this.idConta) { return; }
      if (confirm('Tem certeza que deseja excluir essa conta?')) {
        this.contaService.deleteConta(this.idConta).subscribe(() => {
          this.getContas();
        });
      }
    }
    else if (this.opcaoSelecionada === 'movimentacao') {
      if (!this.idConta || !this.valor) { 
        return; 
      }
  }
}
}
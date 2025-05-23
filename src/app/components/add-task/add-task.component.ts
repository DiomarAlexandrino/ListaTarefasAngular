import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Tarefa } from '../../../Tarefa';
import { ButtonComponent } from '../button/button.component';

@Component({
  selector: 'app-add-task',
  standalone: true,
  imports: [FormsModule, ButtonComponent, CommonModule],
  templateUrl: './add-task.component.html',
  styleUrl: './add-task.component.css'
})
export class AddTaskComponent {



@Output() onAddTask = new EventEmitter<Tarefa>();

  tarefa: string = '';
  categoria: string = '';
  concluido: boolean = false;
  mostrarAddTarefa: boolean = false ;

AlteraVisualizacao(valor : boolean) {
  this.mostrarAddTarefa = valor;
}


  onSubmit() {
    if(!this.tarefa) {
      alert('adicone uma tarefa!')
      }

    const novaTarefa = {
      tarefa:    this.tarefa,
      categoria: this.categoria,
      concluido: this.concluido
    }

    this.onAddTask.emit(novaTarefa);

    this.tarefa    = '';
    this.categoria = '';
    this.concluido = false;
  }
}

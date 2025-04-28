import { CommonModule, NgClass } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

import { Tarefa } from '../../../Tarefa';
import { FormsModule } from '@angular/forms';
import { ButtonComponent } from '../button/button.component';
import { EditTaskComponent } from "../../edit-task/edit-task.component";


@Component({
  selector: 'app-task-item',
  standalone: true,
  imports: [FontAwesomeModule, CommonModule, NgClass, FormsModule, ButtonComponent, EditTaskComponent],
  templateUrl: './task-item.component.html',
  styleUrl: './task-item.component.css'
})

export class TaskItemComponent {



  @Input()  public mostrarEditTarefa: boolean = false ;

  @Input() tarefa!:Tarefa;
 
  @Output() onEditConcluido = new EventEmitter<Tarefa>();
  @Output() onDeleteTask = new EventEmitter<Tarefa>();
  @Output() onToggleConcluido = new EventEmitter<Tarefa>();
  @Output() onClickClick = new EventEmitter<Tarefa>();
  faTimes = faTimes;
categoria: any;


    
AlteraVisualizacao1(valor: boolean) {
  this.mostrarEditTarefa = valor;
  return this.mostrarEditTarefa;
  }


  onDelete(tarefa : Tarefa){
    this.onDeleteTask.emit(tarefa);
  }

  onToggle(tarefa: Tarefa) {
    this.onToggleConcluido.emit(tarefa);
  }

  
  onClick(tarefa1: Tarefa) {
    this.onClickClick.emit(tarefa1);
  }

  onEdit(tarefa1: Tarefa) {
   
    this.onEditConcluido.emit(tarefa1);
    this.mostrarEditTarefa = true;
    
  }


  
onSubmit() {

  if(!this.tarefa) {
    alert('edit uma tarefa!')
    }
   

  const tarefaEditada = {
    id: this.tarefa.id, 
    tarefa:    this.tarefa.tarefa,
    categoria: this.tarefa.categoria,
    concluido: this.tarefa.concluido
  }
  this.onEditConcluido.emit(tarefaEditada);
  this.mostrarEditTarefa = false;
}
}


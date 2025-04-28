import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Tarefa } from '../../Tarefa';
import { TaskService } from '../services/task.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-edit-task',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './edit-task.component.html',
  styleUrl: './edit-task.component.css'
})
export class EditTaskComponent {


  public items = ['CASA', 'TRABALHO', 'FACULDADE', 'LAZER'];
  @Input() tarefa!:Tarefa;
  @Input() mostrarEditTarefa: boolean = false ;

  @Output() onEditTask = new EventEmitter<Tarefa>();
    tarefas : Tarefa[] = [];
    isSelected: boolean = false;
item: any;
    constructor(private taskService: TaskService ) {}


  onSubmit() {
    if(this.tarefa.tarefa == null || this.tarefa.tarefa == '') {
      alert('campo tarefa não pode ser vazio!')
      return;
      }

    this.taskService.updateTask(this.tarefa).subscribe((tarefa) => {
      this.onEditTask.emit(tarefa);
      this.mostrarEditTarefa = false;
    });
    location.reload();
     
}

}

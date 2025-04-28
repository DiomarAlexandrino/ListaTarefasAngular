import { CommonModule, NgFor } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { Tarefa } from '../../../Tarefa';
import { TaskService } from '../../services/task.service';
import { AddTaskComponent } from '../add-task/add-task.component';
import { TaskItemComponent } from '../task-item/task-item.component';
import { EditTaskComponent } from '../../edit-task/edit-task.component';


@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [CommonModule, TaskItemComponent,AddTaskComponent, EditTaskComponent, NgFor],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css'
})
export class TasksComponent implements OnInit {



  @Input() tarefa!:Tarefa;
  public mostrarEditTarefa: boolean = false;

editTask(tarefa: Tarefa) {
    this.tarefa = tarefa;
    this.taskService.updateTask(tarefa).subscribe();
        
    
}


onClick(tarefa: Tarefa) {

  console.log(tarefa.id);
}


  tarefas : Tarefa[] = [];
  constructor(private taskService: TaskService ) {}

  ngOnInit(): void {
    this.taskService.getTasks().subscribe((dado) => {
      this.tarefas = dado;
      console.log(dado);
    });
  }

  addTask(tarefa:Tarefa){
    this.taskService.addTask(tarefa).subscribe((tarefa) =>{
      this.tarefas.push(tarefa);
        });
  }

  deleteTask(tarefa: Tarefa) {
    this.taskService.deleteTask(tarefa).subscribe( 
      () =>(this.tarefas = this.tarefas.filter((t) => t.id !== tarefa.id))
    );
  }


  toggleConcluido(tarefa: Tarefa){
    tarefa.concluido = !tarefa.concluido;
    this.taskService.updateTask(tarefa).subscribe();
  }

  AlteraVisualizacao1(valor: boolean) {
    this.mostrarEditTarefa = valor;
    
    }
}

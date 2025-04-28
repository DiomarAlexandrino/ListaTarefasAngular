import { CommonModule, NgFor } from '@angular/common';
import { Component, input, Input, OnInit } from '@angular/core';
import { Tarefa } from '../../../Tarefa';
import { TaskService } from '../../services/task.service';
import { AddTaskComponent } from '../add-task/add-task.component';
import { TaskItemComponent } from '../task-item/task-item.component';
import { EditTaskComponent } from '../../edit-task/edit-task.component';
import { ButtonComponent } from "../button/button.component";
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [CommonModule, TaskItemComponent, AddTaskComponent, EditTaskComponent, NgFor, ButtonComponent,FormsModule],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css'
})
export class TasksComponent implements OnInit {
filtroStatus: string = 'todas';
AlteraVisualizacao(arg0: boolean) {
throw new Error('Method not implemented.');
}
 
filtrarStatus() {
return this.tarefas.filter((tarefa) => {
  if (this.filtroStatus === 'todas') {
    return true;
  } else if (this.filtroStatus === 'concluidas') {
    return tarefa.concluido === true;
  } else if (this.filtroStatus === 'pendentes') {
    return tarefa.concluido === false;
  }
  return false; // Caso não corresponda a nenhum filtro
});
  
}

filtrarTarefas() {
this.taskService.getTasks().subscribe((dado) => {



  this.tarefas = dado.filter((tarefa) => {  
    // Verifica se a tarefa contém o texto da pesquisa
    if (this.filtroStatus === 'todas') {     
      tarefa.tarefa.toLowerCase().includes(this.pesquisa.toLowerCase()) 
    } else if (this.filtroStatus === 'concluidas') {
      return((tarefa.tarefa.toLowerCase().includes(this.pesquisa.toLowerCase()) && tarefa.concluido  ===  true ) );
    } else if (this.filtroStatus === 'pendentes') {
      return ((tarefa.tarefa.toLowerCase().includes(this.pesquisa.toLowerCase()) && tarefa.concluido  ===  false ) );
    }
    return false; // Caso não corresponda a nenhum filtro

   });
  });
}

  @Input() tarefa!:Tarefa;
  public mostrarEditTarefa: boolean = false;
  @Input() pesquisa: string = '';

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

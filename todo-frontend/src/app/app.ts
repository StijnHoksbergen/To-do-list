import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TodoService } from './todo';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class AppComponent implements OnInit {
  todos: any[] = [];
  nieuweTodo = { naam: '', beschrijving: '', deadline: '' };

  constructor(private todoService: TodoService) {}

  ngOnInit() {
    this.laadTodos();
  }

  laadTodos() {
    this.todoService.getTodos().subscribe(data => {
      this.todos = data;
    });
  }

  voegToe() {
    if (!this.nieuweTodo.naam || !this.nieuweTodo.deadline) return;
    this.todoService.addTodo(this.nieuweTodo).subscribe(() => {
      this.nieuweTodo = { naam: '', beschrijving: '', deadline: '' };
      this.laadTodos();
    });
  }

  verwijder(id: number) {
    this.todoService.deleteTodo(id).subscribe(() => {
      this.laadTodos();
    });
  }
}
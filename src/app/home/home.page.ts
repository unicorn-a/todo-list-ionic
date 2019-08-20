import { Component } from '@angular/core';
import {Todo} from 'src/app/interface/todo'
import {TodoService} from '../service/todo.service'

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  public todos: Array<Todo> = [];
  public todoTitle: string = '';

  constructor(private todoService: TodoService) {}

  ngOnInit() {
    this.todoService.todos.subscribe((todos: Array<Todo>) => {
      this.todos = todos;
    });
  }

  addTodo():void {
    const newTodo: Todo = {
      title: this.todoTitle.trim(),
      done: false
    }

    //если ничего не введено или введены только пробелы - не добавляем новый элемент в список
    if(this.todoTitle.trim().length === 0) {
      // console.log('no enter todo-item-',this.todoTitle)
      return;
    }
    //добавляем новый элемент в список всех элементов и очищаем поле - input
    this.todos.push(newTodo);
    // console.log(' new todo items-', this.todoTitle)
    this.todoTitle = '';
    this.todoService.todos.next(this.todos);
  }

  deleteTodo(todo: Todo):void {
    // console.log(this.todos.indexOf(todo));
    this.todos.splice(this.todos.indexOf(todo), 1);
    this.todoService.todos.next(this.todos);
    return;
  }

  get uncopletedTodos() {
    return this.todos.filter(function(todo: Todo){

      return !todo.done;
    });
  }

  get completedTodos() {
    return this.todos.filter((todo: Todo) => todo.done);
  }

  checkingTodo(i: number): void {
    this.todoService.todos.next(this.todos);
    return;
  }


}

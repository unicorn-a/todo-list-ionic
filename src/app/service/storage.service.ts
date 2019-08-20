import { Injectable } from '@angular/core';
import {TodoService} from './todo.service';
import { Storage } from '@ionic/storage';
import { Todo } from '../interface/todo';

@Injectable({
  providedIn: 'root'
})

export class StorageService {
  private storageKey='todos';

  constructor(
    private todoService: TodoService,
    private storage: Storage
    ) { }

  public init() {
    this.loadTodos();
    this.addSubscriber();

  }

  private loadTodos() {

    const todos = this.storage.get(this.storageKey).then((val)=>{ //получаем данные из хранилища
      // console.log("Value-todos: ",val);
      this.todoService.todos.next(val || []);//если  val = null/undefined/0/'' то заменить на []
    }).catch(()=> console.log('error load todo list'));
    console.log("storage-todos: ",  this.todoService.todos);

  }

  private addSubscriber(){

    this.todoService.todos.subscribe((todos: Array<Todo>)=>{
      // console.log("addSubscribe-todos: ", todos);
      this.storage.set(this.storageKey,todos);
    });
  }
}

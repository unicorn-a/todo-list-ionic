import { Injectable } from '@angular/core';
import {Todo} from 'src/app/interface/todo';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  public todos: BehaviorSubject<Array<Todo>> = new BehaviorSubject([]);

  constructor() { }
}

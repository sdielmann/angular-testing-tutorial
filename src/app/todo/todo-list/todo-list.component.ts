import { Component, Input, OnInit } from '@angular/core';
import { Todo } from '../model/Todo';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {

  @Input() todos: Todo[] = [{
    id: '0',
    createdAt: new Date().toISOString(),
    text: 'Your first Todo',
    done: false
  }];

  constructor() { }

  ngOnInit(): void {
  }

}

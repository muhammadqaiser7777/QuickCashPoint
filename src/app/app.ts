import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './layouts/header/header';
import { Footer } from './layouts/footer/footer';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, Header, Footer],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App {}

import { Component, OnInit } from '@angular/core';
import { DomSanitizer} from '@angular/platform-browser';
import { EscapeHtmlPipe } from '../escapeHtmlPipe';

@Component({
  selector: 'app-index-page',
  templateUrl: './index-page.component.html',
  styleUrls: ['./index-page.component.scss']
})
export class IndexPageComponent implements OnInit {

  rawTcSetVarsExemple = `
  <html-element tcSetVars="'{env_language': 'fr'}"></html-element>
  <!-- other exemples -->
  <!-- defaultLanguage being an attribut of your component -->
  <template tcSetVars="{'env_language': defaultLanguage'}"></template>
  <div tcSetVars="{'env_language': default_language}"></div>`;

  constructor() { 
  }

  ngOnInit() {
  }

}

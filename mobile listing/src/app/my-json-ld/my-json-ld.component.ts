import { Component, OnInit, Input } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
@Component({
  selector: 'app-my-json-ld',
  template: '<div [innerHTML]="html"></div>',
  styles: []
})
export class MyJsonLdComponent implements OnInit {
  @Input() itemLD: {[key: string]: any};
  html: SafeHtml;
  constructor(private sanitizer: DomSanitizer) { }
  ngOnInit() {
    this.html = this.getSafeHTML(this.itemLD);
  }
  getSafeHTML(jsonLD: {[key: string]: any}): SafeHtml {
    const json = jsonLD ? JSON.stringify(jsonLD, null, 2).replace(/<\/script>/g, '<\\/script>') : ''; // escape / to prevent script tag in JSON
    const html = `<script type="application/ld+json">${json}</script>`;
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }
}
@Component({
  selector: 'app-my-json-ld',
  template: '<div [innerHTML]="html"></div>',
  styles: []
})
export class MyJsonLdComponentcity implements OnInit {
  @Input() itemLD: {[key: string]: any};
  html: SafeHtml;
  constructor(private sanitizer: DomSanitizer) { }
  ngOnInit() {
    this.html = this.getSafeHTML(this.itemLD);
  }
  getSafeHTML(jsonLD: {[key: string]: any}): SafeHtml {
    const json = jsonLD ? JSON.stringify(jsonLD, null, 2).replace(/<\/script>/g, '<\\/script>') : ''; // escape / to prevent script tag in JSON
    const html = `<script type="application/ld+json">${json}</script>`;
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }
}
@Component({
  selector: 'app-my-json-ld',
  template: '<div [innerHTML]="html"></div>',
  styles: []
})
export class MyJsonLdComponentresidence implements OnInit {
  @Input() itemLD: {[key: string]: any};
  html: SafeHtml;
  constructor(private sanitizer: DomSanitizer) { }
  ngOnInit() {
    this.html = this.getSafeHTML(this.itemLD);
  }
  getSafeHTML(jsonLD: {[key: string]: any}): SafeHtml {
    const json = jsonLD ? JSON.stringify(jsonLD, null, 2).replace(/<\/script>/g, '<\\/script>') : ''; // escape / to prevent script tag in JSON
    const html = `<script type="application/ld+json">${json}</script>`;
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }
}
@Component({
  selector: 'app-my-json-ld',
  template: '<div [innerHTML]="html"></div>',
  styles: []
})
export class MyJsonLdComponenthome implements OnInit {
  @Input() itemLD: {[key: string]: any};
  html: SafeHtml;
  constructor(private sanitizer: DomSanitizer) { }
  ngOnInit() {
    this.html = this.getSafeHTML(this.itemLD);
  }
  getSafeHTML(jsonLD: {[key: string]: any}): SafeHtml {
    const json = jsonLD ? JSON.stringify(jsonLD, null, 2).replace(/<\/script>/g, '<\\/script>') : ''; // escape / to prevent script tag in JSON
    const html = `<script type="application/ld+json">${json}</script>`;
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }
}
@Component({
  selector: 'app-my-json-ld',
  template: '<div [innerHTML]="html"></div>',
  styles: []
})
export class MyJsonLdComponentvillas implements OnInit {
  @Input() itemLD: {[key: string]: any};
  html: SafeHtml;
  constructor(private sanitizer: DomSanitizer) { }
  ngOnInit() {
    this.html = this.getSafeHTML(this.itemLD);
  }
  getSafeHTML(jsonLD: {[key: string]: any}): SafeHtml {
    const json = jsonLD ? JSON.stringify(jsonLD, null, 2).replace(/<\/script>/g, '<\\/script>') : ''; // escape / to prevent script tag in JSON
    const html = `<script type="application/ld+json">${json}</script>`;
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }
}
@Component({
  selector: 'app-my-json-ld',
  template: '<div [innerHTML]="html"></div>',
  styles: []
})
export class MyJsonLdComponentplots implements OnInit {
  @Input() itemLD: {[key: string]: any};
  html: SafeHtml;
  constructor(private sanitizer: DomSanitizer) { }
  ngOnInit() {
    this.html = this.getSafeHTML(this.itemLD);
  }
  getSafeHTML(jsonLD: {[key: string]: any}): SafeHtml {
    const json = jsonLD ? JSON.stringify(jsonLD, null, 2).replace(/<\/script>/g, '<\\/script>') : ''; // escape / to prevent script tag in JSON
    const html = `<script type="application/ld+json">${json}</script>`;
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }
}
@Component({
  selector: 'app-my-json-ld',
  template: '<div [innerHTML]="html"></div>',
  styles: []
})
export class MyJsonLdComponentlocality implements OnInit {
  @Input() itemLD: {[key: string]: any};
  html: SafeHtml;
  constructor(private sanitizer: DomSanitizer) { }
  ngOnInit() {
    this.html = this.getSafeHTML(this.itemLD);
  }
  getSafeHTML(jsonLD: {[key: string]: any}): SafeHtml {
    const json = jsonLD ? JSON.stringify(jsonLD, null, 2).replace(/<\/script>/g, '<\\/script>') : ''; // escape / to prevent script tag in JSON
    const html = `<script type="application/ld+json">${json}</script>`;
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }
}
@Component({
  selector: 'app-my-json-ld',
  template: '<div [innerHTML]="html"></div>',
  styles: []
})
export class MyJsonLdComponentbuilder implements OnInit {
  @Input() itemLD: {[key: string]: any};
  html: SafeHtml;
  constructor(private sanitizer: DomSanitizer) { }
  ngOnInit() {
    this.html = this.getSafeHTML(this.itemLD);
  }
  getSafeHTML(jsonLD: {[key: string]: any}): SafeHtml {
    const json = jsonLD ? JSON.stringify(jsonLD, null, 2).replace(/<\/script>/g, '<\\/script>') : ''; // escape / to prevent script tag in JSON
    const html = `<script type="application/ld+json">${json}</script>`;
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }
}
@Component({
  selector: 'app-my-json-ld',
  template: '<div [innerHTML]="html"></div>',
  styles: []
})
export class MyJsonLdComponentbuilderLocality implements OnInit {
  @Input() itemLD: {[key: string]: any};
  html: SafeHtml;
  constructor(private sanitizer: DomSanitizer) { }
  ngOnInit() {
    this.html = this.getSafeHTML(this.itemLD);
  }
  getSafeHTML(jsonLD: {[key: string]: any}): SafeHtml {
    const json = jsonLD ? JSON.stringify(jsonLD, null, 2).replace(/<\/script>/g, '<\\/script>') : ''; // escape / to prevent script tag in JSON
    const html = `<script type="application/ld+json">${json}</script>`;
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }
}
@Component({
  selector: 'app-my-json-ld',
  template: '<div [innerHTML]="html"></div>',
  styles: []
})
export class MyJsonLdComponentpropstatustypecity implements OnInit {
  @Input() itemLD: {[key: string]: any};
  html: SafeHtml;
  constructor(private sanitizer: DomSanitizer) { }
  ngOnInit() {
    this.html = this.getSafeHTML(this.itemLD);
  }
  getSafeHTML(jsonLD: {[key: string]: any}): SafeHtml {
    const json = jsonLD ? JSON.stringify(jsonLD, null, 2).replace(/<\/script>/g, '<\\/script>') : ''; // escape / to prevent script tag in JSON
    const html = `<script type="application/ld+json">${json}</script>`;
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }
}
@Component({
  selector: 'app-my-json-ld',
  template: '<div [innerHTML]="html"></div>',
  styles: []
})
export class MyJsonLdComponentbhkstatustypelocalitycity implements OnInit {
  @Input() itemLD: {[key: string]: any};
  html: SafeHtml;
  constructor(private sanitizer: DomSanitizer) { }
  ngOnInit() {
    this.html = this.getSafeHTML(this.itemLD);
  }
  getSafeHTML(jsonLD: {[key: string]: any}): SafeHtml {
    const json = jsonLD ? JSON.stringify(jsonLD, null, 2).replace(/<\/script>/g, '<\\/script>') : ''; // escape / to prevent script tag in JSON
    const html = `<script type="application/ld+json">${json}</script>`;
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }
}
@Component({
  selector: 'app-my-json-ld',
  template: '<div [innerHTML]="html"></div>',
  styles: []
})
export class MyJsonLdComponentbhkwithlocality implements OnInit {
  @Input() itemLD: {[key: string]: any};
  html: SafeHtml;
  constructor(private sanitizer: DomSanitizer) { }
  ngOnInit() {
    this.html = this.getSafeHTML(this.itemLD);
  }
  getSafeHTML(jsonLD: {[key: string]: any}): SafeHtml {
    const json = jsonLD ? JSON.stringify(jsonLD, null, 2).replace(/<\/script>/g, '<\\/script>') : ''; // escape / to prevent script tag in JSON
    const html = `<script type="application/ld+json">${json}</script>`;
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }
}
@Component({
  selector: 'app-my-json-ld',
  template: '<div [innerHTML]="html"></div>',
  styles: []
})
export class MyJsonLdComponentzone implements OnInit {
  @Input() itemLD: {[key: string]: any};
  html: SafeHtml;
  constructor(private sanitizer: DomSanitizer) { }
  ngOnInit() {
    this.html = this.getSafeHTML(this.itemLD);
  }
  getSafeHTML(jsonLD: {[key: string]: any}): SafeHtml {
    const json = jsonLD ? JSON.stringify(jsonLD, null, 2).replace(/<\/script>/g, '<\\/script>') : ''; // escape / to prevent script tag in JSON
    const html = `<script type="application/ld+json">${json}</script>`;
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }
}
@Component({
  selector: 'app-my-json-ld',
  template: '<div [innerHTML]="html"></div>',
  styles: []
})
export class MyJsonLdComponentnewprojectslocality implements OnInit {
  @Input() itemLD: {[key: string]: any};
  html: SafeHtml;
  constructor(private sanitizer: DomSanitizer) { }
  ngOnInit() {
    this.html = this.getSafeHTML(this.itemLD);
  }
  getSafeHTML(jsonLD: {[key: string]: any}): SafeHtml {
    const json = jsonLD ? JSON.stringify(jsonLD, null, 2).replace(/<\/script>/g, '<\\/script>') : ''; // escape / to prevent script tag in JSON
    const html = `<script type="application/ld+json">${json}</script>`;
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }
}
@Component({
  selector: 'app-my-json-ld',
  template: '<div [innerHTML]="html"></div>',
  styles: []
})
export class MyJsonLdComponentstlc implements OnInit {
  @Input() itemLD: {[key: string]: any};
  html: SafeHtml;
  constructor(private sanitizer: DomSanitizer) { }
  ngOnInit() {
    this.html = this.getSafeHTML(this.itemLD);
  }
  getSafeHTML(jsonLD: {[key: string]: any}): SafeHtml {
    const json = jsonLD ? JSON.stringify(jsonLD, null, 2).replace(/<\/script>/g, '<\\/script>') : ''; // escape / to prevent script tag in JSON
    const html = `<script type="application/ld+json">${json}</script>`;
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }
}
@Component({
  selector: 'app-my-json-ld',
  template: '<div [innerHTML]="html"></div>',
  styles: []
})
export class MyJsonLdComponenttypewithlocality implements OnInit {
  @Input() itemLD: {[key: string]: any};
  html: SafeHtml;
  constructor(private sanitizer: DomSanitizer) { }
  ngOnInit() {
    this.html = this.getSafeHTML(this.itemLD);
  }
  getSafeHTML(jsonLD: {[key: string]: any}): SafeHtml {
    const json = jsonLD ? JSON.stringify(jsonLD, null, 2).replace(/<\/script>/g, '<\\/script>') : ''; // escape / to prevent script tag in JSON
    const html = `<script type="application/ld+json">${json}</script>`;
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }
}
@Component({
  selector: 'app-my-json-ld',
  template: '<div [innerHTML]="html"></div>',
  styles: []
})
export class MyJsonLdComponentpropertystatus implements OnInit {
  @Input() itemLD: {[key: string]: any};
  html: SafeHtml;
  constructor(private sanitizer: DomSanitizer) { }
  ngOnInit() {
    this.html = this.getSafeHTML(this.itemLD);
  }
  getSafeHTML(jsonLD: {[key: string]: any}): SafeHtml {
    const json = jsonLD ? JSON.stringify(jsonLD, null, 2).replace(/<\/script>/g, '<\\/script>') : ''; // escape / to prevent script tag in JSON
    const html = `<script type="application/ld+json">${json}</script>`;
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }
}
@Component({
  selector: 'app-my-json-ld',
  template: '<div [innerHTML]="html"></div>',
  styles: []
})
export class MyJsonLdComponentfarmland implements OnInit {
  @Input() itemLD: {[key: string]: any};
  html: SafeHtml;
  constructor(private sanitizer: DomSanitizer) { }
  ngOnInit() {
    this.html = this.getSafeHTML(this.itemLD);
  }
  getSafeHTML(jsonLD: {[key: string]: any}): SafeHtml {
    const json = jsonLD ? JSON.stringify(jsonLD, null, 2).replace(/<\/script>/g, '<\\/script>') : ''; // escape / to prevent script tag in JSON
    const html = `<script type="application/ld+json">${json}</script>`;
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }
}
import { Component, OnInit, Input } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

declare var $: any;
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

declare var $: any;
@Component({
  selector: 'app-my-json-ld',
  template: '<div [innerHTML]="html"></div>',
  styles: []
})
export class MyJsonLdComponentmainhome implements OnInit {
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

declare var $: any;
@Component({
  selector: 'app-my-json-ld',
  template: '<div [innerHTML]="html"></div>',
  styles: []
})
export class MyJsonBlogComponent implements OnInit {
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
export class MyJsonBlogNewComponent implements OnInit {
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
export class MyJsonLdBlogWebStoryListing implements OnInit {
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
export class MyJsonLdBlogWebStory implements OnInit {
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


declare var $: any;
@Component({
  selector: 'app-my-json-ld',
  template: '<div [innerHTML]="html"></div>',
  styles: []
})
export class MyJsonBlogcatComponent implements OnInit {
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
declare var $: any;
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


declare var $: any;
@Component({
  selector: 'app-my-json-ld',
  template: '<div [innerHTML]="html"></div>',
  styles: []
})
export class MyJsonLdComponentcity_new implements OnInit {
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


declare var $: any;
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

declare var $: any;
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

declare var $: any;
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

declare var $: any;
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

declare var $: any;
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

declare var $: any;
@Component({
  selector: 'app-my-json-ld',
  template: '<div [innerHTML]="html"></div>',
  styles: []
})
export class MyJsonLdComponentlocalityNew implements OnInit {
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

declare var $: any;
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

declare var $: any;
@Component({
  selector: 'app-my-json-ld',
  template: '<div [innerHTML]="html"></div>',
  styles: []
})
export class MyJsonLdComponentbuilderNew implements OnInit {
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


declare var $: any;
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


declare var $: any;
@Component({
  selector: 'app-my-json-ld',
  template: '<div [innerHTML]="html"></div>',
  styles: []
})
export class MyJsonLdComponentbuilderLocality_new implements OnInit {
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

declare var $: any;
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

declare var $: any;
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

declare var $: any;
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

declare var $: any;
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

declare var $: any;
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

declare var $: any;
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

declare var $: any;
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
declare var $: any;
@Component({
  selector: 'app-my-json-ld',
  template: '<div [innerHTML]="html"></div>',
  styles: []
})
export class MyJsonLdComponenttypewithlocalitys implements OnInit {
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
declare var $: any;
@Component({
  selector: 'app-my-json-ld',
  template: '<div [innerHTML]="html"></div>',
  styles: []
})
export class MyJsonLdComponentAffordable implements OnInit {
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
declare var $: any;
@Component({
  selector: 'app-my-json-ld',
  template: '<div [innerHTML]="html"></div>',
  styles: []
})
export class MyJsonLdComponentAffordableProject implements OnInit {
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
declare var $: any;
@Component({
  selector: 'app-my-json-ld',
  template: '<div [innerHTML]="html"></div>',
  styles: []
})
export class MyJsonLdComponentLuxury implements OnInit {
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
declare var $: any;
@Component({
  selector: 'app-my-json-ld',
  template: '<div [innerHTML]="html"></div>',
  styles: []
})
export class MyJsonLdComponentLuxuryProject implements OnInit {
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

declare var $: any;
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

declare var $: any;
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
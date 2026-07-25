import { Directive, Injectable, Input, EventEmitter, Output, ElementRef, HostListener, AfterViewInit, OnDestroy } from '@angular/core';

@Directive({
  selector: '[ScrollSpy]'
})

export class ScrollSpy4Directive implements AfterViewInit, OnDestroy {
    @Input() public spiedTags: string[] = [];
    @Output() public sectionChange = new EventEmitter<string>();
    private currentSection: string;
    private observer: IntersectionObserver;

    constructor(private _el: ElementRef) {}

    ngAfterViewInit() {
        const options = {
            root: null, // Uses the viewport as the root
            rootMargin: '0px 0px -85% 0px', // Triggers when 50% of the element is visible from the top
            threshold: 0.1 // Slightly visible in viewport
        };

        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const element = entry.target as HTMLElement;
                    if (element.id && this.spiedTags.includes(element.tagName)) {
                        this.setCurrentSection(element.id);
                    }
                }
            });
        }, options);

        // Observe each child element that matches the spiedTags
        const children = this._el.nativeElement.children;
        for (let i = 0; i < children.length; i++) {
            const element = children[i];
            if (this.spiedTags.includes(element.tagName)) {
                this.observer.observe(element);
            }
        }
    }

    private setCurrentSection(sectionId: string) {
        if (sectionId !== this.currentSection) {
            this.currentSection = sectionId;
            this.sectionChange.emit(this.currentSection);
        }
    }

    ngOnDestroy() {
        if (this.observer) {
            this.observer.disconnect();
        }
    }
}

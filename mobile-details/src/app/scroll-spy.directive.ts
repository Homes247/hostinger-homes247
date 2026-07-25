import { Directive, Input, EventEmitter, Output, ElementRef, HostListener } from '@angular/core';

@Directive({
    selector: '[ScrollSpy]',
    standalone: true
})
export class ScrollSpyDirective {
    @Input() public spiedTags = [];
    @Output() public sectionChange = new EventEmitter<string>();
    private currentSection: string | undefined;
    private readonly thresholdPx = 150;

    constructor(private _el: ElementRef) {}

    @HostListener('window:scroll', [])
    onWindowScroll() {
        this.checkScroll(window.scrollY || document.documentElement.scrollTop);
    }

    // Also listen to scroll on the host container itself (e.g. modal body).
    @HostListener('scroll', ['$event'])
    onContainerScroll(event: any) {
        const target = event?.target as HTMLElement | undefined;
        if (!target) return;

        this.checkScroll(target.scrollTop, target);
    }

    private checkScroll(scrollTop: number, containerEl?: HTMLElement) {
        let currentSection: string | undefined;

        const sectionElements = this._el.nativeElement.querySelectorAll('div[id^="section"]') as NodeListOf<HTMLElement>;
        if (!sectionElements.length) return;

        if (containerEl) {
            // For modal/popup scroll containers, compute each section's position
            // relative to the scrolling container.
            const containerRect = containerEl.getBoundingClientRect();

            for (let i = 0; i < sectionElements.length; i++) {
                const element = sectionElements[i];

                // Section's top position in container scroll coordinates:
                //   (distance from viewport top) - (container distance from viewport top) + container scrollTop
                const relativeTop = element.getBoundingClientRect().top - containerRect.top + scrollTop;

                if (relativeTop - this.thresholdPx <= scrollTop) {
                    currentSection = element.id;
                }
            }        
        } else {
            for (let i = 0; i < sectionElements.length; i++) {
                const element = sectionElements[i];

                const elementTop = element.getBoundingClientRect().top + window.scrollY;

                if (elementTop - this.thresholdPx <= scrollTop) {
                    currentSection = element.id;
                }
            }
        }

        if (currentSection && currentSection !== this.currentSection) {
            this.currentSection = currentSection;
            this.sectionChange.emit(this.currentSection);
        }
    }
}
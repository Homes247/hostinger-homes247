import { isPlatformBrowser } from '@angular/common';
import { AfterViewInit, Directive, Inject, PLATFORM_ID, Renderer2 } from '@angular/core';

@Directive({
    selector: '[appGlobalImageFix]' // will attach globally from module
})
export class GlobalImageFixDirective implements AfterViewInit {
    private isBrowser: boolean;

    constructor(
        private renderer: Renderer2,
        @Inject(PLATFORM_ID) private platformId: Object
    ) {
        this.isBrowser = isPlatformBrowser(this.platformId);
    }

    ngAfterViewInit(): void {
        if (!this.isBrowser) return;

        const fixImages = () => {
            const allImgs = document.querySelectorAll<HTMLImageElement>(
                'img[src^="https://img-mb.homes247.in/images/spotlight_images/"]'
            );

            allImgs.forEach(img => {
                if (!img.src.includes('?width=')) {
                    const newSrc = `${img.src}?width=390&height=244`;
                    this.renderer.setAttribute(img, 'src', newSrc);
                }
            });
        };

        // Initial run for images already rendered
        fixImages();

        // Observe the entire document for lazyload or dynamic changes
        const observer = new MutationObserver(() => fixImages());
        observer.observe(document.body, {
            childList: true,
            subtree: true,
            attributes: true,
            attributeFilter: ['src'],
        });
    }
}

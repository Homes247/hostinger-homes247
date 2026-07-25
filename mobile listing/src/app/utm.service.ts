import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Router, NavigationStart } from '@angular/router';
@Injectable({
  providedIn: 'root',
})
export class UtmService {
  private utmParams: string = '';
  constructor(
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    // Ensure this logic runs only in the browser
    if (isPlatformBrowser(this.platformId)) {
      const url = new URL(window.location.href);
      // Run logic only if the URL has `utm_source`
      if (url.search.includes('utm_source')) {
        this.utmParams = url.search; // Store initial UTM parameters
        // Update UTM parameters for router navigation
        this.router.events.subscribe((event) => {
          if (event instanceof NavigationStart) {
            if (event.url.includes('utm_source')) {
              return;
            }
            if (this.utmParams) {
              const updatedUrl = event.url.includes('?')
                ? `${event.url}&${this.utmParams.substring(1)}`
                : `${event.url}${this.utmParams}`;
              if (event.url !== updatedUrl) {
                this.router.navigateByUrl(updatedUrl, { replaceUrl: true });
              }
            }
          }
        });
        // Use setInterval for periodic updates
        setInterval(() => {
          this.updateLinks();
        }, 1000);
        // Intercept all click events on the document
        document.addEventListener('click', (event: MouseEvent) => {
          const target = event.target as HTMLElement;
          let href: string | null = null;
          let openInNewTab = false;
          if (target.hasAttribute('href')) {
            href = target.getAttribute('href');
            openInNewTab = target.getAttribute('target') === '_blank';
          } else {
            let parent = target.parentElement;
            while (parent) {
              if (parent.hasAttribute('href')) {
                href = parent.getAttribute('href');
                openInNewTab = parent.getAttribute('target') === '_blank';
                break;
              }
              parent = parent.parentElement;
            }
          }
          if (href) {
            if (href.startsWith('#') || href.includes('#')) {
              return;
            }
            if (!href.includes('utm_source') && this.utmParams) {
              event.preventDefault();
              let updatedHref = href;
              if (href.startsWith('http') || href.startsWith('https')) {
                const url = new URL(href);
                if (!url.search.includes('utm_source')) {
                  url.search += url.search
                    ? '&' + this.utmParams.substring(1)
                    : this.utmParams;
                  updatedHref = url.toString();
                }
              } else if (href.startsWith('/')) {
                if (!href.includes('utm_source')) {
                  updatedHref = href + (href.includes('?') ? '&' + this.utmParams.substring(1) : this.utmParams);
                }
              }
              if (openInNewTab) {
                window.open(updatedHref, '_blank');
              } else if (updatedHref.startsWith(window.location.origin)) {
                this.router.navigateByUrl(updatedHref).catch((err) => {
                  console.error('Navigation error:', err);
                });
              } else {
                window.location.href = updatedHref;
              }
            }
          }
        });
        this.updateLinks();
      }
    }
  }
  private updateLinks() {
    const links = document.querySelectorAll<HTMLAnchorElement>('a[href]');
    links.forEach((link) => {
      const href = link.getAttribute('href');
      if (href && !href.includes('utm_source') && this.utmParams) {
        if (href.startsWith('http') || href.startsWith('https')) {
          const url = new URL(href);
          if (!url.search.includes('utm_source')) {
            url.search += url.search
              ? '&' + this.utmParams.substring(1)
              : this.utmParams;
            link.setAttribute('href', url.toString());
          }
        } else if (href.startsWith('/')) {
          if (!href.includes('utm_source')) {
            const updatedHref =
              href + (href.includes('?') ? '&' + this.utmParams.substring(1) : this.utmParams);
            link.setAttribute('href', updatedHref);
          }
        }
      }
    });
  }
}

import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class LoaderService {
    showLoader: boolean = false;

    constructor() {

    }

    public show(): void {
        this.showLoader = true;
    }

    public hide(delay: number = 0): void {
        setTimeout(() => {
            this.showLoader = false;
        }, delay);
    }
}
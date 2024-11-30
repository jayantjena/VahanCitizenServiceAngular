import { AfterViewInit, Component, Input, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { MaphomepageserviceService } from './maphomepageservice.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DialogBodyComponent } from 'src/app/shared/dialog-body/dialog-body.component';

@Component({
  selector: 'app-maphomepage',
  templateUrl: './maphomepage.component.html',
  styleUrls: ['./maphomepage.component.css']
})
export class MaphomepageComponent implements OnInit  {

  noOfServices: any;
  onLineServicesList: any[];
  @Input() isHomePageDisplay: boolean = false;

  public createlogoSvg: any = this.maphomepageservice.setSvgResources();
  constructor(private maphomepageservice: MaphomepageserviceService, private renderer: Renderer2,
    private matDialog: MatDialog) { }


  map_cfg: any = {};


  ngOnInit(): void {
    debugger
    // Set initial map configuration
    this.map_cfg.mapWidth = 0;

    // Load multiple JS files sequentially
    this.loadScriptsSequentially([
      'assets/js/jquery.js',
      'assets/js/raphael.min.js',
      'assets/js/map-settings.js',
      'assets/js/paths.js',
      'assets/js/map.js',
    ]);
  }

  // Load scripts one by one sequentially
  loadScriptsSequentially(scriptUrls: string[]): void {
    scriptUrls.reduce((promise, url) => {
      // Chain the script loading promise
      return promise.then(() => this.loadScript(url));
    }, Promise.resolve())
      .then(() => {
        console.log('All scripts loaded successfully.');
        this.loadInlineScript();  // Initialize the map after all scripts are loaded
      })
      .catch((error) => {
        console.error('Error loading scripts:', error);
      });
  }
  ngAfterViewInit(): void { 
    // Ensure the DOM is ready before injecting the script
    this.loadInlineScript();
  }
  // Inline JavaScript code to initialize the map
  loadInlineScript(): void {
    const script = this.renderer.createElement('script');

    // Inline JavaScript code for the map
    const inlineScript = `
        map_cfg.mapWidth = 0;
        var map = new FlaMap(map_cfg);
        map.drawOnDomReady('map-container');
      `;

    // Set the innerHTML of the script to the inline code
    this.renderer.setProperty(script, 'innerHTML', inlineScript);

    // Append the script to the document body
    this.renderer.appendChild(document.body, script);
  }

  // Load a single script dynamically and return a Promise
  loadScript(scriptUrl: string): Promise<void> {
    return new Promise((resolve, reject) => {
      const script = this.renderer.createElement('script');
      this.renderer.setAttribute(script, 'src', scriptUrl);
      this.renderer.setAttribute(script, 'type', 'text/javascript');
      this.renderer.setAttribute(script, 'async', 'true');
         // Listen for the script load event
      this.renderer.listen(script, 'load', () => {
        console.log(`Script loaded successfully: ${scriptUrl}`);
        resolve();
      });

      // Listen for the script error event
      this.renderer.listen(script, 'error', (error) => {
        console.error(`Error loading script: ${scriptUrl}`, error);
        reject(error);
      });

      // Append the script to the document body
      this.renderer.appendChild(document.body, script);
    });
  }


  getTotalServices(state_cd: String) {
    this.maphomepageservice.getTotalServices(state_cd).subscribe(
      {
        next: (states: any[]) => {
          this.noOfServices = states;
        },
        error: err => {
          console.log(err);
        }
      });
  }

  fetchServicesOfStates(state_cd: String) {
    this.maphomepageservice.fetchServicesOfStates(state_cd).subscribe(
      {
        next: (res: any[]) => {
          this.onLineServicesList = res;
          console.log(this.onLineServicesList);
          const dialogConfig = new MatDialogConfig();
          dialogConfig.data = this.onLineServicesList;
          this.matDialog.open(DialogBodyComponent, dialogConfig);
        },
        error: err => {
          console.log(err);
        }
      });
  }

}


import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SvgService } from 'src/app/services/common/svg.service';
import { DomSanitizer } from '@angular/platform-browser';
import { AppResponseTypeEnum } from 'src/app/shared/Enum/AppResponseType.enum';
import { CreateLogoResourceSVGData } from './create-logo-svg.class';

@Injectable({
  providedIn: 'root'
})
export class MaphomepageserviceService {
  private svgImage: any;
  svgObj: CreateLogoResourceSVGData = new CreateLogoResourceSVGData();
  constructor(private http: HttpClient,
    private _svgService: SvgService,
    private sanitizer: DomSanitizer,
  ) { }

  getTotalServices(state_cd: String) {
    return this.http.get(environment.api_url + '/newserviceStatus/' + state_cd);
  }

  fetchServicesOfStates(state_cd: String) {
    return this.http.get(environment.api_url + '/fetchData/' + state_cd);
  }

  setSvgResources() {
    this._svgService.getSvg().subscribe((resp: any) => {
      if (resp.responseType === AppResponseTypeEnum.Success) {
        this.svgImage = resp.response;
        this.svgObj.arLogoSvg = this.svgImage.filter(function
          (value) { return (value.iconType === 'add'); });
         
        this.svgObj.arLogoSvg = this.sanitizer.bypassSecurityTrustHtml(this.svgObj.arLogoSvg[0].iconName);  
      }
    });
    return this.svgObj;
  }

}

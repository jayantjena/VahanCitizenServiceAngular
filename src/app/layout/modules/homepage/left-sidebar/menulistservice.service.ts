import { Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Subject } from 'rxjs';
import { ServiceMenuInterface } from 'src/app/shared/menu-service-component/onlinesrvlist/online-service-list/servicemenuInterface';

@Injectable({
  providedIn: 'root'
})
export class MenulistserviceService implements OnInit {
  menuListService: any;
 private setmenuBar = new BehaviorSubject<any>(undefined);
 updatedMenu = this.setmenuBar.asObservable()
 onlineservicetmenu = new Subject<any>();
onlineservicelistmenu = new Subject<ServiceMenuInterface>();
iconValue = new BehaviorSubject('Payour tax');
  constructor(private router: Router) { }
  ngOnInit() {
    debugger
    localStorage.setItem("menuLitervice", this.menuListService);
    this.onlineservicelistmenu.next(this.menuListService);
    // this.onlineservicelistmenu.next(this.menuListService);
  }
  // .then(()=>{window.location.reload();}

  payTax(iconVal: any) {
    if ((iconVal == 'payYrTax') || (iconVal == 'TO') ||
      (iconVal == 'CA') || (iconVal == 'HPA') ||
      (iconVal == 'HPT') || (iconVal == 'HPC') ||
      (iconVal == 'frrAfbf') || (iconVal == 'DPC') ||
      (iconVal == 'pbff') || (iconVal == 'anoc') ||
      (iconVal == 'dfc') || (iconVal == 'rr') ||
      (iconVal == 'raov') || (iconVal == 'cov') ||
      (iconVal == 'aov') || (iconVal == 'rcp') ||
      (iconVal == 'mobupdt') || (iconVal == 'withdrowapp')) {
      this.iconValue.next(iconVal);
      this.menuListService = iconVal;
      this.router.navigate(['/vs/rcservice/userentrypage'], {skipLocationChange:true})
      // this.router.navigate(['/vs/rcservice/userentrypage']).then(()=>{window.location.reload();})

    }
    // console.log('Icon val :', iconVal);
  }

  ismenuon(){
    if(sessionStorage.getItem('serviceListMenu') != "" && sessionStorage.getItem('serviceListMenu') != null &&  sessionStorage.getItem('serviceListMenu') != undefined){
      return true; 
    }else{
      return false;
    }
  }
  public getServiceComList(isMenuFlag){
    this.setmenuBar.next(isMenuFlag)
  }
  public setmenuListService(menuListService: any) {
    this.menuListService = menuListService;
    this.onlineservicelistmenu.next(this.menuListService);
    sessionStorage.setItem('menulistservice',this.menuListService.state_cd)
    // this.iconValue = menuListService;
  }
  public getmenuListService() {
    sessionStorage.getItem(this.menuListService);
    console.log(this.menuListService);
    return this.menuListService;

  }
}

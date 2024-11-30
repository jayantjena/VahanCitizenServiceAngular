 
import { inject, Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, ResolveFn } from '@angular/router';
import { catchError, Observable, of } from 'rxjs';
import { LeftsidebarserviceService } from 'src/app/layout/modules/homepage/left-sidebar/leftsidebarservice.service';

import { HomeData } from 'src/app/layout/modules/homepage/model/homeData';
 
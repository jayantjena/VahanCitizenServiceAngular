
/*
Pipe: MindResourcePipe
Written By:Rahul Mishra
Date:15-09-2020
Purpose: pipe use to get the resource into actual value
*/

import { Pipe, PipeTransform } from '@angular/core';
import { ResourceService } from 'src/app/services/common/resource.service';

@Pipe({
    name: 'mindresource'
})
export class MindResourcePipe implements PipeTransform {

    constructor(protected resourceService: ResourceService) { }

    public transform(value: any) {
        return this.resourceService.getResource(value);

    }
}

import { Pipe, PipeTransform } from '@angular/core';
import { ResourceService } from 'src/app/services/common/resource.service';

@Pipe({name: 'Resource'})
export class ResourcePipe implements PipeTransform {
    constructor(private _resourceService: ResourceService){

    }
  transform(resource: string): string {
    const dateResources = this._resourceService.getResource("cap" + resource);
    return dateResources;
  }
}
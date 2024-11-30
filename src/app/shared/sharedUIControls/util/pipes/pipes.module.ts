import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// //pipes
// import {FilterSortPipe}  from '../../util/pipes/filter-sortPipe.pipe'

import { FormsModule } from '@angular/forms';
import { FilterSearchPipe } from './filter-searchPipe.pipe';
import { FilterSortPipe } from './filter-sortPipe.pipe';
import { MarksPipe } from './marksPipe.pipe';
import { MultiFilterSearchPipe } from './multiplefilter-searchPipe.pipe';
import { MindSafePipe } from './mind-safePipe.pipe';
import { MindResourcePipe } from './mind-resource-pipe.pipe';
import { ResourcePipe } from './resource.pipe';


@NgModule({
  declarations: [
    FilterSearchPipe,
    FilterSortPipe,
    MarksPipe,
    MultiFilterSearchPipe,
    MindSafePipe,
    MindResourcePipe,
    ResourcePipe
    
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    FilterSearchPipe,
    FilterSortPipe,
    MarksPipe,
    MultiFilterSearchPipe,
    MindSafePipe,
    MindResourcePipe ,
    ResourcePipe   
  ],
  providers: []
})
export class MindPipeModule { }

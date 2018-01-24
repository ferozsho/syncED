import { NgModule } from '@angular/core';
import { SchoolGroupPipe } from './school-group/school-group';
import { SchoolBoardPipe } from './school-board/school-board';
@NgModule({
	declarations: [
		SchoolGroupPipe,
		SchoolBoardPipe
	],
	imports: [],
	exports: [
		SchoolGroupPipe,
		SchoolBoardPipe
	]
})
export class PipesModule { }

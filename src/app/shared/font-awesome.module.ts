import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FontAwesome } from './fontAnsome';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FontAwesomeModule
  ],
  exports: [
    FontAwesomeModule
  ]
})
export class IconFontModule {
  constructor(library: FaIconLibrary) {
    library.addIcons(
      FontAwesome.faArchive,
      FontAwesome.faIndustry,
      FontAwesome.faPencilAlt,
      FontAwesome.faQrcode,
      FontAwesome.faQuestionCircle,
      FontAwesome.faSave,
      FontAwesome.faTimes,
      FontAwesome.faTrash,
      FontAwesome.faUser,
      FontAwesome.faGithub
    );
  }
}

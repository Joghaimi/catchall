import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { TimeFormatPipe } from './time-format.pipe';
import { CountdownComponent } from './countdown/countdown.component';
import { MultiplayersComponent } from './modules/multiplayers/multiplayers.component';
import { TestKeyboardComponent } from './test-keyboard/test-keyboard.component';
import { WinnerComponent } from './winner/winner.component';
import { ScoreCardComponent } from './component/score-card/score-card.component';

@NgModule({
  declarations: [
    AppComponent,
    TimeFormatPipe,
    CountdownComponent,
    MultiplayersComponent,
    TestKeyboardComponent,
    WinnerComponent,
    ScoreCardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,

    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

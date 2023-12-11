import { NgModule } from '@angular/core';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AppLayoutModule } from './layout/app.layout.module';
import { NotfoundComponent } from './demo/components/notfound/notfound.component';
import { environment } from 'src/environments/environment';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
@NgModule({
    declarations: [AppComponent, NotfoundComponent],
    imports: [
        AppRoutingModule,
        AppLayoutModule,
        AngularFireModule.initializeApp(environment.firebaseConfig),
        AngularFireDatabaseModule,
        AngularFireStorageModule,
    ],
    providers: [{ provide: LocationStrategy, useClass: HashLocationStrategy }],
    bootstrap: [AppComponent],
})
export class AppModule {}

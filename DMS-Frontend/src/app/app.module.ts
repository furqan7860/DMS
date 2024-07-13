import { NgModule } from '@angular/core';
import { HashLocationStrategy, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AppLayoutModule } from './layout/app.layout.module';
import { NotfoundComponent } from './demo/components/notfound/notfound.component';
import { ProductService } from './demo/service/product.service';
import { CountryService } from './demo/service/country.service';
import { EventService } from './demo/service/event.service';
import { IconService } from './demo/service/icon.service';
import { NodeService } from './demo/service/node.service';
import { PhotoService } from './demo/service/photo.service';
import { AngularFireModule } from '@angular/fire/compat';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpInterceptorService } from './interceptor/http-interceptor';
import { CasesService } from './demo/service/cases.service';
@NgModule({
    declarations: [AppComponent, NotfoundComponent],
    imports: [AppRoutingModule, AppLayoutModule, AngularFireModule.initializeApp({
            apiKey: "AIzaSyDTaUNGHgSR3H1ymEq2GeTW9DJPP_iUAZg",
            authDomain: "lifting-ledger.firebaseapp.com",
            projectId: "lifting-ledger",
            storageBucket: "lifting-ledger.appspot.com",
            messagingSenderId: "392208292289",
            appId: "1:392208292289:web:8227883d6c5cca87117740"
    })],
    providers: [
        { provide: LocationStrategy, useClass: PathLocationStrategy },
        CountryService, CasesService, EventService, IconService, NodeService,
        PhotoService, ProductService, {
            provide: HTTP_INTERCEPTORS,
            useClass: HttpInterceptorService,
            multi: true
        }
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}

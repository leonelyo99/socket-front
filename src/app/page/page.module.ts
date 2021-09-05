import { NgModule } from '@angular/core';
import { PageComponent } from './page.component';
import { SharedModule } from '../shared/shared.module';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { SocketIoModule } from 'ngx-socket-io';
import { environment } from '../../environments/environment';
import { PageRoutingModule } from './page-routing.module';
import { SocketService } from './services/socket/socket.service';
import { UserService } from './services/user/user.service';
import { ContactsComponent } from './components/contacts/contacts.component';
import { ChatComponent } from './components/chat/chat.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    PageComponent,
    ContactsComponent,
    ChatComponent
  ],
  imports: [
    FormsModule,
    PageRoutingModule,
    SharedModule,
    CommonModule,
    HttpClientModule,
    SocketIoModule.forRoot({ url: environment.socketURL, options: {} })
  ],
  providers: [
    SocketService,
    UserService
  ]
})
export class PageModule { }

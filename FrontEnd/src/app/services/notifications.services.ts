import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/components/common/messageservice';

@Injectable()
export class NotificationsServices {

    constructor(private messageService: MessageService) { }

    // success - info - warn - error - 

    showMessage(mess, desc, severity) {
        this.messageService.add({ severity: severity, summary: mess, detail: desc });
    }

    clearMessages() {
        this.messageService.clear();
    }

}
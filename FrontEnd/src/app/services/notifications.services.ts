import { Injectable } from '@angular/core';
import { SelectItem } from 'primeng/components/common/api';
import { Message } from 'primeng/components/common/api';
import { MessageService } from 'primeng/components/common/messageservice';

@Injectable()
export class NotificationsServices {

    msgs: Message[] = [];

    constructor(private messageService: MessageService) { }

    // success - info - warn - error - 

    showSuccess(mess, desc, severity) {
        this.msgs = [];
        this.msgs.push({ severity: severity, summary: mess, detail: desc });
        return this.msgs;
    }
    showMultiple() {
        this.msgs = [];
        this.msgs.push({ severity: 'info', summary: 'Message 1', detail: 'PrimeNG rocks' });
        this.msgs.push({ severity: 'info', summary: 'Message 2', detail: 'PrimeUI rocks' });
        this.msgs.push({ severity: 'info', summary: 'Message 3', detail: 'PrimeFaces rocks' });
    }

    showViaService() {
        this.messageService.add({ severity: 'success', summary: 'Service Message', detail: 'Via MessageService' });
    }

    clearViaService() {
        this.messageService.clear();
    }

    clear() {
        this.msgs = [];
    }

}
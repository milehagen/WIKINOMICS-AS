import { Injectable } from "@angular/core";
import { MatDialog, MatDialogRef  } from "@angular/material";
import { ErrorDialogComponent } from "./ErrorDialog.component";

@Injectable()
export class ErrorDialogService {
    public isDialogOpen: Boolean = false;
    constructor(public dialog: MatDialog) { }
    openDialog(data): any {
        if (this.isDialogOpen) {
            return false;
        }

        this.isDialogOpen = true;
        //console.log("Errordialogservice", data);
        const dialogRef = this.dialog.open(ErrorDialogComponent, {
            width: '300px',
            data: data,
        });

        dialogRef.afterClosed().subscribe(result => {
            console.log('The dialog was closed');
            this.isDialogOpen = false;
        });
    }
}
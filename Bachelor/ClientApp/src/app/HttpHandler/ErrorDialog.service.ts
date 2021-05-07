import { Injectable } from "@angular/core";
import { MatDialog, MatDialogRef  } from "@angular/material";
import { ErrorDialogComponent } from "./ErrorDialog.component";

@Injectable()

export class ErrorDialogService {
    public dialogOpen : Boolean = false;
    constructor(public dialog : MatDialog, public dialModalRef: MatDialogRef<any>) {}

    openDialog(data) : any {
        if(this.dialogOpen) {
            return false;
        }

       

        this.dialogOpen = true;
        const dialogRef = this.dialog.open(ErrorDialogComponent, {
            width : '300px',
            data : data,
        });

        dialogRef.afterClosed().subscribe(result => {
            this.dialogOpen = false;
            let animal;
            animal = result;
            console.log(animal);
        })
    }
}
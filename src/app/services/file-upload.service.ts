import { Injectable } from '@angular/core';
import { finalize } from 'rxjs/operators';
import {
    AngularFireDatabase,
    AngularFireList,
} from '@angular/fire/compat/database';
import { AngularFireStorage } from '@angular/fire/compat/storage';
@Injectable({
    providedIn: 'root',
})
export class FileUploadService {
    downloadURL;
    constructor(
        private db: AngularFireDatabase,
        private storage: AngularFireStorage
    ) {}

    async pushFileToStorage(fileUpload: File, fileType: string): Promise<any> {
        let basePath = '/RelatedDocuments';
        let filePath = '';
        if (fileType === 'avatar') {
            basePath = '/Avatar';
        } else {
            basePath = '/Food';
        }
        filePath = `${basePath}/${fileUpload.name}`;
        const storageRef = this.storage.ref(filePath);
        const uploadTask = this.storage.upload(filePath, fileUpload);

        const promise = new Promise<void>((resolve, reject) => {
            uploadTask
                .snapshotChanges()
                .pipe(
                    finalize(async () => {
                        await storageRef
                            .getDownloadURL()
                            .subscribe((downloadURL) => {
                                this.downloadURL = downloadURL;
                                this.db.list(basePath).push(fileUpload);
                                resolve();
                            });
                    })
                )
                .subscribe();
        });
        return promise;
    }

    getdownloadURL() {
        return this.downloadURL;
    }
}

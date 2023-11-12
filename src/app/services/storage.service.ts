import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  setItemLocal(key: string, item: any) {
    localStorage.setItem(key, JSON.stringify(item))
  }

  getItemLocal(key: string) {
    const JSONItem = localStorage.getItem(key)
    if (!JSONItem) {
      return null;
    }
    return JSON.parse(JSONItem)
  }
}

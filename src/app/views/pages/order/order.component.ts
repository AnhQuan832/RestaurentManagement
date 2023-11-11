import { Component } from '@angular/core';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent {

  listOrder;
  listTable = [
    {
      status: "Available",
      name: "Table 1",
      capacity: 4,
      tableId: 1
    },
    {
      status: "Occupied",
      name: "Table 2",
      capacity: 2,
      tableId: 2
    },
    {
      status: "Reserved",
      name: "Table 3",
      capacity: 6,
      tableId: 3
    },
    {
      status: "Available",
      name: "Table 4",
      capacity: 4,
      tableId: 4
    },
    {
      status: "Occupied",
      name: "Table 5",
      capacity: 2,
      tableId: 5
    },
    {
      status: "Reserved",
      name: "Table 6",
      capacity: 6,
      tableId: 6
    },
    {
      status: "Available",
      name: "Table 7",
      capacity: 4,
      tableId: 7
    },
    {
      status: "Occupied",
      name: "Table 8",
      capacity: 2,
      tableId: 8
    },
    {
      status: "Reserved",
      name: "Table 9",
      capacity: 6,
      tableId: 9
    },
    {
      status: "Available",
      name: "Table 10",
      capacity: 4,
      tableId: 10
    },
    {
      status: "Occupied",
      name: "Table 11",
      capacity: 2,
      tableId: 11
    },
    {
      status: "Reserved",
      name: "Table 12",
      capacity: 6,
      tableId: 12
    },
    {
      status: "Available",
      name: "Table 13",
      capacity: 4,
      tableId: 13
    },
    {
      status: "Occupied",
      name: "Table 14",
      capacity: 2,
      tableId: 14
    },
    {
      status: "Reserved",
      name: "Table 15",
      capacity: 6,
      tableId: 15
    },
    {
      status: "Available",
      name: "Table 16",
      capacity: 4,
      tableId: 16
    },
    {
      status: "Occupied",
      name: "Table 17",
      capacity: 2,
      tableId: 17
    },
    {
      status: "Reserved",
      name: "Table 18",
      capacity: 6,
      tableId: 18
    },
    {
      status: "Available",
      name: "Table 19",
      capacity: 4,
      tableId: 19
    },
    {
      status: "Occupied",
      name: "Table 20",
      capacity: 2,
      tableId: 20
    }
  ]
    ;
  listServing;
  selectedTables;
  listFilterTableName = [
    {
      "tableId": "1",
      "name": "Table 1"
    },
    {
      "tableId": "2",
      "name": "Table 2"
    },
    {
      "tableId": "3",
      "name": "Table 3"
    },
    {
      "tableId": "4",
      "name": "Table 4"
    },
    {
      "tableId": "5",
      "name": "Table 5"
    },
    {
      "tableId": "6",
      "name": "Table 6"
    },
    {
      "tableId": "7",
      "name": "Table 7"
    },
    {
      "tableId": "8",
      "name": "Table 8"
    },
    {
      "tableId": "9",
      "name": "Table 9"
    },
    {
      "tableId": "10",
      "name": "Table 10"
    },
    {
      "tableId": "11",
      "name": "Table 11"
    },
    {
      "tableId": "12",
      "name": "Table 12"
    },
    {
      "tableId": "13",
      "name": "Table 13"
    },
    {
      "tableId": "14",
      "name": "Table 14"
    },
    {
      "tableId": "15",
      "name": "Table 15"
    },
    {
      "tableId": "16",
      "name": "Table 16"
    },
    {
      "tableId": "17",
      "name": "Table 17"
    },

  ]
  constructor() {

  }
}

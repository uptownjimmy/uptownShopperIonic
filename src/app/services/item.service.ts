import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Injectable} from '@angular/core';
import { Apollo } from 'apollo-angular';
import {Observable} from 'apollo-client/util/Observable';
import gql from 'graphql-tag';
import {Subject, Subscription} from 'rxjs';
import { map } from 'rxjs/operators';

import { QueryItem } from '../types';

@Injectable()
export class ItemService {
  public items: QueryItem[] = [];
  public itemListChanged = new Subject<QueryItem[]>();
  public itemSnapshotChanged = new Subject<QueryItem[]>();
  private loading = false;

  private getItemsQuery = gql`
    query {
      items {
        itemId
        name
        category
        active
        notes
      }
    }
  `;

  private getItemsSnapshotQuery = gql`
    query {
      items {
        itemId
        name
        category
        active
        notes
      }
    }
  `;

  private createItemQuery = gql`
    mutation ($name: String!, $category: String!, $active: Boolean!, $notes: String!) {
      createItem(item: {name: $name, category: $category, active: $active, notes: $notes}) {
        name
        category
        active
        notes
      }
    }
  `;

  private updateItemQuery = gql`
    mutation ($itemId: ID!, $name: String!, $category: String!, $active: Boolean!, $notes: String!) {
      updateItem(item: {itemId: $itemId, name: $name, category: $category, active: $active, notes: $notes}) {
        itemId
        name
        category
        active
        notes
      }
    }
  `;

  private deleteItemQuery = gql`
    mutation ($itemId: ID!, $name: String!, $category: String!, $active: Boolean!, $notes: String!) {
      deleteItem(item: {itemId: $itemId, name: $name, category: $category, active: $active, notes: $notes}) {
        itemId
        name
        category
        active
        notes
      }
    }
  `;

  constructor(private http: HttpClient, private apollo: Apollo) {}

  public getItems(refresh: boolean = false) {
    this.loading = true;

    this.apollo.watchQuery<any>({
      query: this.getItemsQuery,
    }).valueChanges
      .subscribe((result) => {
        this.items = result.data && result.data.items;
        // this.loading = result.loading;
        const errors = result.errors;
        if (!errors) {
          console.log(this.items);
          this.itemListChanged.next(this.items.slice());
        } else {
          console.log('Error occurred in ItemService.getItems(): ', errors.entries());
        }

        this.loading = false;
      });
  }

  // getItemsSnapshot() {
  //   this.apollo.watchQuery<any>({
  //     query: this.getItemsSnapshotQuery,
  //   }).valueChanges
  //     .subscribe((result) => {
  //     // this.loading = result.loading;
  //     const errors = result.errors;
  //     if (!errors) {
  //       console.log('ItemService.getItemsSnapshot() item snapshot retrieved: ' + this.items);
  //       this.itemSnapshotChanged.next(result.data.items.slice());
  //     } else {
  //       console.log('Error occurred in ItemService.getItemsSnapshot(): ', errors.entries());
  //     }
  //
  //     this.loading = false;
  //   });
  // }

  createNewItem(formValues: QueryItem) {
    if (!this.items.find((i) => i.name === formValues.name)) {
      this.loading = true;

      this.apollo.mutate({
        mutation: this.createItemQuery,
        variables: {
          name: formValues.name,
          category: formValues.category,
          active: true,
          notes: formValues.notes ? formValues.notes : '',
        },
        refetchQueries: [{
          query: this.getItemsQuery,
        }],
      }).subscribe(
        ({data}) => {
          console.log('ItemService.createNewItem() successful');
        }, (error) => {
          console.log('There was an error creating the new item: ', error);
        },
      );
    } else {
      // alert user for 'item by that name already exists'
    }

    this.loading = false;
  }

  updateExistingItem(item: QueryItem) {
    this.loading = true;

    this.apollo.mutate({
      mutation: this.updateItemQuery,
      variables: {
        itemId: item.itemId,
        name: item.name,
        category: item.category,
        active: item.active,
        notes: item.notes ? item.notes : '',
      },
      refetchQueries: [{
        query: this.getItemsQuery,
      }],
    }).subscribe(
      ({data}) => {
        console.log('ItemService.updateExistingItem() successful');
        console.log(data);
        this.loading = false;
      }, (error) => {
        console.log('There was an error updating the item: ', error);
      },
    );

    this.loading = false;
  }

  deleteItem(item: QueryItem) {
    this.loading = true;

    this.apollo.mutate({
      mutation: this.deleteItemQuery,
      variables: {
        itemId: item.itemId,
        name: item.name,
        category: item.category,
        active: true,
        notes: item.notes ? item.notes : '',
      },
      refetchQueries: [{
        query: this.getItemsQuery,
      }],
    }).subscribe(
      ({data}) => {
        console.log('ItemService.deleteItem() successful');
        this.loading = false;
      }, (error) => {
        console.log('There was an error deleting the item: ', error);
      },
    );

    this.loading = false;


    //     this.loading = true;
    //     const deleteUrlObservable = this.http.delete(this.itemURL + '/' + item.id);
    //     deleteUrlObservable.subscribe(
    //         (response) => {
    //             const index: number = this.items.indexOf(item);
    //             if (index !== -1) {
    //                 this.items.splice(index, 1);
    //             }
    //             this.itemListChanged.next(this.items.slice());
    //             this.loading = false;
    //             // this.toastr.success('Item deleted.', 'Success!');
    //             console.log('Item deleted: ' + item.name);
    //         },
    //         (err: HttpErrorResponse) => {
    //             if (err.error) {
    //                 console.log('Client error occurred in ItemService.deleteItem(): ', err.error.message);
    //                 this.loading = false;
    //             } else {
    //                 this.loading = false;
    //                 console.log(
    //                     'API error occurred in ItemService.deleteItem(): ' + err.status + ', ' + err.error,
    //                 );
    //             }
    //
    //             // this.toastr.error(item.name + ' could not be deleted.', 'No good!');
    //         },
    //     );
  }
}

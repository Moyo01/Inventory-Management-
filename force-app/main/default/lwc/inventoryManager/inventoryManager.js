import { LightningElement, track, wire } from 'lwc';
import searchInventory from '@salesforce/apex/searchInventoryService.searchInventory';


export default class InventoryManager extends LightningElement {

    @track searchKey = '';
    @track inventories = [];
    @track errors = undefined; 
    hasSearched = false;
    
    get noRecords() {
        return !this.errors && (!this.inventories || this.inventories.length === 0);
    }
    
    get showInitialMessage(){
        return !this.hasSearched && !this.errors;
    }

    @wire(searchInventory, {
        searchKey: '$searchKey'
    })
    wiredInventories({ data, error }){
        this.hasSearched = this.searchKey !== '';

        if(data){
            console.log('data', data);
            this.inventories = data;
            this.errors = undefined;
        } else if(error){
            this.inventories = undefined;
            this.errors = error;
        }
    }

    handleChange(event){
        event.preventDefault();
        this.searchKey = event.target.value;
        console.log('searchKey', this.searchKey);
    }

    handleSearch(){
        this.searchKey = this.searchKey.trim();
        this.hasSearched = true;
        console.log('searchKey', this.searchKey);
    }
}
public with sharing class searchInventoryService {
   
    @AuraEnabled(cacheable=true)
    public static List<sObject> searchInventory( string searchKey){
        string likeparam = '%' + searchKey +'%';
        try {
            return [SELECT Name__c, Id, Stock_Quantity__c,Price__c, Status__c 
                FROM Inventory_Item__c
                WHERE (Name__c LIKE: likeparam  OR  Product_Code__c like: likeparam) 
                LIMIT 100 ];
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
}
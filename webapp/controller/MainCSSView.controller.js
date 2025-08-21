sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast"
], (Controller, MessageToast) => {
    "use strict";

    return Controller.extend("my.sapui5.act08.training.act08css.controller.MainCSSView", {
        onInit() {
        },

        onAddItem: function (){
                // this.fnDisplayMsg("Add button pressed");
                // var oTextBundle = this.getOwnerComponent().getModel("i18n").getResourceBundle();
                // var sMsg = oTextBundle.getText("addButtonMsg");
                // this.fnDisplayMsg(sMsg);
                // Instantiate the fragment                
            if (!this.oDialog){
                // By using loadFragment, we are adding the fragment as a dependent to the View
                // By doing so, we can use the functions inside the view's controller
                this.oDialog = this.loadFragment({
                        name: "my.sapui5.act08.training.act08css.fragment.ProductDialog"
                });
            }

            this.oDialog.then(function(oDialog) {
                oDialog.open();
            });
        },
                        
        onCloseDialog: function (){
            this.getView().byId("idProductDialog").close();
        },

        fnDisplayMsg: function (sMsg){
                MessageToast.show(sMsg);
            },

        onChangeMOP: function (oEvent) {
            
                var oTextBundle = this.getOwnerComponent().getModel("i18n").getResourceBundle();

                var sSelectedKey = oEvent.getParameter("selectedItem").getProperty("key");
                var oMobileLabel = this.getView().byId("idLblPhone");
                var oMobileInput = this.getView().byId("idInputPhone");

                var oCreditCardLabel = this.getView().byId("idLblcvv");
                var oCreditCardInput = this.getView().byId("idInputcvv");

                if (sSelectedKey === "GCASH"){

                    // show the mobile field
                    oMobileLabel.setVisible(true);
                    oMobileInput.setVisible(true);

                    // In case user change mode of payment after initial select
                    oCreditCardLabel.setVisible(false);
                    oCreditCardInput.setVisible(false);                  

                    var sMsgGCash = oTextBundle.getText("gcashSelect");
                    MessageToast.show(sMsgGCash);

                 }else if(sSelectedKey === "CC"){

                    // Show the new field we added
                    oCreditCardLabel.setVisible(true);
                    oCreditCardInput.setVisible(true);

                    // In case user change mode of payment after initial select
                    oMobileLabel.setVisible(false);
                    oMobileInput.setVisible(false);                    

                    var sMsgCC = oTextBundle.getText("creditCardSelect");
                    MessageToast.show(sMsgCC);

                }else{                    
                    
                    oCreditCardLabel.setVisible(false);
                    oCreditCardInput.setVisible(false);                  
                    oMobileLabel.setVisible(false);
                    oMobileInput.setVisible(false);    
                    var sMsgOthers = oTextBundle.getText("otherModeOfPayment");                  
                    MessageToast.show(sMsgOthers);
                }
            },

        onPressCheckout: function (){
                // var oInputFNameValue = this.getView().byId("idInptFName").getValue();
                // var oInputLNameValue = this.getView().byId("idInptLName").getValue(); 

                // // Check if last name is blank
                // if (oInputLNameValue === ""){
                //     sap.m.MessageToast.show("Last Name is blank"); 
                // }

                // // Check if first name is blank
                // if (oInputFNameValue === ""){
                //     sap.m.MessageToast.show( "First Name is blank"); 
                // }
                var oInputFName = this.getView().byId("idInptFName");
                var oInputLName = this.getView().byId("idInptLName");
                var oInputFNameValue = oInputFName.getValue();
                var oInputLNameValue = oInputLName.getValue();
                var oRouter = this.getOwnerComponent().getRouter();

                // Check if first name and last name is blank
                if (oInputFNameValue === "" || oInputLNameValue === ""){
                   
                // set value state to Error
                    oInputFName.setValueState("Error");
                    oInputLName.setValueState("Error");
                } else {
                    oInputFName.setValueState("None");
                    oInputLName.setValueState("None");

                    //Navigate to review page passing first
                    oRouter.navTo("RouteReviewPage", {
                        firstName: oInputFNameValue
                    });

                }
            },
    });
});
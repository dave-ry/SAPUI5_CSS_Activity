sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast"
], (Controller, MessageToast) => {
    "use strict";

    return Controller.extend("my.sapui5.act08.training.act08css.controller.MainCSSView", {
        onInit() {
            var oHeaderText = new sap.m.Text({
                    text:  "Custom Header",
                    class: "customHeaderText"
                });
        },

        onAddItem: function (){
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

        onPressNewBtn: function(){
                if(!this.oDialog){
                    this.oDialog = this.loadFragment({
                        name: "my.sapui5.act08.training.act08css.fragment.Dialog"
                    });
                }

                this.oDialog.then(function(oDialog){
                    // oDialog.addStyleClass("myCustomDialogBackground"); ::For exploration. Currently not working!
                    oDialog.open();
                });    
            },

        onPressCloseDialog: function(){
            this.getView().byId("idMsgDialog").close();
        }
    });
});


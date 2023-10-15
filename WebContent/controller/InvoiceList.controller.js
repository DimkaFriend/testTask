sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel"
], function (Controller, JSONModel) {
	"use strict";

	return Controller.extend("sap.ui.demo.walkthrough.controller.InvoiceList", {

		onInit : function () {
			var oViewModel = new JSONModel({
				currency: "руб"
			});
			this.getView().setModel(oViewModel, "view");
			
			var oViewModel1 = new JSONModel({
				measurement: "шт"
			});
			this.getView().setModel(oViewModel1, "view1")
			
			var m = this.getOwnerComponent().getModel("company").oData;
			
			var oViewModel2 = new JSONModel({
					summ: m.Companys.reduce((x,y) => x + y['company'].price, 0),
					avg:  Math.round(m.Companys.reduce((x,y) => x + y['company'].price, 0)/m.Companys.length * 10) / 10, //замечу что не был указан тип математического округления 
					count:  m.Companys.length
			})
			
			this.getView().setModel(oViewModel2, "agrigation");
		},
		onAfterRendering: function() {
		    var agr = this.getView().byId("agrigation");
		    jQuery.sap.byId(agr.getId()).css({
		    									"border":" 2px solid #ccc",
		    									"border-color":"green"});
			var table = this.getView().byId("table");
			jQuery.sap.byId(table.getId()).css({"padding-right": "2%",
												"padding-left": "2%",
												"padding-top": "1%"
			});
		},
		
		onPress : function (oEvent){
			
			var oItem = oEvent.getSource();
			console.log(oItem.getBindingContext("company").getPath().substr(10))
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.navTo("detail", {
				companyPath: oItem.getBindingContext("company").getPath().substr(10)
			});
			
			
			// oRouter.navTo("detail", {
				
			// 	invoicePath: oItem.getBindingContext("company").getPath().substr(10)
			// });
			

		}

	});
});
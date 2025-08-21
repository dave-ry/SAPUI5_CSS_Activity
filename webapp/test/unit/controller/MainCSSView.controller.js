/*global QUnit*/

sap.ui.define([
	"my/sapui5/act08/training/act08css/controller/MainCSSView.controller"
], function (Controller) {
	"use strict";

	QUnit.module("MainCSSView Controller");

	QUnit.test("I should test the MainCSSView controller", function (assert) {
		var oAppController = new Controller();
		oAppController.onInit();
		assert.ok(oAppController);
	});

});

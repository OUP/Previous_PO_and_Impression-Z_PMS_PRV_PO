sap.ui.define(["sap/ui/core/mvc/Controller"], function (_Controller) {
  "use strict";

  let _sIdPrefix;

  const oController = {
    onInit: function () {
      _sIdPrefix =
        "oup.pms.zpmsprvpo::sap.suite.ui.generic.template.ListReport.view.ListReport::ZPMS_C_MGR_PRE_PO_IMPRSN--";
    },

    onAfterRendering: function () {
      const oContentTable = this.byId(_sIdPrefix + "GridTable");
      oContentTable.attachBusyStateChanged(this._onBusyStateChanged);
    },

    onPRNavPress: function (oEvent) {
      const oRowObject = oEvent.getSource().getBindingContext().getObject();
      const PurchaseRequisition = oRowObject.banfn;

      // target
      const oTarget = {
        semanticObject: "PurchaseRequisition",
        action: "manage",
      };

      // params
      const oParams = {
        PurchaseRequisition,
      };

      this._navToTarget(oTarget, oParams);
    },

    /* =========================================================== */
    /* internal methods                                            */
    /* =========================================================== */

    _onBusyStateChanged: function (oEvent) {
      const bBusy = oEvent.getParameter("busy");

      if (!bBusy) {
        const oTable = oEvent.getSource();
        let oTpc = null;

        // grid table
        if (sap.ui.table.TablePointerExtension) {
          oTpc = new sap.ui.table.TablePointerExtension(oTable);
        } else {
          oTpc = new sap.ui.table.extensions.Pointer(oTable);
        }

        // columns
        const aColumns = oTable.getColumns();
        for (let i = aColumns.length; i >= 0; i--) {
          oTpc.doAutoResizeColumn(i);
        }
      }
    },

    _navToTarget: (oTarget, oParams) => {
      // navigation
      const xnavservice =
        sap.ushell &&
        sap.ushell.Container &&
        sap.ushell.Container.getService &&
        sap.ushell.Container.getService("CrossApplicationNavigation");

      const _href =
        (xnavservice &&
          xnavservice.toExternal({
            target: {
              semanticObject: oTarget.semanticObject,
              action: oTarget.action,
            },
            params: oParams,
          })) ||
        "";
    },
  };

  return oController;
});

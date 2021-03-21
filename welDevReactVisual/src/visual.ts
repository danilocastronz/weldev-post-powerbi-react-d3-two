"use strict";
import * as React from "react";
import * as ReactDOM from "react-dom";
import "@babel/polyfill";
import powerbi from "powerbi-visuals-api";

import DataView = powerbi.DataView;
import VisualConstructorOptions = powerbi.extensibility.visual.VisualConstructorOptions;
import VisualUpdateOptions = powerbi.extensibility.visual.VisualUpdateOptions;
import IVisual = powerbi.extensibility.visual.IVisual;
import IViewport = powerbi.IViewport;

import { ReactCard, initialState } from "./component";
import "./../style/visual.less";

export class Visual implements IVisual {
  private target: HTMLElement;
  private reactRoot: React.ComponentElement<any, any>;
  private viewport: IViewport;

  constructor(options: VisualConstructorOptions) {
    this.reactRoot = React.createElement(ReactCard, {});
    this.target = options.element;

    ReactDOM.render(this.reactRoot, this.target);
  }

  public update(options: VisualUpdateOptions) {
    if (options.dataViews && options.dataViews[0]) {
      const dataView: DataView = options.dataViews[0];
      
      this.viewport = options.viewport;
      const { width, height } = this.viewport;
      const size = Math.min(width, height);

      ReactCard.update({
        size,
        textLabel: dataView.metadata.columns[0].displayName,
        measureValue: dataView.single.value.toString()
      });
    } else {
      ReactCard.update(initialState);
    }
  }
}

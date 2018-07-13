//our root app component
import {Component, NgModule, ViewEncapsulation } from '@angular/core';
import {CommonModule} from '@angular/common';
import {BrowserModule } from '@angular/platform-browser';
import { NGXLogger, CustomNGXLoggerService, NgxLoggerLevel } from 'ngx-logger';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { filter } from 'rxjs/operators';

import { Injectable } from '@angular/core';

// import the WindowRef provider
import {WindowRef} from './WindowRef';

@Injectable({
  providedIn: 'root'
})
export class TagCommanderService{
  _tcContainers: Array<any> = [];
  pageEvent: any;
  debug: any;
  _trackRoutes: boolean;
  private logger: NGXLogger;

  constructor(private winRef: WindowRef, 
    private customLogger: CustomNGXLoggerService, 
    private router: Router) {
      this.logger = customLogger.create({level: NgxLoggerLevel.DEBUG});
      this.router.events.pipe(
        filter(event => event instanceof NavigationEnd))
      .subscribe((route: ActivatedRoute) => {
          console.log('route', route);
      });
  }
  /**
   * the script URI correspond to the tag-commander script URL, it can either be a CDN URL or the path of your script
   * @param {string} id the id the script node will have
   * @param {string} uri the source of the script
   * @param {string} node the node on witch the script will be placed, it can either be head or body
  */
  addContainer(id:string, uri:string, node:string):void {
    this._tcContainers.push({ 'id': id, 'uri': uri });
    let tagContainer = document.createElement('script');
    tagContainer.setAttribute('type', 'text/javascript');
    tagContainer.setAttribute('src', uri);
    tagContainer.setAttribute('id', id);
    if (typeof node !== 'string') {
      this.logger.warn('you didn\'t specify where you wanted to place the script, it will be placed in the head by default');
      document.querySelector('head').appendChild(tagContainer);
    } else if (node.toLowerCase() === 'head' || node.toLowerCase() === 'body') {
      document.querySelector(node.toLowerCase()).appendChild(tagContainer);
    } else {
      this.logger.warn('you didn\'t correctily specify where you wanted to place the script, it will be placed in the head by default');
      document.querySelector('head').appendChild(tagContainer);
    }
  }

  /**
   * The script URI correspond to the tag-commander script URL, it can either be a CDN URL or the path of your script
   * @param {string} id
   */
  removeContainer(id:string):void {
    let container = document.getElementById(id);
    let containers = this._tcContainers.slice(0);

    document.querySelector('head').removeChild(container);

    for (let i = 0; i < containers.length; i++) {
      if (containers[i].id === id) {
        this._tcContainers.splice(i, 1);
      }
    }
  }

  /**
   * will display the debug messages if true
   * @param {boolean} debug if set to true it will activate the debug msg default is false
   */
  setDebug(debug:boolean):void {
    this.debug = debug;
    if (debug) {
      this.logger.updateConfig({level: NgxLoggerLevel.DEBUG});
    } else {
      this.logger.updateConfig({level: NgxLoggerLevel.OFF});
    }
  }

  /**
   * allows the router to be tracked
   * @param {boolean} b will read routes if set to true
   */
  trackRoutes(b:boolean):void {
    this._trackRoutes = !!b;
  }

  /**
   * set or update the value of the var
   * @param {string} tcKey
   * @param {*} tcVar
   */
  setTcVar(tcKey:string, tcVar:any): void {
    this.winRef.nativeWindow.tc_vars[tcKey] = tcVar;
  }

  /**
   * set your varibles for the different providers, when called the first time it
   * instantiate the external varible
   * @param {object} vars
   */
  setTcVars(vars:object):void {
    this.logger.debug('setTcVars', vars);
    let listOfVars = Object.keys(vars);
    for (var i = 0; i < listOfVars.length; i++) {
      this.setTcVar(listOfVars[i], vars[listOfVars[i]]);
    }
  };

  /**
   * get the value of the var
   * @param {string} tcKey
   */
  getTcVar(tcKey:string):any {
    this.logger.debug('getTcVars', tcKey);
    return this.winRef.nativeWindow.tc_vars[tcKey] === null ? this.winRef.nativeWindow.tc_vars[tcKey] : false;
  };

  /**
   * removes the var by specifying the key
   * @param {string} varKey
   */
  removeTcVar(varKey:string):void {
    this.logger.debug('removeTcVars', varKey);
    delete this.winRef.nativeWindow.tc_vars[varKey];
  };

  /**
   * will reload all the containers
   * @param {object} options can contain some options in a form of an object
   */
  reloadAllContainers(options:object):void {
    this.logger.debug('reloadAllContainers', options);
    options = options || {};
    this.logger.debug('Reload all containers ', typeof options === 'object' ? 'with options ' + options : '');
    this.winRef.nativeWindow.container.reload(options);
  };

  /**
   * will reload a specifique container
   * @param {number} ids
   * @param {number} idc
   * @param {object} options can contain some options in a form of an object
   */
  reloadContainer(ids:string, idc:string, options:object):void {
    var options = options || {};
    this.logger.debug('Reload container ids: ' + ids + ' idc: ' + idc, typeof options === 'object' ? 'with options: ' + options : '');
    this.winRef.nativeWindow['container_' + ids + '_' + idc].reload(options);
  };

  /**
   * will set an TagCommander event
   * @param {string} eventLabel the name of your event
   * @param {HTMLElement} element the HTMLelement on witch the event is attached
   * @param {object} data the data you want to transmit
   */
  captureEvent(eventLabel:string, element:any, data:object):void {
    this.logger.debug('captureEvent', eventLabel, element, data);
    this.winRef.nativeWindow.tC.event[eventLabel](element, data);
  };
}

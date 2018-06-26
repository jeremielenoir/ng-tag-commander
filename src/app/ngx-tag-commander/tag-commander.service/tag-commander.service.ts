import { Injectable } from '@angular/core';
import { Logger } from 'angular2-logger/core';

@Injectable({
  providedIn: 'root'
})
export class TagCommanderService {
  _tcContainers: Array<any> = [];
  pageEvent: any;
  debug: any;
  _trackRoutes: boolean;
  constructor(private log: Logger) { }
  /**
   * the script URI correspond to the tag-commander script URL, it can either be a CDN URL or the path of your script
   * @param {string} id the id the script node will have
   * @param {string} uri the source of the script
   * @param {string} node the node on witch the script will be placed, it can either be head or body
  */
  addContainer(id, uri, node) {
    this._tcContainers.push({ 'id': id, 'uri': uri });
    let tagContainer = document.createElement('script');
    tagContainer.setAttribute('type', 'text/javascript');
    tagContainer.setAttribute('src', uri);
    tagContainer.setAttribute('id', id);
    if (typeof node !== 'string') {
      console.warn('you didn\'t specify where you wanted to place the script, it will be placed in the head by default');
      document.querySelector('head').appendChild(tagContainer);
    } else if (node.toLowerCase() === 'head' || node.toLowerCase() === 'body') {
      document.querySelector(node.toLowerCase()).appendChild(tagContainer);
    } else {
      console.warn('you didn\'t correctily specify where you wanted to place the script, it will be placed in the head by default');
      document.querySelector('head').appendChild(tagContainer);
    }
  };

  /**
   * The script URI correspond to the tag-commander script URL, it can either be a CDN URL or the path of your script
   * @param {string} id
   */
  removeContainer(id) {

    let container = document.getElementById(id);
    let containers = this._tcContainers.slice(0);

    document.querySelector('head').removeChild(container);

    for (var i = 0; i < containers.length; i++) {
      if (containers[i].id === id) {
        this._tcContainers.splice(i, 1);
      }
    }
  };

  /**
   * with this method you can set the event name corresponding to the URL change
   * @param {string} name of the event you wan to track
   */
  setPageEvent(name) {
    this.pageEvent = name;
    return this;
  };
  /**
   * will display the debug messages if true
   * @param {boolean} debug if set to true it will activate the debug msg default is false
   */
  setDebug(debug) {
    this.debug = debug;
    if (debug) {
      this.log.level = this.log.Level.DEBUG;
    } else {
      this.log.level = this.log.Level.OFF;
    }
  };

  /**
   * allows the router to be tracked
   * @param {boolean} b will read routes if set to true
   */
  trackRoutes(b):void {
    this._trackRoutes = !!b;
  };

  /**
   * set or update the value of the var
   * @param {string} tcKey
   * @param {*} tcVar
   */
  setTcVar(tcKey, tcVar): void {
    if (typeof tcKey === 'string' &&
      tcVar !== undefined) {
      window.tc_vars[tcKey] = tcVar;
    } else {
      if (typeof tcKey === 'string') {
        this.log.error('the tag cannot be add as the key is not a string');
      } else {
        this.log.error('the tagValue is undefined');
      }
    }
  };

  /**
   * set your varibles for the different providers, when called the first time it
   * instantiate the external varible
   * @param {object} vars
   */
  setTcVars(vars):void {
    if (typeof vars === 'object' && window.tc_vars === undefined) {
      window.tc_vars = vars;
    } else if (typeof vars === 'object') {
      var listOfVars = Object.keys(vars);
      for (var i = 0; i < listOfVars.length; i++) {
        this.setTcVar(listOfVars[i], vars[listOfVars[i]]);
      }
    } else {
      this.log.error('the vars that you provided are not in the form of an object', vars)
    }
    this.log.debug('setTcVars', window.tc_vars);
  };

  /**
   * get the value of the var
   * @param {string} tcKey
   */
  getTcVar(tcKey):any {
    return window.tc_vars[tcKey] === null ? window.tc_vars[tcKey] : false;
  };

  /**
   * removes the var by specifying the key
   * @param {string} varKey
   */
  removeTcVar(varKey):void {
    if (typeof window.tc_vars[varKey] === 'string') {
      delete window.tc_vars[varKey];
    } else {
      if (window.tc_vars[varKey] === undefined) {
        this.log.error('the key ' + varKey + ' does not exist and therfore cannot be removed');
      } else {
        this.log.error('the key is not a string', varKey);
      }
    }
  };

  /**
   * will reload all the containers
   * @param {object} options can contain some options in a form of an object
   */
  reloadAllContainers(options):void {
    let options = options || {};
    this.log.debug('Reload all containers ', typeof options === 'object' ? 'with options ' + options : '');
    window.tC.container.reload(options);
  };

  /**
   * will reload a specifique container
   * @param {string} ids
   * @param {string} idc
   * @param {object} options can contain some options in a form of an object
   */
  reloadContainer(ids, idc, options) {
    if ((!ids || !idc) && typeof ids !== 'number' && typeof idc !== 'number') {
      this.log.error('Cannot reload container with no ids or idcs');
      return false;
    }
    var options = options || {};
    this.log.debug('Reload container ids: ' + ids + ' idc: ' + idc, typeof options === 'object' ? 'with options: ' + options : '');
    window.tC['container_' + ids + '_' + idc].reload(options);
  };

  /**
   * will set an TagCommander event
   * @param {string} eventLabel the name of your event
   * @param {HTMLElement} element the HTMLelement on witch the event is attached
   * @param {object} data the data you want to transmit
   */
  captureEvent(eventLabel, element, data) {
    if (typeof data === 'object') {
      window.tC.event[eventLabel](element, data);
    }
  };
}

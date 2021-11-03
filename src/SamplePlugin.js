import React, { useEffect,useState } from 'react';
import { VERSION } from '@twilio/flex-ui';
import { FlexPlugin } from 'flex-plugin';
import PollingComp  from './components/pollingComp';
import CustomTaskListContainer from './components/CustomTaskList/CustomTaskList.Container';
import reducers, { namespace } from './states';

const PLUGIN_NAME = 'SamplePlugin';
var reservationatt;
var worker_at;
var outsourcerdetail;
export default class SamplePlugin extends FlexPlugin {

  constructor() {
    super(PLUGIN_NAME);
    this.state = {
      reservationatt: {}
  }
  }

  /**
   * This code is run when your plugin is being started
   * Use this to modify any UI components or attach to the actions framework
   *
   * @param flex { typeof import('@twilio/flex-ui') }
   * @param manager { import('@twilio/flex-ui').Manager }
   */
  init(flex, manager) {
  

    manager.workerClient.on("reservationCreated", function(reservation) {
      if (reservation.task.taskChannelUniqueName === 'voice') {
        console.log(reservation.task._worker.sid,"reservvvv");
     reservationatt=reservation.task._worker.sid
      
        // console.log(reservat ionatt,"outside");
    }
  
  });
    
console.log(this.reservationatt,"outside");

   console.log( flex.Manager.getInstance().workerClient.attributes,"555555555555");
    this.worker_at= flex.Manager.getInstance().workerClient.attributes.routing.skills;
this.outsourcerdetail=flex.Manager.getInstance().workerClient.attributes['team_name'];
   console.log(this.outsourcerdetail,"deekshaalva")
   flex.MainHeader.Content.add(<PollingComp key="test" workerSid={manager.workerClient.sid} departmentname={this.worker_at} outsourcerde={this.outsourcerdetail}/>,{sortOrder:-1, align:"end"})
   console.log(manager.workerClient.sid,"deeeeeeeee")
   console.log(this.state.workerattributes)
   console.log(this.workerattributes)
       

 
   
  }

  /**
   * Registers the plugin reducers
   *
   * @param manager { Flex.Manager }
   */
  registerReducers(manager) {
    if (!manager.store.addReducer) {
      // eslint: disable-next-line
      console.error(`You need FlexUI > 1.9.0 to use built-in redux; you are currently on ${VERSION}`);
      return;
    }

    manager.store.addReducer(namespace, reducers);
  }
}

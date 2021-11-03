import React from 'react';

import './pollingComp.css';
var nietos = [];
var obj = {};
var dept=[];
import styled from "react-emotion";
import { IconButton,Badge, ModalPopupWithEntryControl } from '@twilio/flex-ui-core';
import { cx } from "emotion";
export const Panel = styled("div")`
    width: 260px;
    color: ${(props) => props.theme.calculated.textColor};
    padding: 12px;
    line-height: 20px;

    ${(props) => props.theme.ErrorUI.Panel}
`;
export const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: '0 4px',
  },
}));
//import { CustomTaskListComponentStyles } from './CustomTaskList.Styles';
class pollingComp extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {result:[],
      showing: true,
      totalTask:0
    };

  }

  componentDidMount() {
    console.log("Creating timer...");
    this.timerID = setInterval(
      () => {this.tick();},
      5000
    );
  }

  componentWillUnmount() {
    console.log("Removing timer...");
    clearInterval(this.timerID);
  }

  tick= async () => {
    console.log("Ticking...");
    // console.log(this.props.departmentname,"hellloooo");
    // this.dept.push(this.props.departmentname);
this.dept = this.props.departmentname;
    console.log(this.dept,"skills name")
    const body = { WorkerSpaceSid: 'WS0125d10f9b864ef449f5eea82c1e8028',workerSid:`${this.props.workerSid}`  };
    const options = {
      method: 'POST',
      body: new URLSearchParams(body),
      headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}};
      await fetch('https://tumbleweed-penguin-7678.twil.io/realtime', options) 
      .then(resp => resp.json())
      .then(data => {
        console.log(data,"data ");
        let output = [];
        for (var j=0; j < this.dept.length; j++) {
          let totalPending = 0;
          for (var i=0; i < data.length; i++) if (data[i].name.search(this.dept[j]) != -1) {
            console.log("TaskQueue name: ", data[i].name, " - Task count: ", data[i].value);
            totalPending +=  data[i].value;
          }
          output[this.dept[j]] = totalPending;
          console.log(output,"uiudwd")
        }
        return output;
        
      })

          
      .then(result => {console.log(result,"00000")
     
      // .then(result => {console.log(result,"00000")
      // const totalTask =Object.entries(this.state.result).reduce((t,{value})=>t+value,0)

      console.log(result, "helloooo")
      const totalTask = Object.values(result).reduce((t, value) => t + value, 0)
      console.log(totalTask,"total nuber ");
      
      console.log("pending task count", result);

      this.setState({ result,totalTask});
     
      // console.log(result[0][0],"console of deekhsa")
      
    })
      .catch(e => console.log(e));
      // await fetch('https://tumbleweed-penguin-7678.twil.io/realtime', options) 
      // .then(resp => resp.json())
    

      //   .then(data => { for (var i=0; i < data.length; i++) 
        
      //   if(data["name"].includes(this.props.departmentname)){
        
      //   console.log(this.props.departmentname,"deeksha alava")
      //   }
        
      //   })
          // .then(data => this.setState({data:data},
      //   console.log(data,"hello") ))
      // this.props.departmentname.forEach(item => {
      // })
      // .then(data => { for (var i=0; i < data.length; i++) 
      //   if (this.props.departmentname in data[i])
       
      //    return data[i][this.props.departmentname] })
      // .then(result => {
      //   this.setState({"pendingTaskCount": result});
      //   console.log("pending task count", result);
      // })
      // .catch(e => console.log(e));
      }
      
      render() {
        return (
          <div>
              <ModalPopupWithEntryControl
                  className={cx("Twilio-ErrorUI")}
                  alignRight
               
                  entryControl={this.renderTriggerButton}
              >
                  <Panel   style={{   color: 'white',backgroundColor:'rgb(0,0,64)'}}  className={cx("Twilio-ErrorUI-Panel")}>
{this.state.totalTask>0?
                      Object.entries(this.state.result).sort((a,b) => b[1]-a[1]).map(([key,value],i) => (value>0?
                      <option key={i} value={key}>{key} : {value}</option>:
                      // <option  style={{background:'white'}} key={i} value={key}>{key} : {value}</option>
                      // <p> no calls waiting in queue</p>
                   ''
                   )):
                   <p>No waiting tasks</p>
                   }
 
                  </Panel>
              </ModalPopupWithEntryControl>
              <Badge    children={this.state.totalTask} themeOverride={{OuterCircle:{position: "relative", top: "-33px", right: "-14px", width: "1px"}}} />
               </div>
        );
      }
      renderTriggerButton = (isModalOpen) => {
        return (
          <div>
         
          <IconButton  style={{marginTop:'19px'}} icon="AgentBold" >
          <StyledBadge badgeContent={4} color="secondary">
    
    </StyledBadge>
    </IconButton>
          </div>
        );
      };
      
//   render() {
//     const { showing } = this.state;
//     return (
//        <div className="polling">
//      <IconButton icon="AgentBold"  onClick={() => this.setState({ showing: !showing })}>  <span className="button__badge">4</span></IconButton>
        
//         {showing && <div>
    
//     {Object.entries(this.state.result).map(([key,value],i) => <option key={i} value={key}>{key} : {value}</option>) } 
  
//    </div>
//   }
// </div>





//     )
// }
};
export default pollingComp;

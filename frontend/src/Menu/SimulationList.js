import React from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";
import { withTranslation } from 'react-i18next';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import Inform from '../Information/Document'
import { Redirect } from "react-router-dom"
import { Alert } from 'reactstrap';
import { each } from 'jquery';

class SimulationList extends React.Component  {
  constructor(props){
    super(props);
    this.state = {
      listSimulation:[],
      isTrainer: this.props.location.state.isTrainer,
      alert: false,
      redirect: false,
      id: this.props.location.state.id
    }
    
    
  }
  handleRandomCreate(){
        var arrSimulations = [];
    
      var request = {
        params: {
          idTrainer: 2,
           idTrainee: this.props.location.state.id
        }
      }
           //const baseGetURL = "http://localhost:8080/simulation/listByTraineeAndTrainer";
           // Comprobar que el trainee no tenga ya las simulaciones creadas
          const baseGetUrl = "http://localhost:8080/simulation/listTraineeAndTrainer/";
            
            axios.get(baseGetUrl,request)
            .then(res => {
              
              const data = res.data.data;
              
              if (data.length>0) {
                  this.setState({ listSimulation:data });
              } else {
                
                const baseUrl = "http://localhost:8080/simulation/create"
                // SUSTITUIR POR TUS DATAPOST
           // Primera simulacion
            var datapost1 = {
                trainerId: 2,
                traineeId: this.props.location.state.id,
                sex: 1,
                age: 30,
                weight: 60,
                partBody: "brazo derecho",
                bloodLoss: 10,
                sistolicPressure: 10,
                diastolicPressure: 10,
                heartRate: this.state.heartRate,
                breathingRate: this.state.breathingRate,
                urineOutput: this.state.urineOutput,
                saturation: this.state.saturation,
                mentalStatus: this.state.mentalStatus,
                phase: this.state.phase,
                temperature: this.state.temperature,
                time: this.state.time,
                isTrainer: true
            }
             var datapost2 = {
                trainerId: 2,
                traineeId: this.props.location.state.id,
                sex: 1,
                age: 30,
                weight: 60,
                partBody: "brazo derecho",
                bloodLoss: 10,
                sistolicPressure: 10,
                diastolicPressure: 10,
                heartRate: this.state.heartRate,
                breathingRate: this.state.breathingRate,
                urineOutput: this.state.urineOutput,
                saturation: this.state.saturation,
                mentalStatus: this.state.mentalStatus,
                phase: this.state.phase,
                temperature: this.state.temperature,
                time: this.state.time,
                isTrainer: true
             }
              var datapost3 = {
                trainerId: 2,
                traineeId: this.props.location.state.id,
                sex: 1,
                age: 30,
                weight: 60,
                partBody: "brazo derecho",
                bloodLoss: 10,
                sistolicPressure: 10,
                diastolicPressure: 10,
                heartRate: this.state.heartRate,
                breathingRate: this.state.breathingRate,
                urineOutput: this.state.urineOutput,
                saturation: this.state.saturation,
                mentalStatus: this.state.mentalStatus,
                phase: this.state.phase,
                temperature: this.state.temperature,
                time: this.state.time,
                isTrainer: true
                }
          // La añadimos al array
          arrSimulations.push(datapost1);
          arrSimulations.push(datapost2);
          arrSimulations.push(datapost3);
        
          
            arrSimulations.forEach(dataPost => {
              // Envio al backend y se genera en la base de datos si todo va bien
              console.log("ARRAYS", dataPost)
              axios.post(baseUrl, dataPost)
                .then(response => {
                  console.log(response)
                  if (response.data.success === true) {
                    axios.get(baseGetUrl, request)
                      .then(res => {
                        console.log("DAAA", res)
                        const data = res.data.data;
                        if (data) {
                          this.setState({ listSimulation: data });
                        }
                      }).catch(error => {
                        alert("Error 34 " + error);
                      })
                  }
                  else {
                    alert(response.data.message)
                  }
                })
                .catch(error => {
                  alert("Error 34 " + error)
                })
           


          })}
              
              
            })
            .catch(error => {
              alert(error)
            })
    
             //this.setState({ listSimulation: arrSimulations });
         
           
       
        
       
     
    }
  
  componentDidMount() {
    if (this.state.isTrainer) {
      axios.get("http://localhost:8080/simulation/listTrainer/"+this.props.location.state.id)
      .then(res => {
        const data = res.data.data;
        this.setState({ listSimulation:data });
      })
      .catch(error => {
        alert(error)
      })

    } else {
      if (this.props.location.state.trainerList) {
        
         this.handleRandomCreate();
      }
      else {
        axios.get("http://localhost:8080/simulation/listTrainee/" + this.props.location.state.id)
          .then(res => {
            
            const data = res.data.data;
            this.setState({ listSimulation: data });
          })
          .catch(error => {
           
            alert(error)
          })
      }
    }
  }

  componentDidUpdate() {
    
      if (this.state.isTrainer) {
        axios.get("http://localhost:8080/simulation/listTrainer/" + this.state.id)
          .then(res => {
            const data = res.data.data;
            this.setState({ listSimulation: data });
          })
          .catch(error => {
            alert(error)
          })

      } else {
        if (this.props.location.state.trainerList) {
         
          this.handleRandomCreate();
        }
        else {
          axios.get("http://localhost:8080/simulation/listTrainee/" + this.props.location.state.id)
            .then(res => {
              const data = res.data.data;
              this.setState({ listSimulation: data });
            })
            .catch(error => {
              alert(error)
            })
        }
      
    }
  }

  alert(type, msg) {
    return(
        <Alert color={type} isOpen={this.state.alert} toggle={() => this.setState({alert:false, redirect:true})}>
            {msg}
        </Alert>
    );
}

  render(){
    const { t } = this.props
    return (
      <div>
        {this.state.alert ? this.alert("success","El caso clínico ha sido eliminado.") : null}
        <table className="table table-hover table-striped">
          <thead className="thead-dark">
            <tr>
              <th scope="col"></th>
              {this.state.isTrainer
              ? <th scope="col">{t('list-simulation.trainee')}</th>
              : <th scope="col">{t('list-simulation.trainer')}</th>}
              <th scope="col">{t('list-simulation.sex')}</th>
              <th scope="col">{t('list-simulation.age')}</th>
              <th scope="col">{t('list-simulation.trauma')}</th>
              <th scope="col">{t('list-simulation.time')}</th>
              <th scope="col">{t('list-simulation.action')}</th>
              <th scope="col">Informe</th>
            </tr>
          </thead>
          <tbody>
            {this.loadFillData()}
          </tbody>
        </table>
        {this.state.redirect && !this.state.alert ? <Redirect to={{
                                                        pathname: '/listSimulation',
                                                        state: { id: this.state.id,
                                                                  isTrainer: this.state.isTrainer }
                                                    }}/>
                                    : null}
      </div>
    );
  }


  loadFillData() {
    const { t } = this.props
   
    if (this.state.listSimulation) {
      return this.state.listSimulation.map((data) => {
        return (
          <tr>
            <th></th>
            {this.state.isTrainer
              ? <td>{data.trainee.name} {data.trainee.surname}</td>
              : <td>{data.trainer.name} {data.trainer.surname}</td>}
            <th>{(data.sex === 0) ? t('new-simulation.male') : t('new-simulation.female')}</th>
            <td>{data.age}</td>
            <td>{data.partBody}</td>
            <td>{data.time}</td>
            <td>
              {data.inform !== null ?
                <p>Simulación Finalizada</p> :
                
                this.state.isTrainer
                  ?
                  <Link className="btn btn-outline-danger" to={"/listSimulation/"} onClick={() => this.sendDelete(data.simulationId)}> {t('list-simulation.delete')} </Link>
                
                  : <Link className="btn btn-outline-info "
                    to={{
                      pathname: "/simulation/" + data.simulationId,
                      state: { id: this.props.location.state.id }
                    }} >{t('list-simulation.enter')}
                  </Link>}
            </td>
            <td><Inform simulationId={data.simulationId}
              surname={data.trainee.surname} /> </td>
          </tr>
        )
      });
    }
  }
  sendDelete(simulationId)
  {
    // url de backend
    const baseUrl = "http://localhost:8080/simulation/delete"    // parameter data post
    // network
    axios.post(baseUrl,{
      id: simulationId
    })
    .then(response =>{
      if (response.data.success) {
        this.setState({ alert: true});
      }
    })
    .catch ( error => {
      alert("Error 325 " + error)
    })
  }
}
export default withTranslation()(SimulationList);
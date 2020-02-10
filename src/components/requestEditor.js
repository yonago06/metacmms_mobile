import React,{Component} from 'react';
import { Link } from 'react-router-dom';
class RequestEditor extends Component{
  constructor(){
      super()
      this.state={
        asset:{
              "nid": null,
              "stateNid": null,
              "typeNid": null,
              "brandNid": null,
              "modelNid": null,
              "locationNid": null,
              "orgUnitNid": null
        },
        urgencies:[],
        states:[]
      }
      this.handleSubmit = this.handleSubmit.bind(this);
    }


    handleSubmit(e){
      e.preventDefault();

      if(e.target.urgency_nid.value===-3 && (e.target.motivo.value===null || e.target.motivo.value==='')){
        alert("Debe ingresar un Motivo de Urgencia");
      }
      else{
        let request={
            "regUsrNid": 1,
            "assetNid": this.state.asset.nid,
            "orgUnitNid": this.state.asset.orgUnitNid,
            "assetLocationNid": this.state.asset.locationNid,
            "assetStateNid": parseInt(e.target.state_nid.value),
            "urgencyNid": parseInt(e.target.urgency_nid.value),
            "urgencyReason": e.target.motivo.value,
            "reqNid": 1,
            "problemText": e.target.problem.value
        }

        fetch('https://demo.metaok.com/metacmms_demo/api/corrective/v1/requests', {
            method: 'POST',
            body: JSON.stringify(request),
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(response => {
            if (response.status !== 200) {
              console.log('Looks like there was a problem. Status Code: ' +response.status);
              throw Error(response.status);;
            }
            return response;
          })
        .then(response => response.json())
          .then(data => {
            alert("Solicitud #"+data.nid+" generada con éxito");
            this.props.history.push(
              {
                pathname: '/'
              }
            )
          }
        )
        .catch(function(error) {console.log(error);});

        // .then(response => response.json())
        // .then(data => {
        //     if(data.type=="OK"){
        //       alert("Solicitud #"+data.data.nid+" generada con éxito");
        //       this.props.history.push(
        //         {
        //           pathname: '/'
        //         }
        //       )
        //     }
        //   }
        // )
        // .catch(function(error) {console.log(error);});
      }

    }

    componentDidMount() {

        fetch('https://demo.metaok.com/metacmms_demo/api/inventory/v1/assets/'+this.props.match.params.nid, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json"
            }
        })

        .then(response => response.json())
        .then(data => {this.setState({ asset: data.data })
          }
        )
        .catch(function(error) {console.log(error);});


        fetch('https://demo.metaok.com/metacmms_demo/api/corrective/v1/request-urgencies', {
            method: 'GET',
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(response => {
            if (response.status !== 200) {
              console.log('Looks like there was a problem. Status Code: ' +response.status);
              throw Error(response.status);;
            }
            return response;
          })
        .then(response => response.json())
          .then(data => {
            this.setState({ urgencies: data })
          }
        )
        .catch(function(error) {console.log(error);});


        fetch('https://demo.metaok.com/metacmms_demo/api/inventory/v1/asset-states', {
              method: 'GET',
              headers: {
                  "Content-Type": "application/json"
              }
        })
        .then(response => response.json())
        .then(data => {
            this.setState({ states: data.data })
          }
        )
        .catch(function(error) {console.log(error);});
    }

    render(){

      const urgencies=this.state.urgencies.map((data,index)=>{
        return(
          <div className="form-check form-check-inline" >
            <input className="form-check-input" type="radio" name="urgency_nid" id={data.id} value={data.nid} key={data.id} required/>
            <label className="form-check-label" >{data.name}</label>
          </div>
        )
      })

      const states=this.state.states.map((data,index)=>{
        return(
          <div className="form-check form-check-inline" >
            <input className="form-check-input" type="radio" name="state_nid" id={data.id} value={data.nid} key={data.id} required/>
            <label className="form-check-label">{data.name}</label>
          </div>
        )
      })

      return(
        <div className="container">
          <div className="row row-header  bg-success">
          <div className="col-lg">
            Solicitud MC
          </div>
          <div className="col-lg">
            {this.state.asset.typeNid!=null && this.state.asset.type.name} {this.state.asset.brandNid!=null && this.state.asset.brand.name}
          </div>
          <div className="col-lg">
            {this.state.asset.modelNid!=null && this.state.asset.model.name}
          </div>
          <div className="col-lg">
            {this.state.asset.stateNid!=null && this.state.asset.state.name}
          </div>
          </div>
          <form onSubmit={this.handleSubmit}>
          <div className="row" style={{textAlign:'center',marginTop:'20px'}}>

            <div className="col-lg">

              <div className="separator">
                <span>Urgencia</span>
              </div>

                {urgencies}

              <div className="form-group" style={{marginTop:'20px'}}>
                <label >Motivo</label>
                <textarea className="form-control" rows="2" id="motivo" name="motivo"  ></textarea>
              </div>

              <div className="separator">
                <span>Problema</span>
              </div>

              <div className="form-group" >
                <textarea className="form-control" rows="3" id="problem" name="problem" required></textarea>
              </div>

              <div className="separator">
                <span>Estado del equipo</span>
              </div>

              <div style={{textAlign:'left'}}>

                {states}

              </div>
            </div>
          </div>

          <div className="row" style={{marginTop:'20px',marginBottom:'30px'}}>
            <div className="col-md-4" style={{textAlign:'center'}}>
              <button className="btn btn-outline-primary btn-lg btn-full">Enviar</button>
            </div>
            <div className="col-md-4" style={{textAlign:'center',marginTop:'20px'}}>
              <Link to={{pathname: `/assetEditor/${this.props.match.params.nid}`}}><button type="button" className="btn btn-outline-secondary btn-lg btn-full">Regresar</button></Link>
            </div>
          </div>

          </form>

        </div>
      )
    }
}

export default RequestEditor;


// <div className="form-check form-check-inline">
//   <input className="form-check-input" type="radio" name="urgency_nid" id="urgency_nid" value="-3"  required/>
//   <label className="form-check-label">Urgente</label>
// </div>
// <div className="form-check form-check-inline">
//   <input className="form-check-input" type="radio" name="urgency_nid" id="urgency_nid" value="-2" required/>
//   <label className="form-check-label" >Normal</label>
// </div>
// <div className="form-check form-check-inline">
//   <input className="form-check-input" type="radio" name="urgency_nid" id="urgency_nid" value="-1" required/>
//   <label className="form-check-label" >Baja</label>
// </div>

//
// <div className="form-check form-check" >
//   <input className="form-check-input" type="radio" name="state_nid" id="state_nid" value="1" required/>
//   <label className="form-check-label">En servicio</label>
// </div>
// <div className="form-check form-check">
//   <input className="form-check-input" type="radio" name="state_nid" id="state_nid" value="-2" required/>
//   <label className="form-check-label" >Fuera de Servicio</label>
// </div>
// <div className="form-check form-check">
//   <input className="form-check-input" type="radio" name="state_nid" id="state_nid" value="-3" required/>
//   <label className="form-check-label" >En Servicio con errores</label>
// </div>

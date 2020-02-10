import React,{Component} from 'react';
import { Link } from 'react-router-dom';


class RequestList extends Component{
  constructor(props){
      super(props);
      this.state={
        resolution:[],
        complete:[],
        conformity:[],
        confirmation:[]
      }
  // this.setConfirmation = this.setConfirmation.bind(this);
    }

    componentDidMount() {
      fetch('https://demo.metaok.com/metacmms_demo/api/corrective/v1/requests?stateEnums=CONFIRMATION&regUsrNid=1', {
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
              this.setState({ confirmation: data })
          }
        )
        .catch(function(error) {console.log(error);});

      fetch('https://demo.metaok.com/metacmms_demo/api/corrective/v1/requests?stateEnums=RESOLUTION&regUsrNid=1', {
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
            this.setState({ resolution: data })
        }
      )
      .catch(function(error) {console.log(error);});

        fetch('https://demo.metaok.com/metacmms_demo/api/corrective/v1/requests?stateEnums=COMPLETED&regUsrNid=1', {
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
              this.setState({ complete: data })
          }
        )
        .catch(function(error) {console.log(error);});

          fetch('https://demo.metaok.com/metacmms_demo/api/corrective/v1/requests?stateEnums=CONFORMITY_REQUEST&regUsrNid=1', {
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
                this.setState({ conformity: data })
            }
          )
          .catch(function(error) {console.log(error);});
    }

    convertDate(datetime){
      let date=new Date(datetime);
      let formatted_date = ("0" + date.getDate()).slice(-2) + "-" + ("0" + (date.getMonth() + 1)).slice(-2) + "-" + date.getFullYear() + " " + ("0" + date.getHours()).slice(-2) + ":" + ("0" + date.getMinutes()).slice(-2);
      //let formatted_date = date.getDate() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear() + " " + date.getHours() + ":" + date.getMinutes();
      return formatted_date;
    }
    render(){

      const confirmation=this.state.confirmation.sort((a, b) => b.nid - a.nid)
      .map((request,index)=>{

        let creationDate=this.convertDate(request.creationDate);
        return(
          <li className="list-group-item list-group-item-action" key={request.nid} style={{width:'100%'}}>
            <h5>
              #{request.nid} {creationDate} {request.urgencyNid===-3 ? <span className="badge badge-danger"> Urgente</span> : null}
            </h5>
            {request.assetTypeNid!=null && request.assetType.name} {request.assetMarkNid!=null && request.assetMark.name} {request.assetModelNid!=null && request.assetModel.name}
          </li>
        )
      })

      const resolution=this.state.resolution.sort((a, b) => b.nid - a.nid)
      .map((request,index)=>{

        let creationDate=this.convertDate(request.creationDate);
        return(
          <li className="list-group-item list-group-item-action" key={request.nid} style={{width:'100%'}}>
            <h5>
              #{request.nid} {creationDate} {request.urgencyNid===-3 ? <span className="badge badge-danger"> Urgente</span> : null}
            </h5>
            {request.assetTypeNid!=null && request.assetType.name} {request.assetMarkNid!=null && request.assetMark.name} {request.assetModelNid!=null && request.assetModel.name}
          </li>
        )
      })

      const complete=this.state.complete.sort((a, b) => b.nid - a.nid)
      .map((request,index)=>{
        let creationDate=this.convertDate(request.creationDate);
        return(
          <li className="list-group-item list-group-item-action" key={request.nid} style={{width:'100%'}}>
          <h5>
            #{request.nid} {creationDate} {request.urgencyNid===-3 ? <span className="badge badge-danger"> Urgente</span> : null}
          </h5>
          {request.assetTypeNid!=null && request.assetType.name} {request.assetMarkNid!=null && request.assetMark.name} {request.assetModelNid!=null && request.assetModel.name}
          </li>
        )
      })

      const conformity=this.state.conformity.sort((a, b) => b.nid - a.nid)
      .map((request,index)=>{
        let creationDate=this.convertDate(request.creationDate);
        return(
          <li className="list-group-item list-group-item-action" key={request.nid} style={{width:'100%'}}>
          <h5>
            #{request.nid} {creationDate} {request.urgencyNid===-3 ? <span className="badge badge-danger"> Urgente</span> : null}
          </h5>
          {request.assetTypeNid!=null && request.assetType.name} {request.assetMarkNid!=null && request.assetMark.name} {request.assetModelNid!=null && request.assetModel.name}
          </li>
        )
      })

      return(
        <div className="container">
          <div className="row row-header bg-success">
            <div className="col-lg">
            Solicitudes MC
            </div>
          </div>
          <div className="row">


            <ul className="nav nav-tabs" id="myTab" role="tablist" style={{width:'100%',fontSize:'15px'}}>

              <li className="nav-item">
                <a className="nav-link active" style={{padding:'4px'}} id="confirmation-tab" data-toggle="tab" href="#confirmation" role="tab" aria-controls="confirmation" aria-selected="true">Confirmación</a>
              </li>

              <li className="nav-item">
                <a className="nav-link" style={{padding:'4px'}} id="resolution-tab" data-toggle="tab" href="#resolution" role="tab" aria-controls="resolution" aria-selected="false">Resolución</a>
              </li>

              <li className="nav-item">
                <a className="nav-link" style={{padding:'4px'}} id="completed-tab" data-toggle="tab" href="#complete" role="tab" aria-controls="complete" aria-selected="false">Completa</a>
              </li>

              <li className="nav-item">
                <a className="nav-link" style={{padding:'4px'}} id="conformity-tab" data-toggle="tab" href="#conformity" role="tab" aria-controls="conformity" aria-selected="false">Conformidad</a>
              </li>

            </ul>
            <div className="tab-content" id="myTabContent" style={{width:'100%'}}>
              <div className="tab-pane fade show active" id="confirmation" role="tabpanel" aria-labelledby="confirmation-tab">
              <div className="row " >
              <div className="col-lg" style={{textAlign:'center',marginTop:'10px'}}><h4>Espera de confirmación</h4></div>

                <div className="col-lg ">
                  <ul className="list-group list-group-flush">

                  {confirmation}
                  </ul>
                </div>
              </div>
              </div>
              <div className="tab-pane fade show " id="resolution" role="tabpanel" aria-labelledby="resolution-tab">
              <div className="row " >
              <div className="col-lg" style={{textAlign:'center',marginTop:'10px'}}><h4>En resolución</h4></div>

                <div className="col-lg ">
                  <ul className="list-group list-group-flush">

                  {resolution}
                  </ul>
                </div>
              </div>
              </div>
              <div className="tab-pane fade" id="complete" role="tabpanel" aria-labelledby="complete-tab">

              <div className="row">
              <div className="col-lg" style={{textAlign:'center',marginTop:'10px'}}><h4>Completadas</h4></div>
                <div className="col-lg">
                  <ul className="list-group list-group-flush">

                  {complete}
                  </ul>
                </div>
              </div>
              </div>
              <div className="tab-pane fade" id="conformity" role="tabpanel" aria-labelledby="conformity-tab">
              <div className="row">
              <div className="col-lg" style={{textAlign:'center',marginTop:'10px'}}><h4>  Espera de conformidad</h4></div>
                <div className="col-lg">

                  <ul className="list-group list-group-flush">
                  {conformity}
                  </ul>
                </div>
              </div>
              </div>
            </div>

          </div>
          <div className="row" style={{marginTop:'20px',marginBottom:'30px'}}>
            <div className="col-md-4" style={{textAlign:'center'}}>
              <Link to="/"><button type="button" className="btn btn-outline-secondary btn-lg btn-full">Regresar</button></Link>
            </div>
          </div>
        </div>
      )
    }
}

export default RequestList;


// <div className="row" key={request.nid}>
//   <div className="col-lg list-item" >
//     <h5>#{request.nid} {request.creation_date} <span className="badge badge-success">Resolución</span> <span className="badge badge-danger">Urgente</span></h5>
//     <h5>{request.asset.type} {request.asset.mark} {request.asset.model}</h5>
//   </div>
// </div>

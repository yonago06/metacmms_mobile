import React,{Component} from 'react';
import { Link } from 'react-router-dom';

class AssetEditor extends Component{
  constructor(props){
      super(props)
      this.state = {
        asset:{
              "type": null,
              "code": null,
              "message": null,
              "debugInfo": null,
              "data": {
                  "nid": null,
                  "name": null,
                  "deleted": null,
                  "locationText": null,
                  "regDatetime": null,
                  "deleteDatetime": null,
                  "deletionComment": null,
                  "serialNumber": null,
                  "warrantyEndDate": null,
                  "purchaseOrderNumber": null,
                  "purchasePrice": null,
                  "hl7Compatible": null,
                  "onOffDatetime": null,
                  "purchaseDate": null,
                  "commissioningDate": null,
                  "warranty": null,
                  "id": null,
                  "id2": null,
                  "notes": null,
                  "modelText": null,
                  "lastPmDate": null,
                  "pmEnabled": false,
                  "id3": null,
                  "placeNotes": null,
                  "imported": null,
                  "parentNid": null,
                  "locationNid": null,
                  "orgUnitNid": null,
                  "criticityNid": null,
                  "supplierNid": null,
                  "manufacturerNid": null,
                  "stateNid": null,
                  "currentLocationNid": null,
                  "typeNid": null,
                  "brandNid": null,
                  "modelNid": null,
                  "ownershipNid": null,
                  "warrantyStateNid": null,
                  "deleteUsrNid": null,
                  "placeNid": null,
                  "placeLogNid": null,
                  "stateHistoryNid": null,
                  "dropRequestNid": null,
              }
            }
      }

      this.handleInput=this.handleInput.bind(this);
    }

    handleInput(e){

    }

  componentDidMount() {

    fetch('https://demo.metaok.com/metacmms_demo/api/inventory/v1/assets/'+this.props.match.params.nid, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json"
        }
    })
      .then(response => response.json())
      .then(data => {
          if(data.data!=null){
            this.setState({ asset: data })
          }
          else{
            alert("No se encuentra el equipo");
            this.props.history.push(
              {
                pathname: '/qr'
              }
            )
          }
        }


      )
      .catch(function(error) {
              console.log(error);
          });
  }

    render(){
      let owrnership= "";
      if (this.state.asset.data.ownershipNid!=null) {
          owrnership = this.state.asset.data.ownership.name
      }

      return(
        <div className="container">
          <div className="row row-header  bg-success">
            <div className="col-lg">
              {this.state.asset.data.typeNid!=null && this.state.asset.data.type.name} {this.state.asset.data.brandNid!=null && this.state.asset.data.brand.name}
            </div>
            <div className="col-lg">
              {this.state.asset.data.modelNid!=null && this.state.asset.data.model.name}
            </div>
            <div className="col-lg">
              {this.state.asset.data.stateNid!=null && this.state.asset.data.state.name}
            </div>
          </div>
          <div className="row" style={{textAlign:'center',marginTop:'20px'}}>

            <div className="col-lg">

              <div className="input-group mb-3 " >
                <div className="input-group-prepend" style={{width:'35%'}}>
                  <span className="input-group-text" id="basic-addon1" style={{width:'100%'}} >SN</span>
                </div>
                <input type="text" className="form-control" disable="true" value={this.state.asset.data.serialNumber || ''} onChange={this.handleInput}/>
              </div>

              <div className="input-group mb-3 " >
                <div className="input-group-prepend"  style={{width:'35%'}}>
                  <span className="input-group-text" id="basic-addon1" style={{width:'100%'}} >ID</span>
                </div>
                <input type="text" className="form-control"  disable="true" value={this.state.asset.data.id || ''} onChange={this.handleInput}/>
              </div>



              <div className="input-group mb-3 ">
                <div className="input-group-prepend"  style={{width:'35%'}}>
                  <span className="input-group-text" id="basic-addon1" style={{width:'100%'}}>ID 2</span>
                </div>
                <input type="text" className="form-control" disable="true" value={this.state.asset.data.id2 || ''} onChange={this.handleInput}/>
              </div>

              <div className="input-group mb-3 ">
                <div className="input-group-prepend" style={{width:'35%'}}>
                  <span className="input-group-text" id="basic-addon1" style={{width:'100%'}}>ID 3</span>
                </div>
                <input type="text" className="form-control"  disable="true" value={this.state.asset.data.id3 || ''} onChange={this.handleInput}/>
              </div>

              <div className="input-group mb-3">
                <div className="input-group-prepend" style={{width:'35%'}}>
                  <span className="input-group-text" id="basic-addon1" style={{width:'100%'}}>Garantía</span>
                </div>
                <input type="text" className="form-control"  disable="true" value={this.state.asset.data.warrantyEndDate || ''} onChange={this.handleInput}/>
              </div>

              <div className="input-group mb-3">
                <div className="input-group-prepend" style={{width:'35%'}}>
                  <span className="input-group-text" id="basic-addon1" style={{width:'100%'}}>Ultimo MP</span>
                </div>
                <input type="text" className="form-control" disable="true" value={this.state.asset.data.lastPmDate || ''} onChange={this.handleInput}/>
              </div>

              <div className="input-group mb-3">
                <div className="input-group-prepend" style={{width:'35%'}}>
                  <span className="input-group-text" id="basic-addon1" style={{width:'100%'}}>Antiguedad</span>
                </div>
                <input type="text" className="form-control"  disable="true" value={this.state.asset.data.commissioningDate || ''} onChange={this.handleInput}/>
              </div>

              <div className="input-group mb-3">
                <div className="input-group-prepend" style={{width:'35%'}}>
                  <span className="input-group-text" id="basic-addon1" style={{width:'100%'}}>Propiedad</span>
                </div>
                <input type="text" className="form-control" disable="true" value={owrnership} onChange={this.handleInput}/>
              </div>


            </div>
          </div>

          <div className="row" style={{marginTop:'20px',marginBottom:'30px'}}>
            <div className="col-md-4" style={{textAlign:'center'}}>
              <Link to={{pathname: `/requestEditor/${this.props.match.params.nid}`}}><button type="button" className="btn btn-outline-primary btn-lg btn-full">Solicitar MC</button></Link>
            </div>
            <div className="col-md-4" style={{textAlign:'center',marginTop:'20px'}}>
              <Link to={{pathname: `/assetHistoryList/${this.props.match.params.nid}`}} ><button type="button" className="btn btn-outline-warning btn-lg btn-full" >Historial</button></Link>
            </div>
            <div className="col-md-4" style={{textAlign:'center',marginTop:'20px'}}>
              <Link to="/qr"><button type="button" className="btn btn-outline-secondary btn-lg btn-full">Regresar</button></Link>
            </div>
          </div>
        </div>
      )
    }
}

export default AssetEditor;

import React,{Component} from 'react';
import { Link } from 'react-router-dom';


class AssetHistoryList extends Component{
  constructor(props){
      super(props);

      let date=new Date();

      let fromDateFormat = (date.getFullYear()-1) + "-" + ("0" + (date.getMonth() + 1)).slice(-2) + "-" + ("0" + date.getDate()).slice(-2);
      let toDateFormat = date.getFullYear() + "-" + ("0" + (date.getMonth() + 1)).slice(-2) + "-" + ("0" + date.getDate()).slice(-2);


      this.state={
        history:[],
        fromDate:fromDateFormat,
        toDate:toDateFormat,
        asset:{
          "nid": null,
          "stateNid": null,
          "typeNid": null,
          "brandNid": null,
          "modelNid": null
        }
      }

      this.handleSubmit = this.handleSubmit.bind(this);
      this.handleInput = this.handleInput.bind(this);

    }
    handleInput(e){
      e.preventDefault();

      const {value,name}=e.target;
      this.setState({
        [name]:value
      });
    }

    handleSubmit(e){
      e.preventDefault();

        fetch('https://demo.metaok.com/metacmms_demo/api/inventory/v1/assets/'+this.props.match.params.nid+'/log?fromDate='+this.state.fromDate+'&toDate='+this.state.toDate, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json"
            }
        })
          .then(response => response.json())
          .then(data => {
              this.setState({ history: data.data })
            }
          )
          .catch(function(error) {console.log(error);});


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

    }


    componentDidMount() {

      fetch('https://demo.metaok.com/metacmms_demo/api/inventory/v1/assets/'+this.props.match.params.nid+'/log?fromDate='+this.state.fromDate+'&toDate='+this.state.toDate, {
          method: 'GET',
          headers: {
              "Content-Type": "application/json"
          }
      })
        .then(response => response.json())
        .then(data => {
            this.setState({ history: data.data })
          }
        )
        .catch(function(error) {console.log(error);});


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

    }

    convertDate(datetime){
      let date=new Date(datetime);
      let formatted_date = ("0" + date.getDate()).slice(-2) + "-" + ("0" + (date.getMonth() + 1)).slice(-2) + "-" + date.getFullYear() + " " + ("0" + date.getHours()).slice(-2) + ":" + ("0" + date.getMinutes()).slice(-2);
      return formatted_date;
    }

    convertDate2(date){
      let formatted_date = date.getFullYear() + "-" + ("0" + (date.getMonth() + 1)).slice(-2) + "-" + ("0" + date.getDate()).slice(-2);
      return formatted_date;
    }
    render(){

      const history=this.state.history.map((request,index)=>{
        let logDatetime=this.convertDate(request.logDatetime);
        return(
          <li className="list-group-item list-group-item-action" key={request.nid} style={{width:'100%'}}>
          <h5>{logDatetime}</h5>
          {request.type.name}
          </li>
        )
      })

      return(
        <div className="container">
          <div className="row row-header bg-success">
            <div className="col-lg">
              Historial del Equipo
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
            <div className="row " >
              <div className="col-lg ">

              <div className="form-group box-left" style={{marginTop:'20px'}}>
                <label htmlFor="fromDate">Desde</label>
                <input type="date" className="form-control" id="fromDate" name="fromDate" value={this.state.fromDate} onChange={this.handleInput} required/>
              </div>
              <div className="form-group box-left" style={{marginTop:'20px'}}>
                <label htmlFor="toDate">Hasta</label>
                <input type="date" className="form-control" id="toDate" name="toDate" value={this.state.toDate} onChange={this.handleInput} required/>
              </div>
              </div>
            </div>
            <div className="row" style={{marginTop:'20px'}}>
              <div className="col-md-4" style={{textAlign:'center'}}>
                <button className="btn btn-outline-primary btn-lg btn-full">Buscar</button>
              </div>
            </div>
          </form>
          <div className="row " >
            <div className="col-lg ">
              <ul className="list-group list-group-flush">
              {history}
              </ul>
            </div>
          </div>
          <div className="row" style={{marginTop:'20px',marginBottom:'30px'}}>
            <div className="col-md-4" style={{textAlign:'center'}}>
              <Link to={{pathname: `/assetEditor/${this.props.match.params.nid}`}}><button type="button" className="btn btn-outline-secondary btn-lg btn-full">Regresar</button></Link>
            </div>
          </div>
        </div>
      )
    }
}

export default AssetHistoryList;

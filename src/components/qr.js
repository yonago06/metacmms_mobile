import React,{Component} from 'react';
import QrReader from 'react-qr-reader'
import { Link,withRouter } from 'react-router-dom';


class Qr extends Component{

  constructor(props){
      super(props)
      this.state = {
        delay: 300,
        result: 'No result',
      }

      this.handleScan = this.handleScan.bind(this)
    }

    handleScan(result){
      if(result){
        this.setState({ result });

        try {
          const assetResult=JSON.parse(result);

          if(assetResult.object_type){
            if(assetResult.object_type==="asset"){
              this.props.history.push(
                {
                  pathname: '/assetEditor/'+assetResult.nid
                }
              )
            }
            else{
              alert("No esta seleccionado un equipo");
            }
          }
          else{
            alert("Error: La etiqueta no posee el formato correcto");
          }
        }
        catch (e) {
          alert("Error: La etiqueta no posee el formato correcto");
        }




      }
    }
    handleError(err){
      console.error(err)
    }


    render(){
      const previewStyle = {
        height: 'auto',
        width: '100%',
        padding: '10px',
      }

      return(
        <div className="container">
        <div className="row row-header bg-success">
          <div className="col-lg">
              <h2>QR</h2>
          </div>
        </div>
          <div className="row" style={{marginTop:'20px'}}>
            <div className="col-lg">
              <QrReader
                delay={this.state.delay}
                style={previewStyle}
                onError={this.handleError}
                onScan={this.handleScan}
                />
            </div>
          </div>

          <div className="row" style={{marginTop:'20px',marginBottom:'30px'}}>
            <div className="col-lg" style={{textAlign:'center'}}>
              <Link to="/"><button type="button" className="btn btn-outline-primary btn-lg btn-full">Regresar</button></Link>
            </div>
          </div>
        </div>
      )
    }
}

export default withRouter(Qr);

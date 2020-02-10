import React from 'react';
import './App.css';
import { Link } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <div className="container">

        <div className="row row-header bg-success">
          <div className="col-lg">
              <h2>METACMMS</h2>
              <span>Equipos disponibles siempre 2</span>

          </div>
          <div className="col-lg">
            <span className="badge badge-light">V3.0.0</span>
          </div>
          <div className="col-lg" style={{marginTop:'10px'}}>
            <h4>Admin</h4>
          </div>

        </div>


        <div className="row align-items-center" >
            <div className="col-md-6" style={{marginTop:'80px'}}>
              <div style={{width:'100%'}} >
                 <Link to="/qr"><button type="button" className="btn btn-primary btn-lg btn-full">Leer QR</button></Link>
              </div>
            </div>
            <div className="col-md-6" style={{marginTop:'30px'}}>
              <div style={{width:'100%'}}>
                <Link to="/requestList"><button type="button" className="btn btn-success btn-lg btn-full">Solicitudes MC</button></Link>
              </div>
            </div>
        </div>

        <div className="row align-items-center" style={{textAlign:'center',marginTop:'120px'}}>
          <div className="col-md-6" >
            <img src={require('./logometa.png')} alt="logo"/>
          </div>
        </div>

      </div>
    </div>
  );
}

export default App;


// <div className="row align-items-center" style={{textAlign:'center'}}>
//   <div className="col-md-6" >
//     <img src={require('./logometa.png')}/>
//   </div>
// </div>
//
// <div className="row align-items-center" style={{textAlign:'center'}} >
//   <div className="col-md-6" >
//     <h2>METACMMS</h2>
//   </div>
// </div>
//
// <div className="row align-items-center" style={{textAlign:'center'}} >
//   <div className="col-md-6" >
//     <h4>Admin</h4>
//   </div>
// </div>

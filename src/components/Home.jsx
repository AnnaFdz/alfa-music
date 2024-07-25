//import "../index.css";
import Card from "./Card"
import { Paginacion } from "./Paginacion";
import Tabs from "./Tabs";


export default function Home() {
  

  return (
    <>
    <Paginacion/>
    <div>
    <Tabs/>
    </div>
    <div className="container">
         
            
       
          <div className='box has-background-danger-60'>
          <div className="columns">
            <div className="column">
              <div className='box'>
              <Card/>
          
          </div>
          
        </div>
        {/*---------*/}
        <div className="column">
        <div className='box'>
        <Card/>

        </div>
        </div>
        {/*---------*/}
        <div className="column">
        <div className='box'>
        <Card/>
        </div>
        </div>
        {/*---------*/}
        <div className="column">
        <div className='box'>
        <Card/>
        </div>
        </div>
      </div>
      </div>
      </div>
      </>
    
  );
}

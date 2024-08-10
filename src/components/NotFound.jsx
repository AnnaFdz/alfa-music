import logNotFound from './imgs/logoAlfaMnotFound.png'
export default function NotFound() {
    
    
    return (
        <>
           <section class="section ">
            <h1 class="title">Page Not Found</h1>
            <h2 class="subtitle">
                Error <strong>404</strong> Pagina no encontrada!!  
            </h2>
            <div class="content">
            <div className="image " >
                            <figure >
                                <img
                                    src={logNotFound}
                                    alt="Profile image"
                                    style={{  width: 'inherit', height: 'inherit' }}
                                    
                                />
                            </figure>
            
            </div>
            </div>
            </section>
           
        </>
        
    );
}
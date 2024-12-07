import "../assets/scss/footer.scss";
import React from "react";
import instagram from "../images/instagram.svg";
import whatsapp from "../images/whatsapp.svg";
export default function Footer() {
  return (
    <footer>
      <div className="content">
        <div className="container">
          <div className="working-hours subcontainer">
            <h4>Horarios de atencion</h4>
            <p>Lunes a Viernes de 20:30 a 24</p>
            <p>Sabados y Domingos de 13 a 24</p>
          </div>
          <div className="location subcontainer">
            <h4>Ubicacion</h4>
            <p>El Malambo 1733, Marcos Paz</p>
            <p>Entre Dorrego y Beruti</p>
          </div>
          <div className="contact subcontainer">
            <h4>Contacto</h4>
            <p>Whatsapp: 11-2169-0969</p>
          </div>
        </div>
        <div className="icons">
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://www.instagram.com/dulce.tentacion.mp/"
          >
            <img src={instagram} alt="instagram" />
          </a>
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://api.whatsapp.com/send?phone=5491121690959&text=Hola%20vengo%20de%20la%20pagina%20web%20oficial%20!"
          >
            <img src={whatsapp} alt="whatsapp" />
          </a>
        </div>
        <div className="copyright">
          <p>Copyright © 2023 | André Espinoza</p>
        </div>
      </div>
    </footer>
  );
}

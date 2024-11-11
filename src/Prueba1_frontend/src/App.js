import { html, render } from 'lit-html';
import { Prueba1_backend } from 'declarations/Prueba1_backend';
import logo from './kindpng_435588.png';

class App {
  resultado = '';
  historial = '';

  constructor() {
    this.#render();
  }

  #handleSubmit = async (e) => {
      e.preventDefault();
      
      // Obtener los valores seleccionados y sus cantidades
      const lacteosSel = document.getElementById('lacteos').value;
      const lacteosQty = parseFloat(document.getElementById('cantLact').value);
      const animalSel = document.getElementById('animal').value;
      const animalQty = parseFloat(document.getElementById('cantCarne').value);
      const frutasSel = document.getElementById('frutas').value;
      const frutasQty = parseFloat(document.getElementById('cantFrutas').value);
      const verdurasSel = document.getElementById('verduras').value;
      const verdurasQty = parseFloat(document.getElementById('cantVerduras').value);
      const cerealesSel = document.getElementById('cereales').value;
      const cerealesQty = parseFloat(document.getElementById('cantCereales').value);
      const legumbresSel = document.getElementById('legumbres').value;
      const legumbresQty = parseFloat(document.getElementById('cantLegumbres').value);

      // Llamar a la función calc en el backend
      const result = await Prueba1_backend.calc(
          parseInt(lacteosSel),
          lacteosQty,
          parseInt(animalSel),
          animalQty,
          parseInt(frutasSel),
          frutasQty,
          parseInt(verdurasSel),
          verdurasQty,
          parseInt(cerealesSel),
          cerealesQty,
          parseInt(legumbresSel),
          legumbresQty
      );

      // Mostrar el resultado
      this.resultado = result;
      this.#render();
  };

  #mostrarHistorial = async () => {
      const historial = await Prueba1_backend.obtenerHistorial();
      this.historial = historial.map(item => `${item[0]} - ${item[1]}`).join('<br>');
      this.#render();
  };

  #cerrarVentana = () => {
      this.historial = '';
      this.#render();
  };

  #render() {
    let body = html`
        <main>
          <h1><img src="${logo}" style="max-height: 50px; margin-right: 20px;">Calculadora de calorias</h1>
            <div class="container">
                <div class="row">
                    <div class="col-md-12">
                        <form action="#"> 
                            <h4>Lacteos</h4>
                            <select name="lacteos" id="lacteos">
                                <option value="0">Leche</option>
                                <option value="1">Queso</option>
                                <option value="2">Yogur</option>
                                <option value="3">Mantequilla</option>
                            </select>
                            <label for="">Cantidad</label>
                            <input type="number" id="cantLact" name="cantLact" placeholder="Cantidad en gramos">
                            <br>
                            <!----->
                            <h4>Origen animal</h4>
                            <select name="animal" id="animal">
                                <option value="0">Cerdo</option>
                                <option value="1">Pollo</option>
                                <option value="2">Res</option>
                                <option value="3">Pescado</option>
                                <option value="4">Huevo</option>
                            </select>
                            <label for="">Cantidad</label>
                            <input type="number" id="cantCarne" name="cantCarne" placeholder="Cantidad en gramos">
                            <br>
                            <!----->
                            <h4>Frutas</h4>
                            <select name="frutas" id="frutas">
                                <option value="0">Manzana</option>
                                <option value="1">Plátano</option>
                                <option value="2">Naranja</option>
                                <option value="3">Toronja</option>
                                <option value="4">Guayaba</option>
                            </select>
                            <label for="">Cantidad</label>
                            <input type="number" id="cantFrutas" name="cantFrutas" placeholder="Cantidad en gramos">
                            <br>
                            <!----->
                            <h4>Verduras</h4>
                            <select name="verduras" id="verduras">
                                <option value="0">Lechuga</option>
                                <option value="1">Tomate</option>
                                <option value="2">Pimiento</option>
                                <option value="3">Cebolla</option>
                            </select>
                            <label for="">Cantidad</label>
                            <input type="number" id="cantVerduras" name="cantVerduras" placeholder="Cantidad en gramos">
                            <br>
                            <!----->
                            <h4>Cereales</h4>
                            <select name="cereales" id="cereales">
                                <option value="0">Arroz</option>
                                <option value="1">Pasta</option>
                                <option value="2">Pan</option>
                                <option value="3">Cereal</option>
                            </select>
                            <label for="">Cantidad</label>
                            <input type="number" id="cantCereales" name="cantCereales" placeholder="Cantidad en gramos">
                            <br>
                            <!----->
                            <h4>Legumbres</h4>
                            <select name="legumbres" id="legumbres">
                                <option value="0">Frijoles</option>
                                <option value="1">Lentejas</option>
                                <option value="2">Garbanzos</option>
                                <option value="3">Chícharos</option>
                            </select>
                            <label for="">Cantidad</label>
                            <input type="number" id="cantLegumbres" name="cantLegumbres" placeholder="Cantidad en gramos">
                            <br>
                            <!----->
                            <button type="submit">Calcular</button>
                            <button type="button" @click="${this.#mostrarHistorial}">Ver Historial</button>
                            <section id="resultado">${this.resultado}</section>
                        </form>
                        ${this.historial ? html`
                          <div id="ventanaHistorial">
                            <h2>Historial de Calorías</h2>
                            <div>${this.historial}</div>
                            <button @click="${this.#cerrarVentana}">Cerrar</button>
                          </div>
                        ` : ''}
                    </div>
                </div>
            </div>
      </main>
    `;
    render(body, document.getElementById('root'));
    document
      .querySelector('form')
      .addEventListener('submit', this.#handleSubmit);
  }
}

export default App;

//Estudiantes:
//Fhamair Alejandra Jaramillo Gurrute
//Catalina Gaona Medina

let datos = [];
for (let i = 0; i < 1000; i++) {
  let x = Math.random(); 
  let y = Math.random();
  datos.push({ x, y });
}

function agrupar(datos, rango, factor) {
  let grupos = [];
  for (let inicio = 0; inicio < 1; inicio += rango) {
    let fin = inicio + rango;
    let grupo = datos.filter(d => d.x >= inicio && d.x < fin);
    if (grupo.length > 0) {
      let promedioX = grupo.reduce((a, b) => a + b.x, 0) / grupo.length;
      let promedioY = grupo.reduce((a, b) => a + b.y, 0) / grupo.length;
      grupos.push({
        rango: `${inicio.toFixed(2)} - ${fin.toFixed(2)}`,
        x: promedioX.toFixed(3),
        y: (promedioY * factor).toFixed(3)
      });
    }
  }
  return grupos;
}

function crearTabla(id, grupos, titulo) {
  let html = `<h3>${titulo}</h3><table><tr><th>Rango X</th><th>Promedio X</th><th>Promedio Y</th></tr>`;
  grupos.forEach(g => {
    html += `<tr><td>${g.rango}</td><td>${g.x}</td><td>${g.y}</td></tr>`;
  });
  html += `</table>`;


  document.getElementById(id).innerHTML = html;
}

function crearGrafico(id, grupos, titulo) {

  let ctx = document.getElementById(id).getContext('2d');

  return new Chart(ctx, {

    type: "line",
    data: {
      labels: grupos.map(g => g.rango),
      datasets: [{
        label: titulo,
        data: grupos.map(g => g.y),
        borderColor: "blue",
        backgroundColor: "lightblue",
        fill: true
      }]
    },
    options: {
      responsive: true,
      plugins: { legend: { display: true } }
    }
  });
}

let chart1, chart2, chart3, chart4;

function calcular() {

  let factor = parseFloat(document.getElementById("factor").value);

  let grupos10 = agrupar(datos, 0.1, factor);
  let grupos20 = agrupar(datos, 0.05, factor);

  crearTabla("tabla10", grupos10, "Agrupamiento en 10 rangos (0.1)");

  crearTabla("tabla20", grupos20, "Agrupamiento en 20 rangos (0.05)");

  if (chart1) chart1.destroy();

  if (chart2) chart2.destroy();

  if (chart3) chart3.destroy();

  if (chart4) chart4.destroy();

  chart1 = crearGrafico("grafico1", grupos10, "Promedios (10 rangos)");

  chart2 = crearGrafico("grafico2", grupos20, "Promedios (20 rangos)");

  chart3 = crearGrafico("grafico3", grupos10, "Comparativa Y (10 rangos)");

  chart4 = crearGrafico("grafico4", grupos20, "Comparativa Y (20 rangos)");
}
// Cada zona es una fila doble de cajones. "inicio" y "fin" son los extremos
// de la fila, en coordenadas de la foto (1522 x 1256). "n" = cajones por lado.
const zonas = [
  { inicio: [284, 588],  fin: [544, 1125], n: 19 },
  { inicio: [487, 493],  fin: [758, 992],  n: 18 },
  { inicio: [689, 379],  fin: [973, 885],  n: 18 },
  { inicio: [872, 297],  fin: [1150, 784], n: 17 },
  { inicio: [1074, 171], fin: [1340, 645], n: 17 }
];
const SEPARACION = 27;   // distancia del centro de la fila a cada lado
const LARGO = 50;        // largo de cada cajón

const grupo = document.getElementById("cajones");
const cajones = [];      // todos los cajones: { el, ocupado }

for (const z of zonas) {
  const dx = z.fin[0] - z.inicio[0];
  const dy = z.fin[1] - z.inicio[1];
  const largoFila = Math.hypot(dx, dy);
  const ux = dx / largoFila, uy = dy / largoFila;   // dirección de la fila
  const angulo = Math.atan2(dy, dx) * 180 / Math.PI;
  const paso = largoFila / z.n;

  for (const lado of [-1, 1]) {
    for (let i = 0; i < z.n; i++) {
      const cx = z.inicio[0] + ux * paso * (i + 0.5) - uy * SEPARACION * lado;
      const cy = z.inicio[1] + uy * paso * (i + 0.5) + ux * SEPARACION * lado;
      const r = document.createElementNS("http://www.w3.org/2000/svg", "rect");
      r.setAttribute("x", -(paso - 4) / 2);
      r.setAttribute("y", -LARGO / 2);
      r.setAttribute("width", paso - 4);
      r.setAttribute("height", LARGO);
      r.setAttribute("rx", 4);
      r.setAttribute("transform", "translate(" + cx + " " + cy + ") rotate(" + angulo + ")");
      r.setAttribute("class", "cajon");
      const c = { el: r, ocupado: false };
      r.addEventListener("click", () => cambiar(c));
      grupo.appendChild(r);
      cajones.push(c);
    }
  }
}

function pintar(c) {
  c.el.setAttribute("class", "cajon " + (c.ocupado ? "ocupado" : "libre"));
}

function cambiar(c) {
  c.ocupado = !c.ocupado;
  pintar(c);
  actualizarDashboard();
}

function reiniciar() {
  cajones.forEach(c => { c.ocupado = Math.random() < 0.55; pintar(c); });
  actualizarDashboard();
}

function actualizarDashboard() {
  const total = cajones.length;
  const ocupados = cajones.filter(c => c.ocupado).length;
  const pct = Math.round(ocupados / total * 100);
  document.getElementById("total").textContent = total;
  document.getElementById("ocupados").textContent = ocupados;
  document.getElementById("disponibles").textContent = total - ocupados;
  document.getElementById("porcentaje").textContent = pct + "%";
  document.getElementById("relleno").style.width = pct + "%";
  document.getElementById("hora").textContent = new Date().toLocaleTimeString("es-MX");
}

// Simulación automática: cada 3 segundos cambian algunos cajones al azar
setInterval(() => {
  const cambios = 1 + Math.floor(Math.random() * 3);
  for (let i = 0; i < cambios; i++) {
    cambiar(cajones[Math.floor(Math.random() * cajones.length)]);
  }
}, 3000);

reiniciar();
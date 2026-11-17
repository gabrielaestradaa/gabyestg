  const zonas = [
    { x: 204, y: 429, alto: 313, angulo: -29, filas: 20 },
    { x: 299, y: 376, alto: 294, angulo: -29, filas: 19 },
    { x: 400, y: 313, alto: 286, angulo: -27, filas: 18 },
    { x: 488, y: 264, alto: 273, angulo: -27, filas: 18 },
    { x: 590, y: 215, alto: 300, angulo: -30, filas: 19 }
  ];
  const ANCHO_ZONA = 56;
  const mapa = document.getElementById("mapa");
  const cajones = [];

  for (const z of zonas) {
    const div = document.createElement("div");
    div.className = "zona";
    div.style.width = ANCHO_ZONA + "px";
    div.style.height = z.alto + "px";
    div.style.left = (z.x - ANCHO_ZONA / 2) + "px";
    div.style.top = (z.y - z.alto / 2) + "px";
    div.style.transform = "rotate(" + z.angulo + "deg)";
    div.style.gridTemplateRows = "repeat(" + z.filas + ", 1fr)";

    for (let i = 0; i < z.filas * 2; i++) {
      const c = document.createElement("div");
      c.className = "cajon";
      c.onclick = () => cambiar(c);
      div.appendChild(c);
      cajones.push(c);
    }
    mapa.appendChild(div);
  }

  function pintar(c) {
    c.classList.toggle("ocupado", c.ocupado);
    c.classList.toggle("libre", !c.ocupado);
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

  setInterval(() => {
    const cambios = 1 + Math.floor(Math.random() * 3);
    for (let i = 0; i < cambios; i++) {
      cambiar(cajones[Math.floor(Math.random() * cajones.length)]);
    }
  }, 3000);

  reiniciar();
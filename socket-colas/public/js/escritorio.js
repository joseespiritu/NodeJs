// Referencias
const lblEscritorio = document.querySelector("h1");
const btnAtender = document.querySelector("button");
const lblTicket = document.querySelector("small");
const divAlerta = document.querySelector(".alert");
const lblPendientes = document.querySelector("#lblPendientes");

const searchParams = new URLSearchParams(window.location.search);

if (!searchParams.has("escritorio")) {
  window.location = "index.html";
  throw new Error("El escritorio es obligatorio");
}

const escritorio = searchParams.get("escritorio");
lblEscritorio.innerText = escritorio;
divAlerta.style.display = "none";

const socket = io();

socket.on("connect", () => {
  // console.log('Conectado');
  btnAtender.disabled = false;
});

socket.on("disconnect", () => {
  // console.log('Desconectado del servidor');
  btnAtender.disabled = true;
});

socket.on("tickets-pendientes", (pendientes) => {
  if (pendientes === 0) {
    lblPendientes.style.display = "none";
  } else {
    lblPendientes.style.display = "";
    lblPendientes.innerText = pendientes;
  }
});

socket.on("ultimo-ticket", (ultimo) => {
  //   lblNuevoTicket.innerText = "Ticket " + ultimo;
});

btnAtender.addEventListener("click", () => {
  socket.emit("atender-ticket", { escritorio }, ({ ok, ticket, msg }) => {
    if (!ok) {
      lblTicket.innerText = "Nadie.";
      return (divAlerta.style.display = "");
    }

    lblTicket.innerText = `Ticket ${ticket.numero}`;
  });
});

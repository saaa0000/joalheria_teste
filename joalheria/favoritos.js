/* ====== Favoritos Auréa ====== */
const CATALOGO = {
  "brinco-orbital":  { nome: "Brinco Orbital",  preco: 1890, cat: "Brincos",   detalhe: "Ouro 18k · Pérola barroca", foto: "var(--img-1),linear-gradient(160deg,#d9c3b0,#8a6a55)", tag: "Novo" },
  "colar-aura":      { nome: "Colar Aura",      preco: 2490, cat: "Colares",   detalhe: "Ouro 18k · Turmalina azul", foto: "var(--img-2),linear-gradient(160deg,#c47a3a,#1d5f6b)", tag: "Exclusivo online" },
  "anel-iris":       { nome: "Anel Íris",       preco: 1680, cat: "Anéis",     detalhe: "Ouro 18k",                  foto: "var(--img-3),linear-gradient(160deg,#2a2220,#0c0908)" },
  "corrente-elos":   { nome: "Corrente Elos",   preco: 2950, cat: "Colares",   detalhe: "Ouro 18k · Elos largos",    foto: "var(--img-4),linear-gradient(160deg,#b8a58c,#7d6b55)", tag: "Mais desejado" },
  "brinco-gota":     { nome: "Brinco Gota",     preco: 1490, cat: "Brincos",   detalhe: "Ouro 18k",                  foto: "var(--img-5),linear-gradient(160deg,#e5c8b3,#a0603c)" },
  "anel-solitario":  { nome: "Anel Solitário",  preco: 3200, cat: "Anéis",     detalhe: "Ouro 18k · Diamante",       foto: "var(--img-6),linear-gradient(160deg,#c9b9a5,#6f5a45)", tag: "Novo" },
  "pulseira-fio":    { nome: "Pulseira Fio",    preco: 1250, cat: "Pulseiras", detalhe: "Ouro 18k",                  foto: "var(--img-7),linear-gradient(160deg,#d6c2a6,#8f7552)" },
  "colar-perola":    { nome: "Colar Pérola",    preco: 2180, cat: "Colares",   detalhe: "Ouro 18k · Pérola",         foto: "var(--img-8),linear-gradient(160deg,#ddd0c0,#9a8266)" }
};

const FAV_KEY = "aurea_favoritos";
const CART_KEY = "aurea_carrinho";

function lerFavs() {
  try { const v = JSON.parse(localStorage.getItem(FAV_KEY)); return Array.isArray(v) ? v : []; }
  catch (e) { return []; }
}
function salvarFavs(lista) {
  try { localStorage.setItem(FAV_KEY, JSON.stringify(lista)); } catch (e) {}
}

function alternarFav(id) {
  const favs = lerFavs();
  const i = favs.indexOf(id);
  if (i >= 0) favs.splice(i, 1); else favs.push(id);
  salvarFavs(favs);
  atualizarFavUI();
  document.dispatchEvent(new CustomEvent("favoritos:change"));
}

// Pinta os corações e atualiza o contador do menu
function atualizarFavUI() {
  const favs = lerFavs();
  document.querySelectorAll(".card[data-id]").forEach(card => {
    const h = card.querySelector(".heart");
    if (h) h.classList.toggle("active", favs.includes(card.dataset.id));
  });
  document.querySelectorAll('.icons a[aria-label="Favoritos"]').forEach(a => {
    let b = a.querySelector(".fav-count");
    if (!b) { b = document.createElement("span"); b.className = "fav-count"; a.appendChild(b); }
    b.textContent = favs.length;
    b.style.display = favs.length ? "grid" : "none";
  });
}

// Adiciona uma peça ao carrinho (mesmo formato do carrinho.html)
function adicionarAoCarrinho(id) {
  const p = CATALOGO[id]; if (!p) return;
  let itens;
  try { itens = JSON.parse(localStorage.getItem(CART_KEY)); } catch (e) {}
  if (!Array.isArray(itens)) itens = [];
  const existente = itens.find(it => it.nome === p.nome);
  if (existente) existente.qtd++;
  else itens.push({ nome: p.nome, detalhe: p.detalhe, preco: p.preco, qtd: 1, foto: p.foto.split(",")[0] });
  try { localStorage.setItem(CART_KEY, JSON.stringify(itens)); } catch (e) {}
}

// Clique no coração de qualquer card
document.addEventListener("click", e => {
  const heart = e.target.closest(".card .heart");
  if (!heart) return;
  e.preventDefault(); e.stopPropagation();
  alternarFav(heart.closest(".card").dataset.id);
});

document.addEventListener("DOMContentLoaded", atualizarFavUI);
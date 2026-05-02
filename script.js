const restaurantName = "Restaurante da Edi";
const whatsappNumber = "5511988881234";
const fallbackPhoto = "./assets/hero.jpg";
const dayOrder = ["Segunda", "Terca", "Terça", "Quarta", "Quinta", "Sexta", "Sabado", "Sábado", "Domingo"];

const menuContainer = document.querySelector("#menu-container");
const mainWhatsapp = document.querySelector("#main-whatsapp");
const searchInput = document.querySelector("#search-input");
const dayFilter = document.querySelector("#day-filter");
const priceFilter = document.querySelector("#price-filter");
const resultsSummary = document.querySelector("#results-summary");
const clearFiltersButton = document.querySelector("#clear-filters");
const menuStatus = document.querySelector("#menu-status");

const dayNotes = {
  Segunda: { kicker: "Começo da semana", note: "Virado a Paulista — clássico de segunda." },
  Terça: { kicker: "Saída a partir das 11h", note: "Strogonoff de frango fresquinho." },
  Quarta: { kicker: "Dia de feijoada", note: "Pequena, média ou grande — escolha a sua." },
  Quinta: { kicker: "Cardápio do dia", note: "Macarrão com frango assado." },
  Sexta: { kicker: "Fechamento da semana", note: "Peixe frito: merluza ou tilápia." },
  Sábado: { kicker: "Sábado com sabor", note: "Feijoada igual de quarta — aproveite!" },
};

const menuData = [
  { id: 1, dia_semana: "Segunda", nome: "Virado a Paulista", descricao: "Arroz, tutu de feijão, bisteca, calabresa, torresmo, ovo, couve, banana frita.", preco: 40, preco_promocional: null, promocao: false, destaque_dia: true, foto_url: "./assets/hero.jpg", ordem: 1, ativo: true },
  { id: 2, dia_semana: "Terça", nome: "Strogonoff de frango", descricao: "Arroz, batata palha, salada.", preco: 39, preco_promocional: null, promocao: false, destaque_dia: true, foto_url: "./assets/hero.jpg", ordem: 1, ativo: true },
  { id: 3, dia_semana: "Quarta", nome: "Feijoada", descricao: "Arroz, couve, torresmo, farofa, vinagrete, molho.", preco: 49, preco_promocional: null, promocao: false, destaque_dia: true, foto_url: "./assets/hero.jpg", ordem: 1, ativo: true, variacoes: [{ label: "Pequena", preco: 49 }, { label: "Média", preco: 59, descricao: "com bisteca" }, { label: "Grande", preco: 79, descricao: "2 bistecas" }] },
  { id: 4, dia_semana: "Quinta", nome: "Macarrão com frango assado", descricao: "Macarrão, arroz, frango assado, feijão, salada.", preco: 39, preco_promocional: null, promocao: false, destaque_dia: true, foto_url: "./assets/hero.jpg", ordem: 1, ativo: true },
  { id: 5, dia_semana: "Sexta", nome: "Filé de Merluza frito", descricao: "Arroz, feijão, purê de batata, salada.", preco: 39, preco_promocional: null, promocao: false, destaque_dia: true, foto_url: "./assets/hero.jpg", ordem: 1, ativo: true },
  { id: 6, dia_semana: "Sexta", nome: "Tilápia em posta frito", descricao: "Arroz, feijão, purê de batata, salada.", preco: 39, preco_promocional: null, promocao: false, destaque_dia: false, foto_url: "./assets/hero.jpg", ordem: 2, ativo: true },
  { id: 7, dia_semana: "Sábado", nome: "Feijoada", descricao: "Arroz, couve, torresmo, farofa, vinagrete, molho.", preco: 49, preco_promocional: null, promocao: false, destaque_dia: true, foto_url: "./assets/hero.jpg", ordem: 1, ativo: true, variacoes: [{ label: "Pequena", preco: 49 }, { label: "Média", preco: 59, descricao: "com bisteca" }, { label: "Grande", preco: 79, descricao: "2 bistecas" }] },
  { id: 8, dia_semana: "Diário", nome: "Bife acebolado", descricao: "Arroz, feijão, salada.", preco: 32, preco_promocional: null, promocao: false, destaque_dia: false, foto_url: "./assets/hero.jpg", ordem: 1, ativo: true, diario: true },
  { id: 9, dia_semana: "Diário", nome: "Filé de frango à milanesa", descricao: "Arroz, feijão, salada.", preco: 30, preco_promocional: null, promocao: false, destaque_dia: false, foto_url: "./assets/hero.jpg", ordem: 2, ativo: true, diario: true },
  { id: 10, dia_semana: "Diário", nome: "Omelete com presunto e queijo", descricao: "Arroz, feijão, salada.", preco: 30, preco_promocional: null, promocao: false, destaque_dia: false, foto_url: "./assets/hero.jpg", ordem: 3, ativo: true, diario: true },
  { id: 11, dia_semana: "Diário", nome: "Costela com mandioca", descricao: "Arroz, feijão, salada.", preco: 32, preco_promocional: null, promocao: false, destaque_dia: false, foto_url: "./assets/hero.jpg", ordem: 4, ativo: true, diario: true },
  { id: 12, dia_semana: "Diário", nome: "Picadinho", descricao: "Arroz, feijão, salada.", preco: 32, preco_promocional: null, promocao: false, destaque_dia: false, foto_url: "./assets/hero.jpg", ordem: 5, ativo: true, diario: true },
  { id: 13, dia_semana: "Diário", nome: "Bisteca acebolada", descricao: "Arroz, feijão, salada.", preco: 28, preco_promocional: null, promocao: false, destaque_dia: false, foto_url: "./assets/hero.jpg", ordem: 6, ativo: true, diario: true },
  { id: 14, dia_semana: "Diário", nome: "Frango ao molho", descricao: "Arroz, feijão, salada.", preco: 28, preco_promocional: null, promocao: false, destaque_dia: false, foto_url: "./assets/hero.jpg", ordem: 7, ativo: true, diario: true },
  { id: 15, dia_semana: "Diário", nome: "Calabresa", descricao: "Arroz, feijão, salada.", preco: 28, preco_promocional: null, promocao: false, destaque_dia: false, foto_url: "./assets/hero.jpg", ordem: 8, ativo: true, diario: true },
  { id: 16, dia_semana: "Diário", nome: "Bife de fígado acebolado", descricao: "Arroz, feijão, salada.", preco: 28, preco_promocional: null, promocao: false, destaque_dia: false, foto_url: "./assets/hero.jpg", ordem: 9, ativo: true, diario: true },
  { id: 17, dia_semana: "Diário", nome: "Almôndegas", descricao: "Arroz, feijão, salada.", preco: 28, preco_promocional: null, promocao: false, destaque_dia: false, foto_url: "./assets/hero.jpg", ordem: 10, ativo: true, diario: true },
  { id: 18, dia_semana: "Diário", nome: "Parmegiana de carne", descricao: "Arroz, feijão, fritas e salada.", preco: 42, preco_promocional: null, promocao: false, destaque_dia: false, foto_url: "./assets/hero.jpg", ordem: 11, ativo: true, diario: true },
  { id: 19, dia_semana: "Diário", nome: "Parmegiana de frango", descricao: "Arroz, feijão, fritas e salada.", preco: 40, preco_promocional: null, promocao: false, destaque_dia: false, foto_url: "./assets/hero.jpg", ordem: 12, ativo: true, diario: true },
  { id: 20, dia_semana: "Diário", nome: "Adicional de fritas", descricao: "Porção extra de fritas.", preco: 8, preco_promocional: null, promocao: false, destaque_dia: false, foto_url: "./assets/hero.jpg", ordem: 13, ativo: true, diario: true },
];

let weeklyMenu = [];

function createWhatsappLink(message) {
  return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
}

function formatPrice(value) {
  return new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(Number(value || 0));
}

function compareDays(a, b) {
  return dayOrder.indexOf(a) - dayOrder.indexOf(b);
}

function normalizeMenu(rows) {
  const dailyDishes = [];
  const grouped = rows.reduce((acc, item) => {
    if (item.diario) {
      dailyDishes.push({
        id: item.id, name: item.nome, description: item.descricao || "", price: Number(item.preco || 0),
        salePrice: item.preco_promocional == null ? null : Number(item.preco_promocional),
        isOnSale: Boolean(item.promocao && item.preco_promocional != null),
        isHighlighted: Boolean(item.destaque_dia), image: item.foto_url || fallbackPhoto,
        order: item.ordem || 0, diario: true,
      });
      return acc;
    }
    const day = item.dia_semana;
    const dish = {
      id: item.id, name: item.nome, description: item.descricao || "", price: Number(item.preco || 0),
      salePrice: item.preco_promocional == null ? null : Number(item.preco_promocional),
      isOnSale: Boolean(item.promocao && item.preco_promocional != null),
      isHighlighted: Boolean(item.destaque_dia), image: item.foto_url || fallbackPhoto,
      order: item.ordem || 0, variacoes: item.variacoes || null,
    };
    if (!acc.has(day)) acc.set(day, []);
    acc.get(day).push(dish);
    return acc;
  }, new Map());

  const result = [...grouped.entries()]
    .sort(([a], [b]) => compareDays(a, b))
    .map(([day, dishes]) => ({
      day,
      dishes: dishes.sort((a, b) => {
        if (a.isHighlighted !== b.isHighlighted) return Number(b.isHighlighted) - Number(a.isHighlighted);
        if (a.isOnSale !== b.isOnSale) return Number(b.isOnSale) - Number(a.isOnSale);
        return a.order - b.order;
      }),
    }));

  if (dailyDishes.length > 0) {
    dailyDishes.sort((a, b) => {
      if (a.isHighlighted !== b.isHighlighted) return Number(b.isHighlighted) - Number(a.isHighlighted);
      if (a.isOnSale !== b.isOnSale) return Number(b.isOnSale) - Number(a.isOnSale);
      return a.order - b.order;
    });
    result.unshift({ day: "Diário", dishes: dailyDishes });
  }

  return result;
}

function loadMenu() {
  const key = "edi-restaurante-pratos";
  const stored = localStorage.getItem(key);
  if (stored) {
    try {
      const items = JSON.parse(stored);
      if (Array.isArray(items) && items.length > 0) {
        weeklyMenu = normalizeMenu(items.filter((i) => i.ativo !== false));
        populateDayFilter();
        renderMenu();
        return;
      }
    } catch (e) {}
  }
  weeklyMenu = normalizeMenu(menuData);
  populateDayFilter();
  renderMenu();
}

function populateDayFilter() {
  dayFilter.innerHTML = '<option value="todos">Todos os dias</option>';
  dayFilter.innerHTML += weeklyMenu.map((d) => `<option value="${d.day}">${d.day}</option>`).join("");
}

function matchesPriceFilter(price, filter) {
  if (filter === "ate-22") return price <= 22;
  if (filter === "23-24") return price >= 23 && price <= 24;
  if (filter === "25-mais") return price >= 25;
  return true;
}

function getFilteredMenu() {
  const term = searchInput.value.trim().toLowerCase();
  const day = dayFilter.value;
  const price = priceFilter.value;

  return weeklyMenu
    .filter((d) => day === "todos" || d.day === day)
    .map((d) => ({
      ...d,
      dishes: d.dishes.filter((dish) => {
        const m = !term || `${dish.name} ${dish.description}`.toLowerCase().includes(term);
        let p = dish.isOnSale && dish.salePrice != null ? dish.salePrice : dish.price;
        if (dish.variacoes?.length) p = Math.min(...dish.variacoes.map((v) => v.preco));
        return m && matchesPriceFilter(p, price);
      }),
    }))
    .filter((d) => d.dishes.length > 0);
}

function renderDishCard(dish, dayLabel) {
  const msg = `Oi! Quero pedir ${dish.name} de ${dayLabel} no ${restaurantName}.`;

  if (dish.variacoes?.length) {
    const def = dish.variacoes[0];
    const btns = dish.variacoes.map(
      (v) => `
        <button class="menu-card__variant" type="button"
          data-msg="${encodeURIComponent(`Oi! Quero pedir ${dish.name} (${v.label}) de ${dayLabel} no ${restaurantName}.`)}"
          data-preco="${v.preco}">
          <span class="menu-card__variant-label">${v.label}</span>
          <span class="menu-card__variant-price">${formatPrice(v.preco)}</span>
          ${v.descricao ? `<span class="menu-card__variant-desc">${v.descricao}</span>` : ""}
        </button>`
    ).join("");

    return `
      <article class="menu-card menu-card--variants">
        <div class="menu-card__photo"><img src="${dish.image}" alt="${dish.name}" onerror="this.src='${fallbackPhoto}'"></div>
        <div class="menu-card__body">
          <div class="menu-card__top">
            <h3>${dish.name}</h3>
            ${dish.isHighlighted ? '<span class="menu-card__badge menu-card__badge--highlight">Destaque do dia</span>' : ""}
          </div>
          <p class="menu-card__description">${dish.description}</p>
          <div class="menu-card__variants">${btns}</div>
          <a class="menu-card__button" href="${createWhatsappLink(`Oi! Quero pedir ${dish.name} (${def.label}) de ${dayLabel} no ${restaurantName}.`)}" data-base-link>
            Pedir no Whats — ${formatPrice(def.preco)}
          </a>
        </div>
      </article>`;
  }

  const p = dish.isOnSale && dish.salePrice != null ? dish.salePrice : dish.price;
  return `
    <article class="menu-card">
      <div class="menu-card__photo"><img src="${dish.image}" alt="${dish.name}" onerror="this.src='${fallbackPhoto}'"></div>
      <div class="menu-card__body">
        <div class="menu-card__top">
          <h3>${dish.name}</h3>
          ${dish.isHighlighted ? '<span class="menu-card__badge menu-card__badge--highlight">Destaque do dia</span>' : ""}
          ${dish.isOnSale ? '<span class="menu-card__badge menu-card__badge--sale">Promoção</span>' : ""}
        </div>
        <div class="menu-card__meta">
          <span class="menu-card__price">${formatPrice(p)}</span>
          ${dish.isOnSale ? `<span class="menu-card__price menu-card__price--old">${formatPrice(dish.price)}</span>` : ""}
          <span class="menu-card__serving">Prato do dia</span>
        </div>
        <p class="menu-card__description">${dish.description}</p>
        <a class="menu-card__button" href="${createWhatsappLink(msg)}">Pedir no Whats</a>
      </div>
    </article>`;
}

function renderMenu() {
  const filtered = getFilteredMenu();

  const all = filtered.flatMap((d) => d.dishes.map((dish) => ({ ...dish, dayLabel: d.day })));
  resultsSummary.textContent = all.length === 0
    ? "Nenhum prato encontrado com os filtros atuais."
    : `${all.length} ${all.length === 1 ? "prato" : "pratos"} encontrados.`;

  if (all.length === 0) {
    menuContainer.innerHTML = '<div class="menu-grid__empty"><p>Nenhum prato encontrado.</p></div>';
    return;
  }

  const daily = filtered.find((d) => d.day === "Diário");
  const weekly = filtered.filter((d) => d.day !== "Diário");

  let html = "";

  if (daily) {
    html += '<div class="menu-daily-grid">';
    html += daily.dishes.map((d) => renderDishCard(d, "hoje")).join("");
    html += '</div>';
  }

  if (weekly.length > 0) {
    html += '<div class="menu-days-row">';
    html += weekly.map((d) => {
      const id = d.day.toLowerCase();
      return `
        <div class="menu-day-column">
          <div class="menu-day-column__header">
            <h3 class="menu-day-column__title">${d.day}</h3>
            <p class="menu-day-column__kicker">${dayNotes[d.day]?.kicker || ""}</p>
          </div>
          <div class="menu-day-column__dishes">
            ${d.dishes.map((dish) => renderDishCard(dish, d.day)).join("")}
          </div>
        </div>`;
    }).join("");
    html += '</div>';
  }

  menuContainer.innerHTML = html;

  menuContainer.querySelectorAll(".menu-card__variant").forEach((btn) => {
    btn.addEventListener("click", () => {
      const card = btn.closest(".menu-card--variants");
      card.querySelectorAll(".menu-card__variant").forEach((b) => b.classList.remove("is-selected"));
      btn.classList.add("is-selected");
      const link = card.querySelector("[data-base-link]");
      if (link) {
        link.href = `https://wa.me/${whatsappNumber}?text=${btn.dataset.msg}`;
        link.textContent = `Pedir no Whats — ${formatPrice(Number(btn.dataset.preco))}`;
      }
    });
  });
}

function setupMainCta() {
  mainWhatsapp.href = createWhatsappLink(`Oi! Quero saber mais sobre as marmitas congeladas do ${restaurantName}.`);
}

function setupFilters() {
  [searchInput, dayFilter, priceFilter].forEach((el) => {
    el.addEventListener("input", renderMenu);
    el.addEventListener("change", renderMenu);
  });
}

function setupClearFilters() {
  clearFiltersButton.addEventListener("click", () => {
    searchInput.value = "";
    dayFilter.value = "todos";
    priceFilter.value = "todos";
    renderMenu();
  });
}

setupFilters();
setupClearFilters();
setupMainCta();
loadMenu();

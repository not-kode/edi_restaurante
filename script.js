const restaurantName = "Restaurante da Edi";
const whatsappNumber = "5511988881234";
const fallbackPhoto = "./assets/hero.jpg";
const dayOrder = ["Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado", "Domingo"];

const menuContainer = document.querySelector("#menu-container");
const mainWhatsapp = document.querySelector("#main-whatsapp");
const searchInput = document.querySelector("#search-input");
const dayFilter = document.querySelector("#day-filter");
const priceFilter = document.querySelector("#price-filter");
const resultsSummary = document.querySelector("#results-summary");
const clearFiltersButton = document.querySelector("#clear-filters");
const menuStatus = document.querySelector("#menu-status");

const dayNotes = {
  Segunda: {
    kicker: "Começo da semana",
    note: "Opções diretas para almoço completo.",
  },
  Terça: {
    kicker: "Saída a partir das 11h",
    note: "Pratos do dia com boa saída no balcão.",
  },
  Quarta: {
    kicker: "Meio da semana",
    note: "Dia forte para pratos mais pedidos.",
  },
  Quinta: {
    kicker: "Cardápio do dia",
    note: "Mistura de massa, peixe e prato leve.",
  },
  Sexta: {
    kicker: "Fechamento da semana",
    note: "Combinações mais completas para sexta.",
  },
};

const menuData = [
  {
    id: 1,
    dia_semana: "Segunda",
    nome: "Frango ao molho",
    descricao: "Arroz, feijão e salada.",
    preco: 22,
    preco_promocional: null,
    promocao: false,
    destaque_dia: true,
    foto_url: "./assets/figma/frango ao molho.jpg",
    ordem: 1,
  },
  {
    id: 2,
    dia_semana: "Segunda",
    nome: "Contra filé",
    descricao: "Arroz, feijão, salada e contra filé.",
    preco: 24,
    preco_promocional: null,
    promocao: false,
    destaque_dia: false,
    foto_url: "./assets/figma/contra filé.jpg",
    ordem: 2,
  },
  {
    id: 3,
    dia_semana: "Segunda",
    nome: "Omelete",
    descricao: "Arroz, feijão e salada.",
    preco: 20,
    preco_promocional: null,
    promocao: false,
    destaque_dia: false,
    foto_url: "./assets/figma/omelete.jpg",
    ordem: 3,
  },
  {
    id: 4,
    dia_semana: "Terça",
    nome: "Carne de panela",
    descricao: "Arroz, feijão e salada.",
    preco: 24,
    preco_promocional: null,
    promocao: false,
    destaque_dia: true,
    foto_url: "./assets/figma/carne de panela.jpg",
    ordem: 1,
  },
  {
    id: 5,
    dia_semana: "Terça",
    nome: "Calabresa acebolada",
    descricao: "Arroz, feijão e salada.",
    preco: 21,
    preco_promocional: null,
    promocao: false,
    destaque_dia: false,
    foto_url: "./assets/figma/calabresa acebolada.jpg",
    ordem: 2,
  },
  {
    id: 6,
    dia_semana: "Terça",
    nome: "Frango ao molho",
    descricao: "Arroz, feijão e salada.",
    preco: 22,
    preco_promocional: null,
    promocao: false,
    destaque_dia: false,
    foto_url: "./assets/figma/frango ao molho.jpg",
    ordem: 3,
  },
  {
    id: 7,
    dia_semana: "Quarta",
    nome: "Feijoada",
    descricao: "Arroz, couve, farofa e laranja.",
    preco: 25,
    preco_promocional: null,
    promocao: false,
    destaque_dia: true,
    foto_url: "./assets/figma/feijoada.jpg",
    ordem: 1,
  },
  {
    id: 8,
    dia_semana: "Quarta",
    nome: "Contra filé",
    descricao: "Arroz, feijão, salada e contra filé.",
    preco: 24,
    preco_promocional: null,
    promocao: false,
    destaque_dia: false,
    foto_url: "./assets/figma/contra filé.jpg",
    ordem: 2,
  },
  {
    id: 9,
    dia_semana: "Quinta",
    nome: "Macarronada com frango assado",
    descricao: "Macarronada com molho e frango assado.",
    preco: 24,
    preco_promocional: null,
    promocao: false,
    destaque_dia: true,
    foto_url: "./assets/figma/macarronada com frango assado.jpg",
    ordem: 1,
  },
  {
    id: 10,
    dia_semana: "Quinta",
    nome: "Filé de Merluza",
    descricao: "Arroz, feijão, salada e purê.",
    preco: 25,
    preco_promocional: null,
    promocao: false,
    destaque_dia: false,
    foto_url: "./assets/figma/Filé de Merlusa.jpg",
    ordem: 2,
  },
  {
    id: 11,
    dia_semana: "Quinta",
    nome: "Omelete",
    descricao: "Arroz, feijão e salada.",
    preco: 20,
    preco_promocional: null,
    promocao: false,
    destaque_dia: false,
    foto_url: "./assets/figma/omelete.jpg",
    ordem: 3,
  },
  {
    id: 12,
    dia_semana: "Sexta",
    nome: "Tutu de feijão",
    descricao: "Arroz, salada, bisteca, banana frita e torresmo.",
    preco: 27,
    preco_promocional: null,
    promocao: false,
    destaque_dia: true,
    foto_url: "./assets/figma/Tutu de Feijão.jpg",
    ordem: 1,
  },
  {
    id: 13,
    dia_semana: "Sexta",
    nome: "Carne de panela",
    descricao: "Arroz, feijão e salada.",
    preco: 24,
    preco_promocional: null,
    promocao: false,
    destaque_dia: false,
    foto_url: "./assets/figma/carne de panela.jpg",
    ordem: 2,
  },
  {
    id: 14,
    dia_semana: "Sexta",
    nome: "Calabresa acebolada",
    descricao: "Arroz, feijão e salada.",
    preco: 21,
    preco_promocional: null,
    promocao: false,
    destaque_dia: false,
    foto_url: "./assets/figma/calabresa acebolada.jpg",
    ordem: 3,
  },
];

let weeklyMenu = [];

function createWhatsappLink(message) {
  return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
}

function setStatus(message, type = "info") {
  menuStatus.textContent = message;
  menuStatus.className = `menu-status is-${type}`;
}

function clearStatus() {
  menuStatus.textContent = "";
  menuStatus.className = "menu-status";
}

function formatPrice(value) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(Number(value || 0));
}

function compareDays(a, b) {
  return dayOrder.indexOf(a) - dayOrder.indexOf(b);
}

function normalizeMenu(rows) {
  const grouped = rows.reduce((accumulator, item) => {
    const day = item.dia_semana;
    const dish = {
      id: item.id,
      name: item.nome,
      description: item.descricao || "Sem descrição.",
      price: Number(item.preco || 0),
      salePrice: item.preco_promocional == null ? null : Number(item.preco_promocional),
      isOnSale: Boolean(item.promocao && item.preco_promocional != null),
      isHighlighted: Boolean(item.destaque_dia),
      image: item.foto_url || fallbackPhoto,
      order: item.ordem || 0,
    };

    if (!accumulator.has(day)) {
      accumulator.set(day, []);
    }

    accumulator.get(day).push(dish);
    return accumulator;
  }, new Map());

  return [...grouped.entries()]
    .sort(([leftDay], [rightDay]) => compareDays(leftDay, rightDay))
    .map(([day, dishes]) => ({
      day,
      dishes: dishes.sort((left, right) => {
        if (left.isHighlighted !== right.isHighlighted) {
          return Number(right.isHighlighted) - Number(left.isHighlighted);
        }

        if (left.isOnSale !== right.isOnSale) {
          return Number(right.isOnSale) - Number(left.isOnSale);
        }

        return left.order - right.order;
      }),
    }));
}

function loadMenu() {
  const STORAGE_KEY = "edi-restaurante-pratos";

  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) {
    try {
      const items = JSON.parse(stored);
      if (Array.isArray(items) && items.length > 0) {
        weeklyMenu = normalizeMenu(items.filter((item) => item.ativo !== false));
        populateDayFilter();
        renderMenu();
        clearStatus();
        return;
      }
    } catch (e) {
      // fallback abaixo
    }
  }

  weeklyMenu = normalizeMenu(menuData);
  populateDayFilter();
  renderMenu();
  clearStatus();
}

function populateDayFilter() {
  dayFilter.innerHTML = `<option value="todos">Todos os dias</option>`;
  dayFilter.innerHTML += weeklyMenu
    .map((day) => `<option value="${day.day}">${day.day}</option>`)
    .join("");
}

function matchesPriceFilter(price, filter) {
  const numeric = Number(price);

  if (filter === "ate-22") return numeric <= 22;
  if (filter === "23-24") return numeric >= 23 && numeric <= 24;
  if (filter === "25-mais") return numeric >= 25;
  return true;
}

function getFilteredMenu() {
  const searchTerm = searchInput.value.trim().toLowerCase();
  const selectedDay = dayFilter.value;
  const selectedPrice = priceFilter.value;

  return weeklyMenu
    .filter((day) => selectedDay === "todos" || day.day === selectedDay)
    .map((day) => ({
      ...day,
      dishes: day.dishes.filter((dish) => {
        const matchesSearch =
          !searchTerm || `${dish.name} ${dish.description}`.toLowerCase().includes(searchTerm);

        return matchesSearch && matchesPriceFilter(dish.isOnSale ? dish.salePrice : dish.price, selectedPrice);
      }),
    }))
    .filter((day) => day.dishes.length > 0);
}

function updateResultsSummary(filteredMenu) {
  const totalDishes = filteredMenu.reduce((sum, day) => sum + day.dishes.length, 0);
  const totalDays = filteredMenu.length;

  if (totalDishes === 0) {
    resultsSummary.textContent = "Nenhum prato encontrado com os filtros atuais.";
    return;
  }

  const dishLabel = totalDishes === 1 ? "prato" : "pratos";
  const dayLabel = totalDays === 1 ? "dia" : "dias";
  resultsSummary.textContent = `${totalDishes} ${dishLabel} em ${totalDays} ${dayLabel}.`;
}

function renderMenu() {
  const filteredMenu = getFilteredMenu();
  updateResultsSummary(filteredMenu);

  if (filteredMenu.length === 0) {
    menuContainer.innerHTML = `
      <section class="menu-day">
        <div class="menu-day__header">
          <h2 class="menu-day__title">Nenhum prato encontrado</h2>
        </div>
      </section>
    `;
    return;
  }

  menuContainer.innerHTML = filteredMenu
    .map(
      (day) => `
        <section class="menu-day" aria-labelledby="${day.day.toLowerCase()}-title">
          <div class="menu-day__header">
            <p class="menu-day__kicker">${dayNotes[day.day]?.kicker || "Cardápio do dia"}</p>
            <h2 class="menu-day__title" id="${day.day.toLowerCase()}-title">${day.day}</h2>
            <p class="menu-day__note">${dayNotes[day.day]?.note || ""}</p>
          </div>
          <div class="menu-day__items">
            ${day.dishes
              .map((dish) => {
                const message = `Oi! Quero pedir ${dish.name} de ${day.day} no ${restaurantName}.`;
                const displayPrice = dish.isOnSale && dish.salePrice != null ? dish.salePrice : dish.price;

                return `
                  <article class="menu-card">
                    <div class="menu-card__photo">
                      <img src="${dish.image}" alt="${dish.name}" onerror="this.src='${fallbackPhoto}'" />
                    </div>
                    <div class="menu-card__body">
                      <div class="menu-card__top">
                        <h3>${dish.name}</h3>
                        <div class="menu-card__badges">
                          ${dish.isHighlighted ? '<span class="menu-card__badge menu-card__badge--highlight">Destaque do dia</span>' : ""}
                          ${dish.isOnSale ? '<span class="menu-card__badge menu-card__badge--sale">Promoção</span>' : ""}
                        </div>
                      </div>
                      <div class="menu-card__meta">
                        <div class="menu-card__price-group">
                          <span class="menu-card__price">${formatPrice(displayPrice)}</span>
                          ${dish.isOnSale ? `<span class="menu-card__price menu-card__price--old">${formatPrice(dish.price)}</span>` : ""}
                        </div>
                        <span class="menu-card__serving">Prato do dia</span>
                      </div>
                      <p class="menu-card__description">${dish.description}</p>
                      <a class="menu-card__button" href="${createWhatsappLink(message)}">Pedir no Whats</a>
                    </div>
                  </article>
                `;
              })
              .join("")}
          </div>
        </section>
      `
    )
    .join("");
}

function setupMainCta() {
  const message = `Oi! Quero saber mais sobre as marmitas congeladas do ${restaurantName}.`;
  mainWhatsapp.href = createWhatsappLink(message);
}

function setupFilters() {
  [searchInput, dayFilter, priceFilter].forEach((element) => {
    element.addEventListener("input", renderMenu);
    element.addEventListener("change", renderMenu);
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

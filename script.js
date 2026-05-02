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
  Segunda: {
    kicker: "Começo da semana",
    note: "Virado a Paulista — clássico de segunda.",
  },
  Terça: {
    kicker: "Saída a partir das 11h",
    note: "Strogonoff de frango fresquinho.",
  },
  Quarta: {
    kicker: "Dia de feijoada",
    note: "Pequena, média ou grande — escolha a sua.",
  },
  Quinta: {
    kicker: "Cardápio do dia",
    note: "Macarrão com frango assado.",
  },
  Sexta: {
    kicker: "Fechamento da semana",
    note: "Peixe frito: merluza ou tilápia.",
  },
  Sábado: {
    kicker: "Sábado com sabor",
    note: "Feijoada igual de quarta — aproveite!",
  },
};

const menuData = [
  // === SEGUNDA ===
  { id: 1, dia_semana: "Segunda", nome: "Virado a Paulista", descricao: "Arroz, tutu de feijão, bisteca, calabresa, torresmo, ovo, couve, banana frita.", preco: 40, preco_promocional: null, promocao: false, destaque_dia: true, foto_url: "./assets/hero.jpg", ordem: 1, ativo: true },
  // === TERÇA ===
  { id: 2, dia_semana: "Terça", nome: "Strogonoff de frango", descricao: "Arroz, batata palha, salada.", preco: 39, preco_promocional: null, promocao: false, destaque_dia: true, foto_url: "./assets/hero.jpg", ordem: 1, ativo: true },
  // === QUARTA ===
  { id: 3, dia_semana: "Quarta", nome: "Feijoada Pequena", descricao: "Arroz, couve, torresmo, farofa, vinagrete, molho.", preco: 49, preco_promocional: null, promocao: false, destaque_dia: false, foto_url: "./assets/hero.jpg", ordem: 1, ativo: true },
  { id: 4, dia_semana: "Quarta", nome: "Feijoada Média", descricao: "Arroz, bisteca, couve, torresmo, farofa, vinagrete, molho.", preco: 59, preco_promocional: null, promocao: false, destaque_dia: true, foto_url: "./assets/hero.jpg", ordem: 2, ativo: true },
  { id: 5, dia_semana: "Quarta", nome: "Feijoada Grande", descricao: "Arroz, 2 bistecas, couve, torresmo, vinagrete, farofa, molho.", preco: 79, preco_promocional: null, promocao: false, destaque_dia: false, foto_url: "./assets/hero.jpg", ordem: 3, ativo: true },
  // === QUINTA ===
  { id: 6, dia_semana: "Quinta", nome: "Macarrão com frango assado", descricao: "Macarrão, arroz, frango assado, feijão, salada.", preco: 39, preco_promocional: null, promocao: false, destaque_dia: true, foto_url: "./assets/hero.jpg", ordem: 1, ativo: true },
  // === SEXTA ===
  { id: 7, dia_semana: "Sexta", nome: "Filé de Merluza frito", descricao: "Arroz, feijão, purê de batata, salada.", preco: 39, preco_promocional: null, promocao: false, destaque_dia: true, foto_url: "./assets/hero.jpg", ordem: 1, ativo: true },
  { id: 8, dia_semana: "Sexta", nome: "Tilápia em posta frito", descricao: "Arroz, feijão, purê de batata, salada.", preco: 39, preco_promocional: null, promocao: false, destaque_dia: false, foto_url: "./assets/hero.jpg", ordem: 2, ativo: true },
  // === SÁBADO (repete Quarta) ===
  { id: 9, dia_semana: "Sábado", nome: "Feijoada Pequena", descricao: "Arroz, couve, torresmo, farofa, vinagrete, molho.", preco: 49, preco_promocional: null, promocao: false, destaque_dia: false, foto_url: "./assets/hero.jpg", ordem: 1, ativo: true },
  { id: 10, dia_semana: "Sábado", nome: "Feijoada Média", descricao: "Arroz, bisteca, couve, torresmo, farofa, vinagrete, molho.", preco: 59, preco_promocional: null, promocao: false, destaque_dia: true, foto_url: "./assets/hero.jpg", ordem: 2, ativo: true },
  { id: 11, dia_semana: "Sábado", nome: "Feijoada Grande", descricao: "Arroz, 2 bistecas, couve, torresmo, vinagrete, farofa, molho.", preco: 79, preco_promocional: null, promocao: false, destaque_dia: false, foto_url: "./assets/hero.jpg", ordem: 3, ativo: true },
  // === PRATOS DIÁRIOS ===
  { id: 12, dia_semana: "Diário", nome: "Bife acebolado", descricao: "Arroz, feijão, salada.", preco: 32, preco_promocional: null, promocao: false, destaque_dia: false, foto_url: "./assets/hero.jpg", ordem: 1, ativo: true, diario: true },
  { id: 13, dia_semana: "Diário", nome: "Filé de frango à milanesa", descricao: "Arroz, feijão, salada.", preco: 30, preco_promocional: null, promocao: false, destaque_dia: false, foto_url: "./assets/hero.jpg", ordem: 2, ativo: true, diario: true },
  { id: 14, dia_semana: "Diário", nome: "Omelete com presunto e queijo", descricao: "Arroz, feijão, salada.", preco: 30, preco_promocional: null, promocao: false, destaque_dia: false, foto_url: "./assets/hero.jpg", ordem: 3, ativo: true, diario: true },
  { id: 15, dia_semana: "Diário", nome: "Costela com mandioca", descricao: "Arroz, feijão, salada.", preco: 32, preco_promocional: null, promocao: false, destaque_dia: false, foto_url: "./assets/hero.jpg", ordem: 4, ativo: true, diario: true },
  { id: 16, dia_semana: "Diário", nome: "Picadinho", descricao: "Arroz, feijão, salada.", preco: 32, preco_promocional: null, promocao: false, destaque_dia: false, foto_url: "./assets/hero.jpg", ordem: 5, ativo: true, diario: true },
  { id: 17, dia_semana: "Diário", nome: "Bisteca acebolada", descricao: "Arroz, feijão, salada.", preco: 28, preco_promocional: null, promocao: false, destaque_dia: false, foto_url: "./assets/hero.jpg", ordem: 6, ativo: true, diario: true },
  { id: 18, dia_semana: "Diário", nome: "Frango ao molho", descricao: "Arroz, feijão, salada.", preco: 28, preco_promocional: null, promocao: false, destaque_dia: false, foto_url: "./assets/hero.jpg", ordem: 7, ativo: true, diario: true },
  { id: 19, dia_semana: "Diário", nome: "Calabresa", descricao: "Arroz, feijão, salada.", preco: 28, preco_promocional: null, promocao: false, destaque_dia: false, foto_url: "./assets/hero.jpg", ordem: 8, ativo: true, diario: true },
  { id: 20, dia_semana: "Diário", nome: "Bife de fígado acebolado", descricao: "Arroz, feijão, salada.", preco: 28, preco_promocional: null, promocao: false, destaque_dia: false, foto_url: "./assets/hero.jpg", ordem: 9, ativo: true, diario: true },
  { id: 21, dia_semana: "Diário", nome: "Almôndegas", descricao: "Arroz, feijão, salada.", preco: 28, preco_promocional: null, promocao: false, destaque_dia: false, foto_url: "./assets/hero.jpg", ordem: 10, ativo: true, diario: true },
  { id: 22, dia_semana: "Diário", nome: "Parmegiana de carne", descricao: "Arroz, feijão, fritas e salada.", preco: 42, preco_promocional: null, promocao: false, destaque_dia: false, foto_url: "./assets/hero.jpg", ordem: 11, ativo: true, diario: true },
  { id: 23, dia_semana: "Diário", nome: "Parmegiana de frango", descricao: "Arroz, feijão, fritas e salada.", preco: 40, preco_promocional: null, promocao: false, destaque_dia: false, foto_url: "./assets/hero.jpg", ordem: 12, ativo: true, diario: true },
  { id: 24, dia_semana: "Diário", nome: "Adicional de fritas", descricao: "Porção extra de fritas.", preco: 8, preco_promocional: null, promocao: false, destaque_dia: false, foto_url: "./assets/hero.jpg", ordem: 13, ativo: true, diario: true },
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
  const dailyDishes = [];
  const grouped = rows.reduce((accumulator, item) => {
    if (item.diario) {
      dailyDishes.push({
        id: item.id,
        name: item.nome,
        description: item.descricao || "Sem descrição.",
        price: Number(item.preco || 0),
        salePrice: item.preco_promocional == null ? null : Number(item.preco_promocional),
        isOnSale: Boolean(item.promocao && item.preco_promocional != null),
        isHighlighted: Boolean(item.destaque_dia),
        image: item.foto_url || fallbackPhoto,
        order: item.ordem || 0,
        diario: true,
      });
      return accumulator;
    }

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

  const result = [...grouped.entries()]
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

  if (dailyDishes.length > 0) {
    dailyDishes.sort((a, b) => {
      if (a.isHighlighted !== b.isHighlighted) return Number(b.isHighlighted) - Number(a.isHighlighted);
      if (a.isOnSale !== b.isOnSale) return Number(b.isOnSale) - Number(a.isOnSale);
      return a.order - b.order;
    });
    result.push({ day: "Diário", dishes: dailyDishes });
  }

  return result;
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
      (day) => {
        const isDaily = day.day === "Diário";
        const dayLabel = isDaily ? "Pratos diários" : day.day;
        const dayId = dayLabel.toLowerCase().replace(/\s+/g, "-");
        const kicker = isDaily ? "Disponível todos os dias" : (dayNotes[day.day]?.kicker || "Cardápio do dia");
        const note = isDaily ? "Peça junto com qualquer prato do dia." : (dayNotes[day.day]?.note || "");

        return `
        <section class="menu-day${isDaily ? " menu-day--daily" : ""}" aria-labelledby="${dayId}-title">
          <div class="menu-day__header">
            <p class="menu-day__kicker">${kicker}</p>
            <h2 class="menu-day__title" id="${dayId}-title">${dayLabel}</h2>
            <p class="menu-day__note">${note}</p>
          </div>
          <div class="menu-day__items">
            ${day.dishes
              .map((dish) => {
                const message = `Oi! Quero pedir ${dish.name} de ${day.day === "Diário" ? "hoje" : day.day} no ${restaurantName}.`;
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
                        <span class="menu-card__serving">${isDaily ? "Disponível hoje" : "Prato do dia"}</span>
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
      `;
      }
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

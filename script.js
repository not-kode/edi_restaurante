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
  Segunda: { kicker: "Viradouuu!", note: "Virado a Paulista — clássico de segunda." },
  Terça: { kicker: "Tá com fome? Strogonoff!", note: "Strogonoff de frango fresquinho." },
  Quarta: { kicker: "É dia de FEIJOADA! 🔥", note: "Pequena, média ou grande — escolha a sua." },
  Quinta: { kicker: "Quinta que encanta", note: "Macarrão com frango assado." },
  Sexta: { kicker: "Sextou com peixe!", note: "Peixe frito: merluza ou tilápia." },
  Sábado: { kicker: "Sábado também é FEIJOADA! 🔥", note: "Repeteco de quarta — porque ninguém cansa." },
};

const menuData = [
  { id: 1, dia_semana: "Segunda", nome: "Virado a Paulista", descricao: "Arroz, tutu de feijão, bisteca, calabresa, torresmo, ovo, couve, banana frita.", preco: 40, preco_promocional: null, promocao: false, destaque_dia: true, foto_url: "./assets/hero.jpg", ordem: 1, ativo: true },
  { id: 2, dia_semana: "Terça", nome: "Strogonoff de frango", descricao: "Arroz, batata palha, salada (acompanha: cebola, tomate e alface).", preco: 39, preco_promocional: null, promocao: false, destaque_dia: true, foto_url: "./assets/hero.jpg", ordem: 1, ativo: true },
  { id: 3, dia_semana: "Quarta", nome: "Feijoada", descricao: "Arroz, couve, torresmo, farofa, vinagrete, molho.", preco: 49, preco_promocional: null, promocao: false, destaque_dia: true, foto_url: "./assets/hero.jpg", ordem: 1, ativo: true, variacoes: [{ label: "Pequena", preco: 49 }, { label: "Média", preco: 59, descricao: "com bisteca" }, { label: "Grande", preco: 79, descricao: "2 bistecas" }] },
  { id: 4, dia_semana: "Quinta", nome: "Macarrão com frango assado", descricao: "Macarrão, arroz, frango assado, feijão, salada (acompanha: cebola, tomate e alface).", preco: 39, preco_promocional: null, promocao: false, destaque_dia: true, foto_url: "./assets/hero.jpg", ordem: 1, ativo: true },
  { id: 5, dia_semana: "Sexta", nome: "Filé de Merluza frito", descricao: "Arroz, feijão, purê de batata, salada (acompanha: cebola, tomate e alface).", preco: 39, preco_promocional: null, promocao: false, destaque_dia: true, foto_url: "./assets/hero.jpg", ordem: 1, ativo: true },
  { id: 6, dia_semana: "Sexta", nome: "Tilápia em posta frito", descricao: "Arroz, feijão, purê de batata, salada (acompanha: cebola, tomate e alface).", preco: 39, preco_promocional: null, promocao: false, destaque_dia: false, foto_url: "./assets/hero.jpg", ordem: 2, ativo: true },
  { id: 7, dia_semana: "Sábado", nome: "Feijoada", descricao: "Arroz, couve, torresmo, farofa, vinagrete, molho.", preco: 49, preco_promocional: null, promocao: false, destaque_dia: true, foto_url: "./assets/hero.jpg", ordem: 1, ativo: true, variacoes: [{ label: "Pequena", preco: 49 }, { label: "Média", preco: 59, descricao: "com bisteca" }, { label: "Grande", preco: 79, descricao: "2 bistecas" }] },
  { id: 8, dia_semana: "Diário", nome: "Bife acebolado", descricao: "Arroz, feijão, salada (acompanha: cebola, tomate e alface).", preco: 32, preco_promocional: null, promocao: false, destaque_dia: false, foto_url: "./assets/hero.jpg", ordem: 1, ativo: true, diario: true },
  { id: 9, dia_semana: "Diário", nome: "Filé de frango à milanesa", descricao: "Arroz, feijão, salada (acompanha: cebola, tomate e alface).", preco: 30, preco_promocional: null, promocao: false, destaque_dia: false, foto_url: "./assets/hero.jpg", ordem: 2, ativo: true, diario: true },
  { id: 10, dia_semana: "Diário", nome: "Omelete com presunto e queijo", descricao: "Arroz, feijão, salada (acompanha: cebola, tomate e alface).", preco: 30, preco_promocional: null, promocao: false, destaque_dia: false, foto_url: "./assets/hero.jpg", ordem: 3, ativo: true, diario: true },
  { id: 11, dia_semana: "Diário", nome: "Costela com mandioca", descricao: "Arroz, feijão, salada (acompanha: cebola, tomate e alface).", preco: 32, preco_promocional: null, promocao: false, destaque_dia: false, foto_url: "./assets/hero.jpg", ordem: 4, ativo: true, diario: true },
  { id: 12, dia_semana: "Diário", nome: "Picadinho", descricao: "Arroz, feijão, salada (acompanha: cebola, tomate e alface).", preco: 32, preco_promocional: null, promocao: false, destaque_dia: false, foto_url: "./assets/hero.jpg", ordem: 5, ativo: true, diario: true },
  { id: 13, dia_semana: "Diário", nome: "Bisteca acebolada", descricao: "Arroz, feijão, salada (acompanha: cebola, tomate e alface).", preco: 28, preco_promocional: null, promocao: false, destaque_dia: false, foto_url: "./assets/hero.jpg", ordem: 6, ativo: true, diario: true },
  { id: 14, dia_semana: "Diário", nome: "Frango ao molho", descricao: "Arroz, feijão, salada (acompanha: cebola, tomate e alface).", preco: 28, preco_promocional: null, promocao: false, destaque_dia: false, foto_url: "./assets/hero.jpg", ordem: 7, ativo: true, diario: true },
  { id: 15, dia_semana: "Diário", nome: "Calabresa", descricao: "Arroz, feijão, salada (acompanha: cebola, tomate e alface).", preco: 28, preco_promocional: null, promocao: false, destaque_dia: false, foto_url: "./assets/hero.jpg", ordem: 8, ativo: true, diario: true },
  { id: 16, dia_semana: "Diário", nome: "Bife de fígado acebolado", descricao: "Arroz, feijão, salada (acompanha: cebola, tomate e alface).", preco: 28, preco_promocional: null, promocao: false, destaque_dia: false, foto_url: "./assets/hero.jpg", ordem: 9, ativo: true, diario: true },
  { id: 17, dia_semana: "Diário", nome: "Almôndegas", descricao: "Arroz, feijão, salada (acompanha: cebola, tomate e alface).", preco: 28, preco_promocional: null, promocao: false, destaque_dia: false, foto_url: "./assets/hero.jpg", ordem: 10, ativo: true, diario: true },
  { id: 18, dia_semana: "Diário", nome: "Parmegiana de carne", descricao: "Arroz, feijão, fritas e salada (acompanha: cebola, tomate e alface).", preco: 42, preco_promocional: null, promocao: false, destaque_dia: false, foto_url: "./assets/hero.jpg", ordem: 11, ativo: true, diario: true },
  { id: 19, dia_semana: "Diário", nome: "Parmegiana de frango", descricao: "Arroz, feijão, fritas e salada (acompanha: cebola, tomate e alface).", preco: 40, preco_promocional: null, promocao: false, destaque_dia: false, foto_url: "./assets/hero.jpg", ordem: 12, ativo: true, diario: true },
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

let cart = [];
let toastTimer = null;

function showToast() {
  const toast = document.querySelector("#cart-toast");
  toast.classList.remove("hidden");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    toast.classList.add("hidden");
  }, 3000);
}

const DAY_NAMES = ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"];

function getToday() {
  return DAY_NAMES[new Date().getDay()];
}

function renderDishCard(dish, dayLabel) {
  const id = `${dayLabel}-${dish.id}`;
  const isToday = dayLabel === getToday();
  const isDisabled = !dish.diario && dayLabel !== "hoje" && dayLabel !== getToday();

  if (dish.variacoes?.length) {
    const def = dish.variacoes[0];
    const btns = dish.variacoes.map(
      (v) => `
        <button class="menu-card__variant" type="button" data-id="${id}" data-preco="${v.preco}" data-label="${v.label}" data-name="${dish.name}" data-day="${dayLabel}" ${isDisabled ? "disabled" : ""}>
          ${v.descricao ? `<span class="menu-card__variant-desc">${v.descricao}</span>` : ""}
          <span class="menu-card__variant-row">
            <span class="menu-card__variant-plus">+</span>
            <span class="menu-card__variant-label">${v.label}</span>
            <span class="menu-card__variant-price">${formatPrice(v.preco)}</span>
          </span>
        </button>`
    ).join("");

    return `
      <article class="menu-card menu-card--variants${isDisabled ? " menu-card--disabled" : ""}${isToday ? " menu-card--today" : ""}" data-card-id="${id}">
        <div class="menu-card__photo"><img src="${dish.image}" alt="${dish.name}" onerror="this.src='${fallbackPhoto}'"></div>
        <div class="menu-card__body">
          <h3>${dish.name}</h3>
          <p class="menu-card__description">${dish.description}</p>
          <div class="menu-card__variants">${btns}</div>
          ${isDisabled ? "" : `
          <button class="menu-card__button" data-id="${id}" data-name="${dish.name}" data-preco="${def.preco}" data-label="${def.label}" data-day="${dayLabel}" type="button">
            + Adicionar
          </button>`}
        </div>
      </article>`;
  }

  const p = dish.isOnSale && dish.salePrice != null ? dish.salePrice : dish.price;
  return `
    <article class="menu-card${isDisabled ? " menu-card--disabled" : ""}${isToday ? " menu-card--today" : ""}" data-card-id="${id}">
      <div class="menu-card__photo"><img src="${dish.image}" alt="${dish.name}" onerror="this.src='${fallbackPhoto}'"></div>
      <div class="menu-card__body">
        <h3>${dish.name}</h3>
        <p class="menu-card__description">${dish.description}</p>
        <span class="menu-card__price">${formatPrice(p)}</span>
        ${dish.isOnSale ? `<span class="menu-card__price menu-card__price--old">${formatPrice(dish.price)}</span>` : ""}
        ${isDisabled ? "" : `
        <button class="menu-card__button" data-id="${id}" data-name="${dish.name}" data-preco="${p}" data-label="" data-day="${dayLabel}" type="button">
          + Adicionar
        </button>`}
      </div>
    </article>`;
}

function addToCart(id, name, price, label, dayLabel) {
  const existing = cart.find((item) => item.id === id);
  if (existing) {
    existing.qty++;
  } else {
    cart.push({ id, name, price: Number(price), label, dayLabel, qty: 1 });
  }
  updateCartUI();
  showToast();
}

function removeFromCart(id) {
  const idx = cart.findIndex((item) => item.id === id);
  if (idx >= 0) {
    if (cart[idx].qty > 1) {
      cart[idx].qty--;
    } else {
      cart.splice(idx, 1);
    }
  }
  updateCartUI();
}

function updateCartUI() {
  const count = cart.reduce((sum, item) => sum + item.qty, 0);
  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  document.querySelector("#cart-count").textContent = count;

  const fab = document.querySelector("#cart-fab");
  const drawer = document.querySelector("#cart-drawer");
  const overlay = document.querySelector("#cart-overlay");

  if (count > 0) {
    fab.classList.add("is-visible");
  } else {
    fab.classList.remove("is-visible");
    drawer.classList.add("hidden");
    overlay.classList.add("hidden");
  }

  const itemsEl = document.querySelector("#cart-items");
  itemsEl.innerHTML = cart.map((item) => {
    const label = item.label ? ` (${item.label})` : "";
    const dayInfo = item.dayLabel === "hoje" ? "" : ` — ${item.dayLabel}`;
    return `
      <div class="cart-item">
        <div class="cart-item__info">
          <span class="cart-item__name">${item.name}${label}</span>
          <span class="cart-item__day">${dayInfo}</span>
          <span class="cart-item__price">${formatPrice(item.price * item.qty)}</span>
        </div>
        <div class="cart-item__qty">
          <button class="cart-item__btn" data-action="remove" data-cart-id="${item.id}" type="button">−</button>
          <span>${item.qty}</span>
          <button class="cart-item__btn" data-action="add" data-cart-id="${item.id}" type="button">+</button>
        </div>
      </div>`;
  }).join("");

  document.querySelector("#cart-total").textContent = formatPrice(total);
  document.querySelector("#cart-whatsapp").href = createWhatsappLink(buildWhatsAppMessage());
}

function buildWhatsAppMessage() {
  if (cart.length === 0) return `Oi! Quero saber mais sobre o ${restaurantName}.`;
  let msg = `Oi! Quero pedir no ${restaurantName}:\n\n`;
  cart.forEach((item) => {
    const label = item.label ? ` (${item.label})` : "";
    const dayInfo = item.dayLabel === "hoje" ? "" : ` de ${item.dayLabel}`;
    const qty = item.qty > 1 ? ` (${item.qty}x)` : "";
    msg += `• ${item.name}${label}${dayInfo}${qty} — ${formatPrice(item.price * item.qty)}\n`;
  });
  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  msg += `\nTotal: ${formatPrice(total)}`;
  const obs = document.querySelector("#cart-obs")?.value?.trim();
  if (obs) msg += `\n\nObs.: ${obs}`;
  return msg;
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
    const today = getToday();
    html += '<h2 class="menu-weekly-title">Pratos do dia</h2>';
    html += '<div class="menu-days-row">';
    html += weekly.map((d) => {
      const isToday = d.day === today;
      return `
        <div class="menu-day-column${isToday ? " menu-day-column--today" : ""}">
          <div class="menu-day-column__header">
            <h3 class="menu-day-column__title">${d.day}</h3>
            ${isToday ? '<span class="menu-day-column__badge">Hoje</span>' : ""}
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

function setupCart() {
  document.querySelector("#cart-fab").addEventListener("click", () => {
    document.querySelector("#cart-drawer").classList.remove("hidden");
    document.querySelector("#cart-overlay").classList.remove("hidden");
  });

  document.querySelector("#cart-overlay").addEventListener("click", () => {
    document.querySelector("#cart-drawer").classList.add("hidden");
    document.querySelector("#cart-overlay").classList.add("hidden");
  });

  document.querySelector("#cart-close").addEventListener("click", () => {
    document.querySelector("#cart-drawer").classList.add("hidden");
    document.querySelector("#cart-overlay").classList.add("hidden");
  });

  document.querySelector("#cart-items").addEventListener("click", (e) => {
    const btn = e.target.closest(".cart-item__btn");
    if (!btn) return;
    const id = btn.dataset.cartId;
    if (btn.dataset.action === "add") {
      const item = cart.find((i) => i.id === id);
      if (item) { item.qty++; updateCartUI(); }
    } else {
      removeFromCart(id);
    }
  });

  menuContainer.addEventListener("click", (e) => {
    const btn = e.target.closest(".menu-card__button");
    const variantBtn = e.target.closest(".menu-card__variant");

    if (variantBtn) {
      e.preventDefault();
      const card = variantBtn.closest(".menu-card--variants");
      card.querySelectorAll(".menu-card__variant").forEach((b) => b.classList.remove("is-selected"));
      variantBtn.classList.add("is-selected");

      const buttonEl = card.querySelector(".menu-card__button");
      if (buttonEl) {
        buttonEl.dataset.name = variantBtn.dataset.name;
        buttonEl.dataset.preco = variantBtn.dataset.preco;
        buttonEl.dataset.label = variantBtn.dataset.label;
      }
      return;
    }

    if (btn) {
      e.preventDefault();
      const name = btn.dataset.name;
      const price = btn.dataset.preco;
      const label = btn.dataset.label || "";
      const day = btn.dataset.day || "hoje";
      const id = btn.dataset.id;
      const cartId = label ? `${id}(${label})` : id;
      addToCart(cartId, name, price, label, day);
    }
  });
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
setupCart();
loadMenu();

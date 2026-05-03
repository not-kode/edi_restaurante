const authForm = document.querySelector("#admin-auth-form");
const authSection = document.querySelector("#admin-auth-section");
const passwordInput = document.querySelector("#admin-password");
const adminPanel = document.querySelector("#admin-panel");
const adminStatus = document.querySelector("#admin-status");
const adminList = document.querySelector("#admin-list");
const refreshButton = document.querySelector("#refresh-admin");
const dishForm = document.querySelector("#dish-form");
const formTitle = document.querySelector("#form-title");
const resetFormButton = document.querySelector("#reset-form");

const fields = {
  id: document.querySelector("#dish-id"),
  nome: document.querySelector("#dish-name"),
  descricao: document.querySelector("#dish-description"),
  preco: document.querySelector("#dish-price"),
  preco_promocional: document.querySelector("#dish-sale-price"),
  foto_url: document.querySelector("#dish-photo-url"),
  dia_semana: document.querySelector("#dish-day"),
  ordem: document.querySelector("#dish-order"),
  ativo: document.querySelector("#dish-active"),
  destaque_dia: document.querySelector("#dish-highlight"),
  promocao: document.querySelector("#dish-sale"),
  diario: document.querySelector("#dish-diario"),
};

const photoPreview = document.querySelector("#dish-photo-preview");
const photoPreviewWrapper = document.querySelector(".admin-preview");
const photoUploadZone = document.querySelector("#photo-upload-zone");
const photoFileInput = document.querySelector("#dish-photo-file");
const photoBrowseBtn = document.querySelector("#photo-browse-btn");
const photoUploadProgress = document.querySelector("#photo-upload-progress");
const photoUploadBar = document.querySelector("#photo-upload-bar");

const STORAGE_KEY = "edi-restaurante-pratos";
const PASSWORD_KEY = "edi-admin-senha";
const ADMIN_PASSWORD = "edi2024";
const FEIJOADA_VARIANTS = [
  { label: "Pequena", preco: 49, descricao: "1 bisteca" },
  { label: "Média", preco: 59, descricao: "1 bisteca" },
  { label: "Grande", preco: 79, descricao: "2 bistecas" },
];
const updatedDishPhotos = {
  "Virado a Paulista": "./fotos/Virado a Paulista.png",
  "Strogonoff de frango": "./fotos/Strogonoff de Frango.png",
  Feijoada: "./fotos/Feijoada.png",
  "Macarrão com frango assado": "./fotos/Macarrão com frango assado.png",
  "Filé de Merluza frito": "./fotos/Filé de Merluza Frito.png",
  "Tilápia em posta frito": "./fotos/Tilápia em posta frito.png",
  "Bife acebolado": "./fotos/Bife acebolado.png",
  "Filé de frango à milanesa": "./fotos/Filé de frango à milanesa.png",
  "Omelete com presunto e queijo": "./fotos/Omelete com presunto e queijo.png",
  "Costela com mandioca": "./fotos/Costela com mandioca.png",
  "Picadinho": "./fotos/Picadinho.png",
  "Bisteca acebolada": "./fotos/Bisteca acebolada.png",
  "Frango ao molho": "./fotos/Frango ao molho.png",
  "Calabresa": "./fotos/Calabresa.png",
  "Bife de fígado acebolado": "./fotos/Bife de fígado acebolado.png",
  "Almôndegas": "./fotos/Almôndegas.png",
  "Parmegiana de carne": "./fotos/Parmegiana de carne.png",
  "Parmegiana de frango": "./fotos/Parmegiana de frango.png",
};

const DEFAULT_DISHES = [
  { id: 1, dia_semana: "Segunda", nome: "Virado a Paulista", descricao: "Arroz, tutu de feijão, bisteca, calabresa, torresmo, ovo, couve, banana frita.", preco: 40, preco_promocional: null, promocao: false, destaque_dia: true, foto_url: "./fotos/Virado a Paulista.png", ordem: 1, ativo: true },
  { id: 2, dia_semana: "Terça", nome: "Strogonoff de frango", descricao: "Arroz, batata palha, salada (acompanha: cebola, tomate e alface).", preco: 39, preco_promocional: null, promocao: false, destaque_dia: true, foto_url: "./fotos/Strogonoff de Frango.png", ordem: 1, ativo: true },
  { id: 3, dia_semana: "Quarta", nome: "Feijoada", descricao: "Arroz, couve, torresmo, farofa, vinagrete, molho.", preco: 49, preco_promocional: null, promocao: false, destaque_dia: true, foto_url: "./fotos/Feijoada.png", ordem: 1, ativo: true, variacoes: FEIJOADA_VARIANTS },
  { id: 4, dia_semana: "Quinta", nome: "Macarrão com frango assado", descricao: "Macarrão, arroz, frango assado, feijão, salada (acompanha: cebola, tomate e alface).", preco: 39, preco_promocional: null, promocao: false, destaque_dia: true, foto_url: "./fotos/Macarrão com frango assado.png", ordem: 1, ativo: true },
  { id: 5, dia_semana: "Sexta", nome: "Filé de Merluza frito", descricao: "Arroz, feijão, purê de batata, salada (acompanha: cebola, tomate e alface).", preco: 39, preco_promocional: null, promocao: false, destaque_dia: true, foto_url: "./fotos/Filé de Merluza Frito.png", ordem: 1, ativo: true },
  { id: 6, dia_semana: "Sexta", nome: "Tilápia em posta frito", descricao: "Arroz, feijão, purê de batata, salada (acompanha: cebola, tomate e alface).", preco: 39, preco_promocional: null, promocao: false, destaque_dia: false, foto_url: "./fotos/Tilápia em posta frito.png", ordem: 2, ativo: true },
  { id: 7, dia_semana: "Sábado", nome: "Feijoada", descricao: "Arroz, couve, torresmo, farofa, vinagrete, molho.", preco: 49, preco_promocional: null, promocao: false, destaque_dia: true, foto_url: "./fotos/Feijoada.png", ordem: 1, ativo: true, variacoes: FEIJOADA_VARIANTS },
  { id: 8, dia_semana: "Diário", nome: "Bife acebolado", descricao: "Arroz, feijão, salada (acompanha: cebola, tomate e alface).", preco: 32, preco_promocional: null, promocao: false, destaque_dia: false, foto_url: "./fotos/Bife acebolado.png", ordem: 1, ativo: true, diario: true },
  { id: 9, dia_semana: "Diário", nome: "Filé de frango à milanesa", descricao: "Arroz, feijão, salada (acompanha: cebola, tomate e alface).", preco: 30, preco_promocional: null, promocao: false, destaque_dia: false, foto_url: "./fotos/Filé de frango à milanesa.png", ordem: 2, ativo: true, diario: true },
  { id: 10, dia_semana: "Diário", nome: "Omelete com presunto e queijo", descricao: "Arroz, feijão, salada (acompanha: cebola, tomate e alface).", preco: 30, preco_promocional: null, promocao: false, destaque_dia: false, foto_url: "./fotos/Omelete com presunto e queijo.png", ordem: 3, ativo: true, diario: true },
  { id: 11, dia_semana: "Diário", nome: "Costela com mandioca", descricao: "Arroz, feijão, salada (acompanha: cebola, tomate e alface).", preco: 32, preco_promocional: null, promocao: false, destaque_dia: false, foto_url: "./fotos/Costela com mandioca.png", ordem: 4, ativo: true, diario: true },
  { id: 12, dia_semana: "Diário", nome: "Picadinho", descricao: "Arroz, feijão, salada (acompanha: cebola, tomate e alface).", preco: 32, preco_promocional: null, promocao: false, destaque_dia: false, foto_url: "./fotos/Picadinho.png", ordem: 5, ativo: true, diario: true },
  { id: 13, dia_semana: "Diário", nome: "Bisteca acebolada", descricao: "Arroz, feijão, salada (acompanha: cebola, tomate e alface).", preco: 28, preco_promocional: null, promocao: false, destaque_dia: false, foto_url: "./fotos/Bisteca acebolada.png", ordem: 6, ativo: true, diario: true },
  { id: 14, dia_semana: "Diário", nome: "Frango ao molho", descricao: "Arroz, feijão, salada (acompanha: cebola, tomate e alface).", preco: 28, preco_promocional: null, promocao: false, destaque_dia: false, foto_url: "./fotos/Frango ao molho.png", ordem: 7, ativo: true, diario: true },
  { id: 15, dia_semana: "Diário", nome: "Calabresa", descricao: "Arroz, feijão, salada (acompanha: cebola, tomate e alface).", preco: 28, preco_promocional: null, promocao: false, destaque_dia: false, foto_url: "./fotos/Calabresa.png", ordem: 8, ativo: true, diario: true },
  { id: 16, dia_semana: "Diário", nome: "Bife de fígado acebolado", descricao: "Arroz, feijão, salada (acompanha: cebola, tomate e alface).", preco: 28, preco_promocional: null, promocao: false, destaque_dia: false, foto_url: "./fotos/Bife de fígado acebolado.png", ordem: 9, ativo: true, diario: true },
  { id: 17, dia_semana: "Diário", nome: "Almôndegas", descricao: "Arroz, feijão, salada (acompanha: cebola, tomate e alface).", preco: 28, preco_promocional: null, promocao: false, destaque_dia: false, foto_url: "./fotos/Almôndegas.png", ordem: 10, ativo: true, diario: true },
  { id: 18, dia_semana: "Diário", nome: "Parmegiana de carne", descricao: "Arroz, feijão, fritas e salada (acompanha: cebola, tomate e alface).", preco: 42, preco_promocional: null, promocao: false, destaque_dia: false, foto_url: "./fotos/Parmegiana de carne.png", ordem: 11, ativo: true, diario: true },
  { id: 19, dia_semana: "Diário", nome: "Parmegiana de frango", descricao: "Arroz, feijão, fritas e salada (acompanha: cebola, tomate e alface).", preco: 40, preco_promocional: null, promocao: false, destaque_dia: false, foto_url: "./fotos/Parmegiana de frango.png", ordem: 12, ativo: true, diario: true },
  { id: 20, dia_semana: "Diário", nome: "Adicional de fritas", descricao: "Porção extra de fritas.", preco: 8, preco_promocional: null, promocao: false, destaque_dia: false, foto_url: "./fotos/Batata frita.png", ordem: 13, ativo: true, diario: true },
];

let dishes = [];
let nextId = 1;

function applyUpdatedDishPhotos(items) {
  return items.map((item) => {
    const updatedPhoto = updatedDishPhotos[item.nome];
    const next = updatedPhoto ? { ...item, foto_url: updatedPhoto } : { ...item };
    if (next.nome === "Feijoada") {
      next.variacoes = FEIJOADA_VARIANTS;
    }
    return next;
  });
}

function showAdminPanel() {
  authSection.classList.add("hidden");
  adminPanel.classList.remove("hidden");
}

function setStatus(message, type = "info") {
  adminStatus.textContent = message;
  adminStatus.className = `menu-status is-${type}`;
}

function clearStatus() {
  adminStatus.textContent = "";
  adminStatus.className = "menu-status";
}

function formatPrice(value) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(Number(value || 0));
}

function loadDishes() {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) {
    dishes = applyUpdatedDishPhotos(JSON.parse(stored));
  } else {
    dishes = applyUpdatedDishPhotos(JSON.parse(JSON.stringify(DEFAULT_DISHES)));
    saveDishes();
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(dishes));
  if (dishes.length > 0) {
    nextId = Math.max(...dishes.map((d) => d.id)) + 1;
  }
  exportDishesToSite();
}

function saveDishes() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(dishes));
  exportDishesToSite();
}

function exportDishesToSite() {
  const script = document.createElement("script");
  script.textContent = `
    (function() {
      var data = ${JSON.stringify(dishes)};
      localStorage.setItem("${STORAGE_KEY}", JSON.stringify(data));
      window.dispatchEvent(new CustomEvent("menu-updated", { detail: data }));
      if (document.querySelector("#menu-container") && document.querySelector("#menu-container").innerHTML !== "") {
        var event = new Event("menurefresh");
        document.dispatchEvent(event);
      }
    })();
  `;
  document.head.appendChild(script);
  script.remove();
}

function fetchAdminMenu() {
  loadDishes();
  renderDishList();
  clearStatus();
}

function renderDishList() {
  if (!dishes.length) {
    adminList.innerHTML = `
      <div class="admin-list__empty">
        <p>Nenhuma marmita cadastrada ainda.</p>
      </div>
    `;
    return;
  }

  const dayOrder = ["Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado", "Domingo"];

  const sorted = [...dishes].sort((a, b) => {
    const dayDiff = dayOrder.indexOf(a.dia_semana) - dayOrder.indexOf(b.dia_semana);
    if (dayDiff !== 0) return dayDiff;
    if (a.destaque_dia !== b.destaque_dia) return Number(b.destaque_dia) - Number(a.destaque_dia);
    return (a.ordem || 0) - (b.ordem || 0);
  });

  adminList.innerHTML = sorted
    .map(
      (dish) => `
        <article class="admin-list__item">
          <div class="admin-list__visual">
            <img class="admin-list__thumb" src="${dish.foto_url || "./assets/hero.jpg"}" alt="${dish.nome}" onerror="this.src='./assets/hero.jpg'" />
          </div>
          <div class="admin-list__content">
            <p class="admin-list__eyebrow">${dish.dia_semana}</p>
            <h3>${dish.nome}</h3>
            <p>${dish.descricao || "Sem descrição."}</p>
            <div class="admin-list__meta">
              <span>${formatPrice(dish.preco)}</span>
              ${dish.promocao && dish.preco_promocional ? `<span>Promo: ${formatPrice(dish.preco_promocional)}</span>` : ""}
              ${dish.destaque_dia ? "<span>Destaque</span>" : ""}
              ${!dish.ativo ? "<span>Inativo</span>" : ""}
            </div>
          </div>
          <div class="admin-list__actions">
            <button class="admin-secondary-button" type="button" data-action="edit" data-id="${dish.id}">
              Editar
            </button>
            <button class="admin-danger-button" type="button" data-action="delete" data-id="${dish.id}">
              Excluir
            </button>
          </div>
        </article>
      `
    )
    .join("");
}

function updatePhotoPreview() {
  const url = fields.foto_url.value;
  if (url) {
    photoPreview.src = url;
    photoPreviewWrapper.classList.add("is-visible");
  } else {
    photoPreview.src = "";
    photoPreviewWrapper.classList.remove("is-visible");
  }
}

function resetUploadState() {
  photoFileInput.value = "";
  photoUploadProgress.classList.remove("is-active");
  photoUploadBar.style.width = "0%";
  photoUploadZone.classList.remove("is-uploading");
}

function handleFileSelect(file) {
  if (!file || !file.type.startsWith("image/")) {
    setStatus("Selecione um arquivo de imagem valido.", "error");
    return;
  }

  const maxSize = 5 * 1024 * 1024;
  if (file.size > maxSize) {
    setStatus("A imagem deve ter no maximo 5 MB.", "error");
    return;
  }

  photoUploadZone.classList.add("is-uploading");
  photoUploadProgress.classList.add("is-active");
  photoUploadBar.style.width = "50%";

  const reader = new FileReader();
  reader.onload = () => {
    photoUploadBar.style.width = "100%";
    fields.foto_url.value = reader.result;
    updatePhotoPreview();
    setStatus("Foto carregada com sucesso.", "success");

    setTimeout(() => {
      resetUploadState();
    }, 800);
  };
  reader.onerror = () => {
    resetUploadState();
    setStatus("Erro ao carregar a foto.", "error");
  };
  reader.readAsDataURL(file);
}

function resetForm() {
  dishForm.reset();
  fields.id.value = "";
  fields.ordem.value = "0";
  fields.ativo.checked = true;
  formTitle.textContent = "Nova marmita";
  updatePhotoPreview();
  resetUploadState();
}

function fillForm(dish) {
  fields.id.value = dish.id || "";
  fields.nome.value = dish.nome || "";
  fields.descricao.value = dish.descricao || "";
  fields.preco.value = dish.preco ?? "";
  fields.preco_promocional.value = dish.preco_promocional ?? "";
  fields.foto_url.value = dish.foto_url || "";
  fields.dia_semana.value = dish.dia_semana || "";
  fields.ordem.value = dish.ordem ?? 0;
  fields.ativo.checked = Boolean(dish.ativo);
  fields.destaque_dia.checked = Boolean(dish.destaque_dia);
  fields.promocao.checked = Boolean(dish.promocao);
  fields.diario.checked = Boolean(dish.diario);
  formTitle.textContent = `Editando: ${dish.nome}`;
  updatePhotoPreview();
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function saveDish(event) {
  event.preventDefault();

  const payload = {
    id: fields.id.value ? Number(fields.id.value) : nextId,
    nome: fields.nome.value.trim(),
    descricao: fields.descricao.value.trim(),
    preco: Number(fields.preco.value),
    preco_promocional: fields.preco_promocional.value ? Number(fields.preco_promocional.value) : null,
    foto_url: fields.foto_url.value || null,
    dia_semana: fields.dia_semana.value,
    ordem: Number(fields.ordem.value),
    ativo: fields.ativo.checked,
    destaque_dia: fields.destaque_dia.checked,
    promocao: fields.promocao.checked,
    diario: fields.diario.checked,
  };

  if (!payload.nome || !payload.dia_semana || isNaN(payload.preco)) {
    setStatus("Nome, dia da semana e preco sao obrigatorios.", "error");
    return;
  }

  const existingIndex = dishes.findIndex((d) => d.id === payload.id);

  if (existingIndex >= 0) {
    dishes[existingIndex] = payload;
  } else {
    dishes.push(payload);
    nextId++;
  }

  saveDishes();
  resetForm();
  renderDishList();
  setStatus("Marmita salva com sucesso.", "success");
}

function deleteDish(id) {
  const confirmed = window.confirm("Excluir esta marmita?");

  if (!confirmed) return;

  dishes = dishes.filter((d) => d.id !== id);
  saveDishes();
  resetForm();
  renderDishList();
  setStatus("Marmita excluida.", "success");
}

authForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const senha = passwordInput.value;

  if (senha !== ADMIN_PASSWORD) {
    setStatus("Senha incorreta.", "error");
    return;
  }

  sessionStorage.setItem(PASSWORD_KEY, senha);
  showAdminPanel();
  fetchAdminMenu();
});

refreshButton.addEventListener("click", fetchAdminMenu);
dishForm.addEventListener("submit", saveDish);
resetFormButton.addEventListener("click", resetForm);
fields.foto_url.addEventListener("input", updatePhotoPreview);

fields.diario.addEventListener("change", () => {
  if (fields.diario.checked) {
    fields.dia_semana.value = "Diário";
  }
});

fields.dia_semana.addEventListener("change", () => {
  if (fields.dia_semana.value !== "Diário") {
    fields.diario.checked = false;
  }
});

photoBrowseBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  photoFileInput.click();
});

photoUploadZone.addEventListener("click", () => {
  photoFileInput.click();
});

photoFileInput.addEventListener("change", (e) => {
  const file = e.target.files[0];
  if (file) handleFileSelect(file);
});

photoUploadZone.addEventListener("dragover", (e) => {
  e.preventDefault();
  photoUploadZone.classList.add("is-dragover");
});

photoUploadZone.addEventListener("dragleave", () => {
  photoUploadZone.classList.remove("is-dragover");
});

photoUploadZone.addEventListener("drop", (e) => {
  e.preventDefault();
  photoUploadZone.classList.remove("is-dragover");
  const file = e.dataTransfer.files[0];
  if (file) handleFileSelect(file);
});

adminList.addEventListener("click", (event) => {
  const button = event.target.closest("button[data-action]");

  if (!button) return;

  const id = Number(button.dataset.id);
  const dish = dishes.find((item) => item.id === id);
  if (!dish) return;

  if (button.dataset.action === "edit") {
    fillForm(dish);
  }

  if (button.dataset.action === "delete") {
    deleteDish(dish.id);
  }
});

const storedPassword = sessionStorage.getItem(PASSWORD_KEY);
if (storedPassword === ADMIN_PASSWORD) {
  passwordInput.value = storedPassword;
  showAdminPanel();
  loadDishes();
  renderDishList();
}

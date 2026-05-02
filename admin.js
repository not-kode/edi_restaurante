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

let dishes = [];
let nextId = 1;

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
    dishes = JSON.parse(stored);
  }
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

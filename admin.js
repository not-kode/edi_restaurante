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

let adminPassword = sessionStorage.getItem("admin-password") || "";
let dishes = [];

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

function getHeaders() {
  return {
    "Content-Type": "application/json",
    "x-admin-password": adminPassword,
  };
}

async function fetchAdminMenu() {
  if (!adminPassword) return;

  setStatus("Carregando marmitas...", "loading");

  try {
    const response = await fetch("/api/admin/menu", {
      headers: {
        "x-admin-password": adminPassword,
      },
    });

    const payload = await response.json();

    if (!response.ok) {
      throw new Error(payload.error || "Falha ao carregar o painel.");
    }

    dishes = payload.items || [];
    renderDishList();
    clearStatus();
  } catch (error) {
    setStatus(error.message, "error");
  }
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

  adminList.innerHTML = dishes
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
  const url = fields.foto_url.value.trim();
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

function readFileAsBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result.split(",")[1]);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

async function uploadPhoto(file) {
  if (!file) return;

  const maxSize = 5 * 1024 * 1024;
  if (file.size > maxSize) {
    setStatus("A imagem deve ter no maximo 5 MB.", "error");
    return;
  }

  photoUploadZone.classList.add("is-uploading");
  photoUploadProgress.classList.add("is-active");
  photoUploadBar.style.width = "30%";

  try {
    const base64 = await readFileAsBase64(file);
    photoUploadBar.style.width = "60%";

    const response = await fetch("/api/admin/upload", {
      method: "POST",
      headers: getHeaders(),
      body: JSON.stringify({
        filename: file.name,
        contentType: file.type,
        base64,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Falha no upload.");
    }

    photoUploadBar.style.width = "100%";

    fields.foto_url.value = data.url;
    updatePhotoPreview();
    setStatus("Foto enviada com sucesso.", "success");

    setTimeout(() => {
      resetUploadState();
    }, 800);
  } catch (error) {
    resetUploadState();
    setStatus(error.message, "error");
  }
}

function handleFileSelect(file) {
  if (!file || !file.type.startsWith("image/")) {
    setStatus("Selecione um arquivo de imagem valido.", "error");
    return;
  }
  uploadPhoto(file);
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

async function saveDish(event) {
  event.preventDefault();

  const payload = {
    id: fields.id.value || null,
    nome: fields.nome.value.trim(),
    descricao: fields.descricao.value.trim(),
    preco: fields.preco.value,
    preco_promocional: fields.preco_promocional.value,
    foto_url: fields.foto_url.value.trim(),
    dia_semana: fields.dia_semana.value,
    ordem: fields.ordem.value,
    ativo: fields.ativo.checked,
    destaque_dia: fields.destaque_dia.checked,
    promocao: fields.promocao.checked,
  };

  setStatus("Salvando marmita...", "loading");

  try {
    const response = await fetch("/api/admin/menu", {
      method: "POST",
      headers: getHeaders(),
      body: JSON.stringify(payload),
    });
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Nao foi possivel salvar.");
    }

    resetForm();
    setStatus("Marmita salva com sucesso.", "success");
    await fetchAdminMenu();
  } catch (error) {
    setStatus(error.message, "error");
  }
}

async function deleteDish(id) {
  const confirmed = window.confirm("Excluir esta marmita?");

  if (!confirmed) return;

  setStatus("Excluindo marmita...", "loading");

  try {
    const response = await fetch(`/api/admin/menu?id=${encodeURIComponent(id)}`, {
      method: "DELETE",
      headers: {
        "x-admin-password": adminPassword,
      },
    });
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Nao foi possivel excluir.");
    }

    setStatus("Marmita excluida.", "success");
    resetForm();
    await fetchAdminMenu();
  } catch (error) {
    setStatus(error.message, "error");
  }
}

authForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  adminPassword = passwordInput.value;
  sessionStorage.setItem("admin-password", adminPassword);
  showAdminPanel();
  await fetchAdminMenu();
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

  const dish = dishes.find((item) => item.id === button.dataset.id);
  if (!dish) return;

  if (button.dataset.action === "edit") {
    fillForm(dish);
  }

  if (button.dataset.action === "delete") {
    deleteDish(dish.id);
  }
});

if (adminPassword) {
  passwordInput.value = adminPassword;
  showAdminPanel();
  fetchAdminMenu();
}

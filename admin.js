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
const dayTagColors = {
  Segunda: { bg: "#fef3c7", text: "#92400e" },
  Terça:  { bg: "#cffafe", text: "#155e75" },
  Quarta:  { bg: "#ede9fe", text: "#6d28d9" },
  Quinta:  { bg: "#d1fae5", text: "#065f46" },
  Sexta:   { bg: "#fce7f3", text: "#be185d" },
  Sábado:  { bg: "#ffedd5", text: "#c2410c" },
};
const ADMIN_PASSWORD = "edi2024";
const FEIJOADA_VARIANTS = [
  { label: "Pequena", preco: 49, descricao: "1 bisteca" },
  { label: "Média", preco: 59, descricao: "1 bisteca" },
  { label: "Grande", preco: 79, descricao: "2 bistecas" },
];
const updatedDishPhotos = {
  "Virado a Paulista": "./fotos/Virado a Paulista.png",
  "Strogonoff de frango": "./fotos/Strogonoff de Frango.jpg",
  Feijoada: "./fotos/Feijoada.jpg",
  "Macarrão com frango assado": "./fotos/Macarrao com frango assado.jpg",
  "Macarrão com almôndegas": "./fotos/Macarrao com frango assado.jpg",
  "Macarrão com frango ao molho": "./fotos/Macarrao com frango assado.jpg",
  "Filé de Merluza frito": "./fotos/File de Merluza Frito.jpg",
  "Tilápia em posta frito": "./fotos/Tilapia em posta frito.jpg",
  "Bife acebolado": "./fotos/Bife acebolado.jpg",
  "Filé de frango à milanesa": "./fotos/File de frango a milanesa.jpg",
  "Omelete com presunto e queijo": "./fotos/Omelete com presunto e queijo.jpg",
  "Costela com mandioca": "./fotos/Costela com mandioca.jpg",
  "Picadinho": "./fotos/Picadinho.jpg",
  "Bisteca acebolada": "./fotos/Bisteca acebolada.jpg",
  "Frango ao molho": "./fotos/Frango ao molho.jpg",
  "Calabresa": "./fotos/Calabresa.jpg",
  "Bife de fígado acebolado": "./fotos/Bife de figado acebolado.jpg",
  "Almôndegas": "./fotos/Almondegas.jpg",
  "Parmegiana de carne": "./fotos/Parmegiana de carne.jpg",
  "Parmegiana de frango": "./fotos/Parmegiana de frango.jpeg",
  "Adicional de fritas": "./fotos/Batata frita.jpg",
};

const DEFAULT_DISHES = [
  { id: 1, dia_semana: "Segunda", nome: "Virado a Paulista", descricao: "Arroz, tutu de feijão, bisteca, calabresa, torresmo, ovo, couve, banana frita.", preco: 40, preco_promocional: null, promocao: false, destaque_dia: true, foto_url: "./fotos/Virado a Paulista.png", ordem: 1, ativo: true },
  { id: 2, dia_semana: "Terça", nome: "Strogonoff de frango", descricao: "Arroz, batata palha, salada (acompanha: cebola, tomate e alface).", preco: 39, preco_promocional: null, promocao: false, destaque_dia: true, foto_url: "./fotos/Strogonoff de Frango.jpg", ordem: 1, ativo: true },
  { id: 3, dia_semana: "Quarta", nome: "Feijoada", descricao: "Arroz, couve, torresmo, farofa, vinagrete, molho.", preco: 49, preco_promocional: null, promocao: false, destaque_dia: true, foto_url: "./fotos/Feijoada.jpg", ordem: 1, ativo: true, variacoes: FEIJOADA_VARIANTS },
  { id: 4, dia_semana: "Quinta", nome: "Macarrão com frango assado", descricao: "Macarrão, arroz, frango assado, feijão, salada (acompanha: cebola, tomate e alface).", preco: 39, preco_promocional: null, promocao: false, destaque_dia: true, foto_url: "./fotos/Macarrao com frango assado.jpg", ordem: 1, ativo: true },
  { id: 21, dia_semana: "Quinta", nome: "Macarrão com almôndegas", descricao: "Macarrão, arroz, almôndegas, feijão, salada (acompanha: cebola, tomate e alface).", preco: 39, preco_promocional: null, promocao: false, destaque_dia: false, foto_url: "./fotos/Macarrao com frango assado.jpg", ordem: 2, ativo: true },
  { id: 22, dia_semana: "Quinta", nome: "Macarrão com frango ao molho", descricao: "Macarrão, arroz, frango ao molho, feijão, salada (acompanha: cebola, tomate e alface).", preco: 39, preco_promocional: null, promocao: false, destaque_dia: false, foto_url: "./fotos/Macarrao com frango assado.jpg", ordem: 3, ativo: true },
  { id: 5, dia_semana: "Sexta", nome: "Filé de Merluza frito", descricao: "Arroz, feijão, purê de batata, salada (acompanha: cebola, tomate e alface).", preco: 39, preco_promocional: null, promocao: false, destaque_dia: true, foto_url: "./fotos/File de Merluza Frito.jpg", ordem: 1, ativo: true },
  { id: 6, dia_semana: "Sexta", nome: "Tilápia em posta frito", descricao: "Arroz, feijão, purê de batata, salada (acompanha: cebola, tomate e alface).", preco: 39, preco_promocional: null, promocao: false, destaque_dia: false, foto_url: "./fotos/Tilapia em posta frito.jpg", ordem: 2, ativo: true },
  { id: 7, dia_semana: "Sábado", nome: "Feijoada", descricao: "Arroz, couve, torresmo, farofa, vinagrete, molho.", preco: 49, preco_promocional: null, promocao: false, destaque_dia: true, foto_url: "./fotos/Feijoada.jpg", ordem: 1, ativo: true, variacoes: FEIJOADA_VARIANTS },
  { id: 8, dia_semana: "Diário", nome: "Bife acebolado", descricao: "Arroz, feijão, salada (acompanha: cebola, tomate e alface).", preco: 32, preco_promocional: null, promocao: false, destaque_dia: false, foto_url: "./fotos/Bife acebolado.jpg", ordem: 1, ativo: true, diario: true },
  { id: 9, dia_semana: "Diário", nome: "Filé de frango à milanesa", descricao: "Arroz, feijão, salada (acompanha: cebola, tomate e alface).", preco: 30, preco_promocional: null, promocao: false, destaque_dia: false, foto_url: "./fotos/File de frango a milanesa.jpg", ordem: 2, ativo: true, diario: true },
  { id: 10, dia_semana: "Diário", nome: "Omelete com presunto e queijo", descricao: "Arroz, feijão, salada (acompanha: cebola, tomate e alface).", preco: 30, preco_promocional: null, promocao: false, destaque_dia: false, foto_url: "./fotos/Omelete com presunto e queijo.jpg", ordem: 3, ativo: true, diario: true },
  { id: 11, dia_semana: "Diário", nome: "Costela com mandioca", descricao: "Arroz, feijão, salada (acompanha: cebola, tomate e alface).", preco: 32, preco_promocional: null, promocao: false, destaque_dia: false, foto_url: "./fotos/Costela com mandioca.jpg", ordem: 4, ativo: true, diario: true },
  { id: 12, dia_semana: "Diário", nome: "Picadinho", descricao: "Arroz, feijão, salada (acompanha: cebola, tomate e alface).", preco: 32, preco_promocional: null, promocao: false, destaque_dia: false, foto_url: "./fotos/Picadinho.jpg", ordem: 5, ativo: true, diario: true },
  { id: 13, dia_semana: "Diário", nome: "Bisteca acebolada", descricao: "Arroz, feijão, salada (acompanha: cebola, tomate e alface).", preco: 28, preco_promocional: null, promocao: false, destaque_dia: false, foto_url: "./fotos/Bisteca acebolada.jpg", ordem: 6, ativo: true, diario: true },
  { id: 14, dia_semana: "Diário", nome: "Frango ao molho", descricao: "Arroz, feijão, salada (acompanha: cebola, tomate e alface).", preco: 28, preco_promocional: null, promocao: false, destaque_dia: false, foto_url: "./fotos/Frango ao molho.jpg", ordem: 7, ativo: true, diario: true },
  { id: 15, dia_semana: "Diário", nome: "Calabresa", descricao: "Arroz, feijão, salada (acompanha: cebola, tomate e alface).", preco: 28, preco_promocional: null, promocao: false, destaque_dia: false, foto_url: "./fotos/Calabresa.jpg", ordem: 8, ativo: true, diario: true },
  { id: 16, dia_semana: "Diário", nome: "Bife de fígado acebolado", descricao: "Arroz, feijão, salada (acompanha: cebola, tomate e alface).", preco: 28, preco_promocional: null, promocao: false, destaque_dia: false, foto_url: "./fotos/Bife de figado acebolado.jpg", ordem: 9, ativo: true, diario: true },
  { id: 17, dia_semana: "Diário", nome: "Almôndegas", descricao: "Arroz, feijão, salada (acompanha: cebola, tomate e alface).", preco: 28, preco_promocional: null, promocao: false, destaque_dia: false, foto_url: "./fotos/Almondegas.jpg", ordem: 10, ativo: true, diario: true },
  { id: 18, dia_semana: "Diário", nome: "Parmegiana de carne", descricao: "Arroz, feijão, fritas e salada (acompanha: cebola, tomate e alface).", preco: 42, preco_promocional: null, promocao: false, destaque_dia: false, foto_url: "./fotos/Parmegiana de carne.jpg", ordem: 11, ativo: true, diario: true },
  { id: 19, dia_semana: "Diário", nome: "Parmegiana de frango", descricao: "Arroz, feijão, fritas e salada (acompanha: cebola, tomate e alface).", preco: 40, preco_promocional: null, promocao: false, destaque_dia: false, foto_url: "./fotos/Parmegiana de frango.jpeg", ordem: 12, ativo: true, diario: true },
  { id: 20, dia_semana: "Diário", nome: "Adicional de fritas", descricao: "Porção extra de fritas.", preco: 8, preco_promocional: null, promocao: false, destaque_dia: false, foto_url: "./fotos/Batata frita.jpg", ordem: 13, ativo: true, diario: true },
];

let dishes = [];
let nextId = 1;

function applyUpdatedDishPhotos(items) {
  return items.map((item) => {
    const updatedPhoto = updatedDishPhotos[item.nome];
    const next = { ...item };
    if (updatedPhoto && item.foto_url === updatedPhoto) {
      next.foto_url = updatedPhoto;
    }
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
  let storedDishes = [];
  
  if (stored) {
    try {
      storedDishes = JSON.parse(stored);
    } catch (e) {
      storedDishes = [];
    }
  }
  
  // Garante que todos os pratos do DEFAULT_DISHES existam (força atualização)
  dishes = [];
  DEFAULT_DISHES.forEach(def => {
    const existing = storedDishes.find(d => Number(d.id) === Number(def.id));
    if (existing) {
      // Mantém dados personalizados (como foto_url), mas garante que todos os campos existam
      dishes.push({...def, ...existing});
    } else {
      dishes.push({...def});
    }
  });
  
  // Aplica variacoes para Feijoada
  dishes = dishes.map(item => {
    if (item.nome === "Feijoada") {
      return { ...item, variacoes: FEIJOADA_VARIANTS };
    }
    return item;
  });
  
  localStorage.setItem(STORAGE_KEY, JSON.stringify(dishes));
  nextId = Math.max(...dishes.map(d => Number(d.id)), 0) + 1;
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
      <tr><td colspan="7" class="admin-table__empty">Nenhuma marmita cadastrada ainda.</td></tr>
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
        <tr>
          <td>
            <img class="admin-table__photo" src="${dish.foto_url || "./assets/hero.jpg"}" alt="${dish.nome}" onerror="this.src='./assets/hero.jpg'" />
          </td>
          <td><span class="admin-table__name">${dish.nome}</span></td>
          <td><span class="admin-table__day" style="background:${(dayTagColors[dish.dia_semana] || {bg:"#efe7e2",text:"#3b1f16"}).bg};color:${(dayTagColors[dish.dia_semana] || {bg:"#efe7e2",text:"#3b1f16"}).text}">${dish.dia_semana}</span></td>
          <td><span class="admin-table__price">${formatPrice(dish.preco)}</span></td>
          <td><span class="admin-table__badge ${dish.destaque_dia ? 'admin-table__badge--yes' : 'admin-table__badge--no'}">${dish.destaque_dia ? 'Sim' : 'Não'}</span></td>
          <td><span class="admin-table__badge ${dish.ativo ? 'admin-table__badge--yes' : 'admin-table__badge--no'}">${dish.ativo ? 'Sim' : 'Não'}</span></td>
          <td>
            <div class="admin-table__actions">
              <button class="admin-table__btn" type="button" data-action="edit" data-id="${dish.id}">Editar</button>
              <button class="admin-table__btn admin-table__btn--danger" type="button" data-action="delete" data-id="${dish.id}">Excluir</button>
            </div>
          </td>
        </tr>
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

function openDrawer() {
  document.querySelector("#admin-drawer").classList.remove("hidden");
  document.querySelector("#admin-drawer-overlay").classList.remove("hidden");
}

function closeDrawer() {
  document.querySelector("#admin-drawer").classList.add("hidden");
  document.querySelector("#admin-drawer-overlay").classList.add("hidden");
  resetForm();
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
  formTitle.textContent = `Editar: ${dish.nome}`;
  updatePhotoPreview();
  openDrawer();
}

function saveDish(event) {
  event.preventDefault();
  
  try {
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

    setStatus("Salvando prato ID: " + payload.id + "...", "info");
    
    const existingIndex = dishes.findIndex((d) => Number(d.id) === Number(payload.id));
    
    if (existingIndex >= 0) {
      dishes[existingIndex] = payload;
      setStatus("Marmita atualizada (ID: " + payload.id + ")", "success");
    } else {
      dishes.push(payload);
      nextId = Math.max(nextId, payload.id + 1);
      setStatus("Nova marmita salva (ID: " + payload.id + ")", "success");
    }

    saveDishes();
    resetForm();
    renderDishList();
    closeDrawer();
  } catch (error) {
    setStatus("Erro ao salvar: " + error.message, "error");
    console.error("Erro no saveDish:", error);
  }
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

if (refreshButton) {
  refreshButton.addEventListener("click", fetchAdminMenu);
}
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
  console.log("Clicou no botão:", button.dataset.action, "ID:", id);
  
  const dish = dishes.find((item) => Number(item.id) === id);
  console.log("Prato encontrado:", dish);
  
  if (!dish) {
    setStatus("Prato nao encontrado (ID: " + id + "). Recarregue a pagina.", "error");
    return;
  }

  if (button.dataset.action === "edit") {
    fillForm(dish);
  }

  if (button.dataset.action === "delete") {
    deleteDish(dish.id);
  }
});

// ─── Admin Drawer ─────────────────────────────────────
const openDrawerBtn = document.querySelector("#open-drawer-btn");
const adminDrawerOverlay = document.querySelector("#admin-drawer-overlay");
const adminDrawerClose = document.querySelector("#admin-drawer-close");

openDrawerBtn.addEventListener("click", () => {
  resetForm();
  formTitle.textContent = "Nova marmita";
  openDrawer();
});

adminDrawerOverlay.addEventListener("click", closeDrawer);
adminDrawerClose.addEventListener("click", closeDrawer);

// ─── IA Image Generation (Pollinations.ai) ─────────────────

const aiToggleBtn = document.querySelector("#ai-toggle-btn");
const aiBody = document.querySelector("#ai-body");
const aiToggleArrow = document.querySelector("#ai-toggle-arrow");
const aiGenerateBtn = document.querySelector("#ai-generate-btn");
const aiPrompt = document.querySelector("#ai-prompt");
const aiModel = document.querySelector("#ai-model");
const aiStatus = document.querySelector("#ai-status");
const aiPreviewWrapper = document.querySelector("#ai-preview-wrapper");
const aiPreview = document.querySelector("#ai-preview");
const aiUseBtn = document.querySelector("#ai-use-btn");

let aiGeneratedDataUrl = null;

function aiSetStatus(message, type) {
  aiStatus.textContent = message;
  aiStatus.className = `admin-ai-status is-${type}`;
}

function aiShowPreview(src) {
  aiPreview.src = src;
  aiPreviewWrapper.classList.add("is-visible");
  aiUseBtn.style.display = "inline-flex";
}

function aiHidePreview() {
  aiPreview.src = "";
  aiPreviewWrapper.classList.remove("is-visible");
  aiUseBtn.style.display = "none";
}

function aiSetLoading(loading) {
  aiGenerateBtn.disabled = loading;
  aiGenerateBtn.textContent = loading ? "Gerando..." : "Gerar imagem";
}

aiToggleBtn.addEventListener("click", () => {
  const isOpen = aiBody.classList.toggle("is-open");
  aiToggleArrow.innerHTML = isOpen ? "&#9650;" : "&#9660;";
});

aiGenerateBtn.addEventListener("click", async () => {
  const prompt = aiPrompt.value.trim();
  if (!prompt) {
    aiSetStatus("Digite um prompt para gerar a imagem.", "error");
    return;
  }

  aiSetLoading(true);
  aiHidePreview();
  aiSetStatus("Gerando imagem (pode levar até 60s)...", "info");

  try {
    const res = await fetch("/api/generate-image", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt, model: aiModel.value, width: 1024, height: 768 }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "Erro ao gerar imagem");

    aiGeneratedDataUrl = data.data_url;
    fields.foto_url.value = data.data_url;
    updatePhotoPreview();
    aiShowPreview(data.data_url);
    aiSetStatus(`Imagem gerada com sucesso! (${data.size_kb}KB)`, "success");
  } catch (err) {
    aiSetStatus(err.message || "Erro inesperado na geração", "error");
  } finally {
    aiSetLoading(false);
  }
});

aiUseBtn.addEventListener("click", () => {
  if (aiGeneratedDataUrl) {
    fields.foto_url.value = aiGeneratedDataUrl;
    updatePhotoPreview();
    aiSetStatus("Foto aplicada ao formulário!", "success");
  }
});

const storedPassword = sessionStorage.getItem(PASSWORD_KEY);
if (storedPassword === ADMIN_PASSWORD) {
  passwordInput.value = storedPassword;
  showAdminPanel();
  loadDishes();
  renderDishList();
}

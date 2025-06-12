
import mockClients from "../data/ClientsData";

const LOCAL_STORAGE_KEY = "grantTypesData";

function getStoredGrantTypes() {
  const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
  if (stored) {
    return JSON.parse(stored);
  } else {
    const initialData = {};
    mockClients.forEach((client) => {
      initialData[client.clientId] = client.allowedGrantTypes || [];
    });
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(initialData));
    return initialData;
  }
}

function saveStoredGrantTypes(data) {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(data));
}

const getAllGrantTypes = (clientId) => {
  const allGrantTypes = getStoredGrantTypes();
  return Promise.resolve(allGrantTypes[clientId] || []);
};

const addGrantTypeService = (clientId, newValue) => {
  const allGrantTypes = getStoredGrantTypes();
  if (!allGrantTypes[clientId]) {
    allGrantTypes[clientId] = [];
  }
  const newId = Date.now().toString(); 
  allGrantTypes[clientId].push({ id: newId, value: newValue });
  saveStoredGrantTypes(allGrantTypes);
  return Promise.resolve({ id: newId, value: newValue });
};

const updateGrantTypeService = (clientId, id, newValue) => {
  const allGrantTypes = getStoredGrantTypes();
  const grantTypes = allGrantTypes[clientId] || [];
  const index = grantTypes.findIndex((gt) => gt.id === id);
  if (index === -1) return Promise.reject("یافت نشد");
  grantTypes[index].value = newValue;
  saveStoredGrantTypes(allGrantTypes);
  return Promise.resolve({ id, value: newValue });
};

const deleteGrantTypeService = (clientId, id) => {
  const allGrantTypes = getStoredGrantTypes();
  const grantTypes = allGrantTypes[clientId] || [];
  const index = grantTypes.findIndex((gt) => gt.id === id);
  if (index === -1) return Promise.reject("یافت نشد");
  grantTypes.splice(index, 1);
  saveStoredGrantTypes(allGrantTypes);
  return Promise.resolve(id);
};

export {
  getAllGrantTypes,
  addGrantTypeService,
  updateGrantTypeService,
  deleteGrantTypeService,
};

import mockClients from "../data/ClientsData";

const LOCAL_STORAGE_KEY = "corsOriginsData";

function getStoredOrigins() {
  const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
  if (stored) {
    return JSON.parse(stored);
  } else {
    const initialData = {};
    mockClients.forEach((client) => {
      initialData[client.clientId] = client.corsOrigins || [];
    });
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(initialData));
    return initialData;
  }
}

function saveStoredOrigins(data) {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(data));
}

const getAllOrigins = (clientId) => {
  const allOrigins = getStoredOrigins();
  return Promise.resolve(allOrigins[clientId] || []);
};

const addOrigin = (clientId, newOriginValue) => {
  const allOrigins = getStoredOrigins();
  if (!allOrigins[clientId]) {
    allOrigins[clientId] = [];
  }

  const newId = Date.now().toString();
  const newOrigin = { id: newId, value: newOriginValue };
  allOrigins[clientId].push(newOrigin);
  saveStoredOrigins(allOrigins);
  return Promise.resolve(newOrigin);
};

const updateOrigin = (clientId, oldId, newOriginValue) => {
  const allOrigins = getStoredOrigins();
  const origins = allOrigins[clientId] || [];
  const index = origins.findIndex((origin) => origin.id === oldId);
  if (index === -1) return Promise.reject("یافت نشد");
  origins[index] = { ...origins[index], value: newOriginValue };
  saveStoredOrigins(allOrigins);
  return Promise.resolve(origins[index]);
};

const deleteOrigin = (clientId, originToDelete) => {
  const allOrigins = getStoredOrigins();
  const origins = allOrigins[clientId] || [];
  const index = origins.findIndex(
    (origin) => origin.origin === originToDelete.origin
  );
  if (index === -1) return Promise.reject("یافت نشد");
  origins.splice(index, 1);
  saveStoredOrigins(allOrigins);
  return Promise.resolve(true);
};

export { getAllOrigins, addOrigin, updateOrigin, deleteOrigin };

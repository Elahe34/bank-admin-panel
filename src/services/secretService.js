import mockClients from "../data/ClientsData";

const LOCAL_STORAGE_KEY = "clientSecretData";

function getStoredSecrets() {
  const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
  if (stored) {
    return JSON.parse(stored);
  } else {

    const initialData = {};
    mockClients.forEach((client) => {
      initialData[client.clientId] = client.clientSecret || [];
    });
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(initialData));
    return initialData;
  }
}

function saveStoredSecrets(data) {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(data));
}

const getAllClientSecrets = (clientId) => {
  const allSecrets = getStoredSecrets();
  return Promise.resolve(allSecrets[clientId] || []);
};

const addClientSecretService = (clientId, newSecret) => {
  const allSecrets = getStoredSecrets();
  if (!allSecrets[clientId]) {
    allSecrets[clientId] = [];
  }
  allSecrets[clientId].push(newSecret);
  saveStoredSecrets(allSecrets);
  return Promise.resolve(newSecret);
};

const updateClientSecretService = (clientId, id, newSecret) => {
  const allSecrets = getStoredSecrets();
  const secrets = allSecrets[clientId] || [];
  const index = secrets.findIndex((secret) => secret.id === id);
  if (index < 0) return Promise.reject("یافت نشد");
  secrets[index] = newSecret;
  saveStoredSecrets(allSecrets);
  return Promise.resolve(newSecret);
};

const deleteClientSecretService = (clientId, id) => {
  console.log("deleteClientSecretService called with:", clientId, id);
  const allSecrets = getStoredSecrets();
  const secrets = allSecrets[clientId] || [];
  const index = secrets.findIndex((secret) => Number(secret.id) === Number(id));
  console.log("Index found:", index);
  if (index < 0) {
    console.error("Secret not found to delete!");
    return Promise.reject("یافت نشد");
  }
  secrets.splice(index, 1);
  allSecrets[clientId] = secrets;
  saveStoredSecrets(allSecrets);
  console.log("Secret deleted and saved");
  return Promise.resolve(true);
};

export {
  getAllClientSecrets,
  addClientSecretService,
  updateClientSecretService,
  deleteClientSecretService,
};

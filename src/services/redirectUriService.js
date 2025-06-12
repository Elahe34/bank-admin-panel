import mockClients from "../data/ClientsData";

const LOCAL_STORAGE_KEY = "redirectUrisData";

function getStoredUris() {
  const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
  if (stored) {
    return JSON.parse(stored);
  } else {
    const initialData = {};
    mockClients.forEach((client) => {
      initialData[client.clientId] =
        client.redirectUris?.map((uri, index) => ({
          id: (index + 1).toString(),
          uri,
        })) || [];
    });
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(initialData));
    return initialData;
  }
}

function saveStoredUris(data) {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(data));
}

const getAllUris = (clientId) => {
  const allUris = getStoredUris();
  return Promise.resolve(allUris[clientId] || []);
};


const addUri = (clientId, newUri) => {
  if (!newUri.uri) {
    return Promise.reject("مقدار URI نامعتبر است.");
  }

  const allUris = getStoredUris();
  if (!allUris[clientId]) {
    allUris[clientId] = [];
  }
  const uris = allUris[clientId];

  const maxIdNum = Math.max(
    0,
    ...uris.map((u) => parseInt(u.id.replace(/\D/g, "") || "0"))
  );
  const newId = (maxIdNum + 1).toString();
  const uriToAdd = { id: newId, ...newUri };
  uris.push(uriToAdd);

  saveStoredUris(allUris);
  return Promise.resolve(uriToAdd);
};

const updateUri = (clientId, id, updatedUri) => {
  const allUris = getStoredUris();
  const uris = allUris[clientId] || [];
  const index = uris.findIndex((u) => u.id === id);
  if (index === -1) return Promise.reject("یافت نشد");

  uris[index] = { ...uris[index], ...updatedUri };
  saveStoredUris(allUris);
  return Promise.resolve(uris[index]);
};

const deleteUri = (clientId, id) => {
  const allUris = getStoredUris();
  const uris = allUris[clientId] || [];
  const index = uris.findIndex((u) => u.id === id);
  if (index === -1) return Promise.reject("یافت نشد");

  const removed = uris.splice(index, 1);
  saveStoredUris(allUris);
  return Promise.resolve(removed[0]);
};

export { getAllUris, addUri, updateUri, deleteUri };

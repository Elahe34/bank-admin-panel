import mockClients from "../data/ClientsData";

const LOCAL_STORAGE_KEY = "postLogoutUrisData";

function getStoredUris() {
  const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
  if (stored) {
    return JSON.parse(stored);
  } else {
    const initialData = {};
    mockClients.forEach((client) => {
      initialData[client.clientId] = client.postLogoutUris || [];
    });
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(initialData));
    return initialData;
  }
}

function saveStoredUris(data) {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(data));
}

const getAllPostLogoutUris = (clientId) => {
  const allUris = getStoredUris();
  return Promise.resolve(allUris[clientId] || []);
};

const addPostLogoutUriService = (clientId, newUri) => {
  const allUris = getStoredUris();
  if (!allUris[clientId]) {
    allUris[clientId] = [];
  }
  allUris[clientId].push(newUri);
  saveStoredUris(allUris);
  return Promise.resolve(newUri);
};

const updatePostLogoutUriService = (clientId, id, newUriValue) => {
  const allUris = getStoredUris();
  const uris = allUris[clientId] || [];
  const index = uris.findIndex((uri) => uri.id === id);
  if (index === -1) return Promise.reject("یافت نشد");
  uris[index].value = newUriValue;
  saveStoredUris(allUris);
  return Promise.resolve(uris[index]);
};


const deletePostLogoutUriService = (clientId, id) => { 
  const allUris = getStoredUris();
  const uris = allUris[clientId] || [];
  const index = uris.findIndex((uri) => uri.id === id);
  if (index === -1) return Promise.reject("یافت نشد");
  uris.splice(index, 1);
  saveStoredUris(allUris);
  return Promise.resolve(id); 
};


export {
  getAllPostLogoutUris,
  addPostLogoutUriService,
  updatePostLogoutUriService,
  deletePostLogoutUriService,
};

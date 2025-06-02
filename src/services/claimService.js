import mockClients from "../data/ClientsData";

const LOCAL_STORAGE_KEY = "claimsData";

function getStoredClaims() {
  const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
  if (stored) {
    return JSON.parse(stored);
  } else {
    // اگر localStorage خالی بود، داده mockClients رو بریز داخلش
    const initialData = {};
    mockClients.forEach(client => {
      initialData[client.clientId] = client.claims || [];
    });
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(initialData));
    return initialData;
  }
}

function saveStoredClaims(data) {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(data));
}

const getAllClaims = (clientId) => {
  const allClaims = getStoredClaims();
  return Promise.resolve(allClaims[clientId] || []);
};

const getClaimById = (clientId, id) => {
  const allClaims = getStoredClaims();
  const claims = allClaims[clientId] || [];
  const claim = claims.find(cl => cl.id === id);
  return Promise.resolve(claim || null);
};

const addClaim = (clientId, newClaim) => {
  const allClaims = getStoredClaims();
  if (!allClaims[clientId]) {
    allClaims[clientId] = [];
  }
  const claims = allClaims[clientId];

  const maxIdNum = Math.max(
    0,
    ...claims.map(c => parseInt(c.id.replace(/\D/g, "") || "0"))
  );
  const newId = (maxIdNum + 1).toString();
  const claimToAdd = { ...newClaim, id: newId };
  claims.push(claimToAdd);

  saveStoredClaims(allClaims);
  return Promise.resolve(claimToAdd);
};

const updateClaim = (clientId, id, updatedClaim) => {
  const allClaims = getStoredClaims();
  const claims = allClaims[clientId] || [];
  const index = claims.findIndex(c => c.id === id);
  if (index === -1) return Promise.reject("یافت نشد");

  claims[index] = { ...claims[index], ...updatedClaim };
  saveStoredClaims(allClaims);
  return Promise.resolve(claims[index]);
};

const deleteClaim = (clientId, id) => {
  const allClaims = getStoredClaims();
  const claims = allClaims[clientId] || [];
  const index = claims.findIndex(c => c.id === id);
  if (index === -1) return Promise.reject("یافت نشد");

  const removed = claims.splice(index, 1);
  saveStoredClaims(allClaims);
  return Promise.resolve(removed[0]);
};

export { getAllClaims, getClaimById, addClaim, updateClaim, deleteClaim };

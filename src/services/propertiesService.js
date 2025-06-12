import mockClients from "../data/ClientsData";

const LOCAL_STORAGE_KEY = "propertiesData";

function getStoredProperties() {
  const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
  if (stored) {
    return JSON.parse(stored);
  } else {
    const initialData = {};
    mockClients.forEach((client) => {
      initialData[client.clientId] = client.properties || [];
    });
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(initialData));
    return initialData;
  }
}

function saveStoredProperties(data) {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(data));
}

const getAllProperties = (clientId) => {
  const allProperties = getStoredProperties();
  return Promise.resolve(allProperties[clientId] || []);
};

const addPropertyService = (clientId, newProperty) => {
  const allProperties = getStoredProperties();
  if (!allProperties[clientId]) {
    allProperties[clientId] = [];
  }
  allProperties[clientId].push(newProperty);
  saveStoredProperties(allProperties);
  return Promise.resolve(newProperty);
};

const updatePropertyService = (clientId, oldPropertyIndex, newProperty) => {
  const allProperties = getStoredProperties();
  const properties = allProperties[clientId] || [];
  if (oldPropertyIndex < 0 || oldPropertyIndex >= properties.length)
    return Promise.reject("یافت نشد");
  properties[oldPropertyIndex] = newProperty;
  saveStoredProperties(allProperties);
  return Promise.resolve(newProperty);
};

const deletePropertyService = (clientId, index) => {
  const allProperties = getStoredProperties();
  const properties = allProperties[clientId] || [];
  if (index < 0 || index >= properties.length) return Promise.reject("یافت نشد");
  properties.splice(index, 1);
  saveStoredProperties(allProperties);
  return Promise.resolve(true);
};

export {
  getAllProperties,
  addPropertyService,
  updatePropertyService,
  deletePropertyService,
};

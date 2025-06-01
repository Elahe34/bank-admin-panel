import mockClients from "../../data/ClientsData";

const clients = [...mockClients];

const getAllClients = () => {
  return Promise.resolve(clients);
};

const getClientById = (id) => {
  const client = clients.find((c) => c.id === id);
  return Promise.resolve(client || null);
};

const addClient = (newClient) => {
  const id = (
    Math.max(...clients.map((c) => parseInt(c.id)), 0) + 1
  ).toString();
  const clientToAdd = { ...newClient, id };
  clients.push(clientToAdd);
  return Promise.resolve(clientToAdd);
};

const updateClient = (id, updatedClient) => {
  const index = clients.findIndex((c) => c.id === id);
  if (index === -1) return Promise.reject("کلاینت یافت نشد");
  clients[index] = { ...clients[index], ...updatedClient };
  return Promise.resolve(clients[index]);
};

const deleteClient = (id) => {
  const index = clients.findIndex((c) => c.id === id);
  if (index === -1) return Promise.reject("کلاینت یافت نشد");
  const removed = clients.splice(index, 1);
  return Promise.resolve(removed[0]);
};

export {
  getAllClients,
  getClientById,
  addClient,
  updateClient,
  deleteClient,
};

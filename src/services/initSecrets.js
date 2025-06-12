import mockClients from "../data/ClientsData";
import { setSecrets } from "../Slices/clients/secretSlice";

export const initSecrets = () => (dispatch) => {
  const data = mockClients.flatMap((client, index) =>
    (client.clientSecret || []).map((secret, i) => ({
      id: `${index}-${i}`,
      ...secret,
    }))
  );
  dispatch(setSecrets(data));
};

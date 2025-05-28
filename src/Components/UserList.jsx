import React, { useEffect, useState } from "react";
import * as ApiClients from "../ts/Vps/index";

function UsersList() {
  const [users, setUsers] = useState(null);

  useEffect(() => {
    async function fetchUsers() {
      try {
        const accessToken = localStorage.getItem("access_token");

        const client = new ApiClients.ApiGatewayAdminClient({
          baseUrl: "https://45.139.10.12:7104/",
          defaultHeaders: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        const response = await client.getclientsGET(); 
        setUsers(response);
      } catch (err) {
        console.error("Error fetching users:", err);
      }
    }

    fetchUsers();
  }, []);

  return users ? <pre>{JSON.stringify(users, null, 2)}</pre> : <p>در حال بارگذاری...</p>;
}

export default UsersList;

        
//         const gatewayClient = new ApiGatewayAdminClient("https://45.139.10.12:7104/", customHttp);
// const oauthClient = new OauthV1ViaApiGatewayAdminClient("https://45.139.10.12:7104/", customHttp);

//         public async Task<IActionResult> Index()
//         {
//             var accessToken = await _httpContextAccessor.HttpContext.GetTokenAsync("access_token");
//             var expiresAt = await _httpContextAccessor.HttpContext.GetTokenAsync("expires_at");
//             _httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", accessToken);

//             GetUserListDtoResultDto users = await _apiClient.GetclientsGETAsync();
//             return View(users);}
// ApiGatewayAdminClient';
// OauthV1ViaApiGatewayAdminClient'


// import { Import } from "lucide-react";
// import React, { useEffect, useState } from "react";
// import * as ApiGateway from '../ts/Vps/ApiGatewayAdminClient';
// import * as OauthApi from '../ts/Vps/OauthV1ViaApiGatewayAdminClient';

// const UserList = () => {
//   const [users, setUsers] = useState([]);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     const fetchUsers = async () => {
//       try {
//         const accessToken = localStorage.getItem("access_token"); // یا از context بگیر
//         const response = await fetch("https://45.139.10.12:7104/api/clients?page=1&pageSize=15", {
//           headers: {
//             Authorization: `Bearer ${accessToken}`,
//             "Content-Type": "application/json",
//           },
//         });

//         if (!response.ok) {
//           throw new Error("مشکلی در گرفتن لیست کاربران به‌وجود آمد");
//         }

//         const data = await response.json();
//         setUsers(data); // بسته به ساختار `GetUserListDtoResultDto`
//       } catch (err) {
//         setError(err.message);
//       }
//     };

//     fetchUsers();
//   }, []);

//   if (error) return <div>خطا: {error}</div>;

//   return (
//     <div>
//       <h2>لیست کاربران</h2>
//       <ul>
//         {users.map((user, index) => (
//           <li key={index}>{user.name}</li> // بستگی به ساختار data داره
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default UserList;

import React, { useState } from "react";
import { useParams } from "react-router-dom";
import ClaimsSection from "../Clientssection/ClaimSection";
import CorsOriginsSection from "../Clientssection/CorsOriginsSection";
import GrantTypesSection from "../Clientssection/GrantTypesSection";
import SecretsSection from "../Clientssection/SecretsSection";
import RedirectUrisSection from "../Clientssection/RedirectUrisSection";
import PostLogoutUrisSection from "../Clientssection/PostLogoutUrisSection";
import PropertiesSection from "../Clientssection/PropertiesSection";
import mockClients from "../../data/ClientsData";

const TABS = [
  { id: "claims", label: "Claims", component: ClaimsSection },
  { id: "cors", label: "CORS Origins", component: CorsOriginsSection },
  { id: "grant", label: "Grant Types", component: GrantTypesSection },
  { id: "secrets", label: "Secrets", component: SecretsSection },
  { id: "redirect", label: "redirect", component: RedirectUrisSection },
  { id: "post", label: "post", component: PostLogoutUrisSection },
  { id: "properties", label: "properties", component: PropertiesSection },
];

function ClientDetails() {
  const { clientId } = useParams();
  const [activeTab, setActiveTab] = useState("claims");
  const client = mockClients.find((c) => c.clientId === clientId);
  const ActiveComponent = TABS.find((tab) => tab.id === activeTab)?.component;

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-8 mr-8 text-right ">
        ID : {clientId}
      </h2>

      <nav className="mb-9 flex items-center justify-start gap-5 ">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-1 rounded text-[.9em] ${
              activeTab === tab.id
                ? "bg-blue-900 text-white"
                : "bg-gray-200 text-black"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </nav>

      <div className=" p-4 rounded">
        {ActiveComponent ? (
          <ActiveComponent
            clientId={clientId}
            redirectUris={client?.redirectUris}
            postLogoutUris={client?.postLogoutUris}
            grantTypes={client?.allowedGrantTypes}
            secrets={client?.clientSecret}
            claims ={client?.claims}
            corsOrigins={client?.corsOrigins}
            allowedGrantTypes ={client?.allowedGrantTypes}
            properties ={client?.properties}
          />
        ) : (
          <p>تب نامعتبر</p>
        )}
      </div>
    </div>
  );
}

export default ClientDetails;

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchClientSecrets,
  addClientSecret,
  removeClientSecret,
  editClientSecret,
} from "../../Slices/clients/secretSlice";

import SectionWrapper from "../SectionWrapper";
import GenericTable from "../GenericTable";
import ConfirmDeleteModal from "../../Modals/ClientModals/ConfirmDeleteModal";
import SecretFormModal from "../../Modals/ClientModals/SecretFormModal";

const SecretSection = ({ clientId }) => {
  const dispatch = useDispatch();
  const secrets = useSelector((state) => state.clientSecret.list);

  const [search, setSearch] = useState("");
  const [deleteIndex, setDeleteIndex] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [showFormModal, setShowFormModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentSecret, setCurrentSecret] = useState(null);

  useEffect(() => {
    dispatch(fetchClientSecrets(clientId));
  }, [dispatch, clientId]);
  const handleDelete = (id) => {
    console.log("handleDelete called with id:", id);
    setDeleteIndex(id);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    console.log("confirmDelete called with deleteIndex:", deleteIndex);
    dispatch(removeClientSecret({ clientId, id: deleteIndex }))
      .unwrap() 
      .then(() => {
        console.log("Delete success");
        setShowDeleteModal(false);
      })
      .catch((err) => {
        console.error("Delete failed:", err);
      });
  };

  const handleAdd = () => {
    setEditMode(false);
    setCurrentSecret(null);
    setShowFormModal(true);
  };

  const handleEdit = (secret) => {
    setEditMode(true);
    setCurrentSecret(secret);
    setShowFormModal(true);
  };

  const handleFormSubmit = (secretData) => {
    if (editMode) {
      dispatch(
        editClientSecret({
          clientId,
          id: currentSecret.id,
          newSecret: secretData,
        })
      );
    } else {
      dispatch(
        addClientSecret({
          clientId,
          secret: { ...secretData, id: new Date().getTime() }, 
        })
      );
    }
    setShowFormModal(false);
  };

  const columns = [
    { key: "type", label: "Type" },
    { key: "value", label: "Value" },
    { key: "expiration", label: "Expiration" },
  ];

  
  const tableData = secrets
    .map((secret) => ({ id: secret.id, ...secret }))
    .filter(
      (secret) =>
        secret.type.toLowerCase().includes(search.toLowerCase()) ||
        secret.value.toLowerCase().includes(search.toLowerCase())
    );
  console.log("tableData:", tableData);

  return (
    <>
      <SectionWrapper
        title="Client Secrets"
        onAddClick={handleAdd}
        searchTerm={search}
        setSearchTerm={setSearch}
      >
        <GenericTable
          columns={columns}
          data={tableData}
          onEdit={(row) => handleEdit(row)}
          onDelete={handleDelete}
          searchTerm={search}
        />
      </SectionWrapper>

      <ConfirmDeleteModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={confirmDelete}
        title="آیا مطمئن هستید که می‌خواهید حذف کنید؟"
      />

      <SecretFormModal
        isOpen={showFormModal}
        onClose={() => setShowFormModal(false)}
        onSubmit={handleFormSubmit}
        initialData={currentSecret}
        isEdit={editMode}
      />
    </>
  );
};

export default SecretSection;

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchUris,
  addNewUri,
  removeUri,
  editUri,
} from "../../Slices/clients/redirectUrisSlice";

import SectionWrapper from "../SectionWrapper";
import GenericTable from "../GenericTable";
import ConfirmDeleteModal from "../../Modals/ClientModals/ConfirmDeleteModal";
import RedirectUriFormModal from "../../Modals/ClientModals/RedirectUriFormModal";

const RedirectUrisSection = ({ clientId }) => {
  const dispatch = useDispatch();
  const uris = useSelector((state) => state.redirectUris.list);

  const [search, setSearch] = useState("");
  const [deleteId, setDeleteId] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [showFormModal, setShowFormModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentUri, setCurrentUri] = useState(null);

  useEffect(() => {
    dispatch(fetchUris(clientId));
  }, [dispatch, clientId]);

  const handleDelete = (id) => {
    setDeleteId(id);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    dispatch(removeUri({ clientId, id: deleteId }));
    setShowDeleteModal(false);
  };

  const handleAdd = () => {
    setEditMode(false);
    setCurrentUri(null);
    setShowFormModal(true);
  };

  const handleEdit = (uri) => {
    setEditMode(true);
    setCurrentUri(uri);
    setShowFormModal(true);
  };

  const handleFormSubmit = (uriData) => {
    if (editMode) {
      dispatch(
        editUri({ clientId, id: currentUri.id, updated: uriData })
      );
    } else {
      dispatch(addNewUri({ clientId, uri: uriData }));
    }
    setShowFormModal(false);
  };

  const columns = [
    { key: "uri", label: "آدرس بازگشت (Redirect URI)" },
  ];

  return (
    <>
      <SectionWrapper
        title="Redirect URIs"
        onAddClick={handleAdd}
        searchTerm={search}
        setSearchTerm={setSearch}
      >
        <GenericTable
          columns={columns}
          data={uris}
          onEdit={handleEdit}
          onDelete={handleDelete}
          searchTerm={search}
        />
      </SectionWrapper>

      <ConfirmDeleteModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={confirmDelete}
        title="آیا مطمئنید که می‌خواهید این آدرس را حذف کنید؟"
      />

      <RedirectUriFormModal
        isOpen={showFormModal}
        onClose={() => setShowFormModal(false)}
        onSubmit={handleFormSubmit}
        initialData={currentUri}
        isEdit={editMode}
      />
    </>
  );
};

export default RedirectUrisSection;

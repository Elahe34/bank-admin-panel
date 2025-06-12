import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchPostLogoutUris,
  addPostLogoutUri,
  removePostLogoutUri,
  editPostLogoutUri,
} from "../../Slices/clients/postLogoutUrisSlice";

import SectionWrapper from "../SectionWrapper";
import GenericTable from "../GenericTable";
import ConfirmDeleteModal from "../../Modals/ClientModals/ConfirmDeleteModal";
import UriFormModal from "../../Modals/ClientModals/UriFormModal";

const PostLogoutUrisSection = ({ clientId }) => {
  const dispatch = useDispatch();
  const uris = useSelector((state) => state.postLogoutUris.list);
  const [search, setSearch] = useState("");
  const [deleteIndex, setDeleteIndex] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [showFormModal, setShowFormModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentUri, setCurrentUri] = useState("");

  useEffect(() => {
    dispatch(fetchPostLogoutUris(clientId));
  }, [dispatch, clientId]);

  const handleDelete = (id) => {
    setDeleteIndex(id);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    dispatch(removePostLogoutUri({ clientId, id: deleteIndex }));
    setShowDeleteModal(false);
  };

  const handleAdd = () => {
    setEditMode(false);
    setCurrentUri("");
    setShowFormModal(true);
  };

  const handleEdit = (uri) => {
    setEditMode(true);
    setCurrentUri(uri);
    setShowFormModal(true);
  };

  const handleFormSubmit = (uriData) => {
    if (editMode) {
      dispatch(editPostLogoutUri({ clientId, id: currentUri.id, newUri }));
    } else {
      dispatch(addPostLogoutUri({ clientId, uri: uriData }));
    }
    setShowFormModal(false);
  };

  const columns = [{ key: "uri", label: "Post Logout URI" }];

  const tableData = uris
    .filter(
      (uri) =>
        typeof uri?.value === "string" &&
        (!search || uri.value.includes(search))
    )
    .map((uri) => ({
      id: uri.id.toString(),
      uri: uri.value,
    }));


  return (
    <>
      <SectionWrapper
        title="Post Logout URIs"
        onAddClick={handleAdd}
        searchTerm={search}
        setSearchTerm={setSearch}
      >
        <GenericTable
          columns={columns}
          data={tableData}
          onEdit={(item) => handleEdit(item)}
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

      <UriFormModal
        isOpen={showFormModal}
        onClose={() => setShowFormModal(false)}
        onSubmit={handleFormSubmit}
        initialData={currentUri}
        isEdit={editMode}
      />
    </>
  );
};

export default PostLogoutUrisSection;


import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchGrantTypes,
  addGrantType,
  removeGrantType,
  editGrantType,
} from "../../Slices/clients/grantTypeSlice";

import SectionWrapper from "../SectionWrapper";
import GenericTable from "../GenericTable";
import ConfirmDeleteModal from "../../Modals/ClientModals/ConfirmDeleteModal";
import GrantTypeFormModal from "../../Modals/ClientModals/GrantTypeFormModal";

const GrantTypesSection = ({ clientId }) => {
  const dispatch = useDispatch();
  const grantTypes = useSelector((state) => state.grantTypes.list);

  const [search, setSearch] = useState("");
  const [deleteId, setDeleteId] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [showFormModal, setShowFormModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentGrantType, setCurrentGrantType] = useState(null);

  useEffect(() => {
    dispatch(fetchGrantTypes(clientId));
  }, [dispatch, clientId]);

  const handleDelete = (id) => {
    setDeleteId(id);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    dispatch(removeGrantType({ clientId, id: deleteId }));
    setShowDeleteModal(false);
  };

  const handleAdd = () => {
    setEditMode(false);
    setCurrentGrantType(null);
    setShowFormModal(true);
  };

  const handleEdit = (grantType) => {
    setEditMode(true);
    setCurrentGrantType(grantType);
    setShowFormModal(true);
  };

  const handleFormSubmit = (grantTypeValue) => {
    if (editMode) {
      dispatch(
        editGrantType({
          clientId,
          id: currentGrantType.id,
          newValue: grantTypeValue.allowedGrantTypes[0], 
        })
      );
    } else {
      dispatch(
        addGrantType({
          clientId,
          value: grantTypeValue.allowedGrantTypes[0], 
        })
      );
    }
    setShowFormModal(false);
  };

  const columns = [{ key: "uri", label: "Allowed Grant Type" }];

  if (!grantTypes) return null;

  const tableData = grantTypes
    .filter((item) => item?.value?.includes(search))
    .map((item) => ({ id: item.id.toString(), uri: item.value }));

  return (
    <>
      <SectionWrapper
        title="Allowed Grant Types"
        onAddClick={handleAdd}
        searchTerm={search}
        setSearchTerm={setSearch}
      >
        <GenericTable
          columns={columns}
          data={tableData}
          onEdit={(row) =>
            handleEdit({
              id: row.id,
              allowedGrantTypes: [row.uri], 
            })
          }
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

      <GrantTypeFormModal
        isOpen={showFormModal}
        onClose={() => setShowFormModal(false)}
        onSubmit={handleFormSubmit}
        initialData={currentGrantType}
        isEdit={editMode}
      />
    </>
  );
};

export default GrantTypesSection;

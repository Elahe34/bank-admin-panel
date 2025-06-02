import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchClaims,
  addNewClaim,
  removeClaim,
  editClaim,
} from "../../Slices/clients/claimSlice";

import SectionWrapper from "../SectionWrapper";
import GenericTable from "../GenericTable";
import ConfirmDeleteModal from "../../Modals/ConfirmDeleteModal";
import ClaimFormModal from "../../Modals/ClaimFormModal";

const ClaimsSection = ({ clientId }) => {
  const dispatch = useDispatch();
  const claims = useSelector((state) => state.claims.list);

  const [search, setSearch] = useState("");
  const [deleteId, setDeleteId] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [showFormModal, setShowFormModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentClaim, setCurrentClaim] = useState(null);

  useEffect(() => {
    dispatch(fetchClaims(clientId));
  }, [dispatch, clientId]);

  const handleDelete = (id) => {
    setDeleteId(id);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    dispatch(removeClaim({ clientId, id: deleteId }));
    setShowDeleteModal(false);
  };

  const handleAdd = () => {
    setEditMode(false);
    setCurrentClaim(null);
    setShowFormModal(true);
  };

  const handleEdit = (claim) => {
    setEditMode(true);
    setCurrentClaim(claim);
    setShowFormModal(true);
  };

  const handleFormSubmit = (claimData) => {
    if (editMode) {
      dispatch(
        editClaim({ clientId, id: currentClaim.id, updated: claimData })
      );
    } else {
      dispatch(addNewClaim({ clientId, claim: claimData }));
    }
    setShowFormModal(false);
  };

  const columns = [
    { key: "type", label: "نوع" },
    { key: "value", label: "مقدار" },
  ];

  return (
    <>
      <SectionWrapper
        title="مطالبات"
        onAddClick={handleAdd}
        searchTerm={search}
        setSearchTerm={setSearch}
      >
        <GenericTable
          columns={columns}
          data={claims}
          onEdit={handleEdit}
          onDelete={handleDelete}
          searchTerm={search}
        />
      </SectionWrapper>

      <ConfirmDeleteModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={confirmDelete}
        title="آیا مطمئنید که می‌خواهید حذف کنید؟"
      />

      <ClaimFormModal
        isOpen={showFormModal}
        onClose={() => setShowFormModal(false)}
        onSubmit={handleFormSubmit}
        initialData={currentClaim}
        isEdit={editMode}
      />
    </>
  );
};

export default ClaimsSection;

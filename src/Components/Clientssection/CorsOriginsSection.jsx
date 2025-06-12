import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchOrigins,
  addNewOrigin,
  removeOrigin,
  editOrigin,
} from "../../Slices/clients/corsOriginsSlice";

import SectionWrapper from "../SectionWrapper";
import GenericTable from "../GenericTable";
import ConfirmDeleteModal from "../../Modals/ClientModals/ConfirmDeleteModal";
import CorsOriginFormModal from "../../Modals/ClientModals/CorsOriginFormModal";

const CorsOriginsSection = ({ clientId }) => {
  const dispatch = useDispatch();
  const origins = useSelector((state) => state.corsOrigins.list);
  const [search, setSearch] = useState("");
  const [deleteId, setDeleteId] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [showFormModal, setShowFormModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentOrigin, setCurrentOrigin] = useState(null); 

  useEffect(() => {
    dispatch(fetchOrigins(clientId));
  }, [dispatch, clientId]);

  const handleDelete = (origin) => {
    setDeleteId(origin);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    dispatch(removeOrigin({ clientId, origin: deleteId }));
    setShowDeleteModal(false);
  };

  const handleAdd = () => {
    setEditMode(false);
    setCurrentOrigin(null);
    setShowFormModal(true);
  };

  const handleEdit = (origin) => {
    setEditMode(true);
    setCurrentOrigin(origin);
    setShowFormModal(true);
  };

  const handleFormSubmit = (originValue) => {
    if (editMode) {
      dispatch(
        editOrigin({
          clientId,
          oldId: currentOrigin.id,
          newOrigin: originValue,
        })
      );
    } else {
      dispatch(addNewOrigin({ clientId, origin: originValue }));
    }
    setShowFormModal(false);
  };

  const columns = [{ key: "value", label: "آدرس CORS Origin" }];

  const tableData = (origins ?? [])
    .filter(
      (origin) =>
        typeof origin.value === "string" && origin.value.includes(search)
    )
    .map((origin) => ({ id: origin.id, value: origin.value }));

  return (
    <>
      <SectionWrapper
        title="CORS Origins"
        onAddClick={handleAdd}
        searchTerm={search}
        setSearchTerm={setSearch}
      >
        <GenericTable
          columns={columns}
          data={tableData}
          onEdit={(row) => handleEdit(origins.find((o) => o.id === row.id))}
          onDelete={(row) => handleDelete(parseInt(row))}
          searchTerm={search}
        />
      </SectionWrapper>

      <ConfirmDeleteModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={confirmDelete}
        title="آیا مطمئنید که می‌خواهید این Origin را حذف کنید؟"
      />

      <CorsOriginFormModal
        isOpen={showFormModal}
        onClose={() => setShowFormModal(false)}
        onSubmit={handleFormSubmit}
        initialData={currentOrigin ? currentOrigin.value : ""}
        isEdit={editMode}
      />
    </>
  );
};

export default CorsOriginsSection;

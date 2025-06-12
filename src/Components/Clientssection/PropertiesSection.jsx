import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProperties,
  addProperty,
  removeProperty,
  editProperty,
} from "../../Slices/clients/propertiesSlice";

import SectionWrapper from "../SectionWrapper";
import GenericTable from "../GenericTable";
import ConfirmDeleteModal from "../../Modals/ClientModals/ConfirmDeleteModal";
import PropertyFormModal from "../../Modals/ClientModals/PropertyFormModal";

const PropertiesSection = ({ clientId }) => {
  const dispatch = useDispatch();
  const properties = useSelector((state) => state.properties.list);

  const [search, setSearch] = useState("");
  const [deleteIndex, setDeleteIndex] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [showFormModal, setShowFormModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentProperty, setCurrentProperty] = useState({
    supportEmail: "",
    department: "",
  });

  useEffect(() => {
    dispatch(fetchProperties(clientId));
  }, [dispatch, clientId]);

  const handleDelete = (index) => {
    setDeleteIndex(index);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    dispatch(removeProperty({ clientId, index: deleteIndex }));
    setShowDeleteModal(false);
  };

  const handleAdd = () => {
    setEditMode(false);
    setCurrentProperty({ supportEmail: "", department: "" });
    setShowFormModal(true);
  };

  const handleEdit = (property) => {
    setEditMode(true);
    setCurrentProperty(property);
    setShowFormModal(true);
  };

  const handleFormSubmit = (propertyData) => {
    if (editMode) {
      const index = properties.findIndex(
        (p) =>
          p.supportEmail === currentProperty.supportEmail &&
          p.department === currentProperty.department
      );
      dispatch(editProperty({ clientId, index, newProperty: propertyData }));
    } else {
      dispatch(addProperty({ clientId, property: propertyData }));
    }
    setShowFormModal(false);
  };

  const columns = [
    { key: "supportEmail", label: "Support Email" },
    { key: "department", label: "Department" },
  ];

  const transformProperties = (props) => {
    const result = [];
    for (let i = 0; i < props.length; i += 2) {
      result.push({
        supportEmail: props[i]?.value || "",
        department: props[i + 1]?.value || "",
      });
    }
    return result;
  };

  const tableData = transformProperties(properties)
    .filter(
      (p) =>
        (p.supportEmail ?? "").toLowerCase().includes(search.toLowerCase()) ||
        (p.department ?? "").toLowerCase().includes(search.toLowerCase())
    )
    .map((p, idx) => ({ id: idx.toString(), ...p }));

  return (
    <>
      <SectionWrapper
        title="Properties"
        onAddClick={handleAdd}
        searchTerm={search}
        setSearchTerm={setSearch}
      >
        <GenericTable
          columns={columns}
          data={tableData}
          onEdit={(row) =>
            handleEdit({
              supportEmail: row.supportEmail,
              department: row.department,
            })
          }
          onDelete={(row) => handleDelete(parseInt(row.id))}
          searchTerm={search}
        />
      </SectionWrapper>

      <ConfirmDeleteModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={confirmDelete}
        title="آیا مطمئن هستید که می‌خواهید حذف کنید؟"
      />

      <PropertyFormModal
        isOpen={showFormModal}
        onClose={() => setShowFormModal(false)}
        onSubmit={handleFormSubmit}
        initialData={currentProperty}
        isEdit={editMode}
      />
    </>
  );
};

export default PropertiesSection;

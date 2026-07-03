import { useMemo, useState } from "react";
import type { ColDef } from "ag-grid-community";
import MasterGrid from "../../../components/master-grids/MasterGrid";
import PageContainer from "../../../components/common/PageContainer";
import { useAcademicYear } from "../hooks/useAcademicYear";
import type { AcademicYear } from "../types/academicYear";
import { DeleteDialog } from "../../../components/master-grids";
import { deleteAcademicYear,createAcademicYear,updateAcademicYear } from "../../../api/academicYearApi";
import { Snackbar,Alert } from "@mui/material";
import axios from "axios";
import AcademicYearForm, {type AcademicYearFormValues} from "./AcademicYearForm";
import MasterDialog from "../../MasterDialog";
import type { ApiResponse } from "../../../types/auth";

export default function AcademicYearPage() {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error" | "warning" | "info">("success");
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState<AcademicYear | null>(null);
  const [openForm, setOpenForm] = useState(false);
  const [editingRow, setEditingRow] = useState<AcademicYear | null>(null);
  const { academicYears, loading, loadAcademicYears } = useAcademicYear();

  const columnDefs = useMemo<ColDef<AcademicYear>[]>(
    () => [
      {
        headerName: "ID",
        field: "academicYearId",
        width: 120,
      },
      {
        headerName: "Academic Year",
        field: "academicYearName",
        flex: 1,
      },
    ],
    []
  );

  const handleAdd = () => {
  setEditingRow(null);
  setOpenForm(true);
};

  const handleEdit = (row: AcademicYear) => {
  setEditingRow(row);
  setOpenForm(true);
};

const handleSave = async (data: AcademicYearFormValues) => {
  try {
    let response;

    if (editingRow) {
      response = await updateAcademicYear(
        editingRow.academicYearId,
        data
      );
    } else {
      response = await createAcademicYear(data);
    }

    if(response.statusCode===409)
        setSnackbarSeverity("warning");
      else
        setSnackbarSeverity("success");
    setSnackbarMessage(response.message);
    setSnackbarOpen(true);

    setOpenForm(false);
    setEditingRow(null);

    await loadAcademicYears();
  } catch (error) {
    if (axios.isAxiosError<ApiResponse<number>>(error)) {
      setSnackbarSeverity("error");
      setSnackbarMessage(
        error.response?.data.message ?? "Something went wrong."
      );
    } else {
      setSnackbarSeverity("error");
      setSnackbarMessage("Unexpected error.");
    }

    setSnackbarOpen(true);
  }
};

  const handleDelete = (row: AcademicYear) => {
    setSelectedRow(row);
    setDeleteOpen(true);
  };
  const handleConfirmDelete = async () => {
    if (!selectedRow) return;

    try {
      const response = await deleteAcademicYear(selectedRow.academicYearId);

      if (response.success) {
        await loadAcademicYears();

        setDeleteOpen(false);
        setSelectedRow(null);

        setSnackbarSeverity("info");
        setSnackbarMessage(response.message);
        setSnackbarOpen(true);
      }
    } catch (error) {
      setSnackbarSeverity("error");
      setSnackbarMessage("Failed to delete Academic Year.");
      setSnackbarOpen(true);
    }
  };

  const handleCloseDelete = () => {
    setDeleteOpen(false);
    setSelectedRow(null);
  };
  return (
    <PageContainer>
      <MasterGrid<AcademicYear>
        title="Academic Year Master"
        rowData={academicYears}
        columnDefs={columnDefs}
        loading={loading}
        addButtonText="Add Year"
        onAdd={handleAdd}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <DeleteDialog
        open={deleteOpen}
        title="Delete Academic Year"
        description={
          selectedRow
            ? `Are you sure you want to delete "${selectedRow.academicYearName}"?`
            : ""
        }
        onClose={handleCloseDelete}
        onConfirm={handleConfirmDelete}
      />
      <MasterDialog
    open={openForm}
    title={
        editingRow
        ? "Edit Academic Year"
        : "Add Academic Year"
    }
    defaultValues={{
        academicYearName:
            editingRow?.academicYearName ?? "",
    }}
    onClose={() => setOpenForm(false)}
    onSave={handleSave}
>
    <AcademicYearForm/>
  </MasterDialog>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <Alert
          severity={snackbarSeverity}
          variant="filled"
          onClose={() => setSnackbarOpen(false)}
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </PageContainer>
  );
}
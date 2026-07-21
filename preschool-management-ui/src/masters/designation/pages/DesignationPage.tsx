import { useMemo } from "react";
import { useTranslation } from "react-i18next";

import MasterGrid from "../../../components/master-grids/MasterGrid";
import PageContainer from "../../../components/common/PageContainer";
import { DeleteDialog } from "../../../components/master-grids";
import MasterDialog from "../../../components/common/MasterDialog";
import AppSnackbar from "../../../components/common/AppSnackbar";

import usePermission from "../../../hooks/usePermission";

import { useDesignation } from "../hooks/useDesignation";
import { useDesignationCrud } from "../hooks/useDesignationCrud";

import DesignationForm from "../components/DesignationForm";
import { getDesignationColumns } from "../components/DesignationColumns";

import type {
    Designation,
    DesignationFormValues,
} from "../types/designation";

export default function DesignationPage() {
    const { t, i18n } = useTranslation([
        "common",
        "masters",
    ]);

    const language = i18n.language;

    const {
        designations,
        loading,
        loadDesignations,
    } = useDesignation(false);

    const {
        canAdd,
        canEdit,
        canDelete,
        canExport,
        canPrint,
    } = usePermission();

    const {
        openForm,
        editingRow,

        deleteOpen,
        selectedRow,

        snackbarOpen,
        snackbarMessage,
        snackbarSeverity,

        handleAdd,
        handleEdit,
        handleSave,

        handleCloseForm,

        handleDelete,
        handleConfirmDelete,
        handleCloseDelete,

        closeSnackbar,
    } = useDesignationCrud({
        loadDesignations,
    });

    const designationColumns = useMemo(() => {
        return getDesignationColumns(t);
    }, [t, language]);

    const defaultValues: DesignationFormValues = {
        designationName:
            editingRow?.designationName ?? "",

        isActive:
            editingRow?.isActive ?? true,

        translations:
            editingRow?.translations?.length
                ? editingRow.translations.map((x) => ({
                      languageCode:
                          x.languageCode,
                      designationName:
                          x.designationName,
                  }))
                : [
                      {
                          languageCode: "mr",
                          designationName: "",
                      },
                  ],
    };

    return (
        <PageContainer>
            <MasterGrid<Designation>
                title={t(
                    "masters:designationMaster"
                )}
                rowData={designations}
                columnDefs={designationColumns}
                loading={loading}
                addButtonText={t(
                    "masters:addDesignation"
                )}

                
                canAdd={canAdd}
                canEdit={canEdit}
                canDelete={canDelete}
                canExport={canExport}
                canPrint={canPrint}

                onAdd={handleAdd}
                onEdit={handleEdit}
                onDelete={handleDelete}
            />

            {/* Delete Confirmation */}
            <DeleteDialog
                open={deleteOpen}
                title={t(
                    "common:confirmDelete"
                )}
                description={
                    selectedRow
                        ? t(
                              "common:deleteConfirmation",
                              {
                                  name: selectedRow.designationName,
                              }
                          )
                        : ""
                }
                onClose={handleCloseDelete}
                onConfirm={handleConfirmDelete}
            />

            {/* Add / Edit Dialog */}
            <MasterDialog
                open={openForm}
                title={
                    editingRow
                        ? t(
                              "masters:editDesignation"
                          )
                        : t(
                              "masters:addDesignation"
                          )
                }
                defaultValues={defaultValues}
                onClose={handleCloseForm}
                onSave={handleSave}
            >
                <DesignationForm />
            </MasterDialog>

            {/* Snackbar */}
            <AppSnackbar
                open={snackbarOpen}
                message={snackbarMessage}
                severity={snackbarSeverity}
                onClose={closeSnackbar}
            />
        </PageContainer>
    );
}
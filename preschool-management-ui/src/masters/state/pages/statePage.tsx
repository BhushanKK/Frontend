import { useMemo } from "react";
import { useTranslation } from "react-i18next";

import PageContainer from "../../../components/common/PageContainer";
import MasterGrid from "../../../components/master-grids/MasterGrid";
import MasterDialog from "../../../components/common/MasterDialog";
import AppSnackbar from "../../../components/common/AppSnackbar";
import { DeleteDialog } from "../../../components/master-grids";

import { useStates } from "../hooks/useStates";
import { useStateCrud } from "../hooks/useStateCrud";

import usePermission from "../../../hooks/usePermission";

import type {
    State,
    StateFormValues,
} from "../types/state";
import { getStateColumns } from "../component/stateColumns";
import StateForm from "../component/stateForm";



export default function StatePage() {
    const { t, i18n } = useTranslation([
        "common",
        "masters",
    ]);

    const language = i18n.language;

    const {
        states,
        loading,
        pagination,

        setPageNumber,
        setPageSize,
        setSearchText,

        loadStates,
    } = useStates(false);

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
    } = useStateCrud({
        loadStates,
    });

    const stateColumns = useMemo(() => {
        return getStateColumns(t);
    }, [t, language]);

    const defaultValues: StateFormValues = {
        stateName:
            editingRow?.stateName ?? "",

        isActive:
            editingRow?.isActive ?? true,

        translations:
            editingRow?.translations?.length
                ? editingRow.translations.map((x) => ({
                    languageCode: x.languageCode,
                    stateName: x.stateName,
                }))
                : [
                    {
                        languageCode: "mr",
                        stateName: "",
                    },
                ],
    };

    return (
        <PageContainer>
            <MasterGrid<State>
                title={t("masters:stateMaster")}
                rowData={states}
                columnDefs={stateColumns}
                loading={loading}

                addButtonText={t("masters:addState")}

                pagination={pagination}
                onPageChange={setPageNumber}
                onPageSizeChange={setPageSize}
                onSearch={setSearchText}

                canAdd={canAdd}
                canEdit={canEdit}
                canDelete={canDelete}
                canExport={canExport}
                canPrint={canPrint}

                onAdd={handleAdd}
                onEdit={handleEdit}
                onDelete={handleDelete}
            />

            <DeleteDialog
                open={deleteOpen}
                title={t("common:confirmDelete")}
                description={
                    selectedRow
                        ? t(
                              "common:deleteConfirmation",
                              {
                                  name:
                                      selectedRow.stateName,
                              }
                          )
                        : ""
                }
                onClose={handleCloseDelete}
                onConfirm={handleConfirmDelete}
            />

            <MasterDialog
                open={openForm}
                title={
                    editingRow
                        ? t("masters:editState")
                        : t("masters:addState")
                }
                defaultValues={defaultValues}
                onClose={handleCloseForm}
                onSave={handleSave}
            >
                <StateForm />
            </MasterDialog>

            <AppSnackbar
                open={snackbarOpen}
                message={snackbarMessage}
                severity={snackbarSeverity}
                onClose={closeSnackbar}
            />
        </PageContainer>
    );
}
import { useMemo } from "react";
import { useTranslation } from "react-i18next";

import MasterGrid from "../../../components/master-grids/MasterGrid";
import PageContainer from "../../../components/common/PageContainer";
import MasterDialog from "../../../components/common/MasterDialog";
import AppSnackbar from "../../../components/common/AppSnackbar";
import { DeleteDialog } from "../../../components/master-grids";

import usePermission from "../../../hooks/usePermission";
import { useLanguageStore } from "../../../store/languageStore";

import { useHoliday } from "../hooks/useHoliday";
import { useHolidayCrud } from "../hooks/useHolidayCrud";

import HolidayForm from "../components/HolidayForm";
import { getHolidayColumns } from "../components/HolidayColumns";

import type {
    Holiday,
    HolidayFormValues,
} from "../types/Holiday";

export default function HolidayPage() {
    const { t } = useTranslation([
        "common",
        "masters",
    ]);

    const language = useLanguageStore(
        (state) => state.language
    );

    const {
        holidays,
        loading,
        loadHolidays,
    } = useHoliday();

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
    } = useHolidayCrud({
        loadHolidays,
    });

    const holidayColumns = useMemo(() => {
        return getHolidayColumns(
            t,
            language
        );
    }, [t, language]);

    const defaultValues: HolidayFormValues = {
        holidayName: editingRow?.holidayName ?? "",

        holidayFromDate:
            editingRow?.holidayFromDate?.split("T")[0] ?? "",

        holidayToDate:
            editingRow?.holidayToDate?.split("T")[0] ?? "",

        holidayType: editingRow?.holidayType ?? 1,
        description: editingRow?.description ?? "",
        isActive: editingRow?.isActive ?? true,

        translations:
            editingRow?.translations?.length
                ? editingRow.translations.map((x) => ({
                    languageCode: x.languageCode,
                    holidayName: x.holidayName,
                }))
                : [
                    {
                        languageCode: "mr",
                        holidayName: "",
                    },
                ],
    };

    return (
        <PageContainer>
            <MasterGrid<Holiday>
                title={t(
                    "masters:holidayMaster"
                )}
                rowData={holidays}
                columnDefs={holidayColumns}
                loading={loading}
                addButtonText={t(
                    "masters:addHoliday"
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
                                name: selectedRow.holidayName,
                            }
                        )
                        : ""
                }
                onClose={
                    handleCloseDelete
                }
                onConfirm={
                    handleConfirmDelete
                }
            />

            <MasterDialog
                open={openForm}
                title={
                    editingRow
                        ? t(
                            "masters:editHoliday"
                        )
                        : t(
                            "masters:addHoliday"
                        )
                }
                defaultValues={
                    defaultValues
                }
                onClose={
                    handleCloseForm
                }
                onSave={handleSave}
            >
                <HolidayForm />
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
import { useMemo } from "react";
import { useTranslation } from "react-i18next";

import PageContainer from "../../../components/common/PageContainer";
import MasterGrid from "../../../components/master-grids/MasterGrid";
import MasterDialog from "../../../components/common/MasterDialog";
import AppSnackbar from "../../../components/common/AppSnackbar";
import { DeleteDialog } from "../../../components/master-grids";

import usePermission from "../../../hooks/usePermission";

import { useDistrict } from "../hooks/useDistrict";
import { useDistrictCrud } from "../hooks/useDistrictCrud";

import { getDistrictColumns } from "../components/DistrictColumns";
import DistrictForm from "../components/DistrictForm";

import type {
    District,
    DistrictFormValues,
} from "../types/district";

export default function DistrictPage() {
    const { t, i18n } = useTranslation([
        "common",
        "masters",
    ]);

    const {
        districts,
        loading,
        pagination,
        setPageNumber,
        setPageSize,
        setSearchText,
        loadDistricts,
    } = useDistrict(false);

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
    } = useDistrictCrud({
        loadDistricts,
    });

    const districtColumns = useMemo(() => {
        return getDistrictColumns(t);
    }, [t, i18n.language]);

    const defaultValues: DistrictFormValues = {
        stateId: editingRow?.stateId ?? 0,
        districtName: editingRow?.districtName ?? "",
        isActive: editingRow?.isActive ?? true,
        translations:
            editingRow?.translations?.length
                ? editingRow.translations.map((x) => ({
                      languageCode: x.languageCode,
                      districtName: x.districtName,
                  }))
                : [
                      {
                          languageCode: "mr",
                          districtName: "",
                      },
                  ],
    };

    return (
        <PageContainer>
            <MasterGrid<District>
                title={t("masters:districtMaster")}
                rowData={districts}
                columnDefs={districtColumns}
                loading={loading}

                pagination={pagination}
                onPageChange={setPageNumber}
                onPageSizeChange={setPageSize}
                onSearch={setSearchText}

                addButtonText={t("masters:addDistrict")}

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
                        ? t("common:deleteConfirmation", {
                              name: selectedRow.districtName,
                          })
                        : ""
                }
                onClose={handleCloseDelete}
                onConfirm={handleConfirmDelete}
            />

            <MasterDialog
                open={openForm}
                title={
                    editingRow
                        ? t("masters:editDistrict")
                        : t("masters:addDistrict")
                }
                defaultValues={defaultValues}
                onClose={handleCloseForm}
                onSave={handleSave}
            >
                <DistrictForm />
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
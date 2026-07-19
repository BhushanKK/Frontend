import MasterGrid from "../../../components/master-grids/MasterGrid";
import PageContainer from "../../../components/common/PageContainer";
import { DeleteDialog } from "../../../components/master-grids";
import MasterDialog from "../../../components/common/MasterDialog";
import AppSnackbar from "../../../components/common/AppSnackbar";


import usePermission from "../../../hooks/usePermission";
import type { district } from "../types/district";
import DistrictForm from "../components/districtForm";
import { districtColumns } from "../components/districtColumns";
import { useDistrict } from "../hooks/useDistrict";
import { useDistrictCrud } from "../hooks/useDistrictCrud";

export default function DistrictPage() {
    const {district,loading,loadDistricts} = useDistrict();

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
        selectRow,
        snackbarOpen,
        snackbarMessage,
        snackbarSeverity,

        handleAdd,
        handleEdit,
        handelSave,
        handleCloseForm,

        handleDelete,
        handleConfirmDelete,
        handleCloseDelete,

        closeSnackbar
    } = useDistrictCrud({
        loadDistricts,
    });

    return (
        <PageContainer>

            <MasterGrid<district>
                title="District Master"
                rowData={district}
                columnDefs={districtColumns}
                loading={loading}
                addButtonText="Add District"

                // Permission control
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
                title="Delete District"
                description={
                    selectRow
                        ? `Are you sure you want to delete "${selectRow.districtName}"?`
                        : ""
                }
                onClose={handleCloseDelete}
                onConfirm={handleConfirmDelete}
            />

            <MasterDialog
                open={openForm}
                title={
                    editingRow
                        ? "Edit District"
                        : "Add District"
                }
                defaultValues={{
                    districtName: editingRow?.districtName ?? "",
                    isActive: editingRow?.isActive ?? true,
                }}
                onClose={handleCloseForm}
                onSave={handelSave}
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
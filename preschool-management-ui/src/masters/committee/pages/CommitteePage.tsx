import { useMemo, useState } from "react";
import { Box, Dialog, DialogContent, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import MasterGrid from "../../../components/master-grids/MasterGrid";
import PageContainer from "../../../components/common/PageContainer";
import MasterDialog from "../../../components/common/MasterDialog";
import AppSnackbar from "../../../components/common/AppSnackbar";
import { DeleteDialog } from "../../../components/master-grids";
import CommitteeForm from "../components/CommitteeForm";
import { getCommitteeColumns } from "../components/CommitteeColumns";
import { useCommittee } from "../hooks/useCommittee";
import { useCommitteeCrud } from "../hooks/useCommitteeCrud";
import type { CommitteeMaster } from "../types/committee";
import usePermission from "../../../hooks/usePermission";
import { useTranslation } from "react-i18next";

export default function CommitteePage() {
    const { t, i18n } = useTranslation(["common", "masters"]);
    const [selectedLogoUrl, setSelectedLogoUrl] = useState<string | null>(null);

    const {
        committees,
        loading,
        loadCommittees,
    } = useCommittee(false);

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
    } = useCommitteeCrud({
        loadCommittees,
    });

    const committeeColumns = useMemo(() => {
            return getCommitteeColumns(t,setSelectedLogoUrl);
        }, [t, i18n.language]);
    
    return (
        <PageContainer>
            <MasterGrid<CommitteeMaster>
                title={t("masters:committeeMaster")}
                rowData={committees}
                columnDefs={committeeColumns}
                loading={loading}
                addButtonText={t("masters:addCommittee")}
                canAdd={canAdd}
                canEdit={canEdit}
                canDelete={canDelete}
                canExport={canExport}
                canPrint={canPrint}
                onAdd={handleAdd}
                onEdit={handleEdit}
                onDelete={handleDelete}
            />

            <Dialog
                open={!!selectedLogoUrl}
                onClose={() => setSelectedLogoUrl(null)}
                maxWidth="md"
                fullWidth
            >
                <DialogContent
                    sx={{
                        position: "relative",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        p: 3,
                        bgcolor: "#f8f8f8",
                    }}
                >
                    <IconButton
                        onClick={() => setSelectedLogoUrl(null)}
                        sx={{
                            position: "absolute",
                            top: 8,
                            right: 8,
                            bgcolor: "#fff",
                            zIndex: 1,
                        }}
                    >
                        <CloseIcon />
                    </IconButton>

                    <Box
                        component="img"
                        src={selectedLogoUrl ?? ""}
                        alt="Committee Logo Preview"
                        sx={{
                            maxWidth: "100%",
                            maxHeight: "75vh",
                            objectFit: "contain",
                            bgcolor: "#fff",
                            border: "1px solid #ddd",
                            borderRadius: 1,
                            p: 1,
                        }}
                    />
                </DialogContent>
            </Dialog>

            <DeleteDialog
                open={deleteOpen}
                title="Delete Committee"
                description={
                    selectedRow
                        ? `Are you sure you want to delete "${selectedRow.committeeName}"?`
                        : ""
                }
                onClose={handleCloseDelete}
                onConfirm={handleConfirmDelete}
            />

            <MasterDialog
                open={openForm}
                title={editingRow ? t("masters:editCommittee") : t("masters:addCommittee")}
                defaultValues={{
                    committeeName: editingRow?.committeeName ?? "",
                    slogan: editingRow?.slogan ?? "",
                    isActive: editingRow?.isActive ?? true,

                    // File inputs cannot be pre-populated
                    logo: null,
                }}
                onClose={handleCloseForm}
                onSave={handleSave}
            >
                <CommitteeForm existingLogo={editingRow?.logoPath} />
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
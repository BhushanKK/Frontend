import { useEffect, useMemo, useState } from "react";
import { Box, Button, Card, FormControl, InputLabel, MenuItem, Select, Typography } from "@mui/material";
import { useRoleMenuPermission } from "../hooks/useRoleMenuPermission";
import { RoleMenuPermissionColumns } from "../components/RoleMenuPermissionColumns";
import PageContainer from "../../../components/common/PageContainer";
import { MasterGrid } from "../../../components/master-grids";
import AppSnackbar from "../../../components/common/AppSnackbar";
import type { RoleMenuPermission } from "../types/roleMenuPermission";
import { useRoleDropdown } from "../../../hooks/useRoleDropdown";
import { t } from "i18next";

export default function RoleMenuPermissionPage() {
    const [roleId, setRoleId] = useState(0);
    const {
    roles,
} = useRoleDropdown();

    const {
        permissions,
        loading,
        saving,
        snackbarOpen,
        snackbarMessage,
        snackbarSeverity,
        loadPermissions,
        updatePermission,
        save,
        closeSnackbar,
    } = useRoleMenuPermission();

    useEffect(() => {
        if (roleId > 0)
            loadPermissions(roleId);
    }, [roleId]);

    const columns = useMemo(
        () =>
            RoleMenuPermissionColumns({
                onPermissionChange: updatePermission,
            }),
        [updatePermission]
    );

    return (
        <PageContainer>
            <Card
                sx={{ p: 3, mb: 2 }}
            >
                <Typography
                    variant="h5"
                    sx={{ fontWeight: 600, mb: 2 }}
                >
                    {t("masters:roleMenuPermission")}
                </Typography>

                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 2,
                        flexWrap: "wrap",
                    }}
                >

                    <FormControl
                        size="small"
                        sx={{
                            width: 300,
                        }}
                    >
                        <InputLabel>
                            {t("masters:role")}
                        </InputLabel>
                        <Select
                            value={roleId}
                            label={t("masters:role")}
                            onChange={(e) =>
                                setRoleId(Number(e.target.value))
                            }
                        >

                            <MenuItem value={0}>
                                {t("masters:selectRole")}
                            </MenuItem>

                            {roles.map(r => (
                                <MenuItem
                                    key={r.roleId}
                                    value={r.roleId}
                                >
                                    {r.roleName}
                                </MenuItem>
                            ))}
                        </Select>

                    </FormControl>

                    <Button
                        variant="contained"
                        disabled={
                            roleId === 0 ||
                            saving
                        }
                        onClick={() => save(roleId)}
                    >
                        {t("masters:savePermissions")}
                    </Button>
                </Box>
            </Card>

            <MasterGrid<RoleMenuPermission>
                title=""
                rowData={permissions}
                columnDefs={columns}
                loading={loading}
                showActions={false}
                showToolbar={false}
            />

            <AppSnackbar
                open={snackbarOpen}
                message={snackbarMessage}
                severity={snackbarSeverity}
                onClose={closeSnackbar}
            />
        </PageContainer>
    );
}
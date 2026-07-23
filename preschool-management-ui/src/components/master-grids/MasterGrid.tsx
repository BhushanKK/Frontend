import { useMemo, useRef, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import type {
  ColDef,
  GridApi,
  GridReadyEvent,
} from "ag-grid-community";

import {
  Box,
  Card,
  Divider,
  Stack,
  Typography,
  Pagination,
  FormControl,
  Select,
  MenuItem,
} from "@mui/material";

import LoadingOverlay from "./LoadingOverlay";
import NoRowsOverlay from "./NoRowsOverlay";
import ActionCellRenderer from "./ActionCellRenderer";
import MasterToolbar from "./MasterToolbar";

import { useTranslation } from "react-i18next";
import agGridEn from "../../i18n/locales/en/agGrid.en";
import agGridMr from "../../i18n/locales/mr/agGrid.mr";

import type { PaginatedResult } from "../../types/pagination";

interface MasterGridProps<T> {
  title: string;
  rowData: T[];
  columnDefs: ColDef<T>[];

  loading?: boolean;

  pagination?: PaginatedResult<T>;

  onPageChange?: (page: number) => void;
  onPageSizeChange?: (pageSize: number) => void;
  onSearch?: (searchText: string) => void;

  canAdd?: boolean;
  canEdit?: boolean;
  canDelete?: boolean;
  canExport?: boolean;
  canPrint?: boolean;

  addButtonText?: string;

  onAdd?: () => void;
  onEdit?: (row: T) => void;
  onDelete?: (row: T) => void;

  showActions?: boolean;
  showToolbar?: boolean;
}

export default function MasterGrid<T>({
  title,
  rowData,
  columnDefs,

  loading = false,

  pagination,
  onPageChange,
  onPageSizeChange,
  onSearch,

  canAdd = false,
  canEdit = false,
  canDelete = false,
  canExport = false,

  addButtonText = "Add",

  onAdd,
  onEdit,
  onDelete,

  showActions = true,
  showToolbar = true,
}: MasterGridProps<T>) {
  const gridRef = useRef<AgGridReact<T>>(null);

  const { t, i18n } = useTranslation();

  const [gridApi, setGridApi] = useState<GridApi<T> | null>(null);

  const localeText = useMemo(() => {
    switch (i18n.language) {
      case "mr":
        return agGridMr;
      default:
        return agGridEn;
    }
  }, [i18n.language]);

  const finalColumnDefs = useMemo<ColDef<T>[]>(() => {
    if (!showActions) return columnDefs;

    return [
      ...columnDefs,
      {
        headerName: t("common:action"),
        width: 120,
        sortable: false,
        filter: false,
        floatingFilter: false,
        resizable: false,

        cellStyle: {
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        },

        cellRenderer: (params: any) => (
          <ActionCellRenderer
            {...params}
            onEdit={onEdit}
            onDelete={onDelete}
            canEdit={canEdit}
            canDelete={canDelete}
          />
        ),
      },
    ];
  }, [
    columnDefs,
    showActions,
    onEdit,
    onDelete,
    canEdit,
    canDelete,
    t,
  ]);

  const onGridReady = (params: GridReadyEvent<T>) => {
    setGridApi(params.api);
  };

  const handleExport = () => {
    gridApi?.exportDataAsCsv({
      fileName: `${title}.csv`,
    });
  };

  return (
    <Card
      elevation={2}
      sx={{
        p: 3,
        borderRadius: 3,
      }}
    >
      {showToolbar && (
        <>
          <MasterToolbar
            title={title}
            addButtonText={addButtonText}
            onSearch={onSearch ?? (() => {})}
            onExport={handleExport}
            onAdd={onAdd}
            showExport={canExport}
            showAdd={canAdd}
          />

          <Divider sx={{ mb: 2 }} />
        </>
      )}

      <Box
        className="ag-theme-quartz"
        sx={{
          height: 450,
          width: "100%",
          border: "1px solid",
          borderColor: "divider",
          borderRadius: 0.5,
          overflow: "hidden",
        }}
      >
        <AgGridReact<T>
          key={i18n.language}
          ref={gridRef}
          rowData={rowData}
          columnDefs={finalColumnDefs}
          onGridReady={onGridReady}
          loading={loading}
          animateRows
          rowHeight={36}
          headerHeight={38}
          localeText={localeText}
          loadingOverlayComponent={LoadingOverlay}
          noRowsOverlayComponent={NoRowsOverlay}
          defaultColDef={{
            sortable: true,
            filter: true,
            floatingFilter: false,
            resizable: true,
            flex: 1,
          }}
        />
      </Box>

      {pagination && (
        <Stack
          direction="row"
          
          sx={{ mt: 2,justifyContent:"space-between",
          alignItems:"center" }}
        >
          <Typography variant="body2">
            Showing{" "}
            {pagination.totalCount === 0
              ? 0
              : (pagination.pageNumber - 1) * pagination.pageSize + 1}
            {" - "}
            {pagination.totalCount === 0
              ? 0
              : Math.min(
                  pagination.pageNumber * pagination.pageSize,
                  pagination.totalCount
                )}
            {" of "}
            {pagination.totalCount}
          </Typography>

          <Stack
            direction="row"
            sx={{spacing:2,
            alignItems:"center"}}
          >
            <FormControl size="small" sx={{ minWidth: 90 }}>
              <Select
                value={pagination.pageSize}
                onChange={(e) =>
                  onPageSizeChange?.(Number(e.target.value))
                }
              >
                <MenuItem value={10}>10</MenuItem>
                <MenuItem value={20}>20</MenuItem>
                <MenuItem value={50}>50</MenuItem>
                <MenuItem value={100}>100</MenuItem>
              </Select>
            </FormControl>

            <Pagination
              color="primary"
              shape="rounded"
              page={pagination.pageNumber}
              count={pagination.totalPages || 1}
              onChange={(_, page) => onPageChange?.(page)}
            />
          </Stack>
        </Stack>
      )}
    </Card>
  );
}
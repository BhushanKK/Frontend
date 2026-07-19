import { useEffect, useMemo, useRef, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import type { ColDef, GridApi, GridReadyEvent } from "ag-grid-community";
import { Box, Card, Divider } from "@mui/material";
import LoadingOverlay from "./LoadingOverlay";
import NoRowsOverlay from "./NoRowsOverlay";
import ActionCellRenderer from "./ActionCellRenderer";
import MasterToolbar from "./MasterToolbar";
import { useTranslation } from "react-i18next";
import agGridEn from "../../i18n/locales/en/agGrid.en";
import agGridMr from "../../i18n/locales/mr/agGrid.mr";


interface MasterGridProps<T> {
  title: string;
  rowData: T[];
  columnDefs: ColDef<T>[];
  loading?: boolean;

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

  const localeText = useMemo(() => {
    switch (i18n.language) {
      case "mr":
        return agGridMr;
      default:
        return agGridEn;
    }
  }, [i18n.language]);

  const [gridApi, setGridApi] = useState<GridApi | null>(null);
  const finalColumnDefs = useMemo<ColDef<T>[]>(() => {

    if (!showActions)
      return columnDefs;

    return [
      ...columnDefs,
      {
        headerName: t("action"),
        width: 120,
        sortable: false,
        filter: false,

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
    onEdit,
    onDelete,
    canEdit,
    canDelete,
    showActions,
    t
  ]);

  const onGridReady = (params: GridReadyEvent) => {
    setGridApi(params.api);
  };

  const handleSearch = (value: string) => {
    gridApi?.setGridOption("quickFilterText", value);
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
            onSearch={handleSearch}
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
          borderRadius: 2,
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
          pagination
          paginationPageSize={10}
          paginationPageSizeSelector={[10, 20, 50, 100]}
          rowHeight={36}
          headerHeight={38}
          localeText={localeText}
          loadingOverlayComponent={LoadingOverlay}
          noRowsOverlayComponent={NoRowsOverlay}
          defaultColDef={{
            sortable: true,
            filter: true,
            floatingFilter: true,
            resizable: true,
            flex: 1,
          }}
        />
      </Box>
    </Card>
  );
}
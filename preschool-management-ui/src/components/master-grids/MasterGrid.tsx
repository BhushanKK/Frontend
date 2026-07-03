import { useMemo, useRef, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import type {
  ColDef,
  GridApi,
  GridReadyEvent,
} from "ag-grid-community";

import { Box, Card, Divider } from "@mui/material";

import LoadingOverlay from "./LoadingOverlay";
import NoRowsOverlay from "./NoRowsOverlay";
import ActionCellRenderer from "./ActionCellRenderer";
import MasterToolbar from "./MasterToolbar";

interface MasterGridProps<T> {
  title: string;
  rowData: T[];
  columnDefs: ColDef<T>[];
  loading?: boolean;
  addButtonText?: string;
  onAdd?: () => void;
  onEdit?: (row: T) => void;
  onDelete?: (row: T) => void;
}

export default function MasterGrid<T>({
  title,
  rowData,
  columnDefs,
  loading = false,
  addButtonText = "Add",
  onAdd,
  onEdit,
  onDelete,
}: MasterGridProps<T>) {
  const gridRef = useRef<AgGridReact<T>>(null);

  const [gridApi, setGridApi] = useState<GridApi | null>(null);

  const finalColumnDefs = useMemo<ColDef<T>[]>(() => {
    return [
      ...columnDefs,
      {
        headerName: "Actions",
        width: 120,
        sortable: false,
        filter: false,
        cellStyle: {
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        },
        cellRenderer: ActionCellRenderer,
        cellRendererParams: {
          onEdit,
          onDelete,
        },
      },
    ];
  }, [columnDefs, onEdit, onDelete]);

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
      <MasterToolbar
  title={title}
  addButtonText={addButtonText}
  onSearch={handleSearch}
  onExport={handleExport}
  onAdd={onAdd}
  showExport
/>

      <Divider sx={{ mb: 2 }} />

      <Box
        className="ag-theme-quartz"
        sx={{
          height: 550,
          width: "100%",
          border: "1px solid",
          borderColor: "divider",
          borderRadius: 2,
          overflow: "hidden",
        }}
      >
        <AgGridReact<T>
          ref={gridRef}
          rowData={rowData}
          columnDefs={finalColumnDefs}
          onGridReady={onGridReady}
          loading={loading}
          animateRows
          pagination
          paginationPageSize={10}
          paginationPageSizeSelector={[10, 20, 50, 100]}
          rowHeight={46}
          headerHeight={48}
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
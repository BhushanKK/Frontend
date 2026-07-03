import type { ColDef } from "ag-grid-community";

/**
 * Generic Master Grid Props
 */
export interface MasterGridProps<T> {
  title: string;
  rowData: T[];
  columnDefs: ColDef<T>[];

  loading?: boolean;

  addButtonText?: string;

  onAdd?: () => void;
  onEdit?: (row: T) => void;
  onDelete?: (row: T) => void;
}

/**
 * Toolbar Props
 */
export interface MasterToolbarProps {
  title: string;

  searchText: string;

  addButtonText?: string;

  showExport?: boolean;

  onSearchChange: (value: string) => void;

  onAdd?: () => void;

  onExport?: () => void;
}

/**
 * Delete Dialog Props
 */
export interface DeleteDialogProps {
  open: boolean;

  title?: string;

  description?: string;

  loading?: boolean;

  onClose: () => void;

  onConfirm: () => void;
}

/**
 * Action Cell Renderer Props
 */
export interface ActionCellRendererProps<T = any> {
  data: T;

  onEdit?: (row: T) => void;

  onDelete?: (row: T) => void;
}
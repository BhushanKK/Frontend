import { Box, IconButton, Tooltip } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

interface ActionCellRendererProps {
  data: any;
  onEdit?: (
    row: any
  ) => void;

  onDelete?: (
    row: any
  ) => void;
  canEdit?: boolean;
  canDelete?: boolean;
}

export default function ActionCellRenderer(
  props: ActionCellRendererProps
) {
  const {
    data,
    onEdit,
    onDelete,
    canEdit = false,
    canDelete = false,
  } = props;

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 1,
        height: "100%",
      }}
    >
      {
        canEdit && (
          <Tooltip title="Edit">
            <IconButton
              size="small"
              color="primary"
              onClick={() =>
                onEdit?.(data)
              }
            >
              <EditIcon
                fontSize="small"
              />
            </IconButton>
          </Tooltip>
        )
      }
      {
        canDelete && (
          <Tooltip title="Delete">
            <IconButton
              size="small"
              color="error"
              onClick={() =>
                onDelete?.(data)
              }
            >
              <DeleteIcon
                fontSize="small"
              />
            </IconButton>
          </Tooltip>
        )
      }
    </Box>
  );
}
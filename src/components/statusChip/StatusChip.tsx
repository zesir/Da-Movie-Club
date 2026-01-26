import { Chip } from "@mui/material";

type StatusChipProps = {
  label: string;
};

export default function StatusChip({ label }: StatusChipProps) {
  return (
    <Chip
      label={label}
      sx={{
        mt: 2,
        background: "rgba(0, 0, 0, 0.5)",
        border: "1px solid",
        borderColor: "primary.main",
        fontWeight: "bold",
      }}
    />
  );
}

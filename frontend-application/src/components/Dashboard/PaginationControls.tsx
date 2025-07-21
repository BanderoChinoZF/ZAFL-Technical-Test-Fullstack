import { Box, Button, Typography } from "@mui/material";

interface Props {
  page: number;
  totalPages: number;
  onPageChange: (newPage: number) => void;
}

const PaginationControls = ({ page, totalPages, onPageChange }: Props) => {
  const handlePrevious = () => {
    if (page > 1) {
      onPageChange(page - 1);
    }
  };

  const handleNext = () => {
    if (page < totalPages) {
      onPageChange(page + 1);
    }
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" gap={2} mt={3}>
      <Button
        variant="outlined"
        onClick={handlePrevious}
        disabled={page === 1}
      >
        Anterior
      </Button>
      <Typography>
        Página {page} de {totalPages}
      </Typography>
      <Button
        variant="outlined"
        onClick={handleNext}
        disabled={page === totalPages}
      >
        Siguiente
      </Button>
    </Box>
  );
};

export default PaginationControls;

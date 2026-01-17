import { Button, Card, CardContent, Typography } from "@mui/material";

const Demo = () => {
  return (
    <Card sx={{ maxWidth: 300, margin: "auto", mt: 5, p: 2 }}>
      <CardContent>
        <Typography variant="h5" component="div">
          Ma carte MUI
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          Exemple avec Material UI
        </Typography>
        <Button variant="contained" color="primary">
          Cliquer ici
        </Button>
      </CardContent>
    </Card>
  );
};

export default Demo;

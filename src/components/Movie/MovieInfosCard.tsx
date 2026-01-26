import EventIcon from "@mui/icons-material/Event";
import LanguageIcon from "@mui/icons-material/Language";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import MovieIcon from "@mui/icons-material/Movie";
import PaidIcon from "@mui/icons-material/Paid";
import TimerIcon from "@mui/icons-material/Timer";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import {
  Card,
  CardContent,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";

type MovieInfoCardProps = {
  director?: string;
  releaseDate?: string;
  budget?: number;
  revenue?: number;
  belongsTo?: string;
  language?: string;
  runTime?: number;
};

export default function MovieInfosCard({
  director,
  releaseDate,
  budget,
  revenue,
  belongsTo,
  language,
  runTime,
}: MovieInfoCardProps) {
  const formatDate = (date?: string) =>
    date ? new Date(date).toLocaleDateString("fr-FR") : "—";

  const formatMoney = (amount?: number) =>
    amount ? `${amount.toLocaleString("fr-FR")} $` : "—";

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Informations du film
        </Typography>

        <List dense>
          {director && (
            <ListItem>
              <ListItemIcon>
                <MovieIcon />
              </ListItemIcon>
              <ListItemText
                primary="Réalisé par"
                secondary={director ?? "Inconnu"}
              />
            </ListItem>
          )}
          {releaseDate && (
            <ListItem>
              <ListItemIcon>
                <EventIcon />
              </ListItemIcon>
              <ListItemText
                primary="Date de sortie"
                secondary={formatDate(releaseDate)}
              />
            </ListItem>
          )}
          {budget != null && budget > 0 && (
            <ListItem>
              <ListItemIcon>
                <PaidIcon />
              </ListItemIcon>

              <ListItemText primary="Budget" secondary={formatMoney(budget)} />
            </ListItem>
          )}

          {revenue && (
            <ListItem>
              <ListItemIcon>
                <TrendingUpIcon />
              </ListItemIcon>

              <ListItemText
                primary="Recette au box-office"
                secondary={formatMoney(revenue)}
              />
            </ListItem>
          )}
          {belongsTo && (
            <ListItem>
              <ListItemIcon>
                <LibraryBooksIcon />
              </ListItemIcon>

              <ListItemText
                primary="Appartient à la franchise"
                secondary={belongsTo ?? "—"}
              />
            </ListItem>
          )}
          {language && (
            <ListItem>
              <ListItemIcon>
                <LanguageIcon />
              </ListItemIcon>

              <ListItemText
                primary="Langue originale"
                secondary={language ?? "—"}
              />
            </ListItem>
          )}
          {runTime && (
            <ListItem>
              <ListItemIcon>
                <TimerIcon />
              </ListItemIcon>
              {runTime && (
                <ListItemText
                  primary="Durée"
                  secondary={runTime ? `${runTime} min` : "—"}
                />
              )}
            </ListItem>
          )}
        </List>
      </CardContent>
    </Card>
  );
}

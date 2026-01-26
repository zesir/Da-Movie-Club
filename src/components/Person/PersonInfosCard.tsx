import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import CakeIcon from "@mui/icons-material/Cake";
import HomeIcon from "@mui/icons-material/Home";
import TransgenderIcon from "@mui/icons-material/Transgender";
import {
  Card,
  CardContent,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";

type PersonInfoCardProps = {
  name?: string;
  birthday?: string | null;
  birthplace?: string | null;
  alias?: string[];
  gender?: string;
};

export default function PersonInfosCard({
  name,
  birthday,
  birthplace,
  alias,
  gender,
}: PersonInfoCardProps) {
  const formatDate = (date?: string) =>
    date ? new Date(date).toLocaleDateString("fr-FR") : "—";

  return (
    <Card>
      <CardContent>
        <Typography variant="h1" gutterBottom>
          {name}
        </Typography>

        <List dense>
          {birthday && (
            <ListItem>
              <ListItemIcon>
                <CakeIcon />
              </ListItemIcon>
              <ListItemText
                primary="Né(e) le"
                secondary={formatDate(birthday)}
              />
            </ListItem>
          )}
          {birthplace && (
            <ListItem>
              <ListItemIcon>
                <HomeIcon />
              </ListItemIcon>

              <ListItemText
                primary="Lieu de naissance"
                secondary={birthplace}
              />
            </ListItem>
          )}

          {alias && (
            <ListItem>
              <ListItemIcon>
                <AccountCircleIcon />
              </ListItemIcon>

              <ListItemText primary="Alias" secondary={alias} />
            </ListItem>
          )}
          {gender && (
            <ListItem>
              <ListItemIcon>
                <TransgenderIcon />
              </ListItemIcon>

              <ListItemText primary="Genre" secondary={gender} />
            </ListItem>
          )}
        </List>
      </CardContent>
    </Card>
  );
}

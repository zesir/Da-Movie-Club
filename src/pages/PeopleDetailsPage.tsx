import ResponsiveContainer from "@/components/Container/Container";
import FilmoSlider from "@/components/FilmoSlider/FilmoSlider";
import PersonFilmographyListItem from "@/components/Person/PersonFilmographyCard";
import PersonInfosCard from "@/components/Person/PersonInfosCard";
import { usePerson } from "@/hooks/usePeople";
import { usePersonFilmography } from "@/hooks/usePersonFilmography";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import {
  Avatar,
  Box,
  Card,
  CardContent,
  FormControlLabel,
  List,
  Switch,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import Grid from "@mui/material/Grid";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

type MediaFilter = "all" | "movie" | "tv";

export default function PeopleDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const { person, loading, error } = usePerson(id);
  const navigate = useNavigate();
  const {
    cast: castFilmo,
    crew: crewFilmo,
    loading: filmoLoading,
    error: errorLoading,
  } = usePersonFilmography(id);

  const [showList, setShowList] = useState(false);
  const [mediaFilter, setMediaFilter] = useState<MediaFilter>("all");

  const filteredCast = castFilmo.filter(
    (item) => mediaFilter === "all" || item.media_type === mediaFilter,
  );

  const filteredCrew = crewFilmo.filter(
    (item) => mediaFilter === "all" || item.media_type === mediaFilter,
  );

  if (loading || filmoLoading)
    return <CircularProgress sx={{ display: "block", m: "40px auto" }} />;
  if (error || errorLoading)
    return <Typography color="error">Erreur : {error}</Typography>;
  if (!person) return <Typography>Aucune personne trouvée.</Typography>;
  if (!castFilmo) return <Typography>Aucune filmographie trouvée.</Typography>;
  if (!crewFilmo) return <Typography>Aucune filmographie trouvée.</Typography>;

  const profileUrl = person.profile_path
    ? `https://image.tmdb.org/t/p/w300${person.profile_path}`
    : "/assets/img/default-avatar.jpg";

  return (
    <ResponsiveContainer>
      <Box sx={{ p: { xs: 2, md: 4 } }}>
        <Box
          component="nav"
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            cursor: "pointer",
            mb: 2,
            width: "fit-content",
          }}
          onClick={() => navigate(-1)}
        >
          <ArrowBackRoundedIcon fontSize="small" />
          <Typography variant="body2" color="text.secondary">
            Retour
          </Typography>
        </Box>
        <Grid container spacing={4}>
          {/* Portrait à gauche */}
          <Grid size={{ xs: 12, md: 4 }}>
            <Avatar
              src={profileUrl}
              alt={person.name}
              variant="rounded"
              sx={{ width: "100%", height: "auto", borderRadius: 2 }}
            />
          </Grid>

          {/* Infos à droite */}
          <Grid size={{ xs: 12, md: 8 }} sx={{ textAlign: "left" }}>
            <Card variant="outlined" sx={{ mb: 3 }}>
              <PersonInfosCard
                name={person.name}
                birthday={person.birthday}
                birthplace={person.place_of_birth}
                alias={person.also_known_as}
                gender={person.gender}
              />
            </Card>
          </Grid>
        </Grid>
        {person.biography && (
          <Card variant="outlined">
            <CardContent sx={{ textAlign: "left" }}>
              <Typography variant="h5" gutterBottom>
                Biographie
              </Typography>
              <Typography variant="body1" sx={{ whiteSpace: "pre-line" }}>
                {person.biography}
              </Typography>
            </CardContent>
          </Card>
        )}
        <FormControlLabel
          label="Voir la liste"
          control={
            <Switch
              checked={showList}
              onChange={(e) => setShowList(e.target.checked)}
            />
          }
        />

        <Box sx={{ mb: 2 }}>
          <ToggleButtonGroup
            value={mediaFilter}
            exclusive
            onChange={(_, value) => value && setMediaFilter(value)}
            size="small"
          >
            <ToggleButton value="all">Tous</ToggleButton>
            <ToggleButton value="movie">Films</ToggleButton>
            <ToggleButton value="tv">Séries</ToggleButton>
          </ToggleButtonGroup>
        </Box>
        {showList ? (
          <List>
            {filteredCast.map((item) => (
              <PersonFilmographyListItem key={item.credit_id} item={item} />
            ))}
          </List>
        ) : (
          filteredCast.length > 0 && (
            <FilmoSlider title="Filmographie" items={filteredCast} />
          )
        )}
        {loading && <CircularProgress />}
        {error && <Typography color="error">{error}</Typography>}

        {crewFilmo && crewFilmo.length > 0 && (
          <FilmoSlider
            title="Filmographie – Équipe technique"
            items={filteredCrew}
          />
        )}
      </Box>
    </ResponsiveContainer>
  );
}

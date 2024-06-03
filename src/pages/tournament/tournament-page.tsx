import { tournamentModel } from "@drag/entities/tournament";
import { Container } from "@mantine/core";
import { useUnit } from "effector-react";

export default function TournamentPage() {
  const { data, pending }= useUnit(tournamentModel.tournamentQuery);

  return (
    <Container>
    </Container>
  )
}

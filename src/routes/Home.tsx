import { Flex, Grid, Spinner } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import PokemonCard from "../components/user/PokemonCard";
import { HStack } from "@chakra-ui/react";
import {
  PaginationItems,
  PaginationNextTrigger,
  PaginationPrevTrigger,
  PaginationRoot,
} from "../components/ui/pagination";
import { useSearchParams } from "react-router-dom";

type GetListPokemonResponse = {
  count: number;
  next: string | null;
  previous: string | null;
  results: Pokemon[];
};

type Pokemon = {
  name: string;
  url: string;
};

export default function Home() {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = Number(searchParams.get("page") || "1");
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["pokemons", page],
    queryFn: async () =>
      fetch(
        `https://pokeapi.co/api/v2/pokemon?offset=${(page - 1) * 16}&limit=16`
      ).then((res) => res.json() as Promise<GetListPokemonResponse>),
  });
  const pageCount = Math.ceil(data?.count / 16);

  return (
    <Flex flexDirection="column">
      <Grid templateColumns="repeat(4, 1fr)" gap={6}>
        {isLoading ? (
          <Spinner />
        ) : (
          data?.results.map((pokemon) => (
            <PokemonCard key={pokemon.name} name={pokemon.name} />
          ))
        )}
      </Grid>

      <Flex justifyContent="center" marginTop={5} gap={1}>
        <PaginationRoot
          count={pageCount}
          pageSize={2}
          defaultPage={1}
          variant="solid"
          page={page}
          onPageChange={(e) => setSearchParams({ page: e.page.toString() })}
        >
          <HStack>
            <PaginationPrevTrigger />
            <PaginationItems />
            <PaginationNextTrigger />
          </HStack>
        </PaginationRoot>
      </Flex>
    </Flex>
  );
}

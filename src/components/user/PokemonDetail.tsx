import { Flex, Grid, GridItem, Heading, Image, Text } from "@chakra-ui/react";
import { Tag } from "../ui/tag";
import { ProgressBar, ProgressRoot } from "../ui/progress";
import { PokemonObject } from "../@types/pokemon";

type PokemonDetailProps = {
  pokemon: PokemonObject;
};

const statColorScheme: Record<string, string> = {
  hp: "red",
  attack: "green",
};

export default function PokemonDetail({ pokemon }: PokemonDetailProps) {
  return (
    <div>
      <Grid gridTemplateColumns={"repeat(2, 1fr)"} gap={6}>
        <GridItem>
          <Heading>{pokemon.name}</Heading>
          <Flex gap={2}>
            {pokemon.types.map((type) => (
              <Tag
                key={type.type.name}
                // colorScheme={type.type.name}
                variant="solid"
              >
                <Text fontSize="xs" fontWeight={600}>
                  {type.type.name.toUpperCase()}
                </Text>
              </Tag>
            ))}
          </Flex>

          <Flex flexDirection="column">
            {pokemon.stats.map((item) => (
              <Flex key={item.stat.name} alignItems="center">
                <Text width={32}>{item.stat.name}</Text>
                <ProgressRoot
                  borderRadius={4}
                  flex={1}
                  size="sm"
                  colorPalette={statColorScheme[item.stat.name] || "blue"}
                  value={item.base_stat}
                  min={0}
                  max={100}
                >
                  <ProgressBar />
                </ProgressRoot>
              </Flex>
            ))}
          </Flex>
        </GridItem>
        <GridItem>
          <Image
            src={pokemon.sprites.other?.["official-artwork"].front_default}
            alt={pokemon.name}
            boxSize="2xl"
          />
        </GridItem>
      </Grid>
    </div>
  );
}

import { useState } from "react";
import { Icon } from "@chakra-ui/react";
import { Box, Flex, Heading, Input, Text } from "@chakra-ui/react";
import { InputGroup } from "../ui/input-group";
import { IoSearchSharp } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";

export default function Header() {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  return (
    <Flex gap={60} alignItems="flex-end" paddingBlock={6}>
      <Flex flexDirection="column">
        <Link to="/">
          <Heading as="h1">Pokedéx</Heading>
        </Link>
        <Text>
          Search for Pokémon by name or using the National Pokédex number
        </Text>
      </Flex>

      <Box flex={1}>
        <InputGroup
          size="xl"
          startElement={
            <Icon
              cursor={"pointer"}
              fontSize="20px"
              color="gray.800"
              onClick={() => {
                if (searchQuery && searchQuery.trim().length > 0) {
                  navigate({
                    pathname: "/pokemon/search",
                    search: createSearchParams({
                      q: searchQuery.trim(),
                    }).toString(),
                  });
                }
              }}
            >
              <IoSearchSharp />
            </Icon>
          }
          width="full"
        >
          <Input
            size="xl"
            placeholder="What Pokémon are you looking for?"
            variant="subtle"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                if (searchQuery && searchQuery.trim().length > 0) {
                  navigate({
                    pathname: "/pokemon/search",
                    search: createSearchParams({
                      q: searchQuery.trim(),
                    }).toString(),
                  });
                }
              }
            }}
          />
        </InputGroup>
      </Box>
    </Flex>
  );
}

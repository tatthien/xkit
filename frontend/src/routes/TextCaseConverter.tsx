import { Box, Button, Group, Text, Textarea, Title } from "@mantine/core";
import { useMemo, useState } from "react";
import toLower from "lodash/toLower";
import toUpper from "lodash/toUpper";
import capitalize from "lodash/capitalize";
import camelCase from "lodash/camelCase";
import snakeCase from "lodash/snakeCase";
import kebabCase from "lodash/kebabCase";
import { CopyButton } from "../components/CopyButton";

export default function TextCaseConverter() {
  const [value, setValue] = useState("");

  const wordCount = useMemo(() => {
    return value.split(/\s/).filter((w) => w.trim().length > 0).length;
  }, [value]);

  const characterCount = useMemo(() => {
    return value.length;
  }, [value]);

  const handleUpperCase = () => {
    setValue(toUpper(value));
  };

  const handleLowerCase = () => {
    setValue(toLower(value));
  };

  const handleCapitalizedCase = () => {
    const words = value.split(" ");
    const capitalizedCase = words.map((w) => capitalize(w)).join(" ");
    setValue(capitalizedCase);
  };

  const handleCamelCase = () => {
    setValue(camelCase(value));
  };

  const handleSnakeCase = () => {
    setValue(snakeCase(value));
  };

  const handleKebabCase = () => {
    setValue(kebabCase(value));
  };

  return (
    <Box>
      <Group justify="space-between" mb={8}>
        <Title order={2} fz="lg">
          Text case converter
        </Title>
        <CopyButton value={value} />
      </Group>
      <Textarea
        placeholder="Type or paste your content here"
        w="100%"
        autosize
        minRows={8}
        maxRows={16}
        mb={8}
        value={value}
        onChange={(event) => setValue(event.currentTarget.value)}
      />
      <Text mb={8} fz="sm">
        {`${wordCount} words | ${characterCount} characters`}
      </Text>
      <Group gap={6}>
        <Button onClick={handleUpperCase}>UPPERCASE</Button>
        <Button onClick={handleLowerCase}>lowercase</Button>
        <Button onClick={handleCapitalizedCase}>Capitalized Case</Button>
        <Button onClick={handleCamelCase}>camelCase</Button>
        <Button onClick={handleSnakeCase}>snake_case</Button>
        <Button onClick={handleKebabCase}>kebab-case</Button>
      </Group>
    </Box>
  );
}

import { Box, Button, Group, TextInput, Title } from "@mantine/core";
import { IconDownload } from "@tabler/icons-react";
import { useState } from "react";

export default function Youtube() {
  const [youTubeId, setYouTubeId] = useState("");

  const handleDownload = () => {
    alert(youTubeId);
  };

  return (
    <Box>
      <Group gap={6}>
        <TextInput
          style={{ flex: 1 }}
          placeholder="Enter YouTube ID to start download"
          onChange={(event) => setYouTubeId(event.currentTarget.value)}
        />
        <Button
          leftSection={<IconDownload size={18} />}
          onClick={handleDownload}
          disabled={youTubeId.trim() === ""}
        >
          Download
        </Button>
      </Group>
    </Box>
  );
}

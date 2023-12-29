import {
  Badge,
  Box,
  Button,
  Flex,
  Group,
  Image,
  ScrollArea,
  Stack,
  Table,
  Text,
  TextInput,
} from "@mantine/core";
import {
  IconBrandYoutube,
  IconClock,
  IconEye,
  IconTransform,
  IconVideo,
} from "@tabler/icons-react";
import { useMemo, useState } from "react";
import {
  GetYouTubeInfo,
  DownloadYouTubeAsset,
} from "../../wailsjs/go/main/App";
import { main } from "../../wailsjs/go/models";
import { BrowserOpenURL } from "../../wailsjs/runtime/runtime";
import { bytesToSize } from "../utils/bytesToSize";

export default function YoutubeDownloader() {
  const [youTubeId, setYouTubeId] = useState(
    "https://www.youtube.com/watch?v=j3QME_Yk0eo",
  );
  const [info, setInfo] = useState<main.VideoInfo>();

  const videoFormats = useMemo(() => {
    if (!info) return [];
    return info.formats.filter((item: any) => item.mimeType.includes("video"));
  }, [info]);

  const audioFormats = useMemo(() => {
    if (!info) return [];
    return info.formats.sort((a: any, b: any) => {
      if (a.bitrate > b.bitrate) return -1;
      if (a.bitrate < b.bitrate) return 1;
      return 0;
    });
  }, [info]);

  const handleDownload = async () => {
    const info = await GetYouTubeInfo(youTubeId);
    setInfo(info);
  };

  return (
    <Box>
      <Group gap={6} mb={16}>
        <TextInput
          style={{ flex: 1 }}
          placeholder="Enter YouTube URL to start download"
          value={youTubeId}
          onChange={(event) => setYouTubeId(event.currentTarget.value)}
        />
        <Button
          leftSection={<IconTransform size={18} />}
          onClick={handleDownload}
          disabled={youTubeId.trim() === ""}
        >
          Convert
        </Button>
      </Group>
      {info && (
        <>
          <Group wrap="nowrap" align="flex-start" mb={24}>
            <Image src={info.thumbnail} radius="md" w={200} />
            <Box>
              <Text fw={600} fz="lg">
                {info.title}
              </Text>

              <Text>{info.author}</Text>

              <Flex gap={12} fz="sm">
                <Flex align="center" gap={4}>
                  <IconClock size={16} />
                  {info.duration}
                </Flex>
                <Flex align="center" gap={4}>
                  <IconEye size={18} />
                  {info.views} views
                </Flex>
              </Flex>

              <Button
                mt={8}
                variant="light"
                size="compact-sm"
                leftSection={<IconBrandYoutube size={18} />}
                onClick={() =>
                  BrowserOpenURL(`https://www.youtube.com/watch?v=${info.id}`)
                }
              >
                View on YouTube
              </Button>
            </Box>
          </Group>
          <Stack>
            <Box>
              <Flex align="center" gap={4} mb={8}>
                <IconVideo size={20} />
                <Text fw={600}>Video</Text>
              </Flex>
              <ScrollArea>
                <Table>
                  <Table.Thead>
                    <Table.Tr>
                      <Table.Th>FPS</Table.Th>
                      <Table.Th>Video Quality</Table.Th>
                      <Table.Th>Audio Channels</Table.Th>
                      <Table.Th>Audio Quality</Table.Th>
                      <Table.Th>Size</Table.Th>
                      <Table.Th></Table.Th>
                    </Table.Tr>
                  </Table.Thead>
                  <Table.Tbody>
                    {videoFormats.map(
                      (item: main.VideoFormat, index: number) => (
                        <Table.Tr key={index}>
                          <Table.Td>{item.fps}</Table.Td>
                          <Table.Td>{item.videoQuality}</Table.Td>
                          <Table.Td>
                            {item.audioChannels ? (
                              <Badge variant="light" radius="sm" color="green">
                                Audio
                              </Badge>
                            ) : (
                              <Badge variant="light" radius="sm" color="gray">
                                No Audio
                              </Badge>
                            )}
                          </Table.Td>
                          <Table.Td>{item.audioQuality || "—"}</Table.Td>
                          <Table.Td>{bytesToSize(item.size)}</Table.Td>
                          <Table.Td>
                            <Button
                              size="compact-sm"
                              onClick={() => {
                                DownloadYouTubeAsset(
                                  `${info.title}-${item.videoQuality}.mp4`,
                                  item.url,
                                );
                              }}
                            >
                              Download
                            </Button>
                          </Table.Td>
                        </Table.Tr>
                      ),
                    )}
                  </Table.Tbody>
                </Table>
              </ScrollArea>
            </Box>
          </Stack>
        </>
      )}
    </Box>
  );
}
